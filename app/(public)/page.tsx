import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceCard } from "@/components/ServiceCard";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Modernaus dizaino antkapiai — Amžinas Akmuo",
  description:
    "Gaminame modernaus dizaino antkapius tiesiai iš savo gamyklos — be perpardavėjų antkainio. Asmeninis vadovas, skaidri kaina, garantija.",
  openGraph: {
    title: "Modernaus dizaino antkapiai — Amžinas Akmuo",
    description:
      "Gaminame modernaus dizaino antkapius tiesiai iš savo gamyklos — be perpardavėjų antkainio. Asmeninis vadovas, skaidri kaina, garantija.",
    url: "https://amzinasakmuo.lt",
    locale: "lt_LT",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <style>{`
        /* HERO */
        .hero { position: relative; overflow: hidden; }
        .hero-grid {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 54px;
          align-items: center;
          padding-top: 78px;
          padding-bottom: 90px;
        }
        .hero h1 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(40px, 5.4vw, 68px);
          line-height: 1.04;
          letter-spacing: -.01em;
          margin: 18px 0 22px;
        }
        .hero h1 em { font-style: italic; color: var(--clay); }
        .hero .lead {
          font-size: 18px;
          color: var(--muted);
          max-width: 440px;
          margin-bottom: 32px;
        }
        .hero-cta { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .hero-art {
          position: relative;
          height: 460px;
          border-radius: 14px;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 30% 20%, #EFE7D9 0%, transparent 60%),
            linear-gradient(155deg, #C9BBA4 0%, #9C8C74 48%, #6F6353 100%);
          box-shadow: 0 30px 60px -28px rgba(60, 48, 36, .5);
        }
        .hero-art-seam {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 49.6%, rgba(255,255,255,.18) 49.8%, transparent 50%);
        }
        .hero-art-tag {
          position: absolute;
          left: 20px;
          bottom: 20px;
          background: rgba(247, 242, 234, .92);
          color: var(--espresso);
          font-size: 12px;
          font-weight: 600;
          padding: 9px 14px;
          border-radius: 8px;
          letter-spacing: .02em;
        }
        .float-card {
          position: absolute;
          top: 26px;
          right: -14px;
          background: var(--cream2);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px 16px;
          box-shadow: 0 18px 40px -20px rgba(60, 48, 36, .45);
          width: 180px;
        }
        .float-card .float-k {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 26px;
          color: var(--clay);
        }
        .float-card .float-v { font-size: 12px; color: var(--muted); }

        /* TRUST */
        .trust {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--cream2);
        }
        .trust-grid {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding-top: 26px;
          padding-bottom: 26px;
        }
        .trust-item { display: flex; flex-direction: column; gap: 3px; }
        .trust-item b { font-size: 14.5px; }
        .trust-item span { font-size: 12.5px; color: var(--muted); }

        /* SERVICES BLOCK */
        .block-section {
          padding: 88px 0;
        }
        .block-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .head-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 42px;
          gap: 24px;
        }
        .head-row h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -.01em;
          margin-top: 10px;
        }
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

        /* GALLERY SECTION HEADING */
        .gallery-heading {
          max-width: 1180px;
          margin: 0 auto;
          padding: 88px 32px 0;
        }

        /* CTA SECTION */
        .cta-section { padding: 40px 0 88px; }
        .cta-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
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
          .hero-grid, .cta-box { grid-template-columns: 1fr; }
          .hero-art { height: 300px; }
          .trust-grid { grid-template-columns: repeat(2, 1fr); }
          .svc-grid { grid-template-columns: 1fr 1fr; }
          .float-card { right: 0; }
        }
        @media (max-width: 600px) {
          .svc-grid { grid-template-columns: 1fr; }
          .cta-box { padding: 32px 24px; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Antkapiai · Restauravimas · Kapaviečių įrengimas</div>
            <h1 className="font-serif">
              Modernaus dizaino<br />
              antkapiai, <em>su pagarba</em><br />
              atminčiai
            </h1>
            <p className="lead">
              Gaminame tiesiai iš savo gamyklos — be perpardavėjų antkainio.
              Asmeninis vadovas atvyksta, suplanuoja darbus, medžiagas ir terminus.
            </p>
            <div className="hero-cta">
              <Link href="/kontaktai" className="btn btn-primary">Gauti pasiūlymą</Link>
              <Link href="/darbai" className="btn btn-ghost">Peržiūrėti darbus</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-seam" />
            <div className="float-card">
              <div className="float-k">15+</div>
              <div className="float-v">metų akmens apdirbimo patirtis</div>
            </div>
            <div className="hero-art-tag">Granitas · individualus dizainas</div>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="trust">
        <div className="trust-grid">
          <div className="trust-item">
            <b>Tiesiai iš gamyklos</b>
            <span>Be tarpininkų antkainio</span>
          </div>
          <div className="trust-item">
            <b>Asmeninis vadovas</b>
            <span>Atvyksta į vietą, suplanuoja</span>
          </div>
          <div className="trust-item">
            <b>Skaidri kaina</b>
            <span>Aišku prieš pradedant</span>
          </div>
          <div className="trust-item">
            <b>Garantija</b>
            <span>Akmeniui ir montavimui</span>
          </div>
        </div>
      </div>

      {/* PASLAUGOS */}
      <section className="block-section">
        <div className="block-wrap">
          <div className="head-row">
            <div>
              <div className="eyebrow">Ką darome</div>
              <h2 className="font-serif">
                Paslaugos kapavietei<br />nuo idėjos iki montavimo
              </h2>
            </div>
            <Link href="/kontaktai" className="btn btn-ghost">Visos paslaugos</Link>
          </div>
          <div className="svc-grid">
            <ServiceCard
              title="Antkapiai"
              description="Individualaus dizaino paminklai nuo nulio. Granitas, marmuras, modernios formos, graviravimas."
              href="/paslaugos/antkapiai"
            />
            <ServiceCard
              title="Restauravimas"
              description="Senų paminklų atnaujinimas — valymas, atstatymas, naujas graviravimas. Aiškus prieš / po vaizdas."
              href="/paslaugos/restauravimas"
            />
            <ServiceCard
              title="Kapaviečių įrengimas"
              description="Pamatai, borteliai, trinkelės, akmenukų dekoras ir pilni kapavietės komplektai."
              href="/paslaugos/kapavieciu-irengimas"
            />
          </div>
        </div>
      </section>

      {/* GALERIJA */}
      <section style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="gallery-heading">
          <div className="head-row">
            <div>
              <div className="eyebrow">Darbai</div>
              <h2 className="font-serif">Mūsų darbų galerija</h2>
            </div>
            <Link href="/darbai" className="btn btn-ghost">Visi darbai</Link>
          </div>
        </div>
        <Gallery count={8} />
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
                Gaukite nemokamą<br />pasiūlymą per 1 dieną
              </h2>
              <p>
                Palikite kontaktus — vadovas susisieks, atsakys į klausimus
                ir suderins vizitą jums patogiu laiku.
              </p>
            </div>
            <LeadForm source="/" />
          </div>
        </div>
      </section>
    </>
  );
}
