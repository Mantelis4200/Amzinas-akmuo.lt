#!/usr/bin/env node
/**
 * Refined "AA" monogram logo for Amžinas Akmuo — 3 variations, each with a
 * purpose-built LIGHT and DARK version (matching borders/inversion).
 * Output: brand/logos/logo-aa-{solid,outline,circle}-{light,dark}.svg + preview-aa.html
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "brand", "logos");
mkdirSync(OUT, { recursive: true });

const ESPRESSO = "#2B2520", CLAY = "#B0764F", CREAM = "#F7F2EA";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,500;9..144,1,400&display=swap');`;
const serif = `font-family:'Fraunces',Georgia,serif`;

// palette per mode (kept symmetric so light & dark are intentional mirrors)
function palette(mode) {
  return mode === "light"
    ? { badgeFill: ESPRESSO, mono: CREAM, border: "rgba(43,37,32,0.16)", word: ESPRESSO, outlineStroke: ESPRESSO }
    : { badgeFill: CREAM,   mono: ESPRESSO, border: "rgba(247,242,234,0.32)", word: CREAM, outlineStroke: CREAM };
}

function badge(variation, p) {
  if (variation === "solid")
    return `<rect x="25" y="25" width="150" height="150" rx="24" fill="${p.badgeFill}" stroke="${p.border}" stroke-width="2"/>`;
  if (variation === "outline")
    return `<rect x="28" y="28" width="144" height="144" rx="24" fill="none" stroke="${p.outlineStroke}" stroke-width="6"/>`;
  // circle seal: filled disc + thin clay inner ring
  return `<circle cx="100" cy="100" r="76" fill="${p.badgeFill}" stroke="${p.border}" stroke-width="2"/>
  <circle cx="100" cy="100" r="64" fill="none" stroke="${CLAY}" stroke-width="2" stroke-opacity="0.9"/>`;
}

function monoColor(variation, p) {
  // on outline badge there is no fill, so the letters take the stroke colour
  return variation === "outline" ? p.outlineStroke : p.mono;
}

function makeSVG(variation, mode) {
  const p = palette(mode);
  const main = monoColor(variation, p);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200">
  <style>${FONTS}</style>
  ${badge(variation, p)}
  <text x="100" y="129" text-anchor="middle" style="${serif}" font-size="82" font-weight="500" fill="${main}">A<tspan fill="${CLAY}">A</tspan></text>
  <text x="215" y="92" style="${serif}" font-size="56" font-weight="500" fill="${p.word}">Amžinas</text>
  <text x="215" y="150" style="${serif}" font-size="56" font-weight="400" font-style="italic" fill="${CLAY}">Akmuo</text>
</svg>`;
}

const variations = ["solid", "outline", "circle"];
const modes = ["light", "dark"];
const titles = { solid: "1 · Solid (užpildytas badge)", outline: "2 · Outline (kontūrinis)", circle: "3 · Circle seal (antspaudas)" };

for (const v of variations)
  for (const m of modes) {
    const file = `logo-aa-${v}-${m}.svg`;
    writeFileSync(join(OUT, file), makeSVG(v, m));
    console.log("  ✓ " + file);
  }

const rows = variations.map((v) => `
  <div class="item"><div class="title">${titles[v]}</div>
    <div class="row">
      <div class="card light">${makeSVG(v, "light")}</div>
      <div class="card dark">${makeSVG(v, "dark")}</div>
    </div></div>`).join("");

writeFileSync(join(OUT, "preview-aa.html"), `<!DOCTYPE html><html lang="lt"><head><meta charset="utf-8">
<title>Amžinas Akmuo — AA monograma (3 variacijos)</title>
<style>
  body{margin:0;background:#EDE4D5;font-family:system-ui,sans-serif;padding:40px;color:#2B2520}
  h1{font-weight:600;margin:0 0 6px}.sub{color:#6E6357;margin:0 0 30px}
  .item{margin-bottom:30px}.title{font-weight:600;margin-bottom:10px;font-size:14px}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .card{border-radius:16px;padding:30px;display:flex;align-items:center;justify-content:center;min-height:150px}
  .card svg{max-width:100%;height:auto;max-height:150px}
  .light{background:#F7F2EA;border:1px solid rgba(43,37,32,.12)}
  .dark{background:#2B2520}
</style></head><body>
<h1>AA monograma — 3 variacijos, šviesi + tamsi</h1>
<p class="sub">Kairėje šviesi versija (šviesiam fonui), dešinėje tamsi versija (tamsiam fonui) — kiekviena suprojektuota atskirai, su atitinkamais apvadais. Pasirink variaciją.</p>
${rows}
</body></html>`);
console.log("  ✓ preview-aa.html");
console.log("Done. Open: brand/logos/preview-aa.html");
