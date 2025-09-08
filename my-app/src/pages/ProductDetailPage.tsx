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
    <div className="max-w-5xl mx-auto">
      <Link to="/products" className="text-sm underline">
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <img
          src={item.image.url}
          alt={item.image.alt}
          className="w-full rounded-xl object-cover"
        />

        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="mt-2 text-gray-700">{item.description}</p>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-xl font-bold">
              {item.discountedPrice.toFixed(2)} NOK
            </span>
            {hasDiscount && (
              <span className="line-through text-gray-400">
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
            className="mt-4 bg-black text-white rounded-xl px-4 py-2 hover:opacity-90"
          >
            Add to Cart
          </button>

          {item.tags?.length > 0 && (
            <p className="mt-4 text-sm text-gray-600">
              Tags: {item.tags.join(", ")}
            </p>
          )}
        </div>
      </div>

      <section className="mt-8">
        <h3 className="font-semibold text-lg">Reviews</h3>
        {item.reviews?.length ? (
          <ul className="mt-3 space-y-3">
            {item.reviews.map((r) => (
              <li key={r.id} className="border rounded-xl p-3">
                <div className="text-sm font-medium">
                  {r.username} — {r.rating}/5
                </div>
                <p className="text-sm mt-1">{r.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 mt-2">No reviews yet.</p>
        )}
      </section>
    </div>
  );
}
