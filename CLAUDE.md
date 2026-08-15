# Dönermap Hamburg

Martins Karte mit ehrlich getesteten Dönerläden in Hamburg. Live über IONOS
Deploy Now (GitHub Actions bauen und deployen automatisch bei jedem Push auf
`main`).

**Achtung:** Es gibt ein zweites Repo `martindehn1/socialfokus-website` für
die Agentur-Seite socialfokus.de. Die Dönermap gehört **nicht** dorthin.

## Aufbau

**Quelle der Wahrheit für alle Ladendaten ist `data/shops.json`.**

```
data/shops.json                <- hier wird bearbeitet
      │  npm run build   (data + api + seo)
      ▼
assets/js/doenermap-data.js    <- GENERIERT, nie von Hand anfassen
api/v1/*.json                  <- GENERIERT, die App liest von hier
laden/<id>/index.html          <- GENERIERT, eine SEO-Seite je Test
sitemap.xml, robots.txt        <- GENERIERT
index.html                     <- handgepflegt, ABER die Blöcke zwischen
                                  <!-- GENERATED:… --> werden überschrieben
assets/js/doenermap.js         <- nur Logik (Karte, Suche, Rendering)
```

Jeder Laden hat eine feste `id`, die **niemals geändert wird** — daran hängen
später Favoriten und Detailseiten der App.

`status` unterscheidet drei Sorten:

| Status | Bedeutung |
|---|---|
| `tested` | Echt getestet, echte Bewertung |
| `untested` | Recherchiert (TomTom/OSM), grauer Marker |
| `demo` | Alte Platzhalter mit **erfundenen** Noten und Google-Zahlen. Werden **nirgends mehr ausgespielt** — nicht auf der Website, nicht in der App, nicht in Sitemap oder Markup. Erfundene Bewertungen verstoßen gegen Googles Spam-Richtlinien. Schalter: `INCLUDE_DEMO_ON_WEBSITE` in `scripts/build-data.mjs`. |

Die Trennung von `rating` (redaktionell), `communityRating` (später von
Nutzern) und `promotion` (bezahlte Platzierung) ist Absicht: Geld darf die
Bewertung nie beeinflussen, und Nutzernoten fließen nie in Martins Note ein.

## Neue Bewertung eintragen

1. Prüfen, ob der Laden schon als `untested` in `data/shops.json` steht (grep
   nach Name oder Adresse). Falls ja: **denselben Eintrag umschreiben** —
   `id` und Koordinaten behalten, nur `status` und `rating` ergänzen. Die
   recherchierten Koordinaten sind geocodiert und genauer als geschätzte.
2. Falls der Laden neu ist, Eintrag anhängen. `id` = Name als Slug, Umlaute
   ausgeschrieben (z. B. `koez-steinbock`).

```jsonc
{
  "id": "laden-name",
  "name": "Laden Name",
  "status": "tested",
  "location": {
    "address": "Straße 24", "plz": "21073",
    "district": "Harburg", "lat": 53.460933, "lng": 9.979808
  },
  "rating": {
    "score": 8.5,
    "verdict": "good",            // good | mid | bad
    "testedBy": "martin",         // später auch Teammitglieder
    "testedAt": "2026-08-13",     // Testdatum, treibt "Neu getestet" in der App
    "note": "Martins Fließtext zur Bewertung.",
    "scorecard": null             // die 6 gewichteten Kriterien, sobald erhoben
  },
  "external": { "googleRating": null, "googleCount": null },
  "media": {
    "images": [],
    "videoUrl": "https://www.tiktok.com/@martin.dehn/video/..."
  },
  "communityRating": null,
  "tags": [],
  "price": null,                  // siehe "Preise" unten — nie eine nackte Zahl
  "openingHours": null,
  "contact": { "phone": null, "website": null },
  "promotion": null
}
```

3. `npm run build:data` ausführen — erzeugt die Datei, die die Website lädt.

`verdictLabel` wird aus `verdict` abgeleitet und **nicht** gespeichert.

### Preise

Dönerpreise steigen schnell — eine nackte Zahl wird irgendwann zur
Falschaussage. Deshalb nie ohne Beobachtungsdatum eintragen:

```jsonc
"price": {
  "doener": 7.50,
  "currency": "EUR",
  "observedAt": "2026-08-13",   // Pflicht
  "observedBy": "martin"        // martin | community
}
```

Das macht aus der Angabe eine dauerhaft wahre Aussage ("das hat er an dem
Tag gekostet") statt einer verfallenden ("das kostet er"). Richtwert für
die spätere Anzeige: unter 6 Monaten normal zeigen, darüber mit sichtbarem
Datum abschwächen, ab ca. 18 Monaten lieber gar nicht mehr anzeigen. In
ein "günstigster Döner"-Ranking dürfen nur frische Preise einfließen.

Keine Preise von Lieferplattformen übernehmen — die schlagen 13–30 %
Plattformgebühr auf den Ladenpreis auf, das wäre systematisch falsch.

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
- **Nichts erfinden.** Keine Google-Bewertung, keine Öffnungszeiten, keine
  Preise ohne Beleg — lieber `null` lassen. Erfundene Fremddaten über echte
  Betriebe sind rechtlich etwas ganz anderes als eine ehrliche Meinung.
- Nach dem Eintragen `npm run build && npm run check` laufen lassen. `build`
  zieht Website-Daten, App-API **und** SEO-Dateien nach — nur `build:data`
  reicht nicht mehr, sonst hinken Bestenliste, Ladenseiten und Sitemap
  hinterher.
- Commit auf `main` pushen. **Der automatische Deploy ist unzuverlässig**
  (IONOS-seitiger Fehler: lädt teils eine alte Artefakt-Version). Nach dem
  Push den Workflow `deploy-to-ionos.yaml` manuell mit dem vollen Commit-SHA
  als `version` auslösen, sonst ist die Änderung nicht wirklich live.

## SEO

Ziel ist Platz 1 für „bester Döner Hamburg". Was dafür automatisch aus
`data/shops.json` erzeugt wird, steht in `scripts/build-seo.mjs`:
Bestenliste und FAQ als echtes HTML (nicht per JS nachgeladen, damit Google
den Text sicher sieht), JSON-LD (`WebSite`, `ItemList`, `FAQPage`, je Laden
ein `Review`), eine eigene Seite je Test unter `/laden/<id>/`, Sitemap und
robots.txt.

Zwei Regeln, an denen nicht gerüttelt wird:

- **Nur echte Tests bekommen Review-Markup.** Kein `aggregateRating`, solange
  es je Laden genau eine Bewertung gibt — eine erfundene Bewertungsanzahl ist
  exakt das, wofür Google abstraft.
- **Kein „Demo"/„Platzhalter" im sichtbaren Text.** Eine Seite, die sich
  selbst als unfertig bezeichnet, rankt nicht.

Nach dem Deploy in der Google Search Console die Sitemap einreichen und die
Startseite per „URL-Prüfung → Indexierung beantragen" anstoßen.

## Weiteres

- `RESEARCH_PROGRESS.md` — Stand der Laden-Recherche nach Stadtteilen.
- `data/pruefliste-dubletten.json` — Läden, die verdächtig nah beieinander
  liegen. Können echte Nachbarn sein oder derselbe Laden unter zwei Namen;
  braucht eine Prüfung vor Ort, deshalb nicht automatisch gelöscht.
- `scripts/migrate-to-json.mjs` — Einmal-Skript der Umstellung von
  einkompilierten Arrays auf `data/shops.json`. Wird nicht mehr gebraucht,
  dokumentiert aber, wie die IDs entstanden sind.
