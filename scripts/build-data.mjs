// Erzeugt aus data/shops.json die Datei, die die Website lädt.
//
// Quelle der Wahrheit ist data/shops.json — assets/js/doenermap-data.js wird
// generiert und nie von Hand bearbeitet. Aufruf: npm run build:data
//
// In Phase 2 kommt hier die Erzeugung der JSON-API für die App dazu. Solange
// bleibt die Ausgabe bewusst identisch zu dem, was die Website vorher inline
// stehen hatte.

import fs from "node:fs";

const OUT = "assets/js/doenermap-data.js";

// Aus verdict abgeleitet statt gespeichert — die Zuordnung war in allen
// bisherigen Einträgen ohnehin eindeutig.
const VERDICT_LABEL = {
  good: "Top-Empfehlung",
  mid: "Solide",
  bad: "Nicht empfohlen"
};

// Demo-Einträge aus der Anfangszeit haben erfundene Noten und erfundene
// Google-Zahlen. Sie sind nirgends mehr sichtbar: erfundene Bewertungen
// verstoßen gegen Googles Spam-Richtlinien und haben die Startseite zu einem
// "alles nur Demo"-Hinweis gezwungen, der jedes Ranking verhindert hat.
// Auf true setzen holt sie auf die Website zurück.
const INCLUDE_DEMO_ON_WEBSITE = false;

const shops = JSON.parse(fs.readFileSync("data/shops.json", "utf8"));
const tips = JSON.parse(fs.readFileSync("data/tips.json", "utf8"));

const isReviewed = s => s.status === "tested" || (INCLUDE_DEMO_ON_WEBSITE && s.status === "demo");

const reviewed = shops.filter(isReviewed).map(s => {
  const entry = { id: s.id, name: s.name, district: s.location.district };
  if (s.location.address) entry.address = s.location.address;
  entry.plz = s.location.plz;
  entry.lat = s.location.lat;
  entry.lng = s.location.lng;
  entry.verdict = s.rating.verdict;
  entry.verdictLabel = VERDICT_LABEL[s.rating.verdict];
  entry.martinRating = s.rating.score;
  entry.googleRating = s.external.googleRating;
  entry.googleCount = s.external.googleCount;
  entry.note = s.rating.note;
  entry.videoUrl = s.media.videoUrl;
  return entry;
});

const untested = shops.filter(s => s.status === "untested").map(s => {
  const entry = { id: s.id, name: s.name, lat: s.location.lat, lng: s.location.lng };
  if (s.location.plz) {
    entry.plz = s.location.plz;
    entry.district = s.location.district;
    entry.address = s.location.address;
  }
  return entry;
});

const banner = `// GENERIERT — nicht von Hand bearbeiten.
// Quelle: data/shops.json  ·  Neu erzeugen: npm run build:data
// Stand: ${reviewed.length} bewertet, ${untested.length} recherchiert
`;

const out = [
  banner,
  `const DOENER_SHOPS = ${JSON.stringify(reviewed, null, 2)};`,
  "",
  `const UNTESTED_SHOPS = ${JSON.stringify(untested, null, 2)};`,
  "",
  `const MARTIN_TIPS = ${JSON.stringify(tips, null, 2)};`,
  ""
].join("\n");

fs.writeFileSync(OUT, out);
console.log(`${OUT}: ${reviewed.length} bewertet, ${untested.length} recherchiert, ${tips.length} Tipps`);
