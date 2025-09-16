import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

export default function TextInput({ error, className = "", ...rest }: Props) {
  return (
    <input
      {...rest}
      aria-invalid={!!error}
      aria-describedby={error ? `${rest.id}-error` : undefined}
      className={`
        w-full bg-transparent px-0 py-2 outline-none transition
        border-0 border-b
        ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-gray-300 focus:border-gray-900"
        }
        focus:ring-0 focus:border-b-2
        placeholder:text-gray-400
        ${className}
      `}
    />
  );
}
