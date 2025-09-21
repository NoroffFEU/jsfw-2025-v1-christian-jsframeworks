import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { Product, ApiSingleResponse } from "../types/api";
import { useCart } from "../state/useCart";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import RatingBadge from "../components/RatingBadge";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
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

  useEffect(() => {
    if (err) toast.error(`Failed to load product: ${err}`);
  }, [err]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-gray-50">
        <Spinner size="lg" label="Loading product" />
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-red-50">
        <div className="rounded-lg border border-red-200 bg-white px-6 py-4 text-red-700">
          {err}
          <div className="mt-3">
            <Link to="/products" className="text-indigo-600 hover:underline">
              ← Back to products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-gray-50">
        <div className="text-[#333333]">
          Product not found.{" "}
          <Link to="/products" className="text-indigo-600 hover:underline">
            Go back to products
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = item.discountedPrice < item.price;

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/products"
            className="text-[#333333] hover:text-[#6F6464] transition-colors"
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
              alt={item.image.alt || item.title}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-heading text-[#333333]">
              {item.title}
            </h1>
            <p className="mt-2 text-[#333333] leading-relaxed">
              {item.description}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <span className="text-3xl font-bold text-[#333333]">
                {item.discountedPrice.toFixed(2)} NOK
              </span>
              {hasDiscount && (
                <span className="line-through text-lg text-[#333333]">
                  {item.price.toFixed(2)} NOK
                </span>
              )}
            </div>

            <Button
              variant="secondary"
              size="lg"
              block
              loading={adding}
              loadingText="Adding..."
              onClick={async () => {
                try {
                  setAdding(true);
                  add({
                    id: item.id,
                    title: item.title,
                    price: item.discountedPrice,
                    imageUrl: item.image.url,
                    qty: 1,
                  });
                  toast.success("Added to cart");
                } finally {
                  setAdding(false);
                }
              }}
            >
              Add to Cart
            </Button>

            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-[#333333] text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <section className="mt-12">
          <h3 className="font-bold text-2xl text-[#333333] border-b pb-2">
            Reviews
          </h3>
          {item.reviews?.length ? (
            <div className="bg-neutral-50 rounded-xl mt-4 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {item.reviews.map((r) => (
                  <li key={r.id} className="p-4">
                    <div className="flex justify-between items-center text-sm font-medium text-[#333333]">
                      <span>{r.username}</span>
                      <RatingBadge
                        value={r.rating}
                        color="#B69899"
                        className="text-[#333333]"
                      />
                    </div>
                    <p className="text-[#333333] mt-2 text-sm">
                      {r.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-[#333333] mt-4">No reviews yet. Be the first!</p>
          )}
        </section>
      </div>
    </div>
  );
}
