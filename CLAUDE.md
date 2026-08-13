# Dönermap Hamburg

Martins Karte mit ehrlich getesteten Dönerläden in Hamburg. Live über IONOS
Deploy Now (GitHub Actions bauen und deployen automatisch bei jedem Push auf
`main`).

**Achtung:** Es gibt ein zweites Repo `martindehn1/socialfokus-website` für
die Agentur-Seite socialfokus.de. Die Dönermap gehört **nicht** dorthin.

## Aufbau

Alles Wesentliche steckt in `assets/js/doenermap.js`:

- `DOENER_SHOPS` — von Martin **getestete** Läden mit Bewertung. Nur hier
  stehen echte Bewertungen.
- `UNTESTED_SHOPS` — recherchierte Standorte ohne Bewertung (~300 Stück, aus
  TomTom/OSM). Erscheinen als graue Marker mit "Noch nicht getestet".
- `MARTIN_TIPS` — Tipps für die Tipp-Box.

## Neue Bewertung eintragen

1. Prüfen, ob der Laden schon in `UNTESTED_SHOPS` steht (`grep` nach Name oder
   Adresse). Falls ja: **dort entfernen** und die bereits recherchierten
   Koordinaten übernehmen — die sind geocodiert und genauer als geschätzte.
2. Eintrag am Ende von `DOENER_SHOPS` anhängen:

```js
{
  name: "Laden Name",
  district: "Harburg",
  address: "Straße 24",
  plz: "21073",
  lat: 53.460933, lng: 9.979808,
  verdict: "good",              // good | mid | bad
  verdictLabel: "Top-Empfehlung", // Top-Empfehlung | Solide | Nicht empfohlen
  martinRating: 8.5,
  googleRating: null,           // null -> zeigt "folgt"
  googleCount: null,
  note: "Martins Fließtext zur Bewertung.",
  videoUrl: "https://www.tiktok.com/@martin.dehn/video/..."
}
```

### Verdict-Stufen

Richtwerte aus den bisherigen Einträgen: ab ca. 8.0 `good`, um 7 herum `mid`,
5 und darunter `bad`.

### Comic-Figuren

Die Martin-Comic-Figur wird **automatisch** aus `verdict` abgeleitet — nie
manuell pro Laden setzen. Drei Varianten desselben Bildes je Zustand:

| Konstante | Verwendung |
|---|---|
| `VERDICT_FIGURE` | Badge in der Ladenkarte |
| `VERDICT_FACE` | Marker auf der Karte |
| `VERDICT_FULL_FIGURE` | Ganze Figur im Karten-Popup |

`good` → Daumen hoch, `mid` → zeigt zur Seite, `bad` → kritischer Tester.
Die PNGs liegen in `assets/img/martin/`.

## Konventionen

- Videolinks ohne Tracking-Parameter speichern (alles ab `?` abschneiden).
- Keine Google-Bewertung erfinden — `googleRating: null` lassen, bis eine
  echte Zahl vorliegt.
- Nach dem Eintragen `node --check assets/js/doenermap.js` laufen lassen.
- Commit auf `main` pushen, dann ist es nach ca. 2 Minuten live.

## Weiteres

`RESEARCH_PROGRESS.md` hält den Stand der Laden-Recherche fest (welche
Stadtteile schon abgegrast sind).
