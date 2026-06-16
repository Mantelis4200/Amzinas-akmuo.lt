type BeforeAfterProps = {
  count?: number;
};

const beforeGradients = [
  "linear-gradient(140deg, #BEB0A0, #7E7062)",
  "linear-gradient(140deg, #C0B4A4, #826E5C)",
  "linear-gradient(140deg, #B8ADA0, #786A60)",
];

const afterGradients = [
  "linear-gradient(140deg, #D8CCB6, #A2917A)",
  "linear-gradient(140deg, #D4C8B2, #A59076)",
  "linear-gradient(140deg, #DDD1BB, #B0997E)",
];

export function BeforeAfter({ count = 3 }: BeforeAfterProps) {
  return (
    <>
      <style>{`
        .before-after-section {
          padding: 88px 0;
        }
        .before-after-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .before-after-head {
          margin-bottom: 36px;
        }
        .before-after-head h2 {
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-top: 10px;
        }
        .before-after-pairs {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .before-after-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .before-after-tile {
          position: relative;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
        }
        .before-after-tile-label {
          position: absolute;
          left: 12px;
          top: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(247, 242, 234, 0.88);
          color: var(--espresso);
        }
        .before-after-tile-sub {
          position: absolute;
          left: 12px;
          bottom: 12px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(43, 37, 32, 0.5);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          background: rgba(247, 242, 234, 0.7);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .before-after-pair-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cream2);
          border: 1px solid var(--line);
          font-size: 16px;
          color: var(--clay);
          z-index: 1;
          pointer-events: none;
        }
        .before-after-pair-wrapper {
          position: relative;
        }
        @media (max-width: 600px) {
          .before-after-pair {
            grid-template-columns: 1fr;
          }
          .before-after-tile {
            height: 160px;
          }
        }
      `}</style>

      <section className="before-after-section">
        <div className="before-after-wrap">
          <div className="before-after-head">
            <div className="eyebrow">Prieš / Po</div>
            <h2 className="font-serif">Restauravimo rezultatai</h2>
          </div>

          <div className="before-after-pairs">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="before-after-pair-wrapper">
                <div className="before-after-pair">
                  {/* Before */}
                  <div
                    className="before-after-tile"
                    style={{ background: beforeGradients[i % beforeGradients.length] }}
                  >
                    <span className="before-after-tile-label">Prieš</span>
                    <span className="before-after-tile-sub">nuotrauka</span>
                  </div>

                  {/* After */}
                  <div
                    className="before-after-tile"
                    style={{ background: afterGradients[i % afterGradients.length] }}
                  >
                    <span className="before-after-tile-label">Po</span>
                    <span className="before-after-tile-sub">nuotrauka</span>
                  </div>
                </div>

                {/* Arrow icon centred between tiles */}
                <div
                  className="before-after-pair-divider"
                  aria-hidden="true"
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default BeforeAfter;
