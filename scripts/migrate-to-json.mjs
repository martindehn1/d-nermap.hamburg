// Einmal-Skript: überführt die in doenermap.js einkompilierten Arrays nach data/shops.json.
//
// Danach ist data/shops.json die Quelle der Wahrheit und dieses Skript wird nicht
// mehr gebraucht. Es bleibt nur als Beleg im Repo, wie die IDs entstanden sind —
// denn IDs werden genau EINMAL vergeben und danach nie wieder neu berechnet.

import fs from "node:fs";
import vm from "node:vm";

const LEGACY = "assets/js/doenermap.js";

// Testdaten aus den Commit-Nachrichten. Nur echte Tests haben ein Datum.
const TESTED_AT = {
  "Sirali Kebab":   "2026-08-06",
  "Tom Big Döner":  "2026-08-08",
  "Hünkar":         "2026-08-08",
  "Köz Steinbock":  "2026-08-08",
  "Honest Kebab":   "2026-08-09",
  "Döner Queen":    "2026-08-13",
  "Wunder Döner":   "2026-08-13"
};

// Erfundene Bewertungen aus der Demo-Phase. Echte Betriebe mit erfundenen
// Noten und erfundenen Google-Zahlen — gehören nicht in eine App.
const DEMO = new Set([
  "Anatolia Grill", "Bosphorus Kebap", "Sultan's Kebap Haus", "Berlin Döner Wandsbek",
  "Kebap King Barmbek", "Ali Baba Kebap", "Efes Grillhaus", "Marmaris Döner"
]);

function slugify(input) {
  let s = input.toLowerCase();
  const map = { "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss", "ı": "i", "ş": "s",
                "ğ": "g", "â": "a", "é": "e", "è": "e", "ç": "c", "ï": "i" };
  for (const [from, to] of Object.entries(map)) s = s.split(from).join(to);
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-");
}

// Kurzes, stabiles Suffix aus den Koordinaten — nur nötig, wenn Name und
// Stadtteil einen Laden nicht eindeutig machen.
function coordSuffix(lat, lng) {
  const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(7, "0").slice(-4);
}

function metersBetween(a, b) {
  const R = 6371000;
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

// --- Altbestand laden -------------------------------------------------------
const src = fs.readFileSync(LEGACY, "utf8");
const ctx = {
  console,
  document: { addEventListener() {}, getElementById: () => null, querySelector: () => null },
  window: {}
};
vm.createContext(ctx);
vm.runInContext(`${src}\nthis.__D = DOENER_SHOPS; this.__U = UNTESTED_SHOPS; this.__T = MARTIN_TIPS;`, ctx);

const legacyTested = ctx.__D;
const legacyUntested = ctx.__U;
const tips = ctx.__T;

// --- Dubletten bereinigen ---------------------------------------------------
// Die Recherche-Liste entstand aus TomTom + OSM. Beim Zusammenführen sind ein
// paar Läden doppelt gelandet, und zu einem getesteten Laden existiert teils
// noch der alte, ungetestete Punkt derselben Adresse.
const removed = [];

// 1. Exakte Dubletten: gleicher Name, gleiche Koordinaten. Von zwei Einträgen
//    gewinnt der vollständigere — sonst gehen recherchierte Adressen verloren.
const richness = s => Object.values(s).filter(v => v !== null && v !== undefined).length;
const byFingerprint = new Map();
for (const s of legacyUntested) {
  const fp = `${s.name}|${s.lat.toFixed(6)},${s.lng.toFixed(6)}`;
  const existing = byFingerprint.get(fp);
  if (!existing) {
    byFingerprint.set(fp, s);
  } else {
    const [keep, drop] = richness(s) > richness(existing) ? [s, existing] : [existing, s];
    byFingerprint.set(fp, keep);
    removed.push({
      name: drop.name,
      grund: `exakte Dublette (behalten wurde die Version ${keep.address ? "mit" : "ohne"} Adresse)`
    });
  }
}
const uniqueUntested = [...byFingerprint.values()];

// 2. Ungetestete Punkte, die auf einem bereits getesteten Laden liegen.
//    Der getestete Eintrag gewinnt — er ist verifiziert.
const dedupedUntested = uniqueUntested.filter(u => {
  const covering = legacyTested.find(t => metersBetween(t, u) < 30);
  if (covering) {
    removed.push({ name: u.name, grund: `liegt auf "${covering.name}" (getestet)` });
    return false;
  }
  return true;
});

if (removed.length) {
  console.log(`${removed.length} Dubletten entfernt:`);
  for (const r of removed) console.log(`  - ${r.name} — ${r.grund}`);
}

// --- IDs vergeben -----------------------------------------------------------
const all = [
  ...legacyTested.map(s => ({ raw: s, tested: true })),
  ...dedupedUntested.map(s => ({ raw: s, tested: false }))
];

const byBase = new Map();
for (const e of all) {
  const base = slugify(e.raw.name);
  if (!byBase.has(base)) byBase.set(base, []);
  byBase.get(base).push(e);
}

for (const [base, group] of byBase) {
  if (group.length === 1) {
    group[0].id = base;
    continue;
  }
  // Reicht der Stadtteil zur Unterscheidung?
  const districts = group.map(e => slugify(e.raw.district || ""));
  const districtsWork = districts.every(Boolean) && new Set(districts).size === districts.length;
  for (const [i, e] of group.entries()) {
    e.id = districtsWork
      ? `${base}-${districts[i]}`
      : `${base}-${coordSuffix(e.raw.lat, e.raw.lng)}`;
  }
}

const seen = new Set();
for (const e of all) {
  if (seen.has(e.id)) throw new Error(`ID nicht eindeutig: ${e.id} (${e.raw.name})`);
  seen.add(e.id);
}

// --- Ins neue Schema überführen --------------------------------------------
const shops = all.map(({ raw, tested, id }) => {
  const shop = {
    id,
    name: raw.name,
    status: tested ? (DEMO.has(raw.name) ? "demo" : "tested") : "untested",
    location: {
      address: raw.address ?? null,
      plz: raw.plz ?? null,
      district: raw.district ?? null,
      lat: raw.lat,
      lng: raw.lng
    },
    // Redaktionelle Bewertung. Wird niemals von Geld beeinflusst.
    rating: tested ? {
      score: raw.martinRating,
      verdict: raw.verdict,
      testedBy: "martin",
      testedAt: TESTED_AT[raw.name] ?? null,
      note: raw.note,
      scorecard: null      // Die 6 Kriterien gibt es erst ab dem Team-Start
    } : null,
    // Fremddaten, klar getrennt von der eigenen Note.
    external: {
      googleRating: raw.googleRating ?? null,
      googleCount: raw.googleCount ?? null
    },
    media: {
      images: [],
      videoUrl: raw.videoUrl ?? null
    },
    // Community-Bewertungen kommen später und fließen NIE in rating.score ein.
    communityRating: null,
    tags: [],
    price: null,
    openingHours: null,
    contact: { phone: null, website: null },
    // Bezahlte Platzierung. Steuert ausschließlich Sichtbarkeit, nie die Reihenfolge.
    promotion: null
  };
  return shop;
});

shops.sort((a, b) => {
  const rank = { tested: 0, demo: 1, untested: 2 };
  return rank[a.status] - rank[b.status] || a.name.localeCompare(b.name, "de");
});

fs.mkdirSync("data", { recursive: true });
fs.writeFileSync("data/shops.json", JSON.stringify(shops, null, 2) + "\n");
fs.writeFileSync("data/tips.json", JSON.stringify(tips, null, 2) + "\n");

const counts = shops.reduce((acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }), {});
console.log("data/shops.json geschrieben:", JSON.stringify(counts));
console.log("data/tips.json geschrieben:", tips.length, "Tipps");

// --- Prüfliste: verdächtig nah beieinander, aber verschiedene Namen ---------
// Nicht automatisch löschen — können echte Nachbarn sein (Steindamm, Reeperbahn)
// oder derselbe Laden unter altem und neuem Namen. Braucht ein Auge vor Ort.
const suspicious = [];
for (let i = 0; i < shops.length; i++) {
  for (let j = i + 1; j < shops.length; j++) {
    const d = metersBetween(shops[i].location, shops[j].location);
    if (d < 20) {
      suspicious.push({
        abstand_m: Math.round(d),
        a: shops[i].name,
        b: shops[j].name,
        ids: [shops[i].id, shops[j].id]
      });
    }
  }
}
if (suspicious.length) {
  suspicious.sort((x, y) => x.abstand_m - y.abstand_m);
  fs.writeFileSync("data/pruefliste-dubletten.json", JSON.stringify(suspicious, null, 2) + "\n");
  console.log(`\n${suspicious.length} Paare zum Prüfen -> data/pruefliste-dubletten.json`);
}
