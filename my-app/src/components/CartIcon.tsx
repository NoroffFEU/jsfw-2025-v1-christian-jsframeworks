import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type CartIconProps = {
  count: number;
  size?: number;
  className?: string;
};

export default function CartIcon({
  count,
  size = 28,
  className = "",
}: CartIconProps) {
  const badge = Math.max(16, Math.round(size * 0.44));
  const fontSize = badge <= 18 ? 10 : badge <= 22 ? 11 : 12;
  const offset = Math.round(badge * 0.28);

  return (
    <div
      className={`relative inline-flex ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <ShoppingCartIcon
        aria-hidden="true"
        style={{ width: size, height: size }}
        className="stroke-2"
      />

      {count > 0 && (
        <span
          className="absolute rounded-full bg-black text-white text-center ring-1 ring-white"
          style={{
            width: badge,
            minWidth: badge,
            height: badge,
            lineHeight: `${badge}px`,
            fontSize,
            top: -offset,
            right: -offset,
          }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}

      <span className="sr-only">{count} items in cart</span>
    </div>
  );
}
