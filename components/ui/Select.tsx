import { forwardRef } from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className = "", style, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={className}
        style={{
          width: "100%",
          padding: "12px 14px",
          border: "1px solid var(--line)",
          borderRadius: "9px",
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "14px",
          background: "var(--cream)",
          color: "var(--espresso)",
          outline: "none",
          appearance: "auto",
          cursor: "pointer",
          transition: "border-color 0.2s",
          ...style,
        }}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
