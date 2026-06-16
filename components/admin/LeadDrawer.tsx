"use client";
import { useEffect, useRef, useState } from "react";
import type { Lead, LeadStatus } from "@prisma/client";
import { updateLeadStatus, updateLeadNotes } from "@/app/actions/updateLead";

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "NAUJAS", label: "Naujas" },
  { value: "SUSISIEKTA", label: "Susisiekta" },
  { value: "PASIULYMAS", label: "Pasiulymas" },
  { value: "LAIMETA", label: "Laimeta" },
  { value: "PRARASTA", label: "Prarasta" },
];

const SERVICE_LABELS: Record<string, string> = {
  ANTKAPIS: "Antkapis",
  RESTAURAVIMAS: "Restauravimas",
  KAPAVIETES_IRENGIMAS: "Kapavietes irengimas",
  KITA: "Kita",
};

interface LeadDrawerProps {
  lead: Omit<Lead, "createdAt"> & { createdAt: string | Date };
  onClose: () => void;
}

export function LeadDrawer({ lead, onClose }: LeadDrawerProps) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as LeadStatus;
    setStatus(newStatus);
    await updateLeadStatus(lead.id, newStatus);
  }

  function handleNotesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setNotes(val);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      await updateLeadNotes(lead.id, val);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  }

  const createdAt =
    typeof lead.createdAt === "string"
      ? new Date(lead.createdAt)
      : lead.createdAt;

  const row = (label: string, value: React.ReactNode) => (
    <div style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
      <span style={{ width: "110px", flexShrink: 0, fontSize: "12px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", paddingTop: "2px" }}>
        {label}
      </span>
      <span style={{ fontSize: "14px", color: "var(--espresso)", wordBreak: "break-word" }}>
        {value}
      </span>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(43,37,32,0.35)",
          zIndex: 200,
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(480px, 100vw)",
          background: "var(--cream2)",
          borderLeft: "1px solid var(--line)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(43,37,32,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: "4px" }}>
              Uzklausos kortele
            </div>
            <div
              className="font-serif"
              style={{ fontSize: "20px", fontWeight: 500, color: "var(--espresso)" }}
            >
              {lead.name}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Uzdaryti"
            style={{
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "var(--muted)",
              flexShrink: 0,
            }}
          >
            x
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {row("Telefonas", <a href={`tel:${lead.phone}`} style={{ color: "var(--clay)", textDecoration: "none" }}>{lead.phone}</a>)}
          {lead.email && row("El. pastas", lead.email)}
          {row("Paslauga", SERVICE_LABELS[lead.serviceType] ?? lead.serviceType)}
          {row("Saltinis", lead.source)}
          {row("Data", createdAt.toLocaleDateString("lt-LT"))}

          {/* Message */}
          <div style={{ paddingTop: "16px", paddingBottom: "8px" }}>
            <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
              Zinute
            </div>
            <div
              style={{
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "14px",
                color: "var(--espresso)",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {lead.message}
            </div>
          </div>

          {/* Status select */}
          <div style={{ paddingTop: "16px", paddingBottom: "8px" }}>
            <label
              htmlFor="drawer-status"
              style={{ display: "block", fontSize: "12px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}
            >
              Statusas
            </label>
            <select
              id="drawer-status"
              value={status}
              onChange={handleStatusChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--cream)",
                color: "var(--espresso)",
                fontSize: "14px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes textarea */}
          <div style={{ paddingTop: "16px", paddingBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <label
                htmlFor="drawer-notes"
                style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}
              >
                Pastabos
              </label>
              {saved && (
                <span style={{ fontSize: "12px", color: "#3C8A4E", fontWeight: 600 }}>
                  Issaugota
                </span>
              )}
            </div>
            <textarea
              id="drawer-notes"
              value={notes}
              onChange={handleNotesChange}
              rows={5}
              placeholder="Biudzetas, kontakto data, detalės..."
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--cream)",
                color: "var(--espresso)",
                fontSize: "14px",
                lineHeight: 1.6,
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
