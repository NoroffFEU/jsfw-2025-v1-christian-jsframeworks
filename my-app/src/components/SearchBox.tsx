import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export type SearchSuggestion = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  alt?: string;
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  suggestions?: SearchSuggestion[];
  toPrefix?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
};

export default function SearchBox({
  value,
  onChange,
  suggestions = [],
  toPrefix = "/products/",
  label = "Search products",
  placeholder = "Search by name...",
  className = "",
  debounceMs = 200,
}: Props) {
  const [open, setOpen] = useState(false);

  const noResultToastedRef = useRef(false);
  const minChars = 2;

  useEffect(() => {
    const term = value.trim();
    if (term.length < minChars || suggestions.length > 0) {
      noResultToastedRef.current = false;
      return;
    }
    const id = setTimeout(() => {
      if (!noResultToastedRef.current) {
        toast(`No matches for “${term}”`, { icon: "🔎" });
        noResultToastedRef.current = true;
      }
    }, debounceMs);

    return () => clearTimeout(id);
  }, [value, suggestions, debounceMs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const term = value.trim();
      setOpen(false);
      if (
        term.length >= minChars &&
        suggestions.length === 0 &&
        !noResultToastedRef.current
      ) {
        toast(`No matches for “${term}”`, { icon: "🔎" });
        noResultToastedRef.current = true;
      }
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-[#333333]"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
          {suggestions.map((s) => (
            <li key={s.id} className="hover:bg-neutral-50">
              <Link
                to={`${toPrefix}${s.id}`}
                className="flex items-center gap-3 px-3 py-2"
                onClick={() => setOpen(false)}
              >
                <div className="w-9 h-9 bg-neutral-50 rounded-lg grid place-items-center overflow-hidden">
                  <img
                    src={s.imageUrl}
                    alt={s.alt || s.title}
                    className="max-h-full w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#333333]">
                    {s.title}
                  </p>
                  <p className="text-xs text-neutral-600">
                    {Math.round(s.price)} NOK
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
