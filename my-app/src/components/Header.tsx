import { Link, NavLink } from "react-router-dom";
import { useCart } from "../state/useCart";
import CartIcon from "./CartIcon";

export default function Header() {
  const { totalQty } = useCart();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm md:text-base hover:underline
     ${isActive ? "font-semibold" : ""}`;

  return (
    <header className="sticky top-0 z-10 bg-[#D9BEBF]">
      <nav className="max-w-6xl mx-auto px-4 py-2 text-[#333333]">
        <div className="grid grid-cols-3 items-center py-2">
          <div />
          <Link
            to="/"
            className="justify-self-center font-heading text-3xl tracking-tight"
          >
            React Shop
          </Link>
          <div className="justify-self-end">
            <Link to="/checkout" aria-label="Open cart" className="ml-2">
              <CartIcon count={totalQty} />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-3 pb-2">
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/checkout" className={linkClass}>
            Checkout
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
