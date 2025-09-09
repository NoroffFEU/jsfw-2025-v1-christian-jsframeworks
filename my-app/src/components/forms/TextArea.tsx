import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export default function TextArea({ error, className = "", ...rest }: Props) {
  return (
    <textarea
      {...rest}
      aria-invalid={!!error}
      aria-describedby={error ? `${rest.id}-error` : undefined}
      className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring resize-y
        ${error ? "border-red-500" : "border-gray-300"} ${className}`}
    />
  );
}
