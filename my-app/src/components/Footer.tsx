import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#D9BEBF] text-[#333333]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Link to="/" className="font-bold text-xl tracking-tight">
              React Shop
            </Link>
            <p className="mt-2 text-sm">
              Find what you need fast—search, sort, and check out in seconds.
            </p>
          </div>

          <nav aria-label="Footer" className="sm:justify-self-center">
            <p className="font-semibold">Quick links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="hover:underline underline-offset-4"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:underline underline-offset-4"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  className="hover:underline underline-offset-4"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </nav>

          <div className="sm:justify-self-end">
            <p className="font-semibold">Get in touch</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4" />
                support@example.com
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                +47 123 45 678
              </li>
            </ul>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-4 inline-flex items-center gap-2 text-sm hover:underline underline-offset-4"
            >
              <ArrowUpIcon className="w-4 h-4" />
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-[#333333]/20 pt-4 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>© {year} React Shop • All rights reserved</p>
          <p className="text-xs opacity-80">
            Built and designed by Christian Grøtteland
          </p>
        </div>
      </div>
    </footer>
  );
}
