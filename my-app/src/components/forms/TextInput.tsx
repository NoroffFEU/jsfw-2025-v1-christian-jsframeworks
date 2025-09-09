import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

export default function TextInput({ error, className = "", ...rest }: Props) {
  return (
    <input
      {...rest}
      aria-invalid={!!error}
      aria-describedby={error ? `${rest.id}-error` : undefined}
      className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring
        ${error ? "border-red-500" : "border-gray-300"} ${className}`}
    />
  );
}
