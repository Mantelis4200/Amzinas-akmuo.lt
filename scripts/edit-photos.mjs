#!/usr/bin/env node
/**
 * Batch photo retoucher for Amžinas Akmuo.
 * Converts any HEIC -> JPG, then sends each raw photo to a Gemini image model
 * and writes a clean catalogue image to photos/edited/*.png
 *
 * Usage:
 *   node scripts/edit-photos.mjs            # process all not-yet-done
 *   node scripts/edit-photos.mjs --limit 3  # only first 3 (test run)
 *   node scripts/edit-photos.mjs --force    # re-do even if output exists
 * Env overrides:
 *   GEMINI_MODEL=gemini-2.5-flash-image     # cheaper/faster model
 *   OUT_DIR=edited_test                     # alternate output folder
 *   CONCURRENCY=3                           # parallel requests (default 2)
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, renameSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "photos", "raw");
const HEIC_BAK = join(ROOT, "photos", "raw_heic_original");
const OUT = join(ROOT, "photos", process.env.OUT_DIR || "edited");
const MODEL = process.env.GEMINI_MODEL || "gemini-3-pro-image"; // best quality; cheaper: gemini-2.5-flash-image
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "2", 10);
const MAX_RETRIES = 3;

// --- load GEMINI_API_KEY from env or .env.local ---
function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const env = readFileSync(join(ROOT, ".env.local"), "utf8");
  const m = env.match(/^GEMINI_API_KEY="?([^"\n]+)"?/m);
  if (!m) throw new Error("GEMINI_API_KEY not found in env or .env.local");
  return m[1];
}
const KEY = loadKey();

const PROMPT = `You are a professional product-photo retoucher for a premium gravestone/monument brand "Amžinas Akmuo".
You are given a real photo of a granite gravestone / full grave plot (kapavietė) shot in an outdoor workshop yard. Retouch it into a clean premium catalogue image. Rules:

1. ORIENTATION: if the photo is rotated or sideways, correct it so the monument and headstone stand UPRIGHT and vertical, photographed at natural eye level from the front.
2. HERO FRAMING: make the monument the clear hero subject — large, centered, filling most of the frame. Do NOT shrink it, tilt it, or place it small in the distance. Straighten perspective to a clean frontal product view.
3. KEEP THE MONUMENT EXACTLY AS-IS — its exact shape, proportions, stone colour and texture, polish, and any carved relief/cross/ornament must stay unchanged and clearly recognizable. Do not redesign, distort, recolour, or invent any part of the monument.
4. BACKGROUND: replace the messy yard/fence/rebar/pavement background with a clean, soft, NEUTRAL STUDIO backdrop in warm stone tones (cream / greige), a gentle vertical gradient, and a subtle soft contact shadow grounding the monument. Premium catalogue look.
5. LIGHTING: even, soft, natural light; correct exposure and white balance; tasteful warm colour grade that feels calm and respectful.
6. CLEANUP: remove any workshop inventory/price tags, stickers, chalk marks, numbers or labels placed on the stone or plot. Remove stray tools, hoses, pallets, debris.
7. PRIVACY: subtly blur/soften any engraved NAMES, DATES and any PORTRAIT photos of the deceased so they are not legible — while keeping the lettering style and overall design visible. Do NOT add any fake names, dates or text.
8. ASPECT RATIO: choose the framing that fits the monument's real proportions — a vertical/portrait frame for tall headstones, a wider/landscape frame for low monuments or full grave plots (kapavietė). The monument should fill most of the frame with comfortable, even margins; avoid large empty areas of background.
9. CONSISTENCY: always use the same calm neutral warm backdrop and the same soft even lighting, so a whole set of these images looks like one cohesive professional catalogue.
10. OUTPUT: a single high-quality, photorealistic image. No text overlays, no watermarks, no borders, no added props.`;

const API_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]); // sent to API (HEIC converted first)
const mimeOf = (e) => ({ ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".webp":"image/webp" }[e.toLowerCase()] || "image/jpeg");
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Convert any HEIC in raw/ to JPG (macOS sips), move originals to raw_heic_original/
function convertHeic() {
  const heics = readdirSync(RAW).filter(f => /\.heic$/i.test(f));
  if (heics.length === 0) return;
  if (!existsSync(HEIC_BAK)) mkdirSync(HEIC_BAK, { recursive: true });
  for (const f of heics) {
    const out = basename(f, extname(f)) + ".jpg";
    try {
      execFileSync("sips", ["-s", "format", "jpeg", join(RAW, f), "--out", join(RAW, out)], { stdio: "ignore" });
      renameSync(join(RAW, f), join(HEIC_BAK, f));
      console.log(`  HEIC→JPG: ${f} → ${out}`);
    } catch (e) {
      console.log(`  ! HEIC convert failed for ${f}: ${e.message}`);
    }
  }
}

async function callApi(file) {
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
  if (!res.ok) {
    const txt = (await res.text()).slice(0, 200);
    const err = new Error(`HTTP ${res.status}: ${txt}`);
    err.retryable = [429, 500, 502, 503, 504].includes(res.status);
    throw err;
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData || p.inline_data);
  const b64 = img?.inlineData?.data || img?.inline_data?.data;
  if (!b64) throw new Error("no image in response: " + JSON.stringify(json).slice(0, 200));
  return b64;
}

async function editOne(file) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const b64 = await callApi(file);
      const outName = basename(file, extname(file)) + ".png";
      writeFileSync(join(OUT, outName), Buffer.from(b64, "base64"));
      return outName;
    } catch (e) {
      lastErr = e;
      if (!e.retryable || attempt === MAX_RETRIES) break;
      const wait = 1500 * attempt;
      console.log(`    ↻ ${file}: ${e.message.slice(0,60)} — retry in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const limIdx = args.indexOf("--limit");
  const limit = limIdx >= 0 ? parseInt(args[limIdx+1], 10) : Infinity;
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

  convertHeic();

  let files = readdirSync(RAW).filter(f => API_EXTS.has(extname(f).toLowerCase()));
  if (!force) files = files.filter(f => !existsSync(join(OUT, basename(f, extname(f)) + ".png")));
  files = files.slice(0, limit);

  if (files.length === 0) { console.log("Nothing to process (use --force to redo)."); return; }
  console.log(`Processing ${files.length} photo(s) with ${MODEL} (concurrency ${CONCURRENCY})...`);

  let ok = 0, fail = 0;
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (f) => {
      try { const out = await editOne(f); ok++; console.log(`  ✓ ${f} → ${out}`); }
      catch (e) { fail++; console.log(`  ✗ ${f}: ${e.message}`); }
    }));
  }
  console.log(`Done. ${ok} ok, ${fail} failed. Output: photos/${process.env.OUT_DIR || "edited"}/`);
}
main().catch(e => { console.error(e); process.exit(1); });
