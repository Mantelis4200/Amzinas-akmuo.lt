"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      style={{
        background: "transparent",
        border: "1px solid var(--line)",
        borderRadius: "100px",
        padding: "8px 18px",
        fontSize: "13px",
        fontWeight: 600,
        color: "var(--muted)",
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "var(--font-sans), sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--espresso)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--espresso)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
      }}
    >
      Atsijungti
    </button>
  );
}
