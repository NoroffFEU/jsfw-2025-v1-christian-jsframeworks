import React from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  isRequired?: boolean;
  children: React.ReactNode;
};

export default function FormField({
  id,
  label,
  error,
  isRequired,
  children,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium mb-1">
        {label} {isRequired && <span className="text-red-600">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
