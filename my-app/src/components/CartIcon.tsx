type CartIconProps = { count: number };

export default function CartIcon({ count }: CartIconProps) {
  return (
    <div className="relative inline-block">
      <span role="img" aria-label="cart" className="text-2xl">
        🛒
      </span>
      {count > 0 && (
        <span
          className="absolute -top-1 -right-2 min-w-5 h-5 px-1 rounded-full
                     bg-black text-white text-[10px] leading-5 text-center"
          aria-label={`${count} items in cart`}
        >
          {count}
        </span>
      )}
    </div>
  );
}
