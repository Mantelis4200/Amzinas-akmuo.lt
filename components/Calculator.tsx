"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui";
import { calcPrice, CFG, type StoneId } from "@/lib/pricing";
import { STONES } from "@/lib/stone-data";

// ─── helpers ────────────────────────────────────────────────────────────────

function eur(n: number): string {
  return "€" + n.toLocaleString("lt-LT");
}

// ─── sub-components ─────────────────────────────────────────────────────────

type SliderProps = {
  label: string;
  id: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
};

function Slider({ label, id, min, max, value, onChange }: SliderProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        htmlFor={id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 8,
          color: "var(--espresso)",
        }}
      >
        <span>{label}</span>
        <b
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 400,
            color: "var(--clay)",
            fontSize: 16,
          }}
        >
          {value} cm
        </b>
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--clay)", height: 4, cursor: "pointer" }}
      />
    </div>
  );
}

type SwatchProps = {
  stone: (typeof STONES)[number];
  selected: boolean;
  onClick: () => void;
};

function Swatch({ stone, selected, onClick }: SwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "10px 12px",
        border: `1px solid ${selected ? "var(--clay)" : "var(--line)"}`,
        borderRadius: 10,
        cursor: "pointer",
        fontSize: 13,
        background: selected ? "#F3E7D8" : "var(--cream)",
        color: "var(--espresso)",
        fontFamily: "var(--font-sans), sans-serif",
        transition: "border-color .2s, background .2s",
        textAlign: "left",
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          flexShrink: 0,
          background: stone.color,
          border: "1px solid rgba(0,0,0,.15)",
          display: "inline-block",
        }}
      />
      {stone.name}
    </button>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export function Calculator() {
  const [l, setL] = useState(80);
  const [w, setW] = useState(60);
  const [t, setT] = useState(8);
  const [stoneId, setStoneId] = useState<StoneId>("juodas");

  const stone = STONES.find((s) => s.id === stoneId)!;
  const price = calcPrice({ l, w, t, stone: stoneId });

  // breakdown
  const m3 = (l / 100) * (w / 100) * (t / 100);
  const stoneCost = Math.round((m3 * CFG.pricePerM3[stoneId]) / 10) * 10;
  const workCost = Math.round((m3 * CFG.pricePerM3[stoneId] * CFG.workMultiplier) / 10) * 10;
  const baseCost = CFG.baseFee;

  const contactHref = `/kontaktai?paslauga=ANTKAPIS&zinute=${encodeURIComponent(
    `Domina antkapis: ${l}×${w}×${t} cm, ${stone.name}, nuo €${price}`
  )}`;

  return (
    <div
      style={{
        background: "var(--cream2)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: 24,
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 20,
      }}
      className="calc-grid"
    >
      {/* ── left panel ── */}
      <div>
        {/* sliders */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          Matmenys
        </p>

        <Slider label="Ilgis (aukštis)" id="calc-l" min={40} max={150} value={l} onChange={setL} />
        <Slider label="Plotis" id="calc-w" min={30} max={120} value={w} onChange={setW} />
        <Slider label="Storis" id="calc-t" min={4} max={20} value={t} onChange={setT} />

        {/* stone swatches */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontWeight: 600,
            marginTop: 6,
            marginBottom: 14,
          }}
        >
          Akmens tipas / spalva
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 9,
          }}
        >
          {STONES.map((s) => (
            <Swatch
              key={s.id}
              stone={s}
              selected={s.id === stoneId}
              onClick={() => setStoneId(s.id)}
            />
          ))}
        </div>
      </div>

      {/* ── result panel ── */}
      <div
        style={{
          background: "var(--espresso)",
          color: "var(--cream)",
          borderRadius: 14,
          padding: 24,
          alignSelf: "start",
          position: "sticky",
          top: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#D7A574",
          }}
        >
          Preliminari kaina
        </p>

        <p
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 400,
            fontSize: 42,
            margin: "6px 0 2px",
            lineHeight: 1.1,
          }}
        >
          nuo {eur(price)}
        </p>

        <p style={{ fontSize: 13, color: "rgba(247,242,234,.6)", marginBottom: 0 }}>
          paminklui (be montavimo*)
        </p>

        {/* breakdown */}
        <div
          style={{
            marginTop: 16,
            borderTop: "1px solid rgba(247,242,234,.18)",
            paddingTop: 14,
          }}
        >
          {/* dims line */}
          <p
            style={{
              fontSize: 12,
              color: "rgba(247,242,234,.55)",
              marginBottom: 14,
            }}
          >
            {l}×{w}×{t} cm · {m3.toFixed(3)} m³ · {stone.name}
          </p>

          {[
            { label: "Akmuo (tūris)", val: stoneCost },
            { label: "Apdirbimas / graviravimas", val: workCost },
            { label: "Bazinis (pjovimas, pamatas*)", val: baseCost },
          ].map(({ label, val }) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginBottom: 8,
                color: "rgba(247,242,234,.85)",
              }}
            >
              <span>{label}</span>
              <span style={{ fontWeight: 600, color: "#fff" }}>{eur(val)}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 4 }}>
          <Button
            href={contactHref}
            variant="primary"
            className="calc-cta"
          >
            Užklausti tikslios kainos →
          </Button>
        </div>

        {/* disclaimer */}
        <p
          style={{
            fontSize: 11.5,
            color: "rgba(247,242,234,.55)",
            marginTop: 14,
            background: "rgba(255,255,255,.07)",
            borderRadius: 9,
            padding: "11px 13px",
            border: "1px solid rgba(247,242,234,.12)",
            lineHeight: 1.55,
          }}
        >
          Preliminari kaina; tikslią pateiksime susisiekę. Koeficientai laikini — priklauso nuo
          formos, graviravimo ir kapinių.
        </p>
      </div>

      {/* responsive: stack on mobile */}
      <style>{`
        @media (max-width: 820px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
        .calc-cta {
          display: flex !important;
          width: 100% !important;
          justify-content: center !important;
          background: var(--clay) !important;
          color: #fff !important;
        }
        .calc-cta:hover {
          background: #c98a5e !important;
          transform: none !important;
        }
      `}</style>
    </div>
  );
}

export default Calculator;
