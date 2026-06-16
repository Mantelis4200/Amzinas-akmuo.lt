import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Paminklų restauravimas — atnaujinamas atminimas",
  description:
    "Restauruojame paminklus visoje Lietuvoje: valymas, atstatymas, naujas graviravimas, pakrypusių paminklų ištiesinimas, pamatų atstatymas. Asmeninis vadovas.",
};

const restaurationItems = [
  {
    icon: "✦",
    title: "Valymas",
    desc: "Pašaliname samanas, dumblius, senas dažų likučius ir atmosferos nusodintus teršalus.",
  },
  {
    icon: "✦",
    title: "Atstatymas",
    desc: "Sutvarkome skilimus, restauruojame sulaužytas paminklo dalis, atstatome pradinę formą.",
  },
  {
    icon: "✦",
    title: "Naujas graviravimas",
    desc: "Atnaujinamas ar papildomas esamais raidžių, portretų ar ornamentų graviravimas.",
  },
  {
    icon: "✦",
    title: "Pakrypusių paminklų ištiesinimas",
    desc: "Specialia įranga atstatome pakrypusius paminklus į vertikalią padėtį.",
  },
  {
    icon: "✦",
    title: "Pamatų atstatymas",
    desc: "Išardome ir betonuojame naujus pamatus, kad paminklas stovėtų tvirtai dar dešimtmečius.",
  },
];

export default function RestauravsimasPage() {
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

        /* KĄ RESTAURUOJAM */
        .restau-section { padding: 88px 0; background: var(--cream2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .restau-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .restau-head { margin-bottom: 42px; }
        .restau-head h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -.01em;
          margin-top: 10px;
        }
        .restau-list { display: flex; flex-direction: column; gap: 18px; }
        .restau-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 22px 24px;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .restau-item-icon { font-size: 18px; color: var(--clay); flex-shrink: 0; margin-top: 2px; }
        .restau-item-text h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
        .restau-item-text p { font-size: 14px; color: var(--muted); line-height: 1.55; }

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

        @media (max-width: 880px) { .cta-box { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .cta-box { padding: 32px 24px; } }
      `}</style>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-wrap">
          <div className="eyebrow">Paslaugos · Restauravimas</div>
          <h1 className="font-serif">
            Atnaujiname atminimą,<br />
            <em>sugrąžiname orumą</em>
          </h1>
          <p className="lead">
            Profesionalus paminklų restauravimas visoje Lietuvoje —
            nuo paprasto valymo iki pilno atstatymo. Vadovas atvyksta,
            įvertina ir pateikia konkretų pasiūlymą.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/kontaktai" className="btn btn-primary">Gauti pasiūlymą</Link>
            <Link href="/darbai" className="btn btn-ghost">Žiūrėti darbus</Link>
          </div>
        </div>
      </div>

      {/* PRIEŠ / PO */}
      <BeforeAfter count={3} />

      {/* KĄ RESTAURUOJAM */}
      <section className="restau-section">
        <div className="restau-wrap">
          <div className="restau-head">
            <div className="eyebrow">Mūsų paslaugos</div>
            <h2 className="font-serif">Ką restauruojame</h2>
          </div>
          <div className="restau-list">
            {restaurationItems.map((item) => (
              <div key={item.title} className="restau-item">
                <div className="restau-item-icon" aria-hidden="true">{item.icon}</div>
                <div className="restau-item-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESAS */}
      <Process />

      {/* ATSILIEPIMAI */}
      <Testimonials
        quote="Tėčio paminklas stovėjo pakrypęs 10 metų — baiminomės imtis restauravimo. Vadovas atvyko, viską sutvarkė per vieną dieną. Paminklas kaip naujas."
        author="— Aldona P., Kaunas"
      />

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-wrap">
          <div className="cta-box">
            <div>
              <div className="eyebrow">Pradėkime</div>
              <h2 className="font-serif">
                Reikia restauravimo<br />pasiūlymo?
              </h2>
              <p>
                Palikite kontaktus — vadovas susisieks, atvyks įvertinti
                ir pateiks aiškią kainą.
              </p>
            </div>
            <LeadForm source="/paslaugos/restauravimas" defaultService="RESTAURAVIMAS" />
          </div>
        </div>
      </section>
    </>
  );
}
