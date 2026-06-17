#!/usr/bin/env node
/**
 * Generate 5 SVG logo variants for "Amžinas Akmuo" from the brand identity.
 * Output: brand/logos/logo-1..5.svg + preview.html
 * Run: node scripts/generate-logos.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "brand", "logos");
mkdirSync(OUT, { recursive: true });

// --- brand tokens ---
const ESPRESSO = "#2B2520";
const CLAY = "#B0764F";
const CREAM = "#F7F2EA";
const SAND = "#EDE4D5";
const MUTED = "#6E6357";

// Google Fonts import so SVGs render with the brand fonts in a browser
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Hanken+Grotesk:wght@500;600&display=swap');`;
const serif = `font-family:'Fraunces',Georgia,serif`;
const sans = `font-family:'Hanken Grotesk',Arial,sans-serif`;

// arched headstone silhouette path (flat bottom, semicircular top)
function headstone(cx, by, W, H, extra = "") {
  const r = W / 2, sideTop = by - (H - r);
  return `<path d="M ${cx - r} ${by} L ${cx - r} ${sideTop} A ${r} ${r} 0 0 1 ${cx + r} ${sideTop} L ${cx + r} ${by} Z" ${extra}/>`;
}

const variants = {
  // 1 — Horizontal wordmark with clay dot
  "logo-1": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 200">
  <style>${FONTS}</style>
  <text x="380" y="118" text-anchor="middle" style="${serif}" font-size="78" font-weight="500" fill="${ESPRESSO}" letter-spacing="0.5">Amžinas<tspan fill="${CLAY}"> · </tspan>Akmuo</text>
  <text x="380" y="160" text-anchor="middle" style="${sans}" font-size="17" font-weight="600" letter-spacing="6.5" fill="${MUTED}">MODERNŪS ANTKAPIAI</text>
</svg>`,

  // 2 — Stacked wordmark with rule + tagline
  "logo-2": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320">
  <style>${FONTS}</style>
  <text x="260" y="130" text-anchor="middle" style="${serif}" font-size="92" font-weight="500" fill="${ESPRESSO}">Amžinas</text>
  <text x="260" y="218" text-anchor="middle" style="${serif}" font-size="92" font-weight="400" font-style="italic" fill="${CLAY}">Akmuo</text>
  <line x1="170" y1="252" x2="350" y2="252" stroke="${ESPRESSO}" stroke-opacity="0.25" stroke-width="2"/>
  <text x="260" y="284" text-anchor="middle" style="${sans}" font-size="16" font-weight="600" letter-spacing="6" fill="${MUTED}">MODERNAUS DIZAINO ANTKAPIAI</text>
</svg>`,

  // 3 — Monogram badge + wordmark
  "logo-3": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220">
  <style>${FONTS}</style>
  <rect x="30" y="35" width="150" height="150" rx="20" fill="${ESPRESSO}"/>
  <text x="105" y="138" text-anchor="middle" style="${serif}" font-size="86" font-weight="500" fill="${CREAM}">A<tspan fill="${CLAY}">A</tspan></text>
  <text x="210" y="100" style="${serif}" font-size="62" font-weight="500" fill="${ESPRESSO}">Amžinas</text>
  <text x="210" y="162" style="${serif}" font-size="62" font-weight="400" font-style="italic" fill="${CLAY}">Akmuo</text>
</svg>`,

  // 4 — Emblem: arched stone icon + wordmark
  "logo-4": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 420">
  <style>${FONTS}</style>
  ${headstone(230, 250, 150, 200, `fill="${ESPRESSO}"`)}
  ${headstone(230, 250, 150, 200, `fill="none" stroke="${CLAY}" stroke-width="0"`)}
  <line x1="230" y1="120" x2="230" y2="235" stroke="${CLAY}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="230" cy="100" r="13" fill="${CLAY}"/>
  <text x="230" y="330" text-anchor="middle" style="${serif}" font-size="62" font-weight="500" fill="${ESPRESSO}">Amžinas Akmuo</text>
  <text x="230" y="368" text-anchor="middle" style="${sans}" font-size="15" font-weight="600" letter-spacing="5.5" fill="${MUTED}">MODERNŪS ANTKAPIAI</text>
</svg>`,

  // 5 — Minimal mark (favicon / avatar)
  "logo-5": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <style>${FONTS}</style>
  <rect width="240" height="240" rx="48" fill="${CLAY}"/>
  ${headstone(120, 168, 96, 120, `fill="${CREAM}"`)}
  <line x1="120" y1="92" x2="120" y2="158" stroke="${CLAY}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="120" cy="78" r="9" fill="${CLAY}"/>
</svg>`,
};

const titles = {
  "logo-1": "1 · Horizontalus wordmark",
  "logo-2": "2 · Sukrautas + kursyvas",
  "logo-3": "3 · Monograma AA + wordmark",
  "logo-4": "4 · Emblema (akmens ženklas)",
  "logo-5": "5 · Minimalus ženklas (favicon/avatar)",
};

for (const [name, svg] of Object.entries(variants)) {
  writeFileSync(join(OUT, name + ".svg"), svg);
  console.log("  ✓ " + name + ".svg");
}

// preview page: each variant on light + dark card
const cards = Object.keys(variants).map((k) => `
  <div class="item">
    <div class="title">${titles[k]}</div>
    <div class="row">
      <div class="card light">${variants[k]}</div>
      <div class="card dark">${variants[k]}</div>
    </div>
  </div>`).join("");

writeFileSync(join(OUT, "preview.html"), `<!DOCTYPE html><html lang="lt"><head><meta charset="utf-8">
<title>Amžinas Akmuo — logo variantai</title>
<style>
  body{margin:0;background:#EDE4D5;font-family:system-ui,sans-serif;padding:40px;color:#2B2520}
  h1{font-weight:600;margin:0 0 6px}.sub{color:#6E6357;margin:0 0 30px}
  .item{margin-bottom:34px}.title{font-weight:600;margin-bottom:10px;font-size:14px;letter-spacing:.04em}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .card{border-radius:16px;padding:34px;display:flex;align-items:center;justify-content:center;min-height:220px}
  .card svg{max-width:100%;height:auto;max-height:260px}
  .light{background:#F7F2EA;border:1px solid rgba(43,37,32,.12)}
  .dark{background:#2B2520}
  .dark text{fill:#F7F2EA!important}
</style></head><body>
<h1>Amžinas Akmuo — 5 logo variantai</h1>
<p class="sub">Vektoriai (SVG). Kairėje šviesus fonas, dešinėje tamsus. Pasirink patikusį (ar derinį) — tada tobulinsim.</p>
${cards}
</body></html>`);
console.log("  ✓ preview.html");
console.log("Done. Open: brand/logos/preview.html");
