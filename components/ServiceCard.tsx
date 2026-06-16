import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  /** Reserved for future real images; ignored for now */
  image?: string;
};

// Vary gradient per card via a simple index-free approach — caller can wrap in
// a list and index if desired. We use a CSS custom-property trick instead.
export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <>
      <style>{`
        .svc-card {
          background: var(--cream2);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 26px 50px -30px rgba(60, 48, 36, 0.5);
          border-color: transparent;
        }
        .svc-card-img {
          height: 170px;
          background: linear-gradient(150deg, #D8CBB4, #A9967B);
          flex-shrink: 0;
        }
        .svc-card-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .svc-card-body h3 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--espresso);
        }
        .svc-card-body p {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 14px;
          flex: 1;
          line-height: 1.55;
        }
        .svc-card-more {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--clay);
          text-decoration: none;
          transition: color 0.2s;
        }
        .svc-card-more:hover {
          color: var(--clay-deep);
        }
      `}</style>

      <div className="svc-card">
        <div className="svc-card-img" aria-hidden="true" />
        <div className="svc-card-body">
          <h3 className="font-serif">{title}</h3>
          <p>{description}</p>
          <Link href={href} className="svc-card-more">
            Sužinoti daugiau →
          </Link>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
