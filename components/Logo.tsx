import Link from "next/link";

type LogoProps = {
  /** "light" = for light backgrounds (espresso badge). "dark" = for dark backgrounds (cream badge). */
  variant?: "light" | "dark";
  /** Render only the square AA badge (no wordmark). */
  iconOnly?: boolean;
  /** Rendered height in px. */
  height?: number;
  /** Wrap in a link to home. */
  href?: string;
  className?: string;
};

const ESPRESSO = "#2B2520";
const CLAY = "#B0764F";
const CREAM = "#F7F2EA";
const serif = "var(--font-serif), Georgia, serif";

export function Logo({ variant = "light", iconOnly = false, height = 44, href, className }: LogoProps) {
  const badgeFill = variant === "light" ? ESPRESSO : CREAM;
  const mono = variant === "light" ? CREAM : ESPRESSO;
  const word = variant === "light" ? ESPRESSO : CREAM;
  const border = variant === "light" ? "rgba(43,37,32,0.16)" : "rgba(247,242,234,0.32)";

  const viewBox = iconOnly ? "0 0 200 200" : "0 0 640 200";
  const ratio = iconOnly ? 1 : 640 / 200;

  const svg = (
    <svg
      viewBox={viewBox}
      height={height}
      width={height * ratio}
      role="img"
      aria-label="Amžinas Akmuo"
      className={className}
      style={{ display: "block" }}
    >
      <rect x="25" y="25" width="150" height="150" rx="24" fill={badgeFill} stroke={border} strokeWidth="2" />
      <text x="100" y="129" textAnchor="middle" fontSize="82" fontWeight={500} fill={mono} style={{ fontFamily: serif }}>
        A<tspan fill={CLAY}>A</tspan>
      </text>
      {!iconOnly && (
        <>
          <text x="215" y="92" fontSize="56" fontWeight={500} fill={word} style={{ fontFamily: serif }}>
            Amžinas
          </text>
          <text x="215" y="150" fontSize="56" fontWeight={400} fontStyle="italic" fill={CLAY} style={{ fontFamily: serif }}>
            Akmuo
          </text>
        </>
      )}
    </svg>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Amžinas Akmuo — pradinis" style={{ display: "inline-flex", textDecoration: "none" }}>
        {svg}
      </Link>
    );
  }
  return svg;
}

export default Logo;
