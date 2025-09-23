import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { Product, ApiListResponse } from "../types/api";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import SearchBox, { type SearchSuggestion } from "../components/SearchBox";
import SortSelect from "../components/SortSelect";
import PageLoader from "../components/PageLoader";

type SortValue =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export default function ProductPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState<string>(() => searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortValue>(
    () => (searchParams.get("sort") as SortValue) ?? "relevance"
  );

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

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (sort && sort !== "relevance") sp.set("sort", sort);
    setSearchParams(sp, { replace: true });
  }, [q, sort, setSearchParams]);

  useEffect(() => setCurrentPage(1), [q, sort]);

  const normalize = (s: string) => s.toLowerCase();
  const priceOf = (p: Product) => p.discountedPrice ?? p.price;

  const filtered = useMemo(() => {
    const term = q.trim();
    if (!term) return items;
    const t = normalize(term);
    return items.filter((p) => normalize(p.title).includes(t));
  }, [items, q]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => priceOf(a) - priceOf(b));
      case "price-desc":
        return arr.sort((a, b) => priceOf(b) - priceOf(a));
      case "name-asc":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return arr;
    }
  }, [filtered, sort]);

  const suggestions: SearchSuggestion[] = useMemo(() => {
    const term = q.trim();
    if (term.length < 2) return [];
    return sorted.slice(0, 6).map((p) => ({
      id: p.id,
      title: p.title,
      imageUrl: p.image.url,
      price: priceOf(p),
      alt: p.image.alt,
    }));
  }, [sorted, q]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const currentItems = sorted.slice(start, start + pageSize);

  return (
    <main className="relative p-6" aria-busy={loading}>
      {/* Full-viewport loading overlay */}
      <PageLoader active={loading} label="Loading products…" />

      <div className="mx-auto max-w-6xl">
        {/* Error banner */}
        {err && !loading && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {err}
          </div>
        )}

        {/* Controls */}
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 mt-2">
          <SearchBox
            value={q}
            onChange={setQ}
            suggestions={suggestions}
            toPrefix="/products/"
            className="md:max-w-md w-full"
          />
          <SortSelect value={sort} onChange={setSort} />
        </section>

        {/* Grid / Empty note */}
        {!err && (
          <>
            {sorted.length === 0 ? (
              <p className="text-center text-gray-600 mt-8">
                No matches for “{q}”.
              </p>
            ) : (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {currentItems.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                <Pagination
                  totalItems={sorted.length}
                  pageSize={pageSize}
                  currentPage={safePage}
                  onPageChange={(p) => {
                    setCurrentPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-8"
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
