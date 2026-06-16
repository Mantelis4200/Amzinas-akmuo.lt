# Amžinas Akmuo svetainė — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pastatyti `amzinasakmuo.lt` — modernaus dizaino antkapių brando svetainę su užklausų forma, kainos skaičiuokle ir uždara leadų valdymo sritimi (CRM).

**Architecture:** Viena Next.js (App Router) aplikacija Vercel'e. Vieši puslapiai + `/admin` toje pačioje app'oje. Leadai saugomi Neon Postgres per Prisma; pranešimai per Resend; admin auth per NextAuth (credentials). Logika (kainos skaičiavimas, validacija) padengta unit testais (Vitest); vizualiniai puslapiai tikrinami naršyklėje.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Prisma + Neon Postgres, NextAuth, Resend, Zod, Vitest. Fontai: Fraunces + Hanken Grotesk.

**Spec:** `docs/superpowers/specs/2026-06-16-amzinasakmuo-website-design.md`

---

## File Structure

```
app/
├─ layout.tsx                  root layout (fontai, metadata)
├─ globals.css                 Tailwind + tema (CSS kintamieji)
├─ (public)/
│   ├─ layout.tsx              Header + Footer
│   ├─ page.tsx                Pradinis
│   ├─ paslaugos/antkapiai/page.tsx
│   ├─ paslaugos/restauravimas/page.tsx
│   ├─ paslaugos/kapavieciu-irengimas/page.tsx
│   ├─ darbai/page.tsx
│   ├─ apie/page.tsx
│   └─ kontaktai/page.tsx
├─ admin/
│   ├─ layout.tsx              admin shell (apsaugotas)
│   ├─ page.tsx                leadų sąrašas + detalė (drawer)
│   └─ login/page.tsx          prisijungimas
├─ api/auth/[...nextauth]/route.ts
└─ actions/submitLead.ts       server action
lib/
├─ db.ts                       Prisma klientas (singleton)
├─ auth.ts                     NextAuth config
├─ email.ts                    Resend wrapper
├─ validation.ts               Zod schemos
├─ pricing.ts                  skaičiuoklės formulė (CFG + calcPrice)
└─ stone-data.ts               akmenys + medžiagų gidas (kode)
components/
├─ ui/{Button,Input,Select,Field}.tsx
├─ Header.tsx  Footer.tsx
├─ LeadForm.tsx               užklausos forma (server action)
├─ Calculator.tsx             kainos skaičiuoklė
├─ Gallery.tsx  BeforeAfter.tsx  Process.tsx  Testimonials.tsx  ServiceCard.tsx
└─ admin/{LeadTable,LeadDrawer,StatusBadge,Stats}.tsx
middleware.ts                 /admin/* apsauga
prisma/schema.prisma
test/                         Vitest testai
```

---

## Phase 0 — Projekto pamatas

### Task 0.1: Inicializuoti Next.js projektą

**Files:** visas projektas (`/Users/mantelis/amzinas-akmuo`)

- [ ] **Step 1: Sukurti Next.js app į esamą katalogą**

Run:
```bash
cd /Users/mantelis/amzinas-akmuo
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*" --no-turbopack
```
(Jei klausia dėl esamų failų — leisti perrašyti; `.git`, `docs/`, `.gitignore` išliks.)

- [ ] **Step 2: Patikrinti, kad paleidžiamas**

Run: `npm run dev` → atidaryti http://localhost:3000
Expected: Next.js welcome puslapis.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js app"
```

### Task 0.2: Įdiegti priklausomybes ir testavimą

- [ ] **Step 1: Įdiegti paketus**

Run:
```bash
npm i @prisma/client zod resend next-auth bcryptjs
npm i -D prisma vitest @vitejs/plugin-react jsdom @types/bcryptjs
```

- [ ] **Step 2: Vitest konfigūracija**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true },
  resolve: { alias: { "@": "/Users/mantelis/amzinas-akmuo" } },
});
```

- [ ] **Step 3: Pridėti test skriptą į `package.json`**

```json
"scripts": { "test": "vitest run", "test:watch": "vitest" }
```

- [ ] **Step 4: Smoke testas**

Create `test/smoke.test.ts`:
```ts
import { expect, test } from "vitest";
test("vitest works", () => { expect(1 + 1).toBe(2); });
```
Run: `npm test` → Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: add deps, prisma, vitest"
```

### Task 0.3: Aplinkos kintamieji

- [ ] **Step 1:** Create `.env.local` (NEkommitinamas — jau `.gitignore`):
```
DATABASE_URL="postgresql://...neon...?sslmode=require"   # Neon, ES regionas
RESEND_API_KEY="re_..."
LEAD_NOTIFY_TO="savininkas@...,partneris@..."
LEAD_NOTIFY_FROM="Amžinas Akmuo <info@amzinasakmuo.lt>"
NEXTAUTH_SECRET="<openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
```
- [ ] **Step 2:** Create `.env.example` su tais pačiais raktais be reikšmių; commit.
```bash
git add .env.example && git commit -m "chore: env example"
```

> **Pastaba:** Neon, Resend, Vercel accountai registruojami SAVININKO vardu (spec §3).

---

## Phase 1 — Tema, layout, UI primityvai

### Task 1.1: Tema ir fontai

**Files:** Create `app/globals.css`, Modify `app/layout.tsx`

- [ ] **Step 1:** `app/layout.tsx` — užkrauti fontus per `next/font/google` (Fraunces, Hanken Grotesk), priskirti CSS kintamuosius `--font-serif`, `--font-sans`; nustatyti `<html lang="lt">` ir bazinę metadata.

- [ ] **Step 2:** `app/globals.css` — Tailwind v4 + temos kintamieji (iš patvirtinto maketo):
```css
@import "tailwindcss";
:root{
  --cream:#F7F2EA; --cream2:#FCF8F1; --sand:#EDE4D5; --greige:#E0D5C3;
  --espresso:#2B2520; --muted:#6E6357; --clay:#B0764F; --clay-deep:#8C5A36;
  --line:rgba(43,37,32,.13);
}
body{background:var(--cream);color:var(--espresso);font-family:var(--font-sans);}
.font-serif{font-family:var(--font-serif);}
/* grain overlay, .btn, .eyebrow utilities — perkelti iš maketo homepage-A-warm.html */
```
Maketas su pilnu CSS: `.superpowers/brainstorm/77786-1781616438/content/homepage-A-warm.html`.

- [ ] **Step 3: Verify** `npm run dev` → fonai/spalvos matosi.
- [ ] **Step 4: Commit** `git commit -am "feat: theme + fonts"`

### Task 1.2: UI primityvai

**Files:** Create `components/ui/Button.tsx`, `Input.tsx`, `Select.tsx`, `Field.tsx`

- [ ] **Step 1:** `Button.tsx` — variantai `primary` (espresso, hover clay) ir `ghost` (border), pill forma, `asChild`/`href` palaikymas per `<Link>`/`<button>`.
- [ ] **Step 2:** `Input.tsx`, `Select.tsx`, `Field.tsx` (label + error) — stilius iš maketo `.mini-form` input'ų.
- [ ] **Step 3: Verify** sukurti laikiną `/ui-check` arba importuoti į pradinį; vizualiai patikrinti; pašalinti.
- [ ] **Step 4: Commit** `git commit -am "feat: ui primitives"`

### Task 1.3: Header su „Paslaugos" dropdown + Footer

**Files:** Create `components/Header.tsx`, `components/Footer.tsx`, `app/(public)/layout.tsx`

- [ ] **Step 1:** `Header.tsx` — sticky, logo „Amžinas·Akmuo", meniu: Pradinis · **Paslaugos ▾** (dropdown: Antkapiai / Restauravimas / Kapaviečių įrengimas) · Darbai · Apie · Kontaktai; dešinėje telefonas + „Gauti pasiūlymą". Mobiliajame — burger su „Paslaugos" accordion. Dropdown: hover (desktop) + click (mobile).
- [ ] **Step 2:** `Footer.tsx` — 4 stulpeliai (brandas, paslaugos, apie, kontaktai) iš maketo.
- [ ] **Step 3:** `app/(public)/layout.tsx` — apgaubia `children` Header + Footer.
- [ ] **Step 4: Verify** navigacija ir dropdown veikia desktop + mobile (DevTools).
- [ ] **Step 5: Commit** `git commit -am "feat: header w/ services dropdown + footer"`

---

## Phase 2 — Leadų backend (DB + validacija + server action + email)

### Task 2.1: Prisma schema + DB klientas

**Files:** Create `prisma/schema.prisma`, `lib/db.ts`

- [ ] **Step 1:** `prisma/schema.prisma`:
```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum ServiceType { ANTKAPIS RESTAURAVIMAS KAPAVIETES_IRENGIMAS KITA }
enum LeadStatus  { NAUJAS SUSISIEKTA PASIULYMAS LAIMETA PRARASTA }

model Lead {
  id          String      @id @default(uuid())
  createdAt   DateTime    @default(now())
  name        String
  phone       String
  email       String?
  serviceType ServiceType
  message     String
  source      String      @default("/")
  status      LeadStatus  @default(NAUJAS)
  notes       String      @default("")
}

model User {
  id       String @id @default(uuid())
  email    String @unique
  password String   // bcrypt hash
  name     String
}
```
- [ ] **Step 2:** `lib/db.ts` — Prisma singleton (globalThis cache dev'ui).
- [ ] **Step 3:** Migracija:
```bash
npx prisma migrate dev --name init
```
Expected: lentelės sukurtos Neon DB.
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: prisma schema + db client"`

### Task 2.2: Zod validacija (TDD)

**Files:** Create `lib/validation.ts`, `test/validation.test.ts`

- [ ] **Step 1: Failing test** `test/validation.test.ts`:
```ts
import { expect, test } from "vitest";
import { leadSchema } from "@/lib/validation";

test("priima teisingą leadą", () => {
  const r = leadSchema.safeParse({ name:"Jonas", phone:"+37060000000", serviceType:"ANTKAPIS", message:"Domina", website:"" });
  expect(r.success).toBe(true);
});
test("atmeta be telefono", () => {
  const r = leadSchema.safeParse({ name:"Jonas", phone:"", serviceType:"ANTKAPIS", message:"x", website:"" });
  expect(r.success).toBe(false);
});
test("honeypot užpildytas => atmeta", () => {
  const r = leadSchema.safeParse({ name:"J", phone:"+37060000000", serviceType:"ANTKAPIS", message:"x", website:"bot" });
  expect(r.success).toBe(false);
});
```
- [ ] **Step 2: Run** `npx vitest run test/validation.test.ts` → FAIL (modulio nėra).
- [ ] **Step 3: Implement** `lib/validation.ts`:
```ts
import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  serviceType: z.enum(["ANTKAPIS","RESTAURAVIMAS","KAPAVIETES_IRENGIMAS","KITA"]),
  message: z.string().min(1),
  source: z.string().default("/"),
  website: z.literal(""),          // honeypot: turi būti tuščias
});
export type LeadInput = z.infer<typeof leadSchema>;
```
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: lead validation (zod) + tests"`

### Task 2.3: Email wrapper

**Files:** Create `lib/email.ts`

- [ ] **Step 1:** `lib/email.ts` — `sendLeadNotification(lead)` per Resend, naudoja `LEAD_NOTIFY_TO/FROM`. Funkcija **negali mesti** klaidos aukštyn taip, kad sugriautų užklausą — `try/catch`, klaidą `console.error` ir grąžina `{ok:false}`.
```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendLeadNotification(l:{name:string;phone:string;email?:string|null;serviceType:string;message:string;source:string}){
  try{
    await resend.emails.send({
      from: process.env.LEAD_NOTIFY_FROM!,
      to: process.env.LEAD_NOTIFY_TO!.split(","),
      subject: `Naujas leadas: ${l.name} (${l.serviceType})`,
      text: `Vardas: ${l.name}\nTel: ${l.phone}\nEl.p: ${l.email||"-"}\nPaslauga: ${l.serviceType}\nŠaltinis: ${l.source}\n\n${l.message}`,
    });
    return { ok:true };
  }catch(e){ console.error("Resend fail", e); return { ok:false }; }
}
```
- [ ] **Step 2: Commit** `git add -A && git commit -m "feat: resend email wrapper"`

### Task 2.4: `submitLead` server action (TDD logikai)

**Files:** Create `app/actions/submitLead.ts`, `test/submitLead.test.ts`

- [ ] **Step 1: Failing test** — testuojam, kad (a) blogi duomenys grąžina klaidą, (b) geri duomenys kviečia DB `create` ir email; mockinam `lib/db` ir `lib/email`:
```ts
import { expect, test, vi, beforeEach } from "vitest";
vi.mock("@/lib/db", () => ({ db:{ lead:{ create: vi.fn(async ({data})=>({id:"1",...data})) } } }));
vi.mock("@/lib/email", () => ({ sendLeadNotification: vi.fn(async()=>({ok:true})) }));
import { submitLead } from "@/app/actions/submitLead";
import { db } from "@/lib/db";

const fd = (o:Record<string,string>) => { const f=new FormData(); Object.entries(o).forEach(([k,v])=>f.set(k,v)); return f; };
beforeEach(()=>vi.clearAllMocks());

test("blogi duomenys => error, DB nekviečiamas", async () => {
  const r = await submitLead({ ok:false }, fd({ name:"", phone:"", serviceType:"ANTKAPIS", message:"", website:"" }));
  expect(r.ok).toBe(false);
  expect(db.lead.create).not.toHaveBeenCalled();
});
test("geri duomenys => DB create + ok", async () => {
  const r = await submitLead({ ok:false }, fd({ name:"Jonas", phone:"+37060000000", serviceType:"ANTKAPIS", message:"Domina", source:"/antkapiai", website:"" }));
  expect(db.lead.create).toHaveBeenCalledOnce();
  expect(r.ok).toBe(true);
});
test("email kritimas neblokuoja leado", async () => {
  const { sendLeadNotification } = await import("@/lib/email");
  (sendLeadNotification as any).mockResolvedValueOnce({ ok:false });
  const r = await submitLead({ ok:false }, fd({ name:"Jonas", phone:"+37060000000", serviceType:"ANTKAPIS", message:"x", website:"" }));
  expect(r.ok).toBe(true); // leadas išsaugotas net jei email krito
});
```
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** `app/actions/submitLead.ts`:
```ts
"use server";
import { leadSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

export type LeadState = { ok:boolean; error?:string };
export async function submitLead(_prev:LeadState, fd:FormData):Promise<LeadState>{
  const parsed = leadSchema.safeParse(Object.fromEntries(fd));
  if(!parsed.success) return { ok:false, error:"Patikrinkite laukus." };
  const { website, ...data } = parsed.data;          // honeypot pašalinam
  await db.lead.create({ data: { ...data, email: data.email || null } });
  await sendLeadNotification(data);                   // klaida viduj sugaudyta
  return { ok:true };
}
```
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: submitLead server action + tests"`

### Task 2.5: `LeadForm` komponentas

**Files:** Create `components/LeadForm.tsx`

- [ ] **Step 1:** Client komponentas su `useActionState(submitLead, {ok:false})`; laukai: name, phone, email, serviceType (Select), message; paslėptas honeypot `website` (CSS-hidden); paslėptas `source` (prop). Sėkmės būsena → padėkos žinutė. Klaida → `state.error`. Priima `defaultMessage`/`defaultService` props (skaičiuoklės prefill).
- [ ] **Step 2: Verify** įdėti į `/kontaktai` (laikinai) ir nusiųsti testinį leadą → patikrinti DB (`npx prisma studio`) + ar atėjo email.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: LeadForm component"`

---

## Phase 3 — Kainos skaičiuoklė

### Task 3.1: Skaičiavimo logika (TDD)

**Files:** Create `lib/pricing.ts`, `lib/stone-data.ts`, `test/pricing.test.ts`

- [ ] **Step 1: Failing test** `test/pricing.test.ts`:
```ts
import { expect, test } from "vitest";
import { calcPrice } from "@/lib/pricing";

test("tūrio formulė: 100x50x10 cm, pilkas", () => {
  // 1.0*0.5*0.1 = 0.05 m³; stone=0.05*3200=160; work=160*0.9=144; base=180; =484 -> apvalinta iki 10
  expect(calcPrice({ l:100, w:50, t:10, stone:"pilkas" })).toBe(480);
});
test("juodas brangesnis už pilką tiems patiems matmenims", () => {
  const dims = { l:80, w:60, t:8 } as const;
  expect(calcPrice({ ...dims, stone:"juodas" })).toBeGreaterThan(calcPrice({ ...dims, stone:"pilkas" }));
});
```
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** `lib/stone-data.ts` (akmenys, kode) + `lib/pricing.ts`:
```ts
// lib/pricing.ts
export const CFG = {                       // PLACEHOLDER — pakeisti tiekėjo instrukcijomis
  pricePerM3: { pilkas:3200, juodas:5200, rudas:4400, marmuras:3800 } as const,
  workMultiplier: 0.9,
  baseFee: 180,
};
export type StoneId = keyof typeof CFG.pricePerM3;
export function calcPrice({ l, w, t, stone }:{ l:number; w:number; t:number; stone:StoneId }):number{
  const m3 = (l/100)*(w/100)*(t/100);
  const stoneCost = m3 * CFG.pricePerM3[stone];
  const total = stoneCost + stoneCost*CFG.workMultiplier + CFG.baseFee;
  return Math.round(total/10)*10;
}
```
```ts
// lib/stone-data.ts
import type { StoneId } from "./pricing";
export const STONES:{ id:StoneId; name:string; color:string }[] = [
  { id:"pilkas", name:"Pilkas granitas", color:"#8d8a85" },
  { id:"juodas", name:"Juodas granitas", color:"#2c2c2e" },
  { id:"rudas",  name:"Rudas granitas",  color:"#6e4a3f" },
  { id:"marmuras", name:"Šviesus / marmuras", color:"#d8d3ca" },
];
```
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: pricing logic + stone data + tests"`

### Task 3.2: `Calculator` komponentas

**Files:** Create `components/Calculator.tsx`

- [ ] **Step 1:** Client komponentas — slankikliai (ilgis/plotis/storis), akmens swatch'ai (`STONES`), gyvas rezultatas per `calcPrice`. „Užklausti tikslios kainos" mygtukas → nuvedа į `LeadForm` su prefill (`serviceType=ANTKAPIS`, `message="Domina antkapis: LxWxT cm, {akmuo}, nuo €X"`). UI iš maketo `presetai-skaiciuokle.html` (skaičiuoklės dalis, BE presetų).
- [ ] **Step 2: Verify** naršyklėje — slankikliai/akmuo keičia kainą; prefill veikia.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: price calculator component"`

---

## Phase 4 — Vieši puslapiai

> Bendri sekciniai komponentai pirmiausia, tada puslapiai. Vizualus tikrinimas naršyklėje (ne unit testai). Nuotraukos — placeholder blokai (spec §11), pakeičiami vėliau.

### Task 4.1: Sekciniai komponentai

**Files:** Create `components/{Process,Testimonials,Gallery,BeforeAfter,ServiceCard}.tsx`

- [ ] **Step 1:** `Process.tsx` (5 žingsniai, tamsus blokas), `Testimonials.tsx` (citata), `Gallery.tsx` (grid placeholder), `BeforeAfter.tsx` (prieš/po placeholder), `ServiceCard.tsx`. Stilius iš `homepage-A-warm.html`.
- [ ] **Step 2: Verify** laikinai sudėti į pradinį; vizualiai ok.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: section components"`

### Task 4.2: Pradinis puslapis

**Files:** Modify `app/(public)/page.tsx`

- [ ] **Step 1:** Sekcijos: Hero · pasitikėjimo juosta · paslaugos (3 `ServiceCard`) · `Gallery` preview · `Process` · `Testimonials` · CTA su `LeadForm` (`source="/"`) · (Footer iš layout). Markup/stilius iš `homepage-A-warm.html`.
- [ ] **Step 2: Verify** naršyklėje desktop + mobile.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: homepage"`

### Task 4.3: Antkapių puslapis

**Files:** Create `app/(public)/paslaugos/antkapiai/page.tsx`

- [ ] **Step 1:** Struktūra (spec §4.1): Hero → Medžiagų gidas (`STONES`) → Dizainų galerija (`Gallery`) → `Calculator` → `Process` → `Testimonials` → CTA (`LeadForm source="/paslaugos/antkapiai"`).
- [ ] **Step 2: Verify** + skaičiuoklė veikia šiame puslapyje.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: antkapiai page"`

### Task 4.4: Restauravimo puslapis

**Files:** Create `app/(public)/paslaugos/restauravimas/page.tsx`

- [ ] **Step 1:** Hero → `BeforeAfter` galerija → „Ką restauruojam" (sąrašas) → `Process` → `Testimonials` → CTA (`source="/paslaugos/restauravimas"`).
- [ ] **Step 2: Verify** → **Step 3: Commit** `git commit -am "feat: restauravimas page"`

### Task 4.5: Kapaviečių įrengimo puslapis

**Files:** Create `app/(public)/paslaugos/kapavieciu-irengimas/page.tsx`

- [ ] **Step 1:** Hero → Darbai (`ServiceCard` kortelės: pamatai, borteliai, trinkelės, dekoras, montavimas) → `Gallery` → `Process` → CTA (`source="/paslaugos/kapavieciu-irengimas"`).
- [ ] **Step 2: Verify** → **Step 3: Commit** `git commit -am "feat: kapavieciu-irengimas page"`

### Task 4.6: Darbai, Apie, Kontaktai

**Files:** Create `app/(public)/darbai/page.tsx`, `apie/page.tsx`, `kontaktai/page.tsx`

- [ ] **Step 1:** `darbai` — `Gallery` su filtru (nauji/restauruoti); `apie` — brandas, partnerystė su Modernus Akmuo, kodėl mes, garantija; `kontaktai` — `LeadForm` (`source="/kontaktai"`) + telefonas + veikimo zona.
- [ ] **Step 2: Verify** visi 3 puslapiai + nav nuorodos.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: darbai/apie/kontaktai pages"`

---

## Phase 5 — Admin / CRM

### Task 5.1: NextAuth + middleware apsauga

**Files:** Create `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`, `app/admin/login/page.tsx`

- [ ] **Step 1:** `lib/auth.ts` — NextAuth Credentials provider: randa `User` pagal email, lygina `bcrypt.compare`. Sesija — JWT.
- [ ] **Step 2:** `route.ts` — `export { handlers }`/`GET,POST` iš auth config.
- [ ] **Step 3:** `middleware.ts` — `matcher: ["/admin/:path*"]`; jei nėra sesijos ir kelias ≠ `/admin/login` → redirect į `/admin/login`.
- [ ] **Step 4:** `app/admin/login/page.tsx` — prisijungimo forma (`signIn("credentials")`).
- [ ] **Step 5: Seed user** — sukurti scriptą `prisma/seed.ts`, kuris įrašo 2 vartotojus su `bcrypt.hash` (slaptažodžiai iš env/CLI). Run: `npx tsx prisma/seed.ts`.
- [ ] **Step 6: Verify** `/admin` be sesijos → meta į login; prisijungus → praleidžia.
- [ ] **Step 7: Commit** `git add -A && git commit -m "feat: admin auth + middleware"`

### Task 5.2: Leadų sąrašas + statistika

**Files:** Create `app/admin/page.tsx`, `components/admin/{LeadTable,StatusBadge,Stats}.tsx`

- [ ] **Step 1:** `app/admin/page.tsx` (server component) — `db.lead.findMany({orderBy:{createdAt:"desc"}})`; perduoda į `LeadTable`. `Stats` — šio mėn. naujų / laimėta / konversija (skaičiuojama iš leadų).
- [ ] **Step 2:** `LeadTable` — stulpeliai Data/Vardas/Telefonas/Paslauga/Statusas(`StatusBadge` spalvos)/Šaltinis; filtrai (statusas, paslauga), paieška (client-side). Eilutė atidaro `LeadDrawer`.
- [ ] **Step 3: Verify** sąrašas rodo testinius leadus, filtrai veikia.
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: admin leads list + stats"`

### Task 5.3: Leado detalė (drawer) — statusas + notes

**Files:** Create `components/admin/LeadDrawer.tsx`, `app/actions/updateLead.ts`

- [ ] **Step 1: Failing test** `test/updateLead.test.ts` — `updateLeadStatus(id,status)` ir `updateLeadNotes(id,notes)` kviečia `db.lead.update` su teisingais argumentais (mock `lib/db`).
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** `app/actions/updateLead.ts` — du server actionai (`updateLeadStatus`, `updateLeadNotes`), `revalidatePath("/admin")`.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5:** `LeadDrawer.tsx` — kontaktai (telefonas `tel:` nuoroda), paslauga, žinutė, data, šaltinis; statuso `Select` (kviečia `updateLeadStatus`); `notes` textarea su debounce autosave (kviečia `updateLeadNotes`). Drawer atsidaro toje pačioje `/admin` (spec §6).
- [ ] **Step 6: Verify** statuso keitimas + notes išsaugo (perkrovus matosi); mobilus vaizdas (kortelės, `tel:`).
- [ ] **Step 7: Commit** `git add -A && git commit -m "feat: lead drawer, status + notes update"`

---

## Phase 6 — SEO ir paleidimas

### Task 6.1: Metadata, schema, sitemap

**Files:** Modify page `metadata`; Create `app/sitemap.ts`, `app/robots.ts`, `components/JsonLd.tsx`

- [ ] **Step 1:** Kiekvienam viešam puslapiui — `export const metadata` (lietuviški title/description, OG). Šaknyje — default OG vaizdas.
- [ ] **Step 2:** `JsonLd.tsx` — `LocalBusiness` schema (pavadinimas, telefonas, veikimo zona LT, paslaugos); įdėti į pradinį + kontaktus.
- [ ] **Step 3:** `app/sitemap.ts` (visi vieši URL), `app/robots.ts` (leisti viską, `Disallow: /admin`).
- [ ] **Step 4: Verify** `/sitemap.xml`, `/robots.txt`, JSON-LD per Rich Results Test.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: SEO metadata, schema, sitemap"`

### Task 6.2: Deploy į Vercel

- [ ] **Step 1:** Sukurti Vercel projektą (savininko account), prijungti repo, suvesti env kintamuosius (DATABASE_URL, RESEND_*, NEXTAUTH_*).
- [ ] **Step 2:** `npx prisma migrate deploy` per Vercel build (pridėti į build komandą arba paleisti rankiniu).
- [ ] **Step 3:** Prijungti domeną `amzinasakmuo.lt`.
- [ ] **Step 4: Verify** produkcijoje: forma → leadas DB + email; `/admin` apsaugotas ir veikia.
- [ ] **Step 5: Commit/tag** `git tag v0.1.0`

---

## Self-Review (atlikta)

- **Spec coverage:** §3 architektūra → Phase 0/2/5; §4 puslapiai → Phase 1/3/4; §4.1 struktūros → 4.3–4.5; §5 modelis → 2.1; §5.1 skaičiuoklė → Phase 3; §6 srautai → 2.4/5.x; §7 komponentai → visur; §9 SEO → Phase 6; §10 testavimas → TDD taskuose. Padengta.
- **Placeholders:** `CFG` koeficientai sąmoningai pažymėti kaip placeholder (laukia tiekėjo) — tai duomenys, ne plano spraga. Nuotraukos placeholder — spec §11.
- **Type consistency:** `ServiceType`/`LeadStatus` enums (Prisma) = Zod enum reikšmės; `StoneId` naudojamas `pricing.ts`, `stone-data.ts`, `Calculator.tsx`; `LeadState` bendras `submitLead`/`LeadForm`.

## Atviri klausimai (nestabdo, spręsti eigoje)
- Telefonas/el. paštas brandui (tiekėjo +370 616 56686 ar atskiras).
- Realios darbų nuotraukos (foto bazė).
- Tikslūs skaičiuoklės koeficientai (tiekėjo instrukcijos).
