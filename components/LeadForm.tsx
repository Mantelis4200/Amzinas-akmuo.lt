"use client";

import { useActionState } from "react";
import { submitLead, LeadState } from "@/app/actions/submitLead";
import { Field, Input, Select } from "@/components/ui";

const initialState: LeadState = { ok: false };

type LeadFormProps = {
  source?: string;
  defaultService?: string;
  defaultMessage?: string;
};

export function LeadForm({
  source = "/",
  defaultService,
  defaultMessage,
}: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.ok) {
    return (
      <div
        style={{
          background: "var(--cream2)",
          border: "1px solid var(--line)",
          borderRadius: "14px",
          padding: "32px 22px",
          textAlign: "center",
        }}
      >
        <p
          className="font-serif"
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "var(--espresso)",
            marginBottom: "8px",
          }}
        >
          Ačiū!
        </p>
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>
          Susisieksime su Jumis artimiausiu metu.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .lead-form {
          background: var(--cream2);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 22px;
        }
        .lead-form textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--line);
          border-radius: 9px;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          background: var(--cream);
          color: var(--espresso);
          outline: none;
          transition: border-color 0.2s;
          resize: vertical;
          min-height: 90px;
          box-sizing: border-box;
        }
        .lead-form textarea:focus,
        .lead-form input:focus,
        .lead-form select:focus {
          border-color: var(--clay);
        }
        .lead-form-submit {
          width: 100%;
          justify-content: center;
          margin-top: 4px;
        }
        .lead-form-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none !important;
        }
        .visually-hidden-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
      `}</style>

      <form action={formAction} className="lead-form">
        {/* Honeypot field — bots fill this, real users don't */}
        <div className="visually-hidden-honeypot" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Hidden source field */}
        <input type="hidden" name="source" value={source} />

        {state.error && (
          <p
            role="alert"
            style={{
              color: "var(--clay-deep)",
              fontSize: "13px",
              marginBottom: "14px",
              padding: "10px 12px",
              background: "rgba(140,90,54,0.08)",
              borderRadius: "8px",
            }}
          >
            {state.error}
          </p>
        )}

        <Field label="Vardas" htmlFor="lf-name">
          <Input id="lf-name" name="name" placeholder="Jūsų vardas" />
        </Field>

        <Field label="Telefonas *" htmlFor="lf-phone">
          <Input
            id="lf-phone"
            name="phone"
            type="tel"
            placeholder="+370 600 00000"
            required
          />
        </Field>

        <Field label="El. paštas" htmlFor="lf-email">
          <Input
            id="lf-email"
            name="email"
            type="email"
            placeholder="el.pastas@pvz.lt"
          />
        </Field>

        <Field label="Paslauga" htmlFor="lf-service">
          <Select
            id="lf-service"
            name="serviceType"
            defaultValue={defaultService ?? ""}
          >
            <option value="" disabled>
              Pasirinkite paslaugą…
            </option>
            <option value="ANTKAPIS">Antkapis</option>
            <option value="RESTAURAVIMAS">Restauravimas</option>
            <option value="KAPAVIETES_IRENGIMAS">
              Kapaviečių įrengimas
            </option>
            <option value="KITA">Kita</option>
          </Select>
        </Field>

        <Field label="Žinutė" htmlFor="lf-message">
          <textarea
            id="lf-message"
            name="message"
            placeholder="Papildoma informacija ar klausimai…"
            defaultValue={defaultMessage ?? ""}
          />
        </Field>

        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary lead-form-submit"
        >
          {pending ? "Siunčiama…" : "Siųsti užklausą"}
        </button>
      </form>
    </>
  );
}

export default LeadForm;
