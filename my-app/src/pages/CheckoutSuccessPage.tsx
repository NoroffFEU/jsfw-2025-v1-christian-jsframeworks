import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";
import PageLoader from "../components/PageLoader";

export default function CheckoutSuccessPage() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative bg-white min-h-[60vh]" aria-busy={pageLoading}>
      <PageLoader active={pageLoading} label="Loading confirmation…" />

      <div className="mx-auto max-w-6xl px-4 py-14 text-center text-[#333333]">
        <div className="flex justify-center">
          <CheckCircleIcon
            className="w-14 h-14 text-[#B69899]"
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-4 text-3xl font-heading">Order confirmed</h1>
        <p className="mt-3">
          Thanks for your purchase. You will receive an email with confirmation
          and delivery details.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/products">
            <Button variant="primary" size="md">
              Continue shopping
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="md">
              Go to home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
