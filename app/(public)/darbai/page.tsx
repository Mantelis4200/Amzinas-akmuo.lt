import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Mūsų darbai — antkapiai ir kapaviečių įrengimas",
  description:
    "Peržiūrėkite mūsų įgyvendintus darbus: individualaus dizaino antkapiai, restauravimas, kapaviečių įrengimas visoje Lietuvoje.",
  openGraph: {
    title: "Mūsų darbai — antkapiai ir kapaviečių įrengimas | Amžinas Akmuo",
    description:
      "Peržiūrėkite mūsų įgyvendintus darbus: individualaus dizaino antkapiai, restauravimas, kapaviečių įrengimas visoje Lietuvoje.",
    url: "https://amzinasakmuo.lt/darbai",
    locale: "lt_LT",
    type: "website",
  },
};

export default function DarbaiPage() {
  return (
    <>
      <style>{`
        .darbai-hero {
          padding: 72px 0 56px;
          border-bottom: 1px solid var(--line);
        }
        .darbai-hero-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .darbai-hero h1 {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400;
          font-size: clamp(36px, 4.6vw, 56px);
          line-height: 1.08;
          letter-spacing: -.01em;
          margin: 12px 0 16px;
          max-width: 600px;
        }
        .darbai-hero p { font-size: 17px; color: var(--muted); max-width: 480px; }
      `}</style>

      <div className="darbai-hero">
        <div className="darbai-hero-wrap">
          <div className="eyebrow">Mūsų darbai</div>
          <h1 className="font-serif">Darbų galerija</h1>
          <p>
            Peržiūrėkite realiai įgyvendintus darbus — antkapiai, restauravimas
            ir kapaviečių įrengimas visoje Lietuvoje.
          </p>
        </div>
      </div>

      <Gallery count={12} withFilter />
    </>
  );
}
