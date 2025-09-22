import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useCart } from "../state/useCart";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function CartPage() {
  const { items, totalCost, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

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

  const onCheckout = () => {
    toast.success("Checkout successful!");
    clear();
    navigate("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-[60vh]">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <h1 className="text-3xl font-heading text-[#333333]">
            Shopping Cart
          </h1>
          <div className="mx-auto mt-6 w-full max-w-sm rounded-2xl p-6">
            <img
              src="/emptypage.png"
              alt="Your cart is empty"
              className="w-full h-56 sm:h-84 object-contain"
              loading="lazy"
            />
          </div>
          <p className="mt-6 text-[#333333]">
            Your cart is empty. Let's fix that!
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
    <main className="bg-white">
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

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-neutral-600">
            Subtotal:{" "}
            <span className="font-bold text-[#333333]">
              {formatNok(totalCost)}
            </span>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" size="md" onClick={onCheckout}>
              Checkout
            </Button>
            <Link to="/products">
              <Button variant="secondary" size="md">
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
