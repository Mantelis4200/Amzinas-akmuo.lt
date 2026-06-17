"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Pradinis", href: "/" },
  { label: "Darbai", href: "/darbai" },
  { label: "Apie", href: "/apie" },
  { label: "Kontaktai", href: "/kontaktai" },
] as const;

const SERVICE_LINKS = [
  { label: "Antkapiai", href: "/paslaugos/antkapiai" },
  { label: "Restauravimas", href: "/paslaugos/restauravimas" },
  { label: "Kapaviečių įrengimas", href: "/paslaugos/kapavieciu-irengimas" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropOpen, setDesktopDropOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDesktopDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change (clicking a link closes it)
  function closeMobile() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(247,242,234,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "74px",
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          {/* Logo */}
          <Logo href="/" height={44} />

          {/* Desktop nav */}
          <ul
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "center",
              listStyle: "none",
              fontSize: "14.5px",
              fontWeight: 500,
              margin: 0,
              padding: 0,
            }}
            className="header-desktop-menu"
          >
            <li>
              <Link
                href="/"
                style={{
                  color: "var(--espresso)",
                  textDecoration: "none",
                  opacity: 0.82,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.82")}
              >
                Pradinis
              </Link>
            </li>

            {/* Paslaugos dropdown */}
            <li
              ref={dropRef}
              style={{ position: "relative" }}
              onMouseEnter={() => setDesktopDropOpen(true)}
              onMouseLeave={() => setDesktopDropOpen(false)}
            >
              <button
                aria-expanded={desktopDropOpen}
                aria-haspopup="true"
                onClick={() => setDesktopDropOpen(v => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--espresso)",
                  fontSize: "14.5px",
                  fontWeight: 500,
                  opacity: 0.82,
                  transition: "opacity 0.2s",
                  padding: 0,
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.82")}
              >
                Paslaugos
                <span
                  style={{
                    display: "inline-block",
                    width: "7px",
                    height: "7px",
                    borderRight: "1.5px solid var(--muted)",
                    borderBottom: "1.5px solid var(--muted)",
                    transform: desktopDropOpen
                      ? "rotate(225deg) translateY(3px)"
                      : "rotate(45deg)",
                    marginTop: desktopDropOpen ? "0" : "-3px",
                    transition: "transform 0.2s",
                  }}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown panel */}
              {desktopDropOpen && (
                <ul
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--cream2)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "8px",
                    listStyle: "none",
                    minWidth: "200px",
                    boxShadow: "0 18px 40px -20px rgba(60,48,36,0.35)",
                    zIndex: 200,
                  }}
                >
                  {SERVICE_LINKS.map(link => (
                    <li key={link.href} role="none">
                      <Link
                        href={link.href}
                        role="menuitem"
                        onClick={() => setDesktopDropOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 14px",
                          color: "var(--espresso)",
                          textDecoration: "none",
                          fontSize: "14px",
                          borderRadius: "8px",
                          transition: "background 0.15s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e =>
                          (e.currentTarget.style.background = "var(--sand)")
                        }
                        onMouseLeave={e =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {NAV_LINKS.slice(1).map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: "var(--espresso)",
                    textDecoration: "none",
                    opacity: 0.82,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.82")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: phone + CTA */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "18px" }}
            className="header-right"
          >
            <a
              href="tel:+37061656686"
              style={{
                fontWeight: 600,
                fontSize: "14.5px",
                color: "var(--espresso)",
                textDecoration: "none",
                lineHeight: 1.2,
              }}
              className="header-phone"
            >
              +370 616 56686
              <small
                style={{
                  display: "block",
                  fontWeight: 500,
                  fontSize: "10.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Skambinkite
              </small>
            </a>
            <div className="header-cta">
              <Button variant="primary" href="/kontaktai">
                Gauti pasiūlymą
              </Button>
            </div>

            {/* Burger button (mobile only) */}
            <button
              aria-label={mobileOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
              className="header-burger"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--espresso)",
                  borderRadius: "2px",
                  transition: "transform 0.2s, opacity 0.2s",
                  transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--espresso)",
                  borderRadius: "2px",
                  opacity: mobileOpen ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--espresso)",
                  borderRadius: "2px",
                  transition: "transform 0.2s, opacity 0.2s",
                  transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div
            ref={mobileRef}
            style={{
              background: "rgba(247,242,234,0.97)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid var(--line)",
              padding: "16px 24px 24px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ borderBottom: "1px solid var(--line)" }}>
                <Link
                  href="/"
                  onClick={closeMobile}
                  style={{
                    display: "block",
                    padding: "14px 0",
                    color: "var(--espresso)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "15px",
                  }}
                >
                  Pradinis
                </Link>
              </li>

              {/* Paslaugos accordion */}
              <li style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  onClick={() => setMobileServicesOpen(v => !v)}
                  aria-expanded={mobileServicesOpen}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--espresso)",
                    fontWeight: 500,
                    fontSize: "15px",
                    fontFamily: "inherit",
                  }}
                >
                  Paslaugos
                  <span
                    style={{
                      display: "inline-block",
                      width: "7px",
                      height: "7px",
                      borderRight: "1.5px solid var(--muted)",
                      borderBottom: "1.5px solid var(--muted)",
                      transform: mobileServicesOpen
                        ? "rotate(225deg) translateY(3px)"
                        : "rotate(45deg)",
                      marginTop: mobileServicesOpen ? "0" : "-3px",
                      transition: "transform 0.2s",
                    }}
                    aria-hidden="true"
                  />
                </button>
                {mobileServicesOpen && (
                  <ul
                    style={{
                      listStyle: "none",
                      margin: "0 0 10px",
                      padding: "0 0 0 16px",
                    }}
                  >
                    {SERVICE_LINKS.map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMobile}
                          style={{
                            display: "block",
                            padding: "10px 0",
                            color: "var(--muted)",
                            textDecoration: "none",
                            fontSize: "14px",
                          }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {NAV_LINKS.slice(1).map(link => (
                <li
                  key={link.href}
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      color: "var(--espresso)",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: "15px",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="tel:+37061656686"
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--espresso)",
                  textDecoration: "none",
                }}
              >
                +370 616 56686
              </a>
              <Button variant="primary" href="/kontaktai" onClick={closeMobile}>
                Gauti pasiūlymą
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Responsive styles via a style tag */}
      <style>{`
        @media (max-width: 880px) {
          .header-desktop-menu { display: none !important; }
          .header-phone { display: none !important; }
          .header-cta { display: none !important; }
          .header-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Header;
