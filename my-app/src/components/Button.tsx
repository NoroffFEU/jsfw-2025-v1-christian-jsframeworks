import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({
  loading,
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white
        hover:bg-blue-700 disabled:opacity-50 ${className}`}
    >
      {loading ? "Sending..." : children}
    </button>
  );
}
