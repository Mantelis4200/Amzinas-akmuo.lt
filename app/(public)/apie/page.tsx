import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apie mus — Amžinas Akmuo",
  description:
    "Sužinokite apie Amžinas Akmuo komandą: modernaus dizaino antkapiai, partnerystė su gamybos įmone Modernus Akmuo Trakuose, tiesioginis tiekimas be perpardavėjų.",
  openGraph: {
    title: "Apie mus — Amžinas Akmuo",
    description:
      "Sužinokite apie Amžinas Akmuo komandą: modernaus dizaino antkapiai, partnerystė su gamybos įmone Modernus Akmuo Trakuose, tiesioginis tiekimas be perpardavėjų.",
    url: "https://amzinasakmuo.lt/apie",
    locale: "lt_LT",
    type: "website",
  },
};

const priezastys = [
  {
    title: "Modernus dizainas",
    desc: "Mūsų paminklai sukuriami atsižvelgiant į šiuolaikines estetikas — minimalistas, geometrija, natūralios faktūros.",
  },
  {
    title: "Asmeninis vadovas",
    desc: "Kiekvienas klientas gauna asmeninį vadovą, kuris lydi nuo pirmojo pokalbio iki montavimo pabaigos.",
  },
  {
    title: "Skaidri kaina",
    desc: "Kainos aiškios prieš pradedant darbus — jokių slaptų mokesčių ar staigmenų sąskaitoje.",
  },
  {
    title: "Tiesiai iš gamyklos",
    desc: "Dirbame tiesiogiai su gamybos partnere — be tarpininkų, todėl kaina yra mažesnė, o kokybė kontroliuojama.",
  },
];

export default function ApiePage() {
  return (
    <>
      <style>{`
        .apie-hero {
          padding: 78px 0 90px;
          background: linear-gradient(170deg, var(--cream2) 0%, var(--sand) 100%);
          border-bottom: 1px solid var(--line);
        }
        .apie-hero-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .apie-hero h1 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(38px, 5vw, 62px);
          line-height: 1.06;
          letter-spacing: -.01em;
          margin: 18px 0 22px;
          max-width: 700px;
        }
        .apie-hero h1 em { font-style: italic; color: var(--clay); }
        .apie-hero .lead { font-size: 18px; color: var(--muted); max-width: 520px; }

        /* SECTION */
        .apie-section { padding: 88px 0; }
        .apie-section:nth-of-type(even) { background: var(--cream2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .apie-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .apie-wrap h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -.01em;
          margin: 10px 0 22px;
        }
        .apie-wrap p { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 720px; margin-bottom: 16px; }

        /* PARTNERIS */
        .partner-box {
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 32px;
          margin-top: 22px;
          max-width: 680px;
        }
        .partner-box h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
        .partner-box p { font-size: 14px; margin-bottom: 0; }

        /* PRIEZASTYS */
        .priezastys-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 36px; }
        .priezastys-card {
          padding: 24px 26px;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .priezastys-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
        .priezastys-card p { font-size: 14px; color: var(--muted); line-height: 1.55; margin-bottom: 0; }

        /* GARANTIJA */
        .garantija-box {
          margin-top: 22px;
          background: var(--espresso);
          color: var(--cream);
          border-radius: 14px;
          padding: 36px 32px;
          max-width: 720px;
        }
        .garantija-box h3 { font-size: 19px; font-weight: 600; margin-bottom: 10px; }
        .garantija-box p { font-size: 15px; color: rgba(247,242,234,.72); line-height: 1.65; margin-bottom: 0; }

        /* CTA SECTION */
        .cta-section { padding: 40px 0 88px; }
        .cta-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .cta-box {
          background: linear-gradient(160deg, var(--sand), var(--greige));
          border-radius: 20px;
          padding: 56px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
        }
        .cta-box h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.12;
          margin: 0;
        }
        .cta-box p { color: var(--muted); font-size: 16px; margin: 0; max-width: 520px; }

        @media (max-width: 880px) { .priezastys-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .cta-box { padding: 32px 24px; } }
      `}</style>

      {/* HERO */}
      <div className="apie-hero">
        <div className="apie-hero-wrap">
          <div className="eyebrow">Apie mus</div>
          <h1 className="font-serif">
            Kas esame ir<br />
            <em>kodėl tai svarbu</em>
          </h1>
          <p className="lead">
            Amžinas Akmuo — tai komanda, kuri kiekvienam paminklui skiria asmeninį
            dėmesį ir dirba taip, lyg tai būtų jų pačių artimieji.
          </p>
        </div>
      </div>

      {/* KAS MES ESAME */}
      <section className="apie-section">
        <div className="apie-wrap">
          <div className="eyebrow">Mūsų istorija</div>
          <h2 className="font-serif">Kas mes esame</h2>
          <p>
            Amžinas Akmuo — antkapių ir kapaviečių įrengimo įmonė, dirbanti visoje
            Lietuvoje. Mes ne tik parduodame paminklus, bet kuriame individualius
            sprendimus — nuo pirmojo pokalbio iki montavimo, su vienu asmeniniu
            vadovu visame procese.
          </p>
          <p>
            Tikime, kad kiekvienas paminklas turi atspindėti žmogų, kurio atminimui
            yra skirtas. Todėl su kiekvienu klientu dirbame asmeniš­kai: klausome,
            patariame ir kuriame tikrai unikalų dizainą.
          </p>
        </div>
      </section>

      {/* PARTNERYSTĖ */}
      <section className="apie-section">
        <div className="apie-wrap">
          <div className="eyebrow">Gamyba</div>
          <h2 className="font-serif">Partnerystė su „Modernus Akmuo"</h2>
          <p>
            Dirbame kartu su patikimu gamybos partneriu — UAB „Modernus Akmuo",
            įsikūrusiu Trakuose. Tai leidžia mums siūlyti tiesioginį akmens tiekimą
            ir apdirbimą be tarpininkų.
          </p>
          <div className="partner-box">
            <h3>Tiesioginiai privalumai jums</h3>
            <p>
              Gamyba Trakuose → transportavimas į bet kurį Lietuvos kampelį.
              Mažesnė kaina, nes nėra perpardavėjų. Kokybė kontroliuojama mūsų
              pačių — nuo akmens pjovimo iki graviravimo.
            </p>
          </div>
        </div>
      </section>

      {/* KODĖL MES */}
      <section className="apie-section">
        <div className="apie-wrap">
          <div className="eyebrow">Privalumai</div>
          <h2 className="font-serif">Kodėl renkamasi mus</h2>
          <div className="priezastys-grid">
            {priezastys.map((item) => (
              <div key={item.title} className="priezastys-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIJA */}
      <section className="apie-section">
        <div className="apie-wrap">
          <div className="eyebrow">Kokybė</div>
          <h2 className="font-serif">Garantija</h2>
          <p>
            Visi mūsų paminklai ir kapavietės įrenginiai turi garantiją — tiek akmeniui,
            tiek montavimui. Jei iškiltų bet kokių problemų garantiniu laikotarpiu,
            atykstame ir viską sutvarkome nemokamai.
          </p>
          <div className="garantija-box">
            <h3>Mūsų garantija apima</h3>
            <p>
              Granito ir marmuro paminklai — 10 metų garantija nuo gamybos defektų.
              Montavimas ir pamatai — 5 metų garantija. Graviravimas — visam laikui,
              nes naudojame lazerinę technologiją.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-wrap">
          <div className="cta-box">
            <div className="eyebrow">Susisiekite</div>
            <h2 className="font-serif">Turite klausimų?<br />Susisiekite su mumis</h2>
            <p>
              Vadovas atsakys į visus klausimus ir, jei reikia, suderins vizitą jums
              patogiu laiku — nemokamai ir be jokių įsipareigojimų.
            </p>
            <Link href="/kontaktai" className="btn btn-primary">Rašyti mums</Link>
          </div>
        </div>
      </section>
    </>
  );
}
