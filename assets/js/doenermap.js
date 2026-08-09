/* ==========================================================================
   Dönermap Hamburg — Demo-Daten & Karte
   Alle Läden, Bewertungen und PLZ unten sind Platzhalter-Beispieldaten,
   bis echte Standorte + Videos + Google-Bewertungen eingepflegt sind.
   ========================================================================== */

const DOENER_SHOPS = [
  {
    name: "Anatolia Grill",
    district: "St. Pauli",
    plz: "20359",
    lat: 53.5578, lng: 9.9673,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 9.2,
    googleRating: 4.6,
    googleCount: 812,
    note: "Fleisch top gewürzt, Brot frisch aus dem Ofen. Eine der besten Soßen der Stadt.",
    videoUrl: null
  },
  {
    name: "Bosphorus Kebap",
    district: "Altona",
    plz: "22767",
    lat: 53.5511, lng: 9.9349,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 8.8,
    googleRating: 4.4,
    googleCount: 501,
    note: "Sehr großzügig belegt, faires Preis-Leistungs-Verhältnis.",
    videoUrl: null
  },
  {
    name: "Sultan's Kebap Haus",
    district: "Eimsbüttel",
    plz: "20255",
    lat: 53.5738, lng: 9.9599,
    verdict: "mid",
    verdictLabel: "Solide",
    martinRating: 6.9,
    googleRating: 4.1,
    googleCount: 344,
    note: "In Ordnung, aber nichts Besonderes. Brot könnte frischer sein.",
    videoUrl: null
  },
  {
    name: "Berlin Döner Wandsbek",
    district: "Wandsbek",
    plz: "22041",
    lat: 53.5773, lng: 10.0821,
    verdict: "mid",
    verdictLabel: "Solide",
    martinRating: 6.5,
    googleRating: 3.9,
    googleCount: 210,
    note: "Ok für zwischendurch, Soße geht besser.",
    videoUrl: null
  },
  {
    name: "Kebap King Barmbek",
    district: "Barmbek",
    plz: "22081",
    lat: 53.5897, lng: 10.0362,
    verdict: "bad",
    verdictLabel: "Nicht empfohlen",
    martinRating: 3.4,
    googleRating: 3.2,
    googleCount: 156,
    note: "Fleisch trocken, lange Wartezeit trotz wenig los. Da geht mehr in Hamburg.",
    videoUrl: null
  },
  {
    name: "Ali Baba Kebap",
    district: "HafenCity",
    plz: "20457",
    lat: 53.5423, lng: 9.9993,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 8.5,
    googleRating: 4.5,
    googleCount: 389,
    note: "Überraschend gut für die Touri-Lage. Lammfleisch ist die Wahl hier.",
    videoUrl: null
  },
  {
    name: "Efes Grillhaus",
    district: "Winterhude",
    plz: "22303",
    lat: 53.5934, lng: 10.0057,
    verdict: "bad",
    verdictLabel: "Nicht empfohlen",
    martinRating: 4.1,
    googleRating: 3.4,
    googleCount: 98,
    note: "Zu viel Soße, zu wenig Fleisch. Für den Preis nicht gerechtfertigt.",
    videoUrl: null
  },
  {
    name: "Marmaris Döner",
    district: "Ottensen",
    plz: "22765",
    lat: 53.5502, lng: 9.9159,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 9.0,
    googleRating: 4.7,
    googleCount: 623,
    note: "Hausgemachtes Brot, perfekt gewürztes Fleisch. Klarer Geheimtipp.",
    videoUrl: null
  },
  {
    name: "Sirali Kebab",
    district: "Harburg",
    address: "Lüneburger Str. 20",
    plz: "21073",
    // Koordinaten via TomTom-Geocoding (exakter Treffer auf die Adresse)
    lat: 53.458507, lng: 9.98317,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 9.0,
    googleRating: null,
    googleCount: null,
    note: "Martins Favorit in Harburg",
    videoUrl: "https://www.tiktok.com/@martin.dehn/video/7459499375107083542"
  },
  {
    name: "Tom Big Döner",
    district: "St. Pauli",
    address: "Reeperbahn 96",
    plz: "20359",
    lat: 53.5498, lng: 9.96,
    verdict: "mid",
    verdictLabel: "Solide",
    martinRating: 7.0,
    googleRating: null,
    googleCount: null,
    note: "Soße war etwas sauer, Preis touristentypisch — ok, aber auch nicht günstig. Verkauft eher auf Masse, entsprechend voll.",
    videoUrl: "https://vm.tiktok.com/ZGdxSSFA3/"
  },
  {
    name: "Hünkar",
    district: "Harburg",
    address: "Schloßmühlendamm 14",
    plz: "21073",
    lat: 53.462089, lng: 9.982067,
    verdict: "bad",
    verdictLabel: "Nicht empfohlen",
    martinRating: 5.0,
    googleRating: null,
    googleCount: null,
    note: "Hünkar-Soße ist extrem lecker, aber Preis-Leistung überhaupt nicht gut — viel zu teuer für viel zu wenig, kaum Fleisch, kaum Salat. Highlight: Man kann dort gut sitzen.",
    videoUrl: "https://vm.tiktok.com/ZGdxSkrLk/"
  },
  {
    name: "Köz Steinbock",
    district: "Altona-Altstadt",
    address: "Reeperbahn 145",
    plz: "20359",
    lat: 53.5495, lng: 9.9565,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 8.0,
    googleRating: null,
    googleCount: null,
    note: "Sehr freundliches Personal, klare Empfehlung als Döner auf der Reeperbahn — leider etwas teurer.",
    videoUrl: null
  },
  {
    name: "Honest Kebab",
    district: "Altstadt",
    address: "Ballindamm 40 (Europapassage)",
    plz: "20095",
    lat: 53.55147, lng: 9.996323,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 8.2,
    googleRating: null,
    googleCount: null,
    note: "Für den Touri-Hotspot Nummer 1 in Hamburg überraschend gut, auch wenn es kein \"richtiger\" Döner ist — zu viel gepimpt. Brot ist brutal lecker, die Idee dahinter gut, Qualität stimmt, nur die Zusammenstellung ist nicht jedermanns Geschmack. Für den Preis bekommt man aber zu wenig. Beim Bezahlen hakte es: Personal kommunizierte nicht richtig mit der Bar wegen Kartenzahlung, 20 Minuten umsonst angestanden — wirkte insgesamt etwas gestresst.",
    videoUrl: "https://www.instagram.com/reels/DSXqJukjeP5/"
  }
];

// Standorte aus einer alten, offenen Döner-Karten-Quelle (Name + Koordinaten via OSM) plus
// Recherche via TomTom (echte Adresse/PLZ) — noch nicht von Martin getestet/bewertet.
// Einträge mit "plz" sind auch über die PLZ-Suche unten auffindbar, Einträge ohne "plz"
// erscheinen nur als Punkt auf der Karte, bis die Adresse recherchiert ist.
const UNTESTED_SHOPS = [
  { name: "Dulsberg Kebap Döner Haus", lat: 53.58173, lng: 10.065162, plz: "22049", district: "Dulsberg", address: "Straßburger Straße 42" },
  { name: "The Döner", lat: 53.579973, lng: 10.081779, plz: "22041", district: "Wandsbek", address: "Holzmühlenstraße 27" },
  { name: "Kumpir & Döner", lat: 53.573864, lng: 10.071814, plz: "22041", district: "Wandsbek", address: "Wandsbeker Marktstraße 164" },
  { name: "Dr. Kebap", lat: 53.571484, lng: 10.064292, plz: "22041", district: "Wandsbek", address: "Wandsbeker Marktstraße 47" },
  { name: "Kebab Zone", lat: 53.576376, lng: 10.058247 },
  { name: "BARIS Grillhaus", lat: 53.572832, lng: 10.069257 },
  { name: "Döner Time", lat: 53.569906, lng: 10.05923 },
  { name: "Köz Adana", lat: 53.570975, lng: 10.061461, plz: "22041", district: "Wandsbek", address: "Wandsbeker Marktstraße 9" },
  { name: "TONNDORF GRILL DÖNER IMBISS", lat: 53.580078, lng: 10.103909, plz: "22045", district: "Tonndorf", address: "Ahrensburger Straße 105" },
  { name: "Arda Restaurant", lat: 53.579889, lng: 10.10307 },
  { name: "Döner Wandsbek", lat: 53.432378, lng: 9.990426 },
  { name: "23sarcon döner", lat: 53.575935, lng: 10.13468 },
  { name: "Hamburg Döner", lat: 53.572337, lng: 10.136719 },
  { name: "Heisse Ecke", lat: 53.607932, lng: 10.116991 },
  { name: "Ardacan Grillhaus", lat: 53.607191, lng: 10.118167 },
  { name: "Köz Adana Farmsen", lat: 53.60642, lng: 10.1189 },
  { name: "Balat Döner - Wandsbek-Gartenstadt", lat: 53.592358, lng: 10.07544 },
  { name: "Berne Kebap Haus", lat: 53.625347, lng: 10.138726 },
  { name: "Dö Back", lat: 53.626347, lng: 10.139222 },
  { name: "Tunnel Döner", lat: 53.551598, lng: 10.006264 },
  { name: "Havin Grill", lat: 53.552225, lng: 10.00615 },
  { name: "Salli's", lat: 53.553609, lng: 10.006495 },
  { name: "Tunnel Döner in der Hauptbahnhofs Halle", lat: 53.553809, lng: 10.008307 },
  { name: "Sallis Döner Grill & Bäckerei", lat: 53.552992, lng: 10.008928 },
  { name: "SoulKEBAB", lat: 53.552031, lng: 10.011102 },
  { name: "Köz Ocakbasi", lat: 53.552796, lng: 10.010975, plz: "20099", district: "Sankt Georg", address: "Steindamm 5" },
  { name: "As Urfa Kebap Restaurant", lat: 53.553591, lng: 10.011615, plz: "20099", district: "Sankt Georg", address: "Steindamm 19" },
  { name: "Saray Köz", lat: 53.553759, lng: 10.013562 },
  { name: "Batman Restaurant", lat: 53.554245, lng: 10.014496, plz: "20099", district: "Sankt Georg", address: "Steindamm 62" },
  { name: "Ankara Kebap Tantuni", lat: 53.554475, lng: 10.015591, plz: "20099", district: "Sankt Georg", address: "Böckmannstraße 26" },
  { name: "Sait Grillhaus", lat: 53.552746, lng: 10.010863 },
  { name: "Köz Istanbul", lat: 53.552991, lng: 10.010497 },
  { name: "Baris Grillhaus", lat: 53.555836, lng: 10.008727 },
  { name: "Miss Döner", lat: 53.556772, lng: 10.010634 },
  { name: "döner time", lat: 53.55296, lng: 10.02249, plz: "20097", district: "Sankt Georg", address: "Beim Strohhause 24" },
  { name: "HBB Store Schnell-Imbiss", lat: 53.553713, lng: 10.024416 },
  { name: "Wenden Kebab", lat: 53.549902, lng: 10.035691 },
  { name: "DER URFA DÖNER", lat: 53.560738, lng: 10.038124 },
  { name: "Sphinx Döner Landwehr", lat: 53.561506, lng: 10.03737 },
  { name: "Döner &Pommes Paradies", lat: 53.561928, lng: 10.031688 },
  { name: "Haji Baba Kebab House", lat: 53.595608, lng: 9.967989 },
  { name: "Öz Urfa Kebap Haus", lat: 53.554821, lng: 10.014354 },
  { name: "Lades Holzkohlegrill Restaurant Hamburg", lat: 53.554646, lng: 10.015315 },
  { name: "Afiyet", lat: 53.554254, lng: 10.016602 },
  { name: "Perle Döner", lat: 53.552099, lng: 9.999843 },
  { name: "Ali's Gemüsekebab", lat: 53.55147, lng: 9.996323 },
  { name: "Arin Kebap", lat: 53.554874, lng: 9.989217 },
  { name: "Hamza Kebab", lat: 53.557389, lng: 9.989098 },
  { name: "Kardelen Restaurant", lat: 53.550863, lng: 9.98238 },
  { name: "Mardin Döner", lat: 53.548369, lng: 9.988832 },
  { name: "Rödings Döner", lat: 53.547891, lng: 9.987124 },
  { name: "Adana Grill", lat: 53.574879, lng: 10.039944, plz: "22081", district: "Barmbek-Süd", address: "Holsteinischer Kamp 30" },
  { name: "Kebo Döner", lat: 53.579235, lng: 10.041648 },
  { name: "Citir Döner", lat: 53.582551, lng: 9.970675 },
  { name: "Fuhle Grill", lat: 53.588921, lng: 10.046008 },
  { name: "Beydagi Kebap", lat: 53.593337, lng: 10.052339 },
  { name: "Sato Grill Imbiss", lat: 53.606654, lng: 10.011909 },
  { name: "kebab kitchen", lat: 53.60186, lng: 10.041249 },
  { name: "Nefis Döner", lat: 53.618689, lng: 10.07956, plz: "22177", district: "Bramfeld", address: "Bramfelder Chaussee 323" },
  { name: "Edo Dönerhaus Hamburg", lat: 53.617018, lng: 10.078181 },
  { name: "Eatstanbul döner lounge", lat: 53.613962, lng: 10.075619 },
  { name: "Kebap Lounge Winterhude", lat: 53.595037, lng: 9.999481 },
  { name: "Kaya Salat&Feinkost | Bramfeld", lat: 53.612227, lng: 10.078418 },
  { name: "Der Ali", lat: 53.610526, lng: 10.060061 },
  { name: "Döner Grillhaus Hamburg", lat: 53.582898, lng: 9.948413, plz: "20255", district: "Lokstedt", address: "Eidelstedter Weg 68" },
  { name: "BERLIN DÖNER KIOSK", lat: 53.608182, lng: 10.057303 },
  { name: "Sultans Kitchen", lat: 53.601804, lng: 10.062321 },
  { name: "Langenfelde Grill Döner Pizza Burger", lat: 53.579983, lng: 9.931551, plz: "22525", district: "Stellingen", address: "Försterweg 14" },
  { name: "Dönerqueen", lat: 53.585397, lng: 10.026568 },
  { name: "Ess-Bahn Döner", lat: 53.603576, lng: 9.893143, plz: "22523", district: "Eidelstedt", address: "Elbgaustraße 104" },
  { name: "Firat Kebap", lat: 53.579866, lng: 10.031137 },
  { name: "Sert Grill Imbiss Schnellimbiss", lat: 53.5773, lng: 10.020296 },
  { name: "King's Döner", lat: 53.608461, lng: 9.90282 },
  { name: "Grill House", lat: 53.45632, lng: 9.962221 },
  { name: "Döner Pavillon", lat: 53.632795, lng: 9.911348 },
  { name: "LIMON", lat: 53.581068, lng: 10.012399, plz: "22303", district: "Winterhude", address: "Mühlenkamp 18" },
  { name: "Cigköftem", lat: 53.570812, lng: 9.861522 },
  { name: "My Kebap's", lat: 53.581562, lng: 10.013108 },
  { name: "Dubara", lat: 53.584735, lng: 10.024918 },
  { name: "Elbe Kebap House", lat: 53.572042, lng: 9.863269 },
  { name: "Stadtpark Grill Haus", lat: 53.590486, lng: 10.015305 },
  { name: "Leckerbissen", lat: 53.5959, lng: 9.913242 },
  { name: "King Döner", lat: 53.564095, lng: 10.036561 },
  { name: "Idol Döner Pizzeria Hamburg", lat: 53.569396, lng: 10.055213 },
  { name: "Hammer Döner", lat: 53.56433, lng: 10.05694, plz: "20535", district: "Hamm", address: "Marienthaler Straße 149" },
  { name: "Döner Kurve", lat: 53.591299, lng: 9.921186 },
  { name: "Safi Food", lat: 53.570575, lng: 10.059924 },
  { name: "Stellingen Döner Kebap", lat: 53.591299, lng: 9.921186 },
  { name: "Sultan's Döner-Imbiss", lat: 53.564661, lng: 10.057067 },
  { name: "Delal Döner", lat: 53.603853, lng: 9.891928 },
  { name: "Hazar Grill Hamburg", lat: 53.557897, lng: 10.046477, plz: "20535", district: "Hamm", address: "Carl-Petersen-Straße 74" },
  { name: "Harput Grill & Döner", lat: 53.55376, lng: 10.065319 },
  { name: "DIYAR CIG KÖFTE KEBAP GRILL", lat: 53.598057, lng: 9.86213 },
  { name: "Bereket Döner", lat: 53.553976, lng: 10.086122, plz: "22119", district: "Horn", address: "Hermannstal 12" },
  { name: "Volkan's Grillhaus Horn", lat: 53.553899, lng: 10.085171, plz: "22111", district: "Horn", address: "Rennbahnstraße 38" },
  { name: "Salman Imbiss", lat: 53.551936, lng: 9.929526, plz: "22765", district: "Ottensen", address: "Ottenser Hauptstraße 34" },
  { name: "Ates Grill Haus Döner & mehr...", lat: 53.554123, lng: 10.086037 },
  { name: "Schato Döner", lat: 53.546627, lng: 10.092854 },
  { name: "Mis Döner & Pizzeria", lat: 53.551558, lng: 10.094844 },
  { name: "Yaprak Döner", lat: 53.543063, lng: 10.096012 },
  { name: "Tadim", lat: 53.541728, lng: 10.098282 },
  { name: "CHICKEN ZONE & KEBAB ZONE", lat: 53.540312, lng: 10.102485, plz: "22111", district: "Billstedt", address: "Billstedter Hauptstraße 53" },
  { name: "Döner Company", lat: 53.552205, lng: 9.930557 },
  { name: "Center Döner", lat: 53.5399, lng: 10.103339, plz: "22111", district: "Billstedt", address: "Möllner Landstraße 3" },
  { name: "osdorfer pizza grillhaus", lat: 53.588245, lng: 9.849132 },
  { name: "Döner Capitol", lat: 53.542393, lng: 10.107724 },
  { name: "Soulkebap Lurup", lat: 53.591746, lng: 9.87283, plz: "22547", district: "Lurup", address: "Luruper Hauptstraße 138" },
  { name: "Döner&Pizza 23", lat: 53.529033, lng: 10.14961 },
  { name: "Ellerbek Classic Döner", lat: 53.64121, lng: 9.889764 },
  { name: "Artemis", lat: 53.529597, lng: 10.149191 },
  { name: "Schnelsener Kebap House", lat: 53.6362, lng: 9.917201 },
  { name: "Deniz Kebap Haus", lat: 53.527091, lng: 10.149856 },
  { name: "Onkel Döner", lat: 53.646994, lng: 9.909155 },
  { name: "West Grill - Döner", lat: 53.493904, lng: 10.17912 },
  { name: "City Döner & Pizza", lat: 53.640687, lng: 9.947865 },
  { name: "Hummels Döner", lat: 53.641382, lng: 10.037302 },
  { name: "Premium Bistro", lat: 53.641312, lng: 9.949516 },
  { name: "Abi's Grill", lat: 53.544294, lng: 10.145583 },
  { name: "Affenfelsen Burger", lat: 53.634541, lng: 9.953939 },
  { name: "Ocakbasi 27 Imbiss", lat: 53.538229, lng: 10.123409 },
  { name: "Güney Döner", lat: 53.63899, lng: 10.028391 },
  { name: "Sunar Kebap Haus", lat: 53.560063, lng: 10.107883 },
  { name: "Tat Köz Grill", lat: 53.570565, lng: 10.140729 },
  { name: "Bizim Döner Wellingsbüttel", lat: 53.640986, lng: 10.082829 },
  { name: "Brothers Kebap Haus", lat: 53.493904, lng: 10.17912 },
  { name: "König Döner", lat: 53.655585, lng: 10.093186 },
  { name: "Bereket Döner", lat: 53.48688, lng: 10.180027 },
  { name: "Mega Döner", lat: 53.650182, lng: 10.162759 },
  { name: "Sis Kebap Hamburg", lat: 53.481915, lng: 10.209302, plz: "21029", district: "Bergedorf", address: "Curslacker Neuer Deich 31" },
  { name: "Med Kebap", lat: 53.489651, lng: 10.20874 },
  { name: "City Döner", lat: 53.490076, lng: 10.208648, plz: "21029", district: "Bergedorf", address: "Alte Holstenstraße 56" },
  { name: "Pamukkale Grill & Restaurant", lat: 53.490034, lng: 10.208781 },
  { name: "Bizim Döner Volksdorf", lat: 53.648764, lng: 10.167268 },
  { name: "Pamukkale Grill & Backshop", lat: 53.489975, lng: 10.206372 },
  { name: "Mein Döner", lat: 53.632942, lng: 10.055143 },
  { name: "Big Food Grill", lat: 53.491406, lng: 10.207453 },
  { name: "LA FE Langenhorner Feinkost", lat: 53.649751, lng: 10.013377 },
  { name: "Urfalim Döner", lat: 53.503173, lng: 10.205833 },
  { name: "Mis Kebap", lat: 53.508831, lng: 10.186123 },
  { name: "Boberg Döner Pizza Haus", lat: 53.515307, lng: 10.166631 },
  { name: "Antalya Döner", lat: 53.444458, lng: 10.22947, plz: "21039", district: "Neuengamme", address: "Neuengammer Hausdeich 215" },
  { name: "Kaya Salat & Feinkost", lat: 53.648741, lng: 10.012925 },
  { name: "Heidberg Döner", lat: 53.674703, lng: 10.026886 },
  { name: "Restaurant Reina", lat: 53.649752, lng: 10.013884 },
  { name: "Köz Bingöl Restaurant", lat: 53.678242, lng: 10.000422 },
  { name: "Döner Point", lat: 53.515165, lng: 9.987055 },
  { name: "Best Urfa", lat: 53.550341, lng: 10.000654 },
  { name: "Döner Center", lat: 53.501896, lng: 10.008854 },
  { name: "Binboga Kebap Haus", lat: 53.510646, lng: 9.987008 },
  { name: "Mina Imbiss (S-Bahnhof Wilhelmsburg)", lat: 53.497851, lng: 10.006685 },
  { name: "Pause Eminönü", lat: 53.51727, lng: 9.987292 },
  { name: "Furkaan Imbiss", lat: 53.492839, lng: 10.013311 },
  { name: "Dock8 Döner", lat: 53.465627, lng: 9.989121 },
  { name: "Köz Ocakbasi", lat: 53.461256, lng: 9.978368 },
  { name: "Döner Treff Harburg", lat: 53.460418, lng: 9.978446, plz: "21073", district: "Harburg", address: "Am Centrumshaus 5" },
  { name: "Bereket Grill", lat: 53.461003, lng: 9.979276, plz: "21073", district: "Harburg", address: "Harburger Ring 28" },
  { name: "Döner Queen Kalender", lat: 53.460933, lng: 9.979808, plz: "21073", district: "Harburg", address: "Harburger Ring 24" },
  { name: "Wunder Döner", lat: 53.460722, lng: 9.981776 },
  { name: "Dubara Harburg", lat: 53.46104, lng: 9.983094 },
  { name: "Döner Royal", lat: 53.459584, lng: 9.982041 },
  { name: "Delikato Döner", lat: 53.457514, lng: 9.985198 },
  { name: "ZAZA KING Döner und Pizzeria", lat: 53.457045, lng: 9.985955, plz: "21073", district: "Harburg", address: "Moorstraße 2" },
  { name: "BOSPORUS LOUNGE", lat: 53.456275, lng: 9.986693 },
  { name: "Mis Tantuni & Döner", lat: 53.455515, lng: 9.986854 },
  { name: "Özlem Köfte Hamburg", lat: 53.455265, lng: 9.987063 },
  { name: "Kaya Döner", lat: 53.440011, lng: 9.989092 },
  { name: "Star Döner", lat: 53.441051, lng: 9.959708 },
  { name: "Elbdöner", lat: 53.458035, lng: 9.966007 },
  { name: "Uni-Grillhouse", lat: 53.460102, lng: 9.975369 },
  { name: "Döner Connection", lat: 53.464743, lng: 9.964242 },
  { name: "Döner & Getränkewelt", lat: 53.552268, lng: 9.930491 },
  { name: "URFA TADI", lat: 53.552657, lng: 9.93017 },
  { name: "Hatay Grill Imbiss", lat: 53.465352, lng: 9.96219 },
  { name: "Neugrabener Grillhouse", lat: 53.46991, lng: 9.853932 },
  { name: "Bey Kebab", lat: 53.552886, lng: 9.929647 },
  { name: "Salli‘s Kebap & Grill", lat: 53.552524, lng: 9.934374, plz: "22765", district: "Altona-Nord", address: "Scheel-Plessen-Straße 19" },
  { name: "Tosun", lat: 53.55241, lng: 9.933389 },
  { name: "Big Döner House", lat: 53.471264, lng: 9.854074 },
  { name: "ÖZ URFA", lat: 53.472872, lng: 9.853278, plz: "21149", district: "Neugraben-Fischbek", address: "Cuxhavener Straße 342" },
  { name: "Dilay Döner", lat: 53.552949, lng: 9.931501 },
  { name: "Köz Urfa", lat: 53.552591, lng: 9.936314 },
  { name: "Köz Ach Der Deniz Hamburg", lat: 53.474908, lng: 9.875714 },
  { name: "Nasip Grill", lat: 53.554872, lng: 9.928427 },
  { name: "Dream Döner", lat: 53.479351, lng: 9.874692 },
  { name: "Diyar´s Döner Kebap & Backshop", lat: 53.480069, lng: 9.875059 },
  { name: "KÖZ GRİLL HOUSE", lat: 53.472244, lng: 9.889265, plz: "21149", district: "Hausbruch", address: "Cuxhavener Straße 142" },
  { name: "Toros TANTUNI", lat: 53.555014, lng: 9.928429 },
  { name: "Tarsusi - anatolian street food", lat: 53.555697, lng: 9.928318 },
  { name: "Salli Salman", lat: 53.522783, lng: 10.014234 },
  { name: "Schippels Döner", lat: 53.634284, lng: 9.953497 },
  { name: "Dönerei", lat: 53.534303, lng: 10.038871 },
  { name: "Der Kebap", lat: 53.536713, lng: 10.033745, plz: "20539", district: "Rothenburgsort", address: "Billhorner Röhrendamm 94" },
  { name: "Der Simo", lat: 53.536441, lng: 10.033306, plz: "20539", district: "Rothenburgsort", address: "Billhorner Mühlenweg 19A" },
  { name: "myKöz", lat: 53.536421, lng: 10.034316 },
  { name: "Döner Kitchen", lat: 53.538804, lng: 10.042566 },
  { name: "WaRé Imbiss", lat: 53.54046, lng: 10.042118 },
  { name: "Sultan's Kebab", lat: 53.54613, lng: 10.024506 },
  { name: "Aras Kebab Döner", lat: 53.548612, lng: 10.013642, plz: "20097", district: "Hammerbrook", address: "Spaldingstraße 55" },
  { name: "Reeperbahn 5, 20359 Hamburg", lat: 53.550358, lng: 9.967372, plz: "20359", district: "Sankt Pauli", address: "Reeperbahn 5" },
  { name: "Kebab Dream", lat: 53.604935, lng: 10.155119 },
  { name: "Köz-Antep", lat: 53.552164, lng: 9.964059 },
  { name: "Döner Factory", lat: 53.549273, lng: 9.962227 },
  { name: "Döner Welt Getränke Welt", lat: 53.549195, lng: 9.961102 },
  { name: "Antep Gülbaba Köz", lat: 53.54937, lng: 9.958988 },
  { name: "Reeperbahn Döner", lat: 53.549514, lng: 9.959444 },
  { name: "Mardin Döner", lat: 53.549725, lng: 9.960675 },
  { name: "Kiez Döner", lat: 53.549833, lng: 9.958224 },
  { name: "Döner Freiheit", lat: 53.550574, lng: 9.957471 },
  { name: "Deniz Imbiss - Döner & Pizza", lat: 53.550631, lng: 9.958876 },
  { name: "Berg Grill Imbiss", lat: 53.54952, lng: 9.96136 },
  { name: "Babanin Yeri", lat: 53.553018, lng: 9.958219, plz: "22767", district: "Sankt Pauli", address: "Paul-Roosen-Straße 21" },
  { name: "Pauli Döner", lat: 53.55599, lng: 9.962556, plz: "20359", district: "Sankt Pauli", address: "Wohlwillstraße 54" },
  { name: "Bunker Döner", lat: 53.557474, lng: 9.969933, plz: "20357", district: "Sankt Pauli", address: "Feldstrasse 32" },
  { name: "Big Food Imbiss", lat: 53.559689, lng: 9.963593 },
  { name: "Kebaba Dein Dönermann", lat: 53.562105, lng: 9.963157, plz: "20357", district: "Sternschanze", address: "Susannenstraße 10" },
  { name: "Pamukkale Köz Schanze", lat: 53.562753, lng: 9.964602 },
  { name: "Schanzen Döner", lat: 53.563993, lng: 9.965241 },
  { name: "Soulkebab Schanze", lat: 53.564568, lng: 9.965335 },
  { name: "Sallis", lat: 53.567836, lng: 9.969286 },
  { name: "Ali's Döner To-Go", lat: 53.567501, lng: 9.980242, plz: "20146", district: "Rotherbaum", address: "Grindelallee 87" },
  { name: "UNI DÖNER", lat: 53.567199, lng: 9.981268 },
  { name: "Campus Döner", lat: 53.56704, lng: 9.981448 },
  { name: "Tuana Döner und mehr", lat: 53.567693, lng: 9.987724 },
  { name: "Doy Doy Kebap House", lat: 53.579946, lng: 9.966734 },
  { name: "Grill Center", lat: 53.579445, lng: 9.945435 },
  { name: "S&S Grill", lat: 53.58308, lng: 9.966499 },
  { name: "Sel Kebap's", lat: 53.584138, lng: 9.968661 },
  { name: "Okay Grill", lat: 53.577589, lng: 9.942056 },
  { name: "Kalkan Döner Kebap", lat: 53.576142, lng: 9.94964 },
  { name: "Cheatday Kebab", lat: 53.580393, lng: 9.973268 },
  { name: "My Kebap´s", lat: 53.580085, lng: 9.974578, plz: "20253", district: "Hoheluft-Ost", address: "Hoheluftchaussee 30" },
  { name: "Golden Kebab Eimsbüttel", lat: 53.578352, lng: 9.951204 },
  { name: "TimeOut - Istanbul Streetfood", lat: 53.57897, lng: 9.97556 },
  { name: "Blankeneser Imbiss", lat: 53.563861, lng: 9.813921 },
  { name: "K&R Grillhouse", lat: 53.559139, lng: 9.887463 },
  { name: "Rissener Döner Pavillon", lat: 53.581701, lng: 9.754644 },
  { name: "Döner 58", lat: 53.616105, lng: 9.905113 },
  { name: "KeBaP Lounge", lat: 53.593148, lng: 9.943727 },
  { name: "Kebab Bey", lat: 53.584502, lng: 9.981814 },
  { name: "Insel Döner", lat: 53.533369, lng: 9.877918 },
  { name: "ÖZ Harput Grill Haus", lat: 53.533328, lng: 9.87675, plz: "21129", district: "Finkenwerder", address: "Finkenwerder Norderdeich 94" },
  { name: "Döner Meile", lat: 53.574481, lng: 10.037315, plz: "22081", district: "Barmbek-Süd", address: "Wagnerstraße 7" },
  { name: "Dr.Kebap", lat: 53.573456, lng: 10.031682 },
  { name: "Nøne Meat Hamburg", lat: 53.581625, lng: 9.971994 },
  { name: "Kaya Salate & Feinkost", lat: 53.622402, lng: 9.952512 },
  { name: "Enes Döner", lat: 53.603604, lng: 9.966577, plz: "22529", district: "Lokstedt", address: "Nedderfeld 15" },
  { name: "La Delizia Restaurant", lat: 53.582237, lng: 9.972012 },
  { name: "Borstel Kebab", lat: 53.605724, lng: 9.982566 },
  { name: "My Kebap‘s", lat: 53.59301, lng: 9.988694 },
  { name: "SoulKebab", lat: 53.599777, lng: 9.994883 },
  { name: "Dürüm", lat: 53.585104, lng: 9.851792 },
  { name: "Shawarma Marina", lat: 53.565718, lng: 10.037205 },
  { name: "Larisa-bauchstation Restaurant", lat: 53.533179, lng: 9.878158 },
  { name: "Mina Restaurant (Luna Center)", lat: 53.498087, lng: 10.008076 },
  { name: "BEYOĞLU KEBAP HOUSE", lat: 53.54993, lng: 9.979502 },
  { name: "Mr. Kebab", lat: 53.556559, lng: 9.962655 },
  { name: "Soul Kebab", lat: 53.556361, lng: 9.966176, plz: "20359", district: "Sankt Pauli", address: "Neuer Kamp 31" },
  { name: "SERHAT-Döner", lat: 53.552772, lng: 10.041535 },
  { name: "Holsten Döner", lat: 53.561664, lng: 9.948627, plz: "22765", district: "Altona-Altstadt", address: "Holstenplatz 20" },
  { name: "Max Döner", lat: 53.550097, lng: 9.936091 },
  { name: "Ali Baba Döner & Grill", lat: 53.552026, lng: 9.941865 },
  { name: "Döner Time", lat: 53.552002, lng: 9.940958 },
  { name: "Köz Sultan Kebap Döner", lat: 53.552026, lng: 9.940488 },
  { name: "Kebab House KURTULAN", lat: 53.564394, lng: 9.926557 },
  { name: "The Salli's Kiosk Kebab & Veggie", lat: 53.552835, lng: 10.003757 },
  { name: "Burg Döner", lat: 53.559256, lng: 10.038903 },
  { name: "Star Döner", lat: 53.565277, lng: 9.912261, plz: "22761", district: "Bahrenfeld", address: "Bahrenfelder Chaussee 53" },
  { name: "Dave's Döner & Bowls", lat: 53.560661, lng: 9.989687 },
  { name: "Havin Grill", lat: 53.552225, lng: 10.00615 },
  { name: "Soulkebab", lat: 53.587845, lng: 10.045767 },
  { name: "Sultan's", lat: 53.587355, lng: 10.045955 },
  { name: "Volkan's Grillhaus Horn", lat: 53.553899, lng: 10.085171 },
  { name: "BAN BAB KEBABKLUB", lat: 53.558521, lng: 9.972683, plz: "20357", district: "Sankt Pauli", address: "Marktstraße 130" },
  { name: "Dönertreff", lat: 53.586438, lng: 10.064842 },
  { name: "Ardacan Grillhaus", lat: 53.592734, lng: 10.043962, plz: "22305", district: "Barmbek-Nord", address: "Hardorffsweg 15" },
  { name: "Malik Pizza", lat: 53.572155, lng: 9.949997 },
  { name: "Malik Pizza", lat: 53.611059, lng: 10.058363 },
  { name: "Lezzet", lat: 53.594261, lng: 10.043846, plz: "22307", district: "Barmbek-Nord", address: "Fuhlsbüttler Straße 173" },
  { name: "Ach der Deniz", lat: 53.56799, lng: 10.048944 },
  { name: "As Urfa Harburg", lat: 53.456699, lng: 9.985938, plz: "21073", district: "Harburg", address: "Wilstorfer Straße 56" },
  { name: "KÖZ KAPADOKYA RESTAURANT Hamburg", lat: 53.506555, lng: 9.986373, plz: "21107", district: "Wilhelmsburg", address: "Veringstraße 126" },
  { name: "Kebap Salonu", lat: 53.552746, lng: 10.010863 },
  { name: "Döner Platz", lat: 53.70862, lng: 10.107282 },
  { name: "Time Out", lat: 53.58378, lng: 9.96942, plz: "20253", district: "Hoheluft-Ost", address: "Hoheluftchaussee 131" },
  { name: "Musti Döner", lat: 53.5913, lng: 9.8726, plz: "22547", district: "Lurup", address: "Luruper Hauptstraße 139" },
  { name: "Restaurant Meram", lat: 53.54023, lng: 10.101807, plz: "22111", district: "Billstedt", address: "Billstedter Hauptstraße 47" },
  { name: "Manzara", lat: 53.61223, lng: 10.07676, plz: "22177", district: "Bramfeld", address: "Bramfelder Chaussee 230" },
  { name: "Cigköftem", lat: 53.46156, lng: 9.98082, plz: "21073", district: "Harburg", address: "Sand 11" },
  { name: "Peacetanbul", lat: 53.583209, lng: 10.020997, plz: "22303", district: "Winterhude", address: "Jarrestraße 20" },
  { name: "Ali Baba's Kitchen", lat: 53.505338, lng: 9.986204, plz: "21107", district: "Wilhelmsburg", address: "Veringstraße 156" },
  { name: "The Best Kumpir", lat: 53.5707, lng: 10.027472, plz: "22083", district: "Uhlenhorst", address: "Hamburger Straße 1" },
  { name: "Delal Döner", lat: 53.6031, lng: 9.8928, plz: "22523", district: "Eidelstedt", address: "Elbgaustraße 103" },
  { name: "City Doner", lat: 53.55301, lng: 10.0052, plz: "20095", district: "Altstadt", address: "Glockengießerwall" },
  { name: "Villa Ramiz", lat: 53.599481, lng: 9.916828, plz: "22525", district: "Stellingen", address: "Kieler Straße 567" },
  { name: "Miss Urfa Kebap House", lat: 53.48496, lng: 10.01918, plz: "21109", district: "Wilhelmsburg", address: "Kirchdorfer Damm 3" },
  { name: "Eidel's Kebap", lat: 53.608044, lng: 9.904408, plz: "22523", district: "Eidelstedt", address: "Eidelstedter Platz 5" },
  { name: "Tarsusi", lat: 53.585045, lng: 10.078152, plz: "22041", district: "Wandsbek", address: "Holzmühlenstraße 100" },
  { name: "Mangal Keyf", lat: 53.57103, lng: 10.06221, plz: "22041", district: "Wandsbek", address: "Wandsbeker Marktstraße 21" },
  { name: "Restaurant Baris", lat: 53.57, lng: 10.028, plz: "22081", district: "Uhlenhorst", address: "Lerchenfeld 48" },
  { name: "HBB-Bistro Ohlsdorf", lat: 53.62099, lng: 10.03223, plz: "22337", district: "Ohlsdorf", address: "Fuhlsbüttler Straße 761" },
  { name: "Miss Kumpir", lat: 53.650023, lng: 10.012406, plz: "22415", district: "Langenhorn", address: "Langenhorner Markt 18" },
  { name: "Backlavin Barmbek", lat: 53.590726, lng: 10.045051, plz: "22305", district: "Barmbek-Nord", address: "Fuhlsbüttler Straße 136" },
  { name: "Köz Güven Restaurant", lat: 53.51759, lng: 9.9865, plz: "21107", district: "Wilhelmsburg", address: "Vogelhüttendeich 50" },
  { name: "Cigköftem Altona - Vegane Küche", lat: 53.55352, lng: 9.92273, plz: "22763", district: "Ottensen", address: "Große Brunnenstraße 118" },
  { name: "Loqum", lat: 53.566526, lng: 9.967538, plz: "20357", district: "Eimsbüttel", address: "Kleiner Schäferkamp 36" },
  { name: "Köz Lezzet Urfam", lat: 53.517777, lng: 9.985831, plz: "21107", district: "Wilhelmsburg", address: "Vogelhüttendeich 46" },
  { name: "Mama Kumpir", lat: 53.58297, lng: 9.93499, plz: "22525", district: "Stellingen", address: "Langenfelder Damm 90" },
  { name: "Urfam Restaurant", lat: 53.57103, lng: 10.06221, plz: "22041", district: "Wandsbek", address: "Wandsbeker Marktstraße 21" },
  { name: "Aslan Kebab", lat: 53.525183, lng: 9.780662, plz: "21129", district: "Neuenfelde", address: "Seehofring 1" },
];

const MARTIN_TIPS = [
  "Achte auf die Röstzwiebeln — wenn sie labbrig sind, war das Brot nicht frisch.",
  "Ein guter Laden schneidet das Fleisch erst, wenn du bestellst. Nicht vorher auf Vorrat.",
  "Frag ruhig, ob du Lammfleisch statt Kalb/Rind bekommen kannst — oft der bessere Geschmack.",
  "Wenn die Soßen selbstgemacht sind statt aus der Flasche, ist das meistens ein gutes Zeichen.",
  "Der beste Test: Schmeckt der Döner auch ohne Soße? Dann stimmt die Fleischqualität.",
  "Frisches Fladenbrot erkennst du daran, dass es beim Falten nicht bricht."
];

function verdictClass(v) { return v; }

const VERDICT_FIGURE = {
  good: "assets/img/martin/03-martin-daumen-hoch.png",
  mid: "assets/img/martin/07-martin-zeigt-links.png",
  bad: "assets/img/martin/04-martin-kritischer-tester.png"
};

const VERDICT_FACE = {
  good: "assets/img/martin/face-03-martin-daumen-hoch.png",
  mid: "assets/img/martin/face-07-martin-zeigt-links.png",
  bad: "assets/img/martin/face-04-martin-kritischer-tester.png"
};

const VERDICT_FULL_FIGURE = {
  good: "assets/img/martin/tight-03-martin-daumen-hoch.png",
  mid: "assets/img/martin/tight-07-martin-zeigt-links.png",
  bad: "assets/img/martin/tight-04-martin-kritischer-tester.png"
};

function googleRatingHtml(shop) {
  return shop.googleRating != null
    ? `<span>Google: <strong>${shop.googleRating.toFixed(1)}★</strong> (${shop.googleCount})</span>`
    : `<span>Google: <strong>folgt</strong></span>`;
}

function mapsLinkHtml(shop) {
  const q = encodeURIComponent((shop.address ? shop.address + " " : "") + shop.name + " " + shop.district + " Hamburg");
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function testedCardHtml(shop) {
  return `
    <article class="shop-card" data-plz="${shop.plz}">
      <div class="shop-card-top">
        <div>
          <h3>${shop.name}</h3>
          <div class="district">${shop.address ? shop.address + ", " : ""}${shop.district} · ${shop.plz}</div>
        </div>
        <span class="verdict-badge ${verdictClass(shop.verdict)}">
          <img class="verdict-figure" src="${VERDICT_FIGURE[shop.verdict]}" alt="">
          ${shop.verdictLabel}
        </span>
      </div>
      <div class="ratings">
        <span>Martin: <strong>${shop.martinRating.toFixed(1)}/10</strong></span>
        ${googleRatingHtml(shop)}
      </div>
      <p class="note">${shop.note}</p>
      <div class="shop-card-actions">
        ${shop.videoUrl
          ? `<a class="btn-mini video" href="${shop.videoUrl}" target="_blank" rel="noopener">▶ Video ansehen</a>`
          : `<span class="btn-mini video-pending">Video folgt</span>`}
        <a class="btn-mini" href="${mapsLinkHtml(shop)}" target="_blank" rel="noopener">Auf Google Maps</a>
      </div>
    </article>
  `;
}

// A researched-but-unreviewed shop: real address, but no invented rating or note —
// Martin genuinely hasn't been here yet.
function untestedCardHtml(shop) {
  return `
    <article class="shop-card shop-card-untested" data-plz="${shop.plz}">
      <div class="shop-card-top">
        <div>
          <h3>${shop.name}</h3>
          <div class="district">${shop.address ? shop.address + ", " : ""}${shop.district} · ${shop.plz}</div>
        </div>
        <span class="verdict-badge untested">Noch nicht getestet</span>
      </div>
      <p class="note">Martin war hier noch nicht — Standort steht schon auf der Karte, Bewertung folgt.</p>
      <div class="shop-card-actions">
        <a class="btn-mini" href="${mapsLinkHtml(shop)}" target="_blank" rel="noopener">Auf Google Maps</a>
      </div>
    </article>
  `;
}

function shopCardHtml(shop) {
  return shop.martinRating != null ? testedCardHtml(shop) : untestedCardHtml(shop);
}

function renderShopList(shops) {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  grid.innerHTML = (shops || DOENER_SHOPS).map(shopCardHtml).join("");
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof maplibregl === "undefined") return;

  const map = new maplibregl.Map({
    container: "map",
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    center: [9.99, 53.565],
    zoom: 11.2,
    attributionControl: true
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
  initMobileMapToggle(map);

  map.on("load", () => {
    const testedShops = DOENER_SHOPS.map(shop => ({ ...shop, tested: true }));
    const untestedShops = UNTESTED_SHOPS.map(shop => ({ ...shop, verdict: "untested", tested: false }));

    testedShops.concat(untestedShops).forEach(shop => {
      const el = document.createElement("div");
      el.className = `doener-marker ${verdictClass(shop.verdict)}`;

      const popupHtml = shop.tested ? `
        <img class="popup-figure" src="${VERDICT_FULL_FIGURE[shop.verdict]}" alt="">
        <div class="popup-text">
          <div class="popup-shop-name">${shop.name}</div>
          <div class="popup-shop-meta">${shop.address ? shop.address + ", " : ""}${shop.district} · ${shop.plz}</div>
          <span class="popup-shop-verdict ${verdictClass(shop.verdict)}">${shop.verdictLabel}</span><br/>
          <div class="popup-shop-meta">Martin: <strong>${shop.martinRating.toFixed(1)}/10</strong><br>${shop.googleRating != null ? `Google: <strong>${shop.googleRating.toFixed(1)}★</strong>` : `Google: <strong>folgt</strong>`}</div>
          ${shop.note ? `<p class="popup-note">${shop.note}</p>` : ""}
          ${shop.videoUrl ? `<a class="popup-video-link" href="${shop.videoUrl}" target="_blank" rel="noopener">▶ Martins Video ansehen</a>` : `<span class="popup-video-link" style="color:var(--text-faint)">Video folgt bald</span>`}
        </div>
      ` : `
        <div class="popup-text popup-text-untested">
          <div class="popup-shop-name">${shop.name}</div>
          <span class="popup-shop-verdict untested">Noch nicht getestet</span>
          <p class="popup-note">Martin war hier noch nicht — Standort steht schon auf der Karte, Bewertung folgt.</p>
        </div>
      `;

      if (shop.tested) {
        el.innerHTML = `
          <span class="doener-marker-avatar">
            <img src="${VERDICT_FACE[shop.verdict]}" alt="">
          </span>
          <span class="doener-marker-tail"></span>
        `;
      } else {
        el.innerHTML = `<span class="doener-marker-dot"></span>`;
      }

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([shop.lng, shop.lat])
        .setPopup(new maplibregl.Popup({ offset: shop.tested ? 30 : 14 }).setHTML(popupHtml))
        .addTo(map);
    });
  });
}

const MOBILE_QUERY = "(max-width: 640px)";

// Phone-only: the search card covers almost the whole map, so give people a way to
// swap it out for a near-full-height map — tapping the map background, or a "Karte"
// button in the card — and back again via a small sticky "PLZ eingeben" pill.
function initMobileMapToggle(map) {
  const hero = document.querySelector(".hero");
  const showMapBtn = document.getElementById("showMapBtn");
  const searchPill = document.getElementById("mapSearchPill");
  if (!hero) return;

  // MapLibre caches canvas dimensions; it needs telling explicitly whenever the CSS
  // height of its container changes, or the map renders stretched/clipped until the
  // next manual interaction forces a recalculation.
  function resizeSoon() {
    window.setTimeout(() => map.resize(), 260);
  }

  function showMapOnly() {
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    hero.classList.add("map-only");
    resizeSoon();
  }

  function showCard() {
    hero.classList.remove("map-only");
    resizeSoon();
    const input = document.getElementById("plzInput");
    if (input) input.focus();
  }

  if (showMapBtn) showMapBtn.addEventListener("click", showMapOnly);
  if (searchPill) searchPill.addEventListener("click", showCard);

  // A marker click never reaches this: markers are separate DOM elements layered over
  // the canvas, not inside it, so they don't bubble into MapLibre's own click handler.
  map.on("click", showMapOnly);
}

function showRandomTip(animate) {
  const tipEl = document.getElementById("martinTipText");
  if (!tipEl) return;
  const pool = MARTIN_TIPS.filter(t => t !== tipEl.textContent);
  const tip = pool[Math.floor(Math.random() * pool.length)] || MARTIN_TIPS[0];

  if (!animate) {
    tipEl.textContent = tip;
    return;
  }

  // Cross-fade the swap instead of a hard text jump — feedback stays continuous, not a jump cut.
  tipEl.classList.add("is-swapping");
  window.setTimeout(() => {
    tipEl.textContent = tip;
    tipEl.classList.remove("is-swapping");
  }, 150);
}

function initSearch() {
  const form = document.getElementById("plzForm");
  if (!form) return;

  // Searchable pool: reviewed shops plus researched-but-unreviewed shops that have a real
  // PLZ (from address research) — pure OSM points without a PLZ stay map-only.
  const searchablePool = DOENER_SHOPS.concat(UNTESTED_SHOPS.filter(shop => shop.plz));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("plzInput");
    const query = (input.value || "").trim();
    if (!query) return;

    const matches = searchablePool
      .filter(shop => shop.plz.includes(query) || shop.district.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.plz.localeCompare(b.plz) || a.name.localeCompare(b.name));

    document.getElementById("listHint").textContent = matches.length
      ? `${matches.length} Laden${matches.length === 1 ? "" : "s"} gefunden für "${query}", sortiert nach PLZ`
      : `Keine Treffer für "${query}" — hier sind alle bereits getesteten Läden:`;

    renderShopList(matches.length ? matches : DOENER_SHOPS);

    document.getElementById("shopGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const TIP_ROTATE_MS = 10000;

document.addEventListener("DOMContentLoaded", () => {
  renderShopList();
  initMap();
  showRandomTip();
  initSearch();

  let tipTimer = window.setInterval(() => showRandomTip(true), TIP_ROTATE_MS);

  const refreshBtn = document.getElementById("tipRefresh");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      showRandomTip(true);
      // Manual swap counts as a fresh interval — otherwise the auto-rotate could
      // fire a second later and immediately swap again right after the click.
      window.clearInterval(tipTimer);
      tipTimer = window.setInterval(() => showRandomTip(true), TIP_ROTATE_MS);
    });
  }
});
