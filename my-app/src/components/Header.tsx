import { Link, NavLink } from "react-router-dom";
import { useCart } from "../state/useCart";
import CartIcon from "./CartIcon";

export default function Header() {
  const { totalQty } = useCart();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm md:text-base hover:underline ${
      isActive ? "font-semibold" : ""
    }`;

  return (
    <header className="sticky top-0 z-10 bg-[#D9BEBF]">
      <nav className="max-w-6xl mx-auto px-4 py-2 text-[#333333]">
        <div className="grid grid-cols-3 items-center py-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2"
            aria-label="BlackBox home"
          >
            <img
              src="/blackbox.svg"
              alt=""
              aria-hidden="true"
              className="h-10 md:h-12 w-auto select-none"
              draggable={false}
            />
            <span className="font-heading text-2xl md:text-3xl tracking-tight">
              BlackBox
            </span>
          </Link>

          <div className="justify-self-center hidden sm:flex items-center gap-6">
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

          <div className="justify-self-end">
            <Link to="/checkout" aria-label="Open cart" className="ml-2">
              <CartIcon count={totalQty} />
            </Link>
          </div>
        </div>

        <div className="sm:hidden flex items-center justify-center gap-6 pt-2 pb-1">
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
