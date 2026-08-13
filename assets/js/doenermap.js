/* ==========================================================================
   Dönermap Hamburg — Karte, Suche und Darstellung.

   Die Ladendaten stehen NICHT hier, sondern werden aus data/shops.json
   erzeugt und von assets/js/doenermap-data.js geladen (siehe index.html).
   Diese Datei enthält nur Logik.
   ========================================================================== */

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
