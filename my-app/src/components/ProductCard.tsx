import { Link } from "react-router-dom";
import type { Product } from "../types/api";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const hasDiscount = product.discountedPrice < product.price;
  const pct = hasDiscount
    ? Math.round((1 - product.discountedPrice / product.price) * 100)
    : 0;

  return (
    <div className="group block bg-neutral-50 overflow-hidden">
      <div className="relative">
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 rounded-md bg-black text-white text-[11px] px-2 py-1 tracking-wide">
            -{pct}%
          </span>
        )}
        <Link to={`/products/${product.id}`} className="block cursor-pointer">
          <div className="aspect-square sm:aspect-[4/5] w-full flex items-center justify-center bg-neutral-50 p-4 sm:p-6">
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
        </Link>
      </div>

      <div className="p-3 sm:p-4 text-center">
        <h3 className="text-[13px] sm:text-sm font-semibold tracking-wide uppercase line-clamp-2">
          {product.title}
        </h3>

        {typeof product.rating !== "undefined" && (
          <p className="mt-1 text-xs text-neutral-600">⭐ {product.rating}</p>
        )}

        <div className="mt-2 flex items-center justify-center gap-2">
          <strong className="tracking-wide text-sm sm:text-base">
            {product.discountedPrice.toFixed(0)} NOK
          </strong>
          {hasDiscount && (
            <span className="line-through text-neutral-500 text-sm">
              {product.price.toFixed(0)} NOK
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 sm:mt-6 inline-flex w-full max-w-[240px] items-center justify-center
                     border-2 border-black bg-white text-[#333333]
                     uppercase tracking-wide font-semibold rounded-xl shadow-none
                     hover:bg-[#333333] hover:text-white hover:translate-y-[1px]
                     focus-visible:ring-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                     px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm transition cursor-pointer"
        >
          Buy
        </Link>
      </div>
    </div>
  );
}
