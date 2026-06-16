const steps = [
  {
    n: "01",
    title: "Užklausa",
    desc: "Paliekate užklausą — susisiekiame greitai.",
  },
  {
    n: "02",
    title: "Vizitas",
    desc: "Vadovas atvyksta, įvertina, pataria.",
  },
  {
    n: "03",
    title: "Pasiūlymas",
    desc: "Dizainas ir skaidri kaina.",
  },
  {
    n: "04",
    title: "Gamyba",
    desc: "Gaminame savo dirbtuvėse.",
  },
  {
    n: "05",
    title: "Montavimas",
    desc: "Pastatome ir sutvarkome vietą.",
  },
];

export function Process() {
  return (
    <>
      <style>{`
        .process-section {
          background: var(--espresso);
          color: var(--cream);
          padding: 88px 0;
        }
        .process-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .process-section .eyebrow {
          color: #D7A574;
        }
        .process-section h2 {
          color: var(--cream);
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-top: 10px;
          margin-bottom: 0;
        }
        .process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-top: 40px;
        }
        .process-step {
          padding: 22px 0;
          border-top: 2px solid rgba(247, 242, 234, 0.22);
        }
        .process-step-n {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 30px;
          color: #D7A574;
        }
        .process-step h4 {
          font-size: 15px;
          margin: 10px 0 6px;
          font-weight: 600;
          color: var(--cream);
        }
        .process-step p {
          font-size: 12.5px;
          color: rgba(247, 242, 234, 0.62);
          line-height: 1.55;
        }
        @media (max-width: 880px) {
          .process-steps {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .process-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="process-section">
        <div className="process-wrap">
          <div className="eyebrow">Kaip vyksta darbas</div>
          <h2 className="font-serif">Aiškus procesas — penki žingsniai</h2>
          <div className="process-steps">
            {steps.map((step) => (
              <div key={step.n} className="process-step">
                <div className="process-step-n">{step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Process;
