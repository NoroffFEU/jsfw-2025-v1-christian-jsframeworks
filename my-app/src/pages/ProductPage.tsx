import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Product, ApiListResponse } from "../types/api";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

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

  useEffect(() => {
    if (err) toast.error(`Failed to load products: ${err}`);
  }, [err]);

  useEffect(() => {
    if (!loading && !err && items.length === 0) {
      toast("No products found.", { icon: "ℹ️" });
    }
  }, [loading, err, items.length]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-6xl min-h-[50vh] grid place-items-center">
          <Spinner size="lg" label="Loading products" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {err}
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const currentItems = items.slice(start, start + pageSize);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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

        {!items.length && (
          <p className="text-center text-gray-600 mt-8">No products found.</p>
        )}
      </div>
    </div>
  );
}
