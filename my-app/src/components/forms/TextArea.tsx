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
