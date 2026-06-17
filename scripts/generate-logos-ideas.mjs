#!/usr/bin/env node
/**
 * 3 additional unique logo concepts for "Amžinas Akmuo".
 * Output: brand/logos/logo-idea-1..3.svg + preview-ideas.html
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "brand", "logos");
mkdirSync(OUT, { recursive: true });

const ESPRESSO = "#2B2520", ESP2 = "#3A322A", CLAY = "#B0764F", CREAM = "#F7F2EA",
      SAND = "#EDE4D5", GREIGE = "#E0D5C3", MUTED = "#6E6357";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,500;9..144,1,400&family=Hanken+Grotesk:wght@600&display=swap');`;
const serif = `font-family:'Fraunces',Georgia,serif`;
const sans = `font-family:'Hanken Grotesk',Arial,sans-serif`;

const ideas = {
  // A — Eternity arch that reads as "A"
  "logo-idea-1": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 440">
  <style>${FONTS}</style>
  <path d="M140 250 L140 200 A90 90 0 0 1 320 200 L320 250" fill="none" stroke="${ESPRESSO}" stroke-width="26" stroke-linecap="round"/>
  <line x1="158" y1="222" x2="302" y2="222" stroke="${CLAY}" stroke-width="15" stroke-linecap="round"/>
  <text x="230" y="338" text-anchor="middle" style="${serif}" font-size="58" font-weight="500" fill="${ESPRESSO}">Amžinas Akmuo</text>
  <text x="230" y="376" text-anchor="middle" style="${sans}" font-size="15" font-weight="600" letter-spacing="6" fill="${MUTED}">ATMINČIAI, KURI NESENSTA</text>
</svg>`,

  // B — Engraved wordmark on a stone plaque, with a chiselled clay groove
  "logo-idea-2": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 280">
  <style>${FONTS}</style>
  <rect x="40" y="40" width="680" height="170" rx="20" fill="${SAND}" stroke="${ESPRESSO}" stroke-opacity="0.12"/>
  <text x="380" y="130" text-anchor="middle" style="${serif}" font-size="70" font-weight="500" fill="${ESPRESSO}">Amžinas Akmuo</text>
  <path d="M250 162 l10 6 l250 0 l10 -6" fill="none" stroke="${CLAY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="380" y="252" text-anchor="middle" style="${sans}" font-size="16" font-weight="600" letter-spacing="6.5" fill="${MUTED}">GRAVIRAVIMAS · ANTKAPIAI</text>
</svg>`,

  // C — Faceted cut-stone gem mark + wordmark
  "logo-idea-3": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300">
  <style>${FONTS}</style>
  <g>
    <polygon points="110,150 110,70 175,120" fill="${SAND}"/>
    <polygon points="110,150 175,120 160,205" fill="${CLAY}"/>
    <polygon points="110,150 160,205 110,235" fill="${ESPRESSO}"/>
    <polygon points="110,150 110,235 60,205" fill="${ESP2}"/>
    <polygon points="110,150 60,205 45,120" fill="${MUTED}"/>
    <polygon points="110,150 45,120 110,70" fill="${GREIGE}"/>
    <polygon points="110,70 175,120 160,205 110,235 60,205 45,120" fill="none" stroke="${ESPRESSO}" stroke-opacity="0.25" stroke-width="2" stroke-linejoin="round"/>
  </g>
  <text x="215" y="138" style="${serif}" font-size="56" font-weight="500" fill="${ESPRESSO}">Amžinas</text>
  <text x="215" y="196" style="${serif}" font-size="56" font-weight="400" font-style="italic" fill="${CLAY}">Akmuo</text>
</svg>`,
};

const titles = {
  "logo-idea-1": "A · Amžinybės arka (arka = raidė A)",
  "logo-idea-2": "B · Įraiža (graviravimo griovelis ant plokštės)",
  "logo-idea-3": "C · Briaunuotas akmuo (šlifuoto granito gema)",
};

for (const [name, svg] of Object.entries(ideas)) {
  writeFileSync(join(OUT, name + ".svg"), svg);
  console.log("  ✓ " + name + ".svg");
}

const cards = Object.keys(ideas).map((k) => `
  <div class="item"><div class="title">${titles[k]}</div>
    <div class="row">
      <div class="card light">${ideas[k]}</div>
      <div class="card dark">${ideas[k]}</div>
    </div></div>`).join("");

writeFileSync(join(OUT, "preview-ideas.html"), `<!DOCTYPE html><html lang="lt"><head><meta charset="utf-8">
<title>Amžinas Akmuo — 3 naujos logo idėjos</title>
<style>
  body{margin:0;background:#EDE4D5;font-family:system-ui,sans-serif;padding:40px;color:#2B2520}
  h1{font-weight:600;margin:0 0 6px}.sub{color:#6E6357;margin:0 0 30px}
  .item{margin-bottom:34px}.title{font-weight:600;margin-bottom:10px;font-size:14px}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .card{border-radius:16px;padding:34px;display:flex;align-items:center;justify-content:center;min-height:230px}
  .card svg{max-width:100%;height:auto;max-height:280px}
  .light{background:#F7F2EA;border:1px solid rgba(43,37,32,.12)}
  .dark{background:#2B2520}.dark text{fill:#F7F2EA!important}
</style></head><body>
<h1>Amžinas Akmuo — 3 naujos unikalios idėjos</h1>
<p class="sub">Skirtingos koncepcijos: simbolis (arka), amatas (įraiža), medžiaga (briaunos).</p>
${cards}
</body></html>`);
console.log("  ✓ preview-ideas.html");
console.log("Done. Open: brand/logos/preview-ideas.html");
