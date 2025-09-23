import React from "react";
import Spinner from "./Spinner";

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
  primary:
    "border-2 border-black bg-transparent cursor-pointer text-[#333333] " +
    "uppercase tracking-wide font-semibold rounded-xl shadow-none " +
    "hover:bg-[#333333] hover:text-white " +
    "focus-visible:ring-black",
  secondary:
    "border-2 bg-[#333333] text-white " +
    "uppercase cursor-pointer tracking-wide font-semibold rounded-xl shadow-none " +
    "hover:bg-[#6F6464] hover:text-white " +
    "focus-visible:ring-black",
  ghost: "bg-transparent text-indigo-700 hover:bg-indigo-50",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-5 py-3",
  lg: "text-lg px-6 py-3",
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
      {loading ? (
        <>
          <Spinner size="sm" className="-ml-1" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
