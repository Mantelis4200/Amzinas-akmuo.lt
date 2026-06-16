import type { LeadStatus } from "@prisma/client";

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; color: string }> = {
  NAUJAS: { label: "Naujas", bg: "#DBEAFE", color: "#2E6CA4" },
  SUSISIEKTA: { label: "Susisiekta", bg: "#FEF3C7", color: "#C9912E" },
  PASIULYMAS: { label: "Pasiulymas", bg: "#FFEDD5", color: "#C97A2E" },
  LAIMETA: { label: "Laimeta", bg: "#D1FAE5", color: "#3C8A4E" },
  PRARASTA: { label: "Prarasta", bg: "#F3F4F6", color: "#8A857C" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}
