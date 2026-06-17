#!/usr/bin/env node
/**
 * Batch photo retoucher for Amžinas Akmuo.
 * Reads photos/raw/*, sends each to Gemini image model, writes photos/edited/*.png
 *
 * Usage:
 *   node scripts/edit-photos.mjs            # process all not-yet-done
 *   node scripts/edit-photos.mjs --limit 3  # only first 3 (test run)
 *   node scripts/edit-photos.mjs --force    # re-do even if output exists
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "photos", "raw");
const OUT = join(ROOT, "photos", process.env.OUT_DIR || "edited");
const MODEL = process.env.GEMINI_MODEL || "gemini-3-pro-image"; // best quality; cheaper: GEMINI_MODEL=gemini-2.5-flash-image

// --- load GEMINI_API_KEY from .env.local ---
function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const env = readFileSync(join(ROOT, ".env.local"), "utf8");
  const m = env.match(/^GEMINI_API_KEY="?([^"\n]+)"?/m);
  if (!m) throw new Error("GEMINI_API_KEY not found in env or .env.local");
  return m[1];
}
const KEY = loadKey();

const PROMPT = `You are a professional product-photo retoucher for a premium gravestone/monument brand.
You are given a real photo of a granite gravestone / full grave plot (kapavietė) shot in an outdoor workshop yard. Retouch it into a clean premium catalogue image. Rules:

1. ORIENTATION: if the photo is rotated or sideways, rotate/correct it so the monument and headstone stand UPRIGHT and vertical, photographed at natural eye level from the front.
2. HERO FRAMING: make the monument the clear hero subject — large, centered, filling most of the frame. Do NOT shrink it, tilt it, or place it small in the distance. Straighten perspective to a clean frontal product view.
3. KEEP THE MONUMENT EXACTLY AS-IS — its exact shape, proportions, stone colour and texture, polish, and any carved relief/cross/ornament must stay unchanged and clearly recognizable. Do not redesign, distort, recolour, or invent the monument.
4. BACKGROUND: replace the messy yard/fence/rebar background with a clean, soft, NEUTRAL STUDIO backdrop in warm stone tones (cream / greige), a gentle vertical gradient, and a subtle soft contact shadow grounding the monument. Premium catalogue look.
5. LIGHTING: even, soft, natural light; correct exposure and white balance; tasteful warm colour grade that feels calm and respectful.
6. CLEANUP: remove any workshop inventory/price tags, stickers, chalk marks, numbers or labels placed on the stone or plot.
7. PRIVACY: subtly blur/soften any engraved NAMES, DATES and any PORTRAIT photos of the deceased so they are not legible — while keeping the lettering style and overall design visible. Do NOT add fake names or text.
8. Output a single high-quality, photorealistic image, portrait or square framing as fits the monument. No text overlays, no watermarks, no borders.`;

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);
const mimeOf = (e) => ({ ".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".heic":"image/heic" }[e.toLowerCase()] || "image/jpeg");

async function editOne(file) {
  const data = readFileSync(join(RAW, file)).toString("base64");
  const body = {
    contents: [{ role: "user", parts: [
      { text: PROMPT },
      { inline_data: { mime_type: mimeOf(extname(file)), data } },
    ]}],
    generationConfig: { responseModalities: ["IMAGE"] },
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const res = await fetch(url, { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0,200)}`);
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData || p.inline_data);
  const b64 = img?.inlineData?.data || img?.inline_data?.data;
  if (!b64) throw new Error("no image in response: " + JSON.stringify(json).slice(0,200));
  const outName = basename(file, extname(file)) + ".png";
  writeFileSync(join(OUT, outName), Buffer.from(b64, "base64"));
  return outName;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const limIdx = args.indexOf("--limit");
  const limit = limIdx >= 0 ? parseInt(args[limIdx+1], 10) : Infinity;
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

  let files = readdirSync(RAW).filter(f => exts.has(extname(f).toLowerCase()));
  if (!force) files = files.filter(f => !existsSync(join(OUT, basename(f, extname(f)) + ".png")));
  files = files.slice(0, limit);

  if (files.length === 0) { console.log("Nothing to process (use --force to redo)."); return; }
  console.log(`Processing ${files.length} photo(s) with ${MODEL}...`);

  const CONCURRENCY = 3;
  let ok = 0, fail = 0;
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (f) => {
      try { const out = await editOne(f); ok++; console.log(`  ✓ ${f} → ${out}`); }
      catch (e) { fail++; console.log(`  ✗ ${f}: ${e.message}`); }
    }));
  }
  console.log(`Done. ${ok} ok, ${fail} failed. Output: photos/edited/`);
}
main().catch(e => { console.error(e); process.exit(1); });
