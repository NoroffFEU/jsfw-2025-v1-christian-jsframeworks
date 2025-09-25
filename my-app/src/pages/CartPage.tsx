import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useCart } from "../state/useCart";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";
import { useEffect, useMemo, useState } from "react";
import PageLoader from "../components/PageLoader";

type CheckoutValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};
type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;
type Touched = Partial<Record<keyof CheckoutValues, boolean>>;

const initialCheckout: CheckoutValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneOk = (s: string) => s.replace(/[^\d]/g, "").length >= 7;

export default function CartPage() {
  const { items, totalCost, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const [checkout, setCheckout] = useState<CheckoutValues>(initialCheckout);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validate = (v: CheckoutValues): CheckoutErrors => {
    const e: CheckoutErrors = {};
    if (v.fullName.trim().length < 2)
      e.fullName = "Please enter your full name.";
    if (!emailRegex.test(v.email.trim()))
      e.email = "Enter a valid email address.";
    if (!phoneOk(v.phone)) e.phone = "Enter a valid phone number.";
    if (v.address.trim().length < 5) e.address = "Enter your delivery address.";
    return e;
  };

  useEffect(() => setErrors(validate(checkout)), [checkout]);

  const fieldError = (k: keyof CheckoutValues) =>
    touched[k] ? errors[k] : undefined;

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof CheckoutValues;
      value: string;
    };
    setCheckout((p) => ({ ...p, [name]: value }));
  };
  const onFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target as { name: keyof CheckoutValues };
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const formatNok = (n: number) =>
    `${Math.round(n).toLocaleString("no-NO")} NOK`;

  const onDec = (id: string, current: number, title: string) => {
    const next = current - 1;
    if (next <= 0) {
      remove(id);
      toast.success(`Removed "${title}" from cart`);
    } else {
      setQty(id, next);
    }
  };
  const onInc = (id: string, current: number) => setQty(id, current + 1);
  const onRemove = (id: string, title: string) => {
    remove(id);
    toast.success(`Removed "${title}" from cart`);
  };

  const itemCount = useMemo(
    () => items.reduce((a, b) => a + b.qty, 0),
    [items]
  );

  const onCheckout = () => {
    const errs = validate(checkout);
    setErrors(errs);
    setTouched({ fullName: true, email: true, phone: true, address: true });

    if (Object.keys(errs).length) {
      toast.error("Please fix the checkout form.");
      document
        .getElementById("checkout-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    toast.success("Checkout successful!");
    clear();
    setCheckout(initialCheckout);
    setTouched({});
    navigate("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <main className="relative bg-white min-h-[60vh]" aria-busy={pageLoading}>
        <PageLoader active={pageLoading} label="Loading cart…" />
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <h1 className="text-3xl font-heading text-[#333333]">
            Shopping Cart
          </h1>
          <div className="mx-auto mt-6 w-full max-w-sm rounded-2xl p-6">
            <img
              src="/emptypage.png"
              alt="Your cart is empty"
              className="w-full h-56 sm:h-72 object-contain"
              loading="lazy"
            />
          </div>
          <p className="mt-6 text-[#333333]">
            Your cart is empty. Let&apos;s fix that!
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/products">
              <Button variant="primary" size="md">
                Browse products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-white" aria-busy={pageLoading}>
      <PageLoader active={pageLoading} label="Loading cart…" />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-heading text-[#333333]">Shopping Cart</h1>

        <ul className="mt-8 divide-y divide-neutral-200 bg-neutral-50 overflow-hidden">
          {items.map((i) => {
            const lineTotal = i.qty * i.price;
            return (
              <li key={i.id} className="p-4 sm:p-6">
                <div className="grid grid-cols-[72px_1fr_auto] sm:grid-cols-[96px_1fr_auto] gap-4 sm:gap-6 items-center">
                  <Link to={`/products/${i.id}`} className="block">
                    <div className="w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] bg-neutral-50 rounded-xl grid place-items-center overflow-hidden">
                      <img
                        src={i.imageUrl}
                        alt={i.title}
                        className="max-h-full w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/products/${i.id}`}
                      className="font-semibold text-[#333333] hover:underline underline-offset-4"
                    >
                      {i.title}
                    </Link>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm text-neutral-600">
                        Unit:{" "}
                        <span className="font-medium text-[#333333]">
                          {formatNok(i.price)}
                        </span>
                      </span>

                      <div
                        className="inline-flex items-center overflow-hidden rounded-full border border-neutral-300 bg-white shadow-sm"
                        aria-label={`Change quantity for ${i.title}`}
                      >
                        <button
                          aria-label={`Decrease quantity of ${i.title}`}
                          className="grid place-items-center w-9 h-9 hover:bg-neutral-100 disabled:opacity-40"
                          onClick={() => onDec(i.id, i.qty, i.title)}
                          disabled={i.qty <= 1}
                          title={i.qty <= 1 ? "Remove instead" : "Decrease"}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="px-3 min-w-[2.5rem] text-center text-sm font-medium text-[#333333] select-none">
                          {i.qty}
                        </span>
                        <button
                          aria-label={`Increase quantity of ${i.title}`}
                          className="grid place-items-center w-9 h-9 hover:bg-neutral-100"
                          onClick={() => onInc(i.id, i.qty)}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="font-semibold text-[#333333]">
                      {formatNok(lineTotal)}
                    </span>
                    <button
                      aria-label={`Remove ${i.title}`}
                      onClick={() => onRemove(i.id, i.title)}
                      className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-black"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <div
            id="checkout-form"
            className="rounded-2xl bg-neutral-50 p-4 sm:p-6"
          >
            <h2 className="font-heading text-xl font-semibold text-[#333333]">
              Customer details
            </h2>
            <div className="mt-4 space-y-4">
              <FormField
                id="fullName"
                label="Full name"
                isRequired
                error={fieldError("fullName")}
              >
                <TextInput
                  id="fullName"
                  name="fullName"
                  value={checkout.fullName}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField
                id="email"
                label="Email"
                isRequired
                error={fieldError("email")}
              >
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={checkout.email}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField
                id="phone"
                label="Phone"
                isRequired
                error={fieldError("phone")}
              >
                <TextInput
                  id="phone"
                  name="phone"
                  value={checkout.phone}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                  autoComplete="tel"
                  placeholder="+47 123 45 678"
                  required
                />
              </FormField>

              <FormField
                id="address"
                label="Address"
                isRequired
                error={fieldError("address")}
              >
                <TextInput
                  id="address"
                  name="address"
                  value={checkout.address}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                  autoComplete="street-address"
                  placeholder="Street address"
                  required
                />
              </FormField>
            </div>
          </div>

          <aside className="rounded-2xl bg-neutral-50 p-4 sm:p-6 h-fit">
            <h3 className="font-heading text-xl font-semibold text-[#333333]">
              Order summary
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex justify-between">
                <span>Items</span>
                <span className="font-medium text-[#333333]">{itemCount}</span>
              </li>
              <li className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#333333]">
                  {formatNok(totalCost)}
                </span>
              </li>
            </ul>

            <Button
              variant="primary"
              size="md"
              className="mt-6 w-full"
              onClick={onCheckout}
            >
              Checkout
            </Button>
            <Link to="/products">
              <Button variant="secondary" size="md" className="mt-3 w-full">
                Continue shopping
              </Button>
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
