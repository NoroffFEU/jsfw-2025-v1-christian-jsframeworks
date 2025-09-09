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
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-105 duration-300"
    >
      <img
        src={product.image.url}
        alt={product.image.alt || product.title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />

      {hasDiscount && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          -{pct}%
        </span>
      )}

      <div className="absolute bottom-0 w-full bg-black/70 text-white p-2 flex justify-between items-center">
        <h3 className="font-semibold truncate">{product.title}</h3>
        <div className="flex items-center gap-1">
          <strong>{product.discountedPrice.toFixed(0)} NOK</strong>
          {hasDiscount && (
            <span className="line-through text-gray-300 text-sm">
              {product.price.toFixed(0)} NOK
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
