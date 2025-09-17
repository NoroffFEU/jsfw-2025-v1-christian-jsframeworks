import React from "react";

type Props = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxButtons?: number;
};

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  className = "",
  maxButtons = 7,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const clamp = (n: number) => Math.min(Math.max(n, 1), totalPages);

  const pages: (number | "…")[] = [];
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxButtons - 1);

  start = Math.max(1, end - maxButtons + 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("…");
  }
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <nav
      className={`flex justify-center items-center gap-2 mt-6 ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(clamp(currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer"
        aria-label="Previous page"
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={currentPage === p ? "page" : undefined}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === p
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(clamp(currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
