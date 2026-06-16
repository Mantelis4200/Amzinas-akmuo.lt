import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function variantClass(variant: ButtonVariant): string {
  if (variant === "primary") return "btn btn-primary";
  return "btn btn-ghost";
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button({ variant = "primary", className = "", children, ...props }, ref) {
  const classes = `${variantClass(variant)}${className ? ` ${className}` : ""}`;

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick, ...rest } = props as ButtonAsLink;
    // External links use <a>; internal use Next Link
    if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button
      className={classes}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
