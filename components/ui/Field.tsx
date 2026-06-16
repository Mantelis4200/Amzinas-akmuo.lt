import React from "react";

export type FieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
};

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "10px" }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--espresso)",
          opacity: 0.8,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          role="alert"
          style={{
            fontSize: "12px",
            color: "var(--clay-deep)",
            marginTop: "2px",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default Field;
