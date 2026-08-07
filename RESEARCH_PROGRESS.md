# Recherche-Fortschritt: Dönerläden Hamburg

Notiz für die nächste Session (Guthaben-Reset), damit wir direkt weitermachen
können ohne Kontext zu verlieren.

## Bereits erledigt (Stand: Commit 582e807)

- Stadtweite Recherche via TomTom `TURKISH_RESTAURANT`-POI-Kategorie über ein
  3x3-Grid ganz Hamburgs → 84 echte Läden mit Name/Adresse/PLZ/Koordinaten
  gefunden, dedupliziert und in `assets/js/doenermap.js` (`UNTESTED_SHOPS`)
  eingepflegt:
  - 58 davon haben einen bestehenden OSM-Punkt (nur Name+Koordinaten) um
    Adresse/PLZ/Bezirk angereichert (per ~60m-Näheabgleich).
  - 26 waren komplett neu und wurden hinzugefügt.
  - Insgesamt jetzt 311 Einträge in `UNTESTED_SHOPS`, davon 84 mit `plz`
    (= per PLZ-Suche auffindbar), Rest nur Kartenpunkt ohne PLZ.
  - 9 Einträge in `DOENER_SHOPS` (echt getestet, inkl. Sirali Kebab in
    Harburg/21073 mit echter Bewertung).

- **Harburg ist dadurch schon teilweise abgedeckt** (PLZ 21073 + 21149,
  Bezirk Hamburg-Harburg), u.a.: Cigköftem, Döner Treff Harburg, Dönerqueen,
  As Urfa Harburg, Hünkar, Köz Patara Restaurant, Bereket Grill,
  Köz Grill House, Öz Urfa. Plus Sirali Kebab (getestet).

## Nächster Schritt (User-Wunsch: "wir starten mit harburg")

Ziel: **gezielte, engmaschigere Nachrecherche speziell für den Bezirk
Harburg** (nicht nur den groben Stadt-Grid-Treffer), um Läden zu finden,
die das grobe 3x3-Grid übersehen hat. Bezirk Harburg umfasst die Stadtteile:
Harburg, Wilstorf, Eißendorf, Heimfeld, Marmstorf, Rönneburg, Langenbek,
Sinstorf, Neuland, Gut Moor, Neugraben-Fischbek, Hausbruch, Neuenfelde,
Francop, Cranz, Moorburg, Altenwerder.

### Konkrete Schritte für die Fortsetzung

1. TomTom-Verbindung prüfen/aktivieren (Connector war zuletzt getrennt).
2. `tomtom-area-search` mit `poiCategories: ["TURKISH_RESTAURANT"]`,
   leerer `query`, `limit: 100`, über eine engere BoundingBox nur für
   Bezirk Harburg (ungefähr `[[9.85, 53.50], [10.10, 53.38]]` — beidseitig
   etwas großzügiger fassen, ggf. in 2-4 Sub-Zellen splitten, falls >100
   Treffer in einer Zelle).
3. Ergebnisse gegen bereits vorhandene Einträge (die oben gelisteten
   Harburg-Läden + alle 311 `UNTESTED_SHOPS`-Koordinaten) per ~60m-Näheabgleich
   deduplizieren (gleiches Skript-Muster wie beim Stadt-Grid: siehe
   Scratchpad-Historie dieser Session — Python-Snippets mit `haversine()`).
4. Neue/angereicherte Einträge ins `UNTESTED_SHOPS`-Array in
   `assets/js/doenermap.js` einfügen (Format: `{ name, lat, lng, plz,
   district, address }`).
5. `node --check assets/js/doenermap.js` zur Syntaxprüfung.
6. Commit + Push auf `main`.
7. **Wichtig:** Der automatische IONOS-Deploy nach Push ist unzuverlässig
   (bekannter Bug, IONOS-seitig — lädt manchmal eine alte, falsche
   Artefakt-Version). Nach jedem Push manuell nachtriggern:
   - Warten bis der `d-nermap.hamburg-orchestration.yaml`-Build für den
     neuen Commit-SHA erfolgreich durchgelaufen ist.
   - Dann `deploy-to-ionos.yaml` per `workflow_dispatch` manuell auslösen
     mit `version: <voller 40-Zeichen-Commit-SHA>`,
     `project-id: b77e7fca-0a50-4808-9be9-a5e3a79e19b1`,
     `branch-id: 5ab257e2-3b29-430a-b3e5-cec88f0a93a3`,
     `deployment-ids: ["c2f2b373-a1b4-4079-8667-55f116d2b506"]`.
   - Erst dann ist der Push wirklich live auf https://dönermap.hamburg.

## Danach (weitere Stadtteile, falls gewünscht)

Nach Harburg ggf. denselben Ablauf für weitere Bezirke wiederholen
(Wandsbek, Eimsbüttel, Altona, Bergedorf, Nord, Mitte), jeweils mit
eigener, engerer BoundingBox statt nur dem groben Stadt-Grid — das dürfte
in dichter bebauten Stadtteilen zusätzliche Läden zutage fördern, die beim
ersten groben Durchlauf nicht in den Top-100-Treffern der jeweiligen
großen Grid-Zelle waren.
