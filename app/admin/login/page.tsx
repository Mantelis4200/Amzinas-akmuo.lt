"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Neteisingas el. paštas arba slaptažodis.");
      } else if (result?.ok) {
        router.push("/admin");
      }
    } catch {
      setError("Neteisingas el. paštas arba slaptažodis.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p
            className="eyebrow"
            style={{ marginBottom: "8px" }}
          >
            Administravimas
          </p>
          <h1
            className="font-serif"
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "var(--espresso)",
              margin: 0,
            }}
          >
            Amžinas Akmuo · Prisijungimas
          </h1>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--cream2)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "36px",
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <Field label="El. paštas" htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pavyzdys.lt"
                required
              />
            </Field>

            <Field label="Slaptažodis" htmlFor="password">
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Field>

            {error && (
              <p
                role="alert"
                style={{
                  color: "var(--clay-deep)",
                  fontSize: "13px",
                  marginBottom: "16px",
                  padding: "10px 14px",
                  background: "rgba(140, 90, 54, 0.08)",
                  borderRadius: "8px",
                  border: "1px solid rgba(140, 90, 54, 0.2)",
                }}
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              style={{ width: "100%", marginTop: "8px", justifyContent: "center" }}
            >
              {loading ? "Jungiamasi..." : "Prisijungti"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
