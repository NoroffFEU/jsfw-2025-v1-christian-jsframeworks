import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product, ApiListResponse } from "../types/api";

export default function ProductPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_BASE}/online-shop`;
    fetch(url)
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))
      )
      .then((json: ApiListResponse<Product>) => setItems(json.data))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (err) return <p className="p-4 text-red-700">{err}</p>;

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {items.map((p) => {
        const hasDiscount = p.discountedPrice < p.price;
        const pct = hasDiscount
          ? Math.round((1 - p.discountedPrice / p.price) * 100)
          : 0;

        return (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={p.image.url}
              alt={p.image.alt}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {hasDiscount && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                -{pct}%
              </span>
            )}

            <div className="absolute bottom-0 w-full bg-black/70 text-white p-2 flex justify-between items-center">
              <h3 className="font-semibold truncate">{p.title}</h3>
              <div className="flex items-center gap-1">
                <strong>{p.discountedPrice.toFixed(0)} NOK</strong>
                {hasDiscount && (
                  <span className="line-through text-gray-300 text-sm">
                    {p.price.toFixed(0)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
