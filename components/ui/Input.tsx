import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className = "", style, ...props }, ref) {
    return (
      <input
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
          transition: "border-color 0.2s",
          ...style,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
