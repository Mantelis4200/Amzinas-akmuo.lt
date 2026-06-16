import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { Gallery } from "@/components/Gallery";
import { Process } from "@/components/Process";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Kapaviečių įrengimas — pilni komplektai",
  description:
    "Įrengiame kapavietės pilnu ciklu: pamatų betonavimas, borteliai, tvorelės, trinkelių klojimas, akmenukų dekoras ir montavimas. Visa Lietuva iš Trakų.",
  openGraph: {
    title: "Kapaviečių įrengimas — pilni komplektai | Amžinas Akmuo",
    description:
      "Įrengiame kapavietės pilnu ciklu: pamatų betonavimas, borteliai, tvorelės, trinkelių klojimas, akmenukų dekoras ir montavimas. Visa Lietuva iš Trakų.",
    url: "https://amzinasakmuo.lt/paslaugos/kapavieciu-irengimas",
    locale: "lt_LT",
    type: "website",
  },
};

const darbaiItems = [
  {
    title: "Pamatų betonavimas",
    description: "Betonuojame tvirtas paminklo atramines plokštes, kurios garantuoja stabilumą dešimtmečiams.",
    href: "/kontaktai",
  },
  {
    title: "Borteliai ir tvorelės",
    description: "Granito borteliai ir metalinės tvorelės — tvarkinga kapavietės riba su ilgalaike garantija.",
    href: "/kontaktai",
  },
  {
    title: "Trinkelių klojimas",
    description: "Klojame granito, betono ar akmenines trinkeles — stilingai ir pratikiškai.",
    href: "/kontaktai",
  },
  {
    title: "Akmenukų dekoras",
    description: "Smulkūs dekoratyviniai akmenys kapaviečių užpildui — natūralus ir mažai priežiūros reikalaujantis sprendimas.",
    href: "/kontaktai",
  },
  {
    title: "Montavimas",
    description: "Profesionalus paminklų transportavimas ir montavimas — sauga garantuojama.",
    href: "/kontaktai",
  },
  {
    title: "Pilni komplektai",
    description: "Visko kartu: paminklas, pamatai, borteliai, trinkelės ir akmenukų dekoras — viena kaina, vienas vadovas.",
    href: "/kontaktai",
  },
];

export default function KapavireciuIrengimas() {
  return (
    <>
      <style>{`
        .page-hero {
          padding: 78px 0 90px;
          background: linear-gradient(170deg, var(--cream2) 0%, var(--sand) 100%);
          border-bottom: 1px solid var(--line);
        }
        .page-hero-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
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

        /* DARBAI GRID */
        .darbai-section { padding: 88px 0; }
        .darbai-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .darbai-head { margin-bottom: 42px; }
        .darbai-head h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -.01em;
          margin-top: 10px;
        }
        .darbai-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

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
          .darbai-grid { grid-template-columns: repeat(2, 1fr); }
          .cta-box { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .darbai-grid { grid-template-columns: 1fr; }
          .cta-box { padding: 32px 24px; }
        }
      `}</style>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-wrap">
          <div className="eyebrow">Paslaugos · Kapaviečių įrengimas</div>
          <h1 className="font-serif">
            Kapavietė sutvarkyta<br />
            <em>nuo pradžios iki galo</em>
          </h1>
          <p className="lead">
            Pamatai, borteliai, trinkelės, akmenukų dekoras ir montavimas —
            viska tvarkome mes, jūs tik pasirenkate stilių ir gaunate
            užbaigtą rezultatą.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/kontaktai" className="btn btn-primary">Gauti pasiūlymą</Link>
            <Link href="/darbai" className="btn btn-ghost">Peržiūrėti darbus</Link>
          </div>
        </div>
      </div>

      {/* DARBAI GRID */}
      <section className="darbai-section">
        <div className="darbai-wrap">
          <div className="darbai-head">
            <div className="eyebrow">Ką darome</div>
            <h2 className="font-serif">Kapaviečių įrengimo paslaugos</h2>
          </div>
          <div className="darbai-grid">
            {darbaiItems.map((item) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GALERIJA */}
      <section style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 42, gap: 24 }}>
            <div>
              <div className="eyebrow">Darbai</div>
              <h2 className="font-serif" style={{ fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1, letterSpacing: "-.01em", marginTop: 10 }}>
                Įrengtų kapaviečių galerija
              </h2>
            </div>
            <Link href="/darbai" className="btn btn-ghost">Visi darbai</Link>
          </div>
        </div>
        <Gallery count={8} />
      </section>

      {/* PROCESAS */}
      <Process />

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-wrap">
          <div className="cta-box">
            <div>
              <div className="eyebrow">Pradėkime</div>
              <h2 className="font-serif">
                Reikia kapavietės<br />įrengimo pasiūlymo?
              </h2>
              <p>
                Palikite kontaktus — vadovas susisieks, aptars jūsų poreikius
                ir pateiks tikslią kainą.
              </p>
            </div>
            <LeadForm
              source="/paslaugos/kapavieciu-irengimas"
              defaultService="KAPAVIETES_IRENGIMAS"
            />
          </div>
        </div>
      </section>
    </>
  );
}
