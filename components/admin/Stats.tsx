interface LeadForStats {
  createdAt: Date | string;
  status: string;
}

interface StatsProps {
  leads: LeadForStats[];
}

function StatTile({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      style={{
        background: "var(--cream2)",
        border: "1px solid var(--line)",
        borderRadius: "12px",
        padding: "20px 24px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--clay)",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        className="font-serif"
        style={{
          fontSize: "36px",
          fontWeight: 500,
          color: "var(--espresso)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export function Stats({ leads }: StatsProps) {
  const now = new Date();
  const thisMonth = leads.filter((l) => {
    const d = l.createdAt instanceof Date ? l.createdAt : new Date(l.createdAt);
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      l.status === "NAUJAS"
    );
  }).length;

  const laimeta = leads.filter((l) => l.status === "LAIMETA").length;
  const prarasta = leads.filter((l) => l.status === "PRARASTA").length;
  const conversionDenominator = laimeta + prarasta;
  const conversion =
    conversionDenominator > 0 ? Math.round((laimeta / conversionDenominator) * 100) : 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "32px",
      }}
    >
      <StatTile label="Nauji sio menesio" value={thisMonth} sub="naujas statusas" />
      <StatTile label="Laimetos uzsakymai" value={laimeta} sub="is viso" />
      <StatTile
        label="Konversija"
        value={`${conversion}%`}
        sub={`${laimeta} is ${conversionDenominator}`}
      />
    </div>
  );
}
