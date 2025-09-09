import { useEffect, useState } from "react";
import type { Product, ApiListResponse } from "../types/api";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

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

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const start = (safePage - 1) * pageSize;
  const currentItems = items.slice(start, start + pageSize);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {currentItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Pagination
          totalItems={items.length}
          pageSize={pageSize}
          currentPage={safePage}
          onPageChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-8"
        />
      </div>
    </div>
  );
}
