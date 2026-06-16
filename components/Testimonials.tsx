type TestimonialsProps = {
  quote?: string;
  author?: string;
};

const DEFAULT_QUOTE =
  "Bijojau viso šito proceso, bet vadovas atvažiavo, viską ramiai paaiškino ir paminklas pasirodė gražesnis nei tikėjausi. Ačiū už žmogišką požiūrį.";
const DEFAULT_AUTHOR = "— Rūta K., Vilnius";

export function Testimonials({
  quote = DEFAULT_QUOTE,
  author = DEFAULT_AUTHOR,
}: TestimonialsProps) {
  return (
    <>
      <style>{`
        .testimonials-section {
          padding: 88px 0;
        }
        .testimonials-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .testimonials-quote {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }
        .testimonials-quote .eyebrow {
          margin-bottom: 18px;
        }
        .testimonials-quote blockquote {
          font-size: clamp(22px, 2.8vw, 32px);
          font-style: italic;
          line-height: 1.4;
          color: var(--espresso);
          margin: 0;
        }
        .testimonials-quote blockquote::before {
          content: "„";
          color: var(--clay);
        }
        .testimonials-quote blockquote::after {
          content: """;
          color: var(--clay);
        }
        .testimonials-author {
          margin-top: 22px;
          font-size: 13.5px;
          color: var(--muted);
          font-weight: 600;
          letter-spacing: 0.02em;
        }
      `}</style>

      <section className="testimonials-section">
        <div className="testimonials-wrap">
          <div className="testimonials-quote">
            <div className="eyebrow" style={{ textAlign: "center" }}>
              Atsiliepimai
            </div>
            <blockquote className="font-serif">{quote}</blockquote>
            <div className="testimonials-author">{author}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
