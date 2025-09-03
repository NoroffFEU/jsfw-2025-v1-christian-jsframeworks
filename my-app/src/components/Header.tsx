import { Link, NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Header() {
  const cartCount = 0;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 py-1 hover:underline ${isActive ? "font-semibold" : ""}`;
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Noroff Shop
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/checkout" className={linkClass}>
            Checkout
          </NavLink>

          <Link to="/checkout" aria-label="Open cart" className="ml-2">
            <CartIcon count={cartCount} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
