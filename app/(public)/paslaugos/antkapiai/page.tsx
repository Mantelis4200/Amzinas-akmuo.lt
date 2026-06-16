import type { Metadata } from "next";
import Link from "next/link";
import { STONES } from "@/lib/stone-data";
import { Gallery } from "@/components/Gallery";
import { Calculator } from "@/components/Calculator";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Antkapiai — individualaus dizaino paminklai",
  description:
    "Gaminame individualaus dizaino antkapius iš granito ir marmuro tiesiai iš savo gamyklos. Modernios formos, graviravimas, garantija. Visa Lietuva.",
  openGraph: {
    title: "Antkapiai — individualaus dizaino paminklai | Amžinas Akmuo",
    description:
      "Gaminame individualaus dizaino antkapius iš granito ir marmuro tiesiai iš savo gamyklos. Modernios formos, graviravimas, garantija. Visa Lietuva.",
    url: "https://amzinasakmuo.lt/paslaugos/antkapiai",
    locale: "lt_LT",
    type: "website",
  },
};

// Stone notes shown in the guide
const stoneNotes: Record<string, string> = {
  pilkas: "Klasikinis, atsparus, universalus pasirinkimas — tinka bet kuriam dizainui.",
  juodas: "Elegantiška išvaizda, ryškus graviravimas, labai ilgaamžis.",
  rudas: "Šiltas tonas, unikalus raštų žaismas — tinka gamtos stiliui.",
  marmuras: "Šviesus, kietas, išskirtinis — tinkamas moderniai minimalistinei estetikai.",
};

export default function AntkapiaiPage() {
  return (
    <>
      <style>{`
        .page-hero {
          padding: 78px 0 90px;
          background: linear-gradient(170deg, var(--cream2) 0%, var(--sand) 100%);
          border-bottom: 1px solid var(--line);
        }
        .page-hero-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .page-hero h1 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(38px, 5vw, 62px);
          line-height: 1.06;
          letter-spacing: -.01em;
          margin: 18px 0 22px;
          max-width: 700px;
        }
        .page-hero h1 em { font-style: italic; color: var(--clay); }
        .page-hero .lead { font-size: 18px; color: var(--muted); max-width: 520px; margin-bottom: 32px; }

        /* STONES GUIDE */
        .stones-section { padding: 88px 0; }
        .stones-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .stones-head { margin-bottom: 42px; }
        .stones-head h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -.01em;
          margin-top: 10px;
        }
        .stones-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stone-card {
          background: var(--cream2);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .stone-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -24px rgba(60, 48, 36, .45);
        }
        .stone-swatch {
          height: 100px;
          width: 100%;
        }
        .stone-card-body { padding: 16px 18px; }
        .stone-card-body h3 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--espresso);
        }
        .stone-card-body p { font-size: 13px; color: var(--muted); line-height: 1.5; }

        /* CTA SECTION */
        .cta-section { padding: 40px 0 88px; }
        .cta-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .cta-box {
          background: linear-gradient(160deg, var(--sand), var(--greige));
          border-radius: 20px;
          padding: 56px;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 40px;
          align-items: center;
        }
        .cta-box h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.12;
        }
        .cta-box p { color: var(--muted); margin: 14px 0 0; font-size: 15px; }

        @media (max-width: 880px) {
          .stones-grid { grid-template-columns: repeat(2, 1fr); }
          .cta-box { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .stones-grid { grid-template-columns: 1fr; }
          .cta-box { padding: 32px 24px; }
        }
      `}</style>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-wrap">
          <div className="eyebrow">Paslaugos · Antkapiai</div>
          <h1 className="font-serif">
            Individualaus dizaino<br />
            antkapiai, <em>tiesiai iš gamyklos</em>
          </h1>
          <p className="lead">
            Granitas, marmuras, modernios formos ir tikslus graviravimas —
            kiekvienam paminklui skiriame asmeninį vadovą nuo eskizo iki montavimo.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/kontaktai" className="btn btn-primary">Gauti pasiūlymą</Link>
            <Link href="/darbai" className="btn btn-ghost">Peržiūrėti darbus</Link>
          </div>
        </div>
      </div>

      {/* MEDŽIAGŲ GIDAS */}
      <section className="stones-section">
        <div className="stones-wrap">
          <div className="stones-head">
            <div className="eyebrow">Medžiagos</div>
            <h2 className="font-serif">Medžiagų gidas</h2>
          </div>
          <div className="stones-grid">
            {STONES.map((stone) => (
              <div key={stone.id} className="stone-card">
                <div
                  className="stone-swatch"
                  style={{ background: stone.color }}
                  aria-hidden="true"
                />
                <div className="stone-card-body">
                  <h3>{stone.name}</h3>
                  <p>{stoneNotes[stone.id]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIJA */}
      <section style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 42, gap: 24 }}>
            <div>
              <div className="eyebrow">Darbai</div>
              <h2 className="font-serif" style={{ fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1, letterSpacing: "-.01em", marginTop: 10 }}>
                Mūsų antkapiai
              </h2>
            </div>
            <Link href="/darbai" className="btn btn-ghost">Visi darbai</Link>
          </div>
        </div>
        <Gallery count={8} />
      </section>

      {/* SKAIČIUOTUVAS */}
      <section style={{ padding: "88px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ marginBottom: 42 }}>
            <div className="eyebrow">Kaina</div>
            <h2 className="font-serif" style={{ fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1, letterSpacing: "-.01em", marginTop: 10 }}>
              Preliminari kaina
            </h2>
          </div>
          <Calculator />
        </div>
      </section>

      {/* PROCESAS */}
      <Process />

      {/* ATSILIEPIMAI */}
      <Testimonials />

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-wrap">
          <div className="cta-box">
            <div>
              <div className="eyebrow">Pradėkime</div>
              <h2 className="font-serif">
                Norite individualaus<br />pasiūlymo?
              </h2>
              <p>
                Palikite kontaktus — asmeninis vadovas susisieks, aptars
                dizainą, medžiagas ir kainą.
              </p>
            </div>
            <LeadForm source="/paslaugos/antkapiai" defaultService="ANTKAPIS" />
          </div>
        </div>
      </section>
    </>
  );
}
