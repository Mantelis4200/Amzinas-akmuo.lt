"use client";

import { useState } from "react";

type FilterChip = "Visi" | "Nauji" | "Restauruoti";

type GalleryProps = {
  count?: number;
  withFilter?: boolean;
};

// Assign layout variants to tiles for visual interest
function getTileClass(index: number): string {
  // Make tile 0 "big" (2×2), tile 2 "tall" (1×2)
  if (index === 0) return "gallery-tile gallery-big";
  if (index === 2) return "gallery-tile gallery-tall";
  return "gallery-tile";
}

// Alternate warm gradient tones
const gradients = [
  "linear-gradient(140deg, #D8CCB6, #A2917A)",
  "linear-gradient(140deg, #CFC2AE, #8E7E66)",
  "linear-gradient(140deg, #D3C7B2, #9D8C72)",
  "linear-gradient(140deg, #DFCEA8, #B49A74)",
  "linear-gradient(140deg, #D8CBB4, #A9967B)",
  "linear-gradient(140deg, #E3D8C4, #B5A68A)",
  "linear-gradient(140deg, #CBBFA9, #8A7B62)",
  "linear-gradient(140deg, #D6CAB3, #A6947C)",
];

export function Gallery({ count = 8, withFilter = false }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterChip>("Visi");
  const filters: FilterChip[] = ["Visi", "Nauji", "Restauruoti"];

  return (
    <>
      <style>{`
        .gallery-section {
          padding: 88px 0;
        }
        .gallery-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .gallery-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .gallery-chip {
          display: inline-flex;
          align-items: center;
          padding: 7px 18px;
          border-radius: 100px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--espresso);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-sans), sans-serif;
        }
        .gallery-chip:hover {
          border-color: var(--espresso);
        }
        .gallery-chip.active {
          background: var(--espresso);
          color: var(--cream);
          border-color: var(--espresso);
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 150px;
          gap: 14px;
        }
        .gallery-tile {
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }
        .gallery-big {
          grid-column: span 2;
          grid-row: span 2;
        }
        .gallery-tall {
          grid-row: span 2;
        }
        .gallery-tile-label {
          position: absolute;
          left: 10px;
          bottom: 10px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(43, 37, 32, 0.55);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(247, 242, 234, 0.75);
          padding: 3px 8px;
          border-radius: 4px;
        }
        @media (max-width: 880px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="gallery-section">
        <div className="gallery-wrap">
          {withFilter && (
            <div className="gallery-filters" role="group" aria-label="Filtruoti darbus">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`gallery-chip${activeFilter === f ? " active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                  aria-pressed={activeFilter === f}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          <div className="gallery-grid">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={getTileClass(i)}
                style={{ background: gradients[i % gradients.length] }}
                aria-label={`Darbų nuotrauka ${i + 1}`}
              >
                <span className="gallery-tile-label">nuotrauka</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
