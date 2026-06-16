import type { Metadata } from "next";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin · Amžinas Akmuo",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--cream2)",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <span
          className="font-serif"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--espresso)",
            letterSpacing: "-0.01em",
          }}
        >
          Amžinas Akmuo · Admin
        </span>

        <LogoutButton />
      </header>

      {/* Page content */}
      <main style={{ flex: 1, padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  );
}
