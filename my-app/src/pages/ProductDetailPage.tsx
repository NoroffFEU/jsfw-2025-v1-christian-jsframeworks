import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { Product, ApiSingleResponse } from "../types/api";
import { useCart } from "../state/useCart";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { add } = useCart();

  useEffect(() => {
    if (!id) return;
    const API_BASE =
      import.meta.env.VITE_API_BASE ?? "https://v2.api.noroff.dev";
    const url = `${API_BASE}/online-shop/${id}`;

    setLoading(true);
    setErr(null);

    fetch(url)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))
      )
      .then((json: ApiSingleResponse<Product>) => setItem(json.data))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (err) return <p className="p-4 text-red-700">{err}</p>;

  if (!item) return <p className="p-4">Product not found</p>;

  const hasDiscount = item.discountedPrice < item.price;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/products"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <span aria-hidden="true">←</span> Back to products
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div className="relative aspect-w-4 aspect-h-3">
            <img
              src={item.image.url}
              alt={item.image.alt}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{item.title}</h1>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {item.discountedPrice.toFixed(2)} NOK
              </span>
              {hasDiscount && (
                <span className="line-through text-lg text-gray-400">
                  {item.price.toFixed(2)} NOK
                </span>
              )}
            </div>

            <button
              onClick={() => {
                add({
                  id: item.id,
                  title: item.title,
                  price: item.discountedPrice,
                  imageUrl: item.image.url,
                  qty: 1,
                });
                toast.success("Added to cart");
              }}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Add to Cart
            </button>

            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <section className="mt-12">
          <h3 className="font-bold text-2xl text-gray-900 border-b pb-2">
            Reviews
          </h3>
          {item.reviews?.length ? (
            <div className="bg-white rounded-xl mt-4 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {item.reviews.map((r) => (
                  <li key={r.id} className="p-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                      <span>{r.username}</span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span className="font-semibold">{r.rating}</span>
                        <span className="text-xl">⭐</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      {r.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 mt-4">No reviews yet. Be the first!</p>
          )}
        </section>
      </div>
    </div>
  );
}
