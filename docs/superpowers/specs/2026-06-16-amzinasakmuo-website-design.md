# amzinasakmuo.lt — svetainės dizaino specifikacija

**Data:** 2026-06-16
**Projektas:** Amžinas Akmuo — modernaus dizaino antkapių ir kapaviečių įrengimo brandas
**Statusas:** patvirtinta, paruošta implementacijos planui

---

## 1. Tikslas

Sukurti svetainę `amzinasakmuo.lt`, kuri:

1. Pristato brandą „Amžinas Akmuo" ir generuoja užklausas (leadus).
2. Saugo ir leidžia valdyti leadus per uždarą admin sritį (vidinis CRM).
3. Veikia kaip pardavimų frontas: pirkėjas palieka užklausą, partneris greitai susisiekia.

Pirkėjas — dažniausiai velionio artimieji (40–65 m.), gedulo kontekste, ieško internetu. Tonas — pagarbus, ramus, modernus. Greitas atsakymas į užklausą yra pagrindinis konkurencinis pranašumas.

## 2. Apimtis (1 fazė)

**Įeina:** vieši puslapiai, užklausų forma, leadų DB, admin sritis su leadų valdymu, el. pašto pranešimai.

**Neįeina (vėlesnės fazės):** straipsnių/blog sekcija (SEO), portfolio CMS (nuotraukos kol kas kode), kainų skaičiuoklė, nuotraukų įkėlimas formoje, Telegram/SMS pranešimai, EN kalba.

## 3. Architektūra

Viena Next.js (App Router) aplikacija, talpinama Vercel. „CRM" nėra atskira sistema — tai uždari maršrutai toje pačioje aplikacijoje.

```
VERCEL (Next.js app)
├─ amzinasakmuo.lt        → vieša svetainė
└─ amzinasakmuo.lt/admin  → leadų valdymas (uždara)
        │            │
   NEON Postgres   RESEND
   (leadai, ES)    (el. laiškai)
```

- **Hostingas:** Vercel
- **DB:** Neon Postgres, **ES regionas (Frankfurtas)** — leadai yra asmens duomenys (GDPR)
- **ORM:** Prisma
- **El. paštas:** Resend
- **Auth:** NextAuth (credentials), 2 paskyros (savininkas + partneris)
- **Validacija:** Zod
- **Kalba:** tik lietuvių

**Svarbu:** visi accountai (Vercel, Neon, Resend, domenas) registruojami savininko vardu — leadų bazė yra verslo turtas, nepriklausomas nuo tiekėjo.

## 4. Svetainės struktūra (vieši puslapiai)

| Maršrutas | Paskirtis |
|---|---|
| `/` | Hero, UVP, paslaugų santrauka, darbų preview, procesas (5 žingsniai), atsiliepimai, CTA forma |
| `/paslaugos/antkapiai` | Nauji antkapiai — gamyba nuo 0, dizainai, paketai (Klasika / Modern / Premium) |
| `/paslaugos/restauravimas` | Senų paminklų atnaujinimas, „prieš / po", atskira CTA |
| `/paslaugos/kapavieciu-irengimas` | Pamatai, borteliai, trinkelės, akmenukų dekoras, komplektai |
| `/darbai` | Portfolio galerija (filtras: nauji / restauruoti) |
| `/apie` | Apie brandą, partnerystė su Modernus Akmuo, kodėl mes, garantija |
| `/kontaktai` | Užklausos forma + telefonas + veikimo zona |

**Navigacija:** Pradinis · **Paslaugos ▾** (Antkapiai / Restauravimas / Kapaviečių įrengimas) · Darbai · Apie · Kontaktai · [telefonas] · [Gauti pasiūlymą]. Mobiliajame „Paslaugos" — accordion burger meniu viduje.

**Bendri elementai:** sticky header (telefonas + CTA), footer (kontaktai, paslaugos, veikimo zona), užklausos forma pasiekiama iš visų puslapių.

## 5. Duomenų modelis

```
Lead
├─ id           uuid
├─ createdAt    datetime
├─ name         string
├─ phone        string        (privalomas)
├─ email        string?       (nebūtinas)
├─ serviceType  enum          ANTKAPIS | RESTAURAVIMAS | KAPAVIETES_IRENGIMAS | KITA
├─ message      string
├─ source       string        (puslapis, iš kurio atėjo — ads analizei)
├─ status       enum          NAUJAS | SUSISIEKTA | PASIULYMAS | LAIMETA | PRARASTA
└─ notes        string        (vidinės pastabos: miestas, biudžetas, terminas, kapinės — viskas čia)
```

Statusų eiga: `NAUJAS → SUSISIEKTA → PASIULYMAS → LAIMĖTA / PRARASTA`

`notes` yra universalus laisvo teksto laukas — atskirų struktūruotų laukų miestui/biudžetui nereikia.

**Auth:** NextAuth (credentials provider) su `User` lentele — hash'inti slaptažodžiai (bcrypt), 2 paskyros (savininkas + partneris).

## 6. Backend srautai

**Užklausa:**
1. Klientas pildo formą (vardas, telefonas, [email], paslauga, žinutė).
2. Server Action validuoja (Zod); telefonas privalomas; honeypot nuo botų; rate-limiting.
3. Įrašoma į Postgres (`status=NAUJAS`, `source=puslapis`).
4. Resend siunčia pranešimą savininkui ir partneriui.
5. Klientui rodoma padėka.

**Klaidų valdymas:** jei el. paštas krenta — leadas vis tiek išsaugomas DB (leadas neprarandamas), klaida logginama. Formos validacija rodoma prie laukų.

**Admin:**
1. `/admin` — prisijungimas. Po jo toje pačioje srityje atsidaro leadų sąrašas (atskiro maršruto leado detalei nereikia — detalė atsidaro šoniniame skydelyje / drawer toje pačioje vietoje).
2. Leadų sąrašas: filtrai (statusas, paslauga), paieška, rikiavimas pagal datą, statuso spalvoti ženkleliai.
3. Viršuje greita statistika: šio mėn. naujų / laimėta / konversija.
4. Leado detalė (drawer): kontaktai (telefonas `tel:` skambinimui), paslauga, žinutė, data, šaltinis; statuso keitimas; `notes` su autosave.
5. Mobilus vaizdas: lentelė → kortelės, telefonas paspaudus skambina (partneriui lauke).

**Apsauga:** admin maršrutai uždari per middleware (sesijos patikra).

## 7. Komponentų struktūra

```
app/
├─ (public)/        vieši puslapiai (header/footer layout)
│   ├─ page.tsx
│   ├─ paslaugos/{antkapiai,restauravimas,kapavieciu-irengimas}/page.tsx
│   ├─ darbai/page.tsx  apie/page.tsx  kontaktai/page.tsx
├─ admin/           uždara sritis (atskiras layout, middleware)
├─ actions/submitLead.ts   server action: validacija + DB + email
lib/{db,auth,email,validation}.ts
components/ui/...   LeadForm, Header, Footer, ServiceCard, Gallery, Testimonials
middleware.ts       admin apsauga
prisma/schema.prisma
```

## 8. Vizualinis dizainas

**Kryptis A — šiltas minimalizmas, modernizuotas** (patvirtinta maketu).

- **Spalvos:** kreminis fonas (`#F7F2EA`), espresso tekstas (`#2B2520`), šiltas molio/bronzos akcentas (`#B0764F`), smėlio/greige paneliai. Subtili grūdėta tekstūra.
- **Tipografija:** „Fraunces" (display serif, su kursyvu akcentams) + „Hanken Grotesk" (body sans).
- **Stilius:** daug oro, apvalūs „pill" mygtukai, sklandūs įsikrovimo animavimai (staggered), „float" kortelės, tamsus „procesas" blokas kontrastui.
- **Pradinio puslapio sekcijos:** hero · pasitikėjimo juosta · paslaugos (3 kortelės) · darbų galerija · procesas (5 žingsniai) · atsiliepimas · CTA su mini-forma · footer.

Maketas: `.superpowers/brainstorm/.../homepage-A-warm.html`. Detalės tikslinamos eigoje.

## 9. SEO / techninis

- Atskiri paslaugų puslapiai = atskiros paieškos intencijos.
- Meta tags, OG vaizdai, LocalBusiness schema (JSON-LD), sitemap, lietuviškas turinys.
- Veikimo zona: visa Lietuva, fokusas Vilnius / Trakai (montavimas iš Trakų).

## 10. Testavimas

- Užklausos formos validacija (privalomas telefonas, honeypot, klaidų rodymas).
- Server action: leadas išsaugomas net jei el. paštas krenta.
- Admin auth: neprisijungęs vartotojas nepatenka į `/admin/*`.
- Leadų filtrai / statuso keitimas / notes autosave.
- Responsyvumas (mobilus admin, tel: nuorodos).

## 11. Atviri klausimai eigai

- Tikslus telefonas / el. paštas brandui (ar naudoti tiekėjo +370 616 56686, ar atskirą).
- Realios darbų nuotraukos portfolio (reikia foto bazės).
- Paketų „nuo" kainos (priklauso nuo tiekėjo savikainos).
