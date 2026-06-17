# Amžinas Akmuo — logotipai

## ✅ Galutinis logotipas: AA monograma (Solid)

Pasirinkta variacija — **užpildytas (solid) AA badge + wordmark**.

### Kanoninės naudojamos versijos
Servinamos ir parsisiunčiamos iš `public/` (prieinamos `https://…/logo.svg` ir t.t.):

| Failas | Naudojimas |
|---|---|
| `public/logo.svg` | Pagrindinis (šviesiam fonui) — horizontalus badge + wordmark |
| `public/logo-dark.svg` | Tamsiam fonui (inversija) |
| `public/logo-icon.svg` | Tik AA ženklas (avataras, app ikona) |
| `app/icon.svg` | Favikona (Next.js automatiškai) |

### Svetainėje (kode)
Naudok React komponentą **`components/Logo.tsx`** — jis renderina inline SVG su svetainės Fraunces fontu:
```tsx
<Logo href="/" height={44} />        // header
<Logo height={48} />                 // footer
<Logo variant="dark" />              // tamsiame fone
<Logo iconOnly />                    // tik ženklas
```

## Spalvos
- Espresso `#2B2520` · Cream `#F7F2EA` · Clay (akcentas) `#B0764F`
- Šviesi versija: espresso badge, kreminės raidės. Tamsi: kreminis badge, espresso raidės. Antra „A" ir „Akmuo" — visada molio akcentas. Plonas apvadas abiejose.

## Fontas
Fraunces (display serif). Standalone SVG failuose įdėtas `@import` iš Google Fonts — atsidarius naršyklėje renderinasi teisingai (reikia interneto). Print/offline poreikiams tekstą reikėtų konvertuoti į kreives (outlines).

## Variantai / koncepcijos (archyvas)
- `logo-aa-{solid,outline,circle}-{light,dark}.svg` — AA monogramos variacijos (pasirinkta: solid)
- `logo-1..5.svg` — pirmas konceptų rinkinys
- `logo-idea-1..3.svg` — papildomos koncepcijos (arka / įraiža / briaunos)
- `preview*.html` — peržiūros puslapiai
- Generatoriai: `scripts/generate-logo-aa.mjs` (galutinis), `generate-logos.mjs`, `generate-logos-ideas.mjs`
