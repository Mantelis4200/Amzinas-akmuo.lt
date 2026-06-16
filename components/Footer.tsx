import Link from "next/link";

const SERVICE_LINKS = [
  { label: "Antkapiai", href: "/paslaugos/antkapiai" },
  { label: "Restauravimas", href: "/paslaugos/restauravimas" },
  { label: "Kapaviečių įrengimas", href: "/paslaugos/kapavieciu-irengimas" },
] as const;

const ABOUT_LINKS = [
  { label: "Apie mus", href: "/apie" },
  { label: "Darbai", href: "/darbai" },
  { label: "Kontaktai", href: "/kontaktai" },
] as const;

const colLinkStyle: React.CSSProperties = {
  display: "block",
  color: "var(--espresso)",
  textDecoration: "none",
  opacity: 0.8,
  fontSize: "14px",
  marginBottom: "8px",
};

const colHeadStyle: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--muted)",
  marginBottom: "14px",
  fontWeight: 600,
};

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--cream2)",
        borderTop: "1px solid var(--line)",
        padding: "48px 0 30px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* 4-column grid */}
        <div className="foot-grid">
          {/* Col 1: Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontWeight: 600,
                fontSize: "22px",
                letterSpacing: "0.01em",
                marginBottom: "12px",
                color: "var(--espresso)",
              }}
            >
              Amžinas<span style={{ color: "var(--clay)" }}>·</span>Akmuo
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                maxWidth: "260px",
                lineHeight: 1.6,
              }}
            >
              Modernaus dizaino antkapiai ir kapaviečių įrengimas. Tiesiai iš
              gamyklos, su asmeniniu aptarnavimu.
            </p>
          </div>

          {/* Col 2: Paslaugos */}
          <div>
            <h5 style={colHeadStyle}>Paslaugos</h5>
            {SERVICE_LINKS.map(link => (
              <Link key={link.href} href={link.href} style={colLinkStyle}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Apie */}
          <div>
            <h5 style={colHeadStyle}>Apie</h5>
            {ABOUT_LINKS.map(link => (
              <Link key={link.href} href={link.href} style={colLinkStyle}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 4: Kontaktai */}
          <div>
            <h5 style={colHeadStyle}>Kontaktai</h5>
            <a href="tel:+37061656686" style={colLinkStyle}>
              +370 616 56686
            </a>
            <a href="mailto:info@amzinasakmuo.lt" style={colLinkStyle}>
              info@amzinasakmuo.lt
            </a>
            <span style={{ ...colLinkStyle, cursor: "default" }}>
              Visa Lietuva
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "34px",
            paddingTop: "18px",
            borderTop: "1px solid var(--line)",
            fontSize: "12.5px",
            color: "var(--muted)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>© 2026 Amžinas Akmuo</span>
          <span>amzinasakmuo.lt</span>
        </div>
      </div>

      <style>{`
        .foot-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 30px;
        }
        @media (max-width: 880px) {
          .foot-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .foot-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
