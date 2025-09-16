import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "border border-gray-300 text-gray-800 hover:bg-gray-50",
  ghost: "bg-transparent text-indigo-700 hover:bg-indigo-50",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export default function Button({
  loading,
  loadingText = "Loading...",
  children,
  className = "",
  variant = "primary",
  size = "md",
  block = false,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      type={type}
      disabled={loading || rest.disabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium shadow transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        block ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {loading ? loadingText : children}
    </button>
  );
}
