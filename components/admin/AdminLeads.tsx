"use client";
import { useState, useMemo } from "react";
import type { Lead, LeadStatus, ServiceType } from "@prisma/client";
import { StatusBadge } from "./StatusBadge";
import { LeadDrawer } from "./LeadDrawer";

const SERVICE_LABELS: Record<ServiceType, string> = {
  ANTKAPIS: "Antkapis",
  RESTAURAVIMAS: "Restauravimas",
  KAPAVIETES_IRENGIMAS: "Kapavietes irengimas",
  KITA: "Kita",
};

const STATUS_ALL = "" as const;

type LeadRow = Omit<Lead, "createdAt"> & { createdAt: string };

interface AdminLeadsProps {
  leads: LeadRow[];
}

export function AdminLeads({ leads }: AdminLeadsProps) {
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "">("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LeadRow | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter && l.status !== statusFilter) return false;
      if (serviceFilter && l.serviceType !== serviceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.phone.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [leads, statusFilter, serviceFilter, search]);

  const selectStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--line)",
    background: "var(--cream2)",
    color: "var(--espresso)",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none",
    minWidth: "140px",
  };

  return (
    <>
      <style>{`
        @media (max-width: 760px) {
          .leads-table { display: none !important; }
          .leads-cards { display: flex !important; }
        }
        @media (min-width: 761px) {
          .leads-table { display: table !important; }
          .leads-cards { display: none !important; }
        }
      `}</style>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Ieškoti pagal varda ar telefona..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            background: "var(--cream2)",
            color: "var(--espresso)",
            fontSize: "13px",
            outline: "none",
            minWidth: "220px",
            flex: 1,
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "")}
          style={selectStyle}
        >
          <option value="">Visi statusai</option>
          <option value="NAUJAS">Naujas</option>
          <option value="SUSISIEKTA">Susisiekta</option>
          <option value="PASIULYMAS">Pasiulymas</option>
          <option value="LAIMETA">Laimeta</option>
          <option value="PRARASTA">Prarasta</option>
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value as ServiceType | "")}
          style={selectStyle}
        >
          <option value="">Visos paslaugos</option>
          <option value="ANTKAPIS">Antkapis</option>
          <option value="RESTAURAVIMAS">Restauravimas</option>
          <option value="KAPAVIETES_IRENGIMAS">Kapavietes irengimas</option>
          <option value="KITA">Kita</option>
        </select>
        <span style={{ fontSize: "13px", color: "var(--muted)", flexShrink: 0 }}>
          {filtered.length} uzklausu
        </span>
      </div>

      {/* Desktop table */}
      <div
        style={{
          background: "var(--cream2)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table
          className="leads-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)" }}>
              {["Data", "Vardas", "Telefonas", "Paslauga", "Statusas", "Saltinis"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "40px 16px",
                    textAlign: "center",
                    color: "var(--muted)",
                    fontSize: "14px",
                  }}
                >
                  Uzklausu nerasta
                </td>
              </tr>
            ) : (
              filtered.map((lead, i) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  style={{
                    borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "var(--cream)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "transparent";
                  }}
                >
                  <td style={{ padding: "12px 16px", color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {new Date(lead.createdAt).toLocaleDateString("lt-LT")}
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--espresso)" }}>
                    {lead.name}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <a
                      href={`tel:${lead.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "var(--clay)", textDecoration: "none" }}
                    >
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                    {SERVICE_LABELS[lead.serviceType]}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={lead.status} />
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: "13px", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {lead.source}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div
          className="leads-cards"
          style={{
            flexDirection: "column",
            gap: 0,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: "40px 16px", textAlign: "center", color: "var(--muted)", fontSize: "14px" }}>
              Uzklausu nerasta
            </div>
          ) : (
            filtered.map((lead, i) => (
              <div
                key={lead.id}
                onClick={() => setSelected(lead)}
                style={{
                  padding: "16px",
                  borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ fontWeight: 600, color: "var(--espresso)", fontSize: "15px" }}>
                    {lead.name}
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
                <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "4px" }}>
                  {new Date(lead.createdAt).toLocaleDateString("lt-LT")} &middot; {SERVICE_LABELS[lead.serviceType]}
                </div>
                <a
                  href={`tel:${lead.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: "14px", color: "var(--clay)", textDecoration: "none", fontWeight: 600 }}
                >
                  {lead.phone}
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lead drawer */}
      {selected && (
        <LeadDrawer lead={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
