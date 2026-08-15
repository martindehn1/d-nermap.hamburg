// Erzeugt alles, was Google zum Ranken braucht — aus data/shops.json.
//
//   robots.txt              Crawling-Freigabe + Sitemap-Verweis
//   sitemap.xml             Startseite + eine URL je getestetem Laden
//   laden/<id>/index.html   Eigene Seite je Test — echter Text, eigener Title,
//                           Review-Markup. Das sind die Seiten, die für
//                           "Döner <Stadtteil>" ranken können.
//   index.html              Füllt die GENERATED-Blöcke (JSON-LD, Bestenliste,
//                           FAQ) — der Rest der Datei bleibt handgepflegt.
//
// Aufruf: npm run build:seo   (läuft automatisch in npm run build mit)
//
// Grundregel wie überall im Projekt: Es wird nichts erfunden. Jede Zahl und
// jeder Satz hier stammt aus data/shops.json. Läden ohne echten Test tauchen
// in Bestenliste, Sitemap und Markup nicht auf.

import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://xn--dnermap-90a.hamburg"; // Punycode: in Sitemaps/Canonicals Pflicht
const SITE_NAME = "Dönermap Hamburg";
const AUTHOR = "Martin Dehn";

const VERDICT_LABEL = {
  good: "Top-Empfehlung",
  mid: "Solide",
  bad: "Nicht empfohlen"
};

const shops = JSON.parse(fs.readFileSync("data/shops.json", "utf8"));

// Nur echte Tests. Demo-Einträge und reine Recherche-Punkte bekommen weder
// eine eigene Seite noch Review-Markup — beides wäre eine Falschaussage.
const tested = shops
  .filter(s => s.status === "tested" && s.rating)
  .sort((a, b) => b.rating.score - a.rating.score);

const untestedCount = shops.filter(s => s.status === "untested").length;

const esc = str =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shopUrl = s => `${ORIGIN}/laden/${s.id}/`;
// Immer eine Nachkommastelle und Komma statt Punkt — "9,0/10", nicht "9/10".
const score = s => s.rating.score.toFixed(1).replace(".", ",");
// Notizen enden mal mit Punkt, mal ohne. Ohne das hier klebt der Folgesatz dran.
const asSentence = text => (/[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`);
const isoDate = s => s.rating.testedAt ?? new Date().toISOString().slice(0, 10);
const deDate = iso =>
  new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

// --- Schema.org ------------------------------------------------------------

// Ein Kritiker-Review: bewertet wird ein fremdes Restaurant, Autor ist Martin.
// Bewusst KEIN aggregateRating auf den Restaurants — wir haben je Laden genau
// eine Bewertung, und eine erfundene Bewertungsanzahl wäre exakt das, was
// Google als Spam wertet.
function reviewLd(s) {
  return {
    "@type": "Review",
    "@id": `${shopUrl(s)}#review`,
    itemReviewed: {
      "@type": "Restaurant",
      name: s.name,
      servesCuisine: "Türkisch",
      address: {
        "@type": "PostalAddress",
        streetAddress: s.location.address ?? undefined,
        postalCode: s.location.plz ?? undefined,
        addressLocality: "Hamburg",
        addressRegion: "Hamburg",
        addressCountry: "DE"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: s.location.lat,
        longitude: s.location.lng
      }
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: s.rating.score,
      bestRating: 10,
      worstRating: 1
    },
    author: { "@type": "Person", name: AUTHOR, url: "https://socialfokus.de/" },
    datePublished: isoDate(s),
    reviewBody: s.rating.note
  };
}

function faqEntries() {
  const best = tested[0];
  const good = tested.filter(s => s.rating.verdict === "good");
  return [
    {
      q: "Was ist der beste Döner in Hamburg?",
      a: `Nach unseren bisherigen Tests liegt ${best.name} in ${best.location.district} mit ${score(best)} von 10 Punkten vorn. ${asSentence(best.rating.note)} Insgesamt hat Martin Dehn ${tested.length} Läden selbst getestet, ${good.length} davon sind eine klare Empfehlung.`
    },
    {
      q: "Wie viele Dönerläden sind auf der Dönermap erfasst?",
      a: `Auf der Karte sind aktuell ${shops.length - shops.filter(s => s.status === "demo").length} Dönerläden in Hamburg verzeichnet. ${tested.length} davon hat Martin Dehn persönlich getestet und bewertet, die übrigen ${untestedCount} sind recherchiert und warten noch auf einen Test.`
    },
    {
      q: "Wie werden die Dönerläden bewertet?",
      a: "Jeder Laden wird persönlich vor Ort getestet und auf einer Skala von 1 bis 10 bewertet. Bewertet werden Fleisch, Brot, Soße, Preis-Leistung, Salat und Frische sowie Laden und Service. Ab 8,0 Punkten gibt es eine Top-Empfehlung, ab 6,0 gilt ein Laden als solide. Bezahlte Platzierungen haben keinen Einfluss auf die Note — Werbung wird immer als solche gekennzeichnet."
    },
    {
      q: "Wie finde ich guten Döner in meiner Nähe in Hamburg?",
      a: "Gib oben auf der Karte deine Postleitzahl oder deinen Stadtteil ein, dann siehst du alle erfassten Dönerläden in deiner Umgebung. Grüne Punkte sind Top-Empfehlungen, orange steht für solide, rot für nicht empfohlen und grau für noch nicht getestet."
    },
    {
      q: "Wer steckt hinter der Dönermap Hamburg?",
      a: `Die Dönermap ist ein Projekt von ${AUTHOR}, Content Creator aus Hamburg. Alle Tests sind unabhängig und werden selbst bezahlt. Es gibt keine Gegenleistung für eine gute Note.`
    }
  ];
}

function homepageLd() {
  const best = tested[0];
  const faq = faqEntries();
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: SITE_NAME,
      inLanguage: "de-DE",
      description: `Alle Dönerläden in Hamburg auf einer Karte — unabhängig getestet und bewertet von ${AUTHOR}.`,
      publisher: {
        "@type": "Person",
        "@id": `${ORIGIN}/#martin`,
        name: AUTHOR,
        url: "https://socialfokus.de/",
        sameAs: ["https://www.tiktok.com/@martin.dehn"]
      },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${ORIGIN}/?plz={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${ORIGIN}/#bestenliste`,
      name: "Die besten Dönerläden in Hamburg",
      description: `Von ${AUTHOR} getestete Dönerläden in Hamburg, sortiert nach Bewertung. Bester Laden aktuell: ${best.name} in ${best.location.district}.`,
      numberOfItems: tested.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: tested.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: shopUrl(s),
        name: s.name
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${ORIGIN}/#faq`,
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a }
      }))
    }
  ];
}

// --- Bestenliste als echtes HTML ------------------------------------------
// Die interaktive Kartenliste rendert das JavaScript. Google soll den Text
// aber auch ohne JS sehen — deshalb steht die Rangliste fest im HTML.

function bestListHtml() {
  const rows = tested
    .map(
      (s, i) => `
      <li class="rank-item ${s.rating.verdict}">
        <span class="rank-pos">${i + 1}</span>
        <div class="rank-body">
          <h3><a href="/laden/${s.id}/">${esc(s.name)}</a></h3>
          <p class="rank-meta">${esc([s.location.address, s.location.district, s.location.plz].filter(Boolean).join(" · "))}</p>
          <p class="rank-note">${esc(s.rating.note)}</p>
        </div>
        <span class="rank-score">${score(s)}<small>/10</small></span>
      </li>`
    )
    .join("");

  return `
    <div class="section-inner">
      <h2>Die besten Dönerläden in Hamburg</h2>
      <p class="section-lede">
        ${tested.length} Läden hat Martin bisher selbst getestet und von 1 bis 10 bewertet —
        hier stehen sie in der Reihenfolge, die dabei herausgekommen ist. Die übrigen
        ${untestedCount} erfassten Dönerläden findest du oben auf der Karte.
      </p>
      <ol class="rank-list">${rows}
      </ol>
    </div>`;
}

function faqHtml() {
  const items = faqEntries()
    .map(
      ({ q, a }) => `
      <div class="faq-item">
        <h3>${esc(q)}</h3>
        <p>${esc(a)}</p>
      </div>`
    )
    .join("");
  return `
    <div class="section-inner">
      <h2>Häufige Fragen</h2>
      <div class="faq-list">${items}
      </div>
    </div>`;
}

// --- Einzelseite je Laden --------------------------------------------------

function shopPage(s) {
  const label = VERDICT_LABEL[s.rating.verdict];
  const title = `${s.name} — Döner in ${s.location.district} im Test (${score(s)}/10)`;
  const desc = `${s.name}${s.location.address ? `, ${s.location.address}` : ""} in Hamburg-${s.location.district}: ${score(s)} von 10 Punkten im Test von ${AUTHOR}. ${asSentence(s.rating.note)}`.slice(0, 300);

  // Quer verlinken hilft Google beim Crawlen und dem Leser beim Stöbern.
  const others = tested.filter(o => o.id !== s.id).slice(0, 4);
  const otherLinks = others
    .map(
      o =>
        `<li><a href="/laden/${o.id}/">${esc(o.name)}</a> <span>${score(o)}/10 · ${esc(o.location.district)}</span></li>`
    )
    .join("\n          ");

  const ld = [
    reviewLd(s),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dönermap Hamburg", item: `${ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Getestete Läden", item: `${ORIGIN}/#bestenliste` },
        { "@type": "ListItem", position: 3, name: s.name, item: shopUrl(s) }
      ]
    }
  ];

  const mapsQuery = encodeURIComponent(
    [s.location.address, s.name, s.location.district, "Hamburg"].filter(Boolean).join(" ")
  );

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} | ${SITE_NAME}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${shopUrl(s)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f6f3ec">

<meta property="og:type" content="article">
<meta property="og:locale" content="de_DE">
<meta property="og:url" content="${shopUrl(s)}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ORIGIN}/assets/img/martin/06-martin-zeigt-auf-pin.png">
<meta name="twitter:card" content="summary_large_image">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/doenermap.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z' fill='%23ff3d3d'/%3E%3Ccircle cx='12' cy='10' r='3' fill='%230a0a0c'/%3E%3C/svg%3E">

<script type="application/ld+json">
${JSON.stringify({ "@context": "https://schema.org", "@graph": ld }, null, 2)}
</script>
</head>
<body>

<header class="site-nav">
  <a href="/" class="nav-logo" aria-label="${SITE_NAME} — Start">
    <svg class="pin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" fill="currentColor"/>
      <circle cx="12" cy="10" r="3" fill="#0a0a0c"/>
    </svg>
    Dönermap <span class="accent">Hamburg</span>
  </a>
  <nav class="nav-links">
    <a href="/#karte">Karte</a>
    <a href="/#bestenliste">Bestenliste</a>
  </nav>
</header>

<main class="shop-page">
  <div class="section-inner">
    <nav class="crumbs" aria-label="Brotkrumen">
      <a href="/">Dönermap Hamburg</a> <span>›</span>
      <a href="/#bestenliste">Getestete Läden</a> <span>›</span>
      <span aria-current="page">${esc(s.name)}</span>
    </nav>

    <article class="shop-detail">
      <span class="verdict-badge ${s.rating.verdict}">${label}</span>
      <h1>${esc(s.name)}</h1>
      <p class="shop-detail-meta">${esc([s.location.address, `${s.location.plz ?? ""} Hamburg-${s.location.district}`].filter(Boolean).join(", "))}</p>

      <div class="shop-detail-score">
        <strong>${score(s)}</strong><span>/10</span>
        <em>getestet von ${AUTHOR} am ${deDate(isoDate(s))}</em>
      </div>

      <h2>Martins Urteil</h2>
      <p class="shop-detail-note">${esc(s.rating.note)}</p>

      <div class="shop-card-actions">
        ${s.media.videoUrl ? `<a class="btn-mini video" href="${esc(s.media.videoUrl)}" target="_blank" rel="noopener">▶ Video zum Test</a>` : ""}
        <a class="btn-mini" href="https://www.google.com/maps/search/?api=1&amp;query=${mapsQuery}" target="_blank" rel="noopener">Route auf Google Maps</a>
      </div>

      <h2>Weitere getestete Dönerläden in Hamburg</h2>
      <ul class="shop-detail-links">
          ${otherLinks}
      </ul>
      <p class="shop-detail-back">
        <a href="/#bestenliste">Zur kompletten Bestenliste</a> ·
        <a href="/#karte">Alle ${untestedCount + tested.length} Läden auf der Karte</a>
      </p>
    </article>
  </div>
</main>

<footer class="dm-footer">
  <p>${SITE_NAME} — ein Projekt von <a href="https://socialfokus.de/" target="_blank" rel="noopener" style="color: var(--accent-2);">${AUTHOR} / Social Fokus</a></p>
</footer>

</body>
</html>
`;
}

// --- Schreiben -------------------------------------------------------------

function injectBlock(html, marker, content) {
  const re = new RegExp(
    `(<!-- GENERATED:${marker} -->)[\\s\\S]*?(<!-- /GENERATED:${marker} -->)`
  );
  if (!re.test(html)) throw new Error(`Marker GENERATED:${marker} fehlt in index.html`);
  return html.replace(re, `$1${content}\n    $2`);
}

let index = fs.readFileSync("index.html", "utf8");
index = injectBlock(
  index,
  "jsonld",
  `\n<script type="application/ld+json">\n${JSON.stringify(homepageLd(), null, 2)}\n</script>\n`
);
index = injectBlock(index, "bestlist", `\n${bestListHtml()}\n`);
index = injectBlock(index, "faq", `\n${faqHtml()}\n`);
fs.writeFileSync("index.html", index);

for (const s of tested) {
  const dir = path.join("laden", s.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), shopPage(s));
}

const urls = [
  { loc: `${ORIGIN}/`, priority: "1.0", changefreq: "weekly" },
  ...tested.map(s => ({
    loc: shopUrl(s),
    lastmod: isoDate(s),
    priority: "0.8",
    changefreq: "monthly"
  }))
];

fs.writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u =>
      `  <url>\n    <loc>${u.loc}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`
);

fs.writeFileSync(
  "robots.txt",
  `User-agent: *
Allow: /

# Die JSON-API ist für die App, nicht für die Suche — spart Crawl-Budget.
Disallow: /api/

Sitemap: ${ORIGIN}/sitemap.xml
`
);

console.log(
  `SEO: sitemap.xml (${urls.length} URLs), robots.txt, ${tested.length} Ladenseiten, JSON-LD + Bestenliste + FAQ in index.html`
);
