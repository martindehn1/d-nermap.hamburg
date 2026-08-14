// Erzeugt die JSON-API, die die App liest — läuft auf demselben Webspace wie
// die Website, kein zusätzliches Hosting nötig. Aufruf: npm run build:api
//
// GET /api/v1/index.json        Kompakte Liste für Karte & Listen
// GET /api/v1/shops/<id>.json   Volle Detailseite, einzeln geladen
// GET /api/v1/meta.json         Version + Stand, für Cache-Invalidierung

import fs from "node:fs";

const OUT_DIR = "api/v1";
const shops = JSON.parse(fs.readFileSync("data/shops.json", "utf8"));
const tips = JSON.parse(fs.readFileSync("data/tips.json", "utf8"));

// Demo-Läden (erfundene Noten aus der Anfangszeit) gehören nicht in die App.
const appShops = shops.filter(s => s.status !== "demo");

fs.mkdirSync(`${OUT_DIR}/shops`, { recursive: true });

// --- index.json: nur was Karte/Listen brauchen, damit sie klein bleibt -----
const index = appShops.map(s => ({
  id: s.id,
  name: s.name,
  status: s.status,
  lat: s.location.lat,
  lng: s.location.lng,
  district: s.location.district,
  plz: s.location.plz,
  score: s.rating?.score ?? null,
  verdict: s.rating?.verdict ?? null,
  testedAt: s.rating?.testedAt ?? null,
  thumbnail: s.media.images[0]?.url ?? null,
  hasPromotion: Boolean(s.promotion?.active)
}));
fs.writeFileSync(`${OUT_DIR}/index.json`, JSON.stringify(index));

// --- shops/<id>.json: alles, für die Detailseite -----------------------
for (const s of appShops) {
  fs.writeFileSync(`${OUT_DIR}/shops/${s.id}.json`, JSON.stringify(s));
}

// --- meta.json ---------------------------------------------------------
fs.writeFileSync(
  `${OUT_DIR}/meta.json`,
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    shopCount: appShops.length,
    tips
  })
);

console.log(`${OUT_DIR}/: index.json (${index.length} Läden), ${appShops.length} Detail-Dateien, meta.json`);
