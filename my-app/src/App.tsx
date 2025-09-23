import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./components/Button";
import PageLoader from "./components/PageLoader";

export default function Home() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setPageLoading(false);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const t = window.setTimeout(finish, 1200);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(t);
    };
  }, []);

  return (
    <main className="bg-white min-h-[60vh]" aria-busy={pageLoading}>
      <PageLoader active={pageLoading} label="Loading page…" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <section className="grid md:grid-cols-2 items-center gap-10">
          <div className="text-center md:text-left">
            <p className="text-xs tracking-widest uppercase text-[#333333]/70">
              Welcome to
            </p>
            <h1 className="mt-1 text-4xl md:text-5xl font-heading text-[#333333]">
              React Shop
            </h1>
            <p className="mt-4 text-[#333333]">
              Don&apos;t miss a chance to save on items you&apos;ve been looking
              for. Search, sort, and check out in seconds.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
              <Link to="/products">
                <Button variant="primary" size="md">
                  Browse products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="md">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-first md:order-none">
            <div className="rounded-2xl bg-white p-4 md:p-6">
              <img
                src="/shopping.png"
                alt="Shopping journey illustration"
                className="w-full h-[320px] md:h-[420px] object-contain"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl bg-neutral-50 p-5 shadow-sm">
            <p className="font-semibold text-[#333333]">Fast checkout</p>
            <p className="text-sm text-[#333333]/80 mt-1">
              Simple, secure, and quick.
            </p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-5 shadow-sm">
            <p className="font-semibold text-[#333333]">Clean catalog</p>
            <p className="text-sm text-[#333333]/80 mt-1">
              Search &amp; sort with ease.
            </p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-5 shadow-sm">
            <p className="font-semibold text-[#333333]">
              International delivery
            </p>
            <p className="text-sm text-[#333333]/80 mt-1">
              7 day delivery guarantee
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
