import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Kontaktai — susisiekite su mumis",
  description:
    "Susisiekite su Amžinas Akmuo: telefonu +370 616 56686, el. paštu info@amzinasakmuo.lt. Dirbame visoje Lietuvoje, gamyba ir montavimas iš Trakų.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Map URL param values to form option values
function resolveService(raw: string | string[] | undefined): string | undefined {
  const val = Array.isArray(raw) ? raw[0] : raw;
  if (!val) return undefined;
  const map: Record<string, string> = {
    antkapiai: "ANTKAPIS",
    restauravimas: "RESTAURAVIMAS",
    "kapavieciu-irengimas": "KAPAVIETES_IRENGIMAS",
    ANTKAPIS: "ANTKAPIS",
    RESTAURAVIMAS: "RESTAURAVIMAS",
    KAPAVIETES_IRENGIMAS: "KAPAVIETES_IRENGIMAS",
  };
  return map[val] ?? val;
}

export default async function KontaktaiPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const defaultService = resolveService(sp.paslauga);
  const defaultMessage = Array.isArray(sp.zinute) ? sp.zinute[0] : (sp.zinute as string | undefined);

  return (
    <>
      <style>{`
        .kontaktai-hero {
          padding: 78px 0 64px;
          border-bottom: 1px solid var(--line);
        }
        .kontaktai-hero-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .kontaktai-hero h1 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(36px, 4.6vw, 56px);
          line-height: 1.08;
          letter-spacing: -.01em;
          margin: 14px 0 18px;
        }
        .kontaktai-hero p { font-size: 17px; color: var(--muted); max-width: 520px; }

        /* MAIN GRID */
        .kontaktai-main { padding: 72px 0 88px; }
        .kontaktai-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .kontaktai-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          align-items: flex-start;
        }

        /* INFO PANEL */
        .kontaktai-info { display: flex; flex-direction: column; gap: 28px; }
        .kontaktai-info h2 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(24px, 2.6vw, 32px);
          line-height: 1.15;
          margin: 0 0 4px;
        }
        .info-item {
          padding: 22px 24px;
          background: var(--cream2);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .info-item-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .info-item a, .info-item p {
          font-size: 17px;
          font-weight: 600;
          color: var(--espresso);
          text-decoration: none;
          margin: 0;
        }
        .info-item a:hover { color: var(--clay); }
        .info-item .info-sub {
          font-size: 13px;
          font-weight: 400;
          color: var(--muted);
          margin-top: 3px;
        }

        @media (max-width: 880px) {
          .kontaktai-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <div className="kontaktai-hero">
        <div className="kontaktai-hero-wrap">
          <div className="eyebrow">Kontaktai</div>
          <h1 className="font-serif">Susisiekite su mumis</h1>
          <p>
            Palikite užklausą — vadovas susisieks per darbo dieną, atsakys
            į klausimus ir suderins vizitą jums patogiu laiku.
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="kontaktai-main">
        <div className="kontaktai-wrap">
          <div className="kontaktai-grid">
            {/* LEFT — contact info */}
            <div className="kontaktai-info">
              <div>
                <h2 className="font-serif">Mūsų kontaktai</h2>
              </div>

              <div className="info-item">
                <div className="info-item-label">Telefonas</div>
                <a href="tel:+37061656686">+370 616 56686</a>
                <p className="info-sub">Skambinkite darbo dienomis 8–18 val.</p>
              </div>

              <div className="info-item">
                <div className="info-item-label">El. paštas</div>
                <a href="mailto:info@amzinasakmuo.lt">info@amzinasakmuo.lt</a>
                <p className="info-sub">Atsakome per 1 darbo dieną</p>
              </div>

              <div className="info-item">
                <div className="info-item-label">Veikimo zona</div>
                <p>Visa Lietuva</p>
                <p className="info-sub">Gamyba ir montavimas iš Trakų</p>
              </div>
            </div>

            {/* RIGHT — form */}
            <div>
              <LeadForm
                source="/kontaktai"
                defaultService={defaultService}
                defaultMessage={defaultMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
