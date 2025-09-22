import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../tests/utils";
import { useCart } from "../../state/useCart";

function Probe() {
  const { totalQty, totalCost, add, setQty, remove, clear, items } = useCart();
  return (
    <div>
      <div data-testid="qty">{totalQty}</div>
      <div data-testid="cost">{totalCost}</div>
      <div data-testid="count">{items.length}</div>
      <button
        onClick={() =>
          add({
            id: "p1",
            title: "Prod",
            price: 100,
            imageUrl: "/x.png",
            qty: 1,
          })
        }
      >
        add1
      </button>
      <button onClick={() => setQty("p1", 3)}>set3</button>
      <button onClick={() => remove("p1")}>remove</button>
      <button onClick={() => clear()}>clear</button>
    </div>
  );
}

describe("CartProvider", () => {
  it("adds, sets qty, removes, and clears", async () => {
    renderWithProviders(<Probe />);
    const qty = () => screen.getByTestId("qty");
    const cost = () => screen.getByTestId("cost");
    const count = () => screen.getByTestId("count");

    expect(qty()).toHaveTextContent("0");
    expect(cost()).toHaveTextContent("0");
    expect(count()).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: /add1/i }));
    expect(qty()).toHaveTextContent("1");
    expect(cost()).toHaveTextContent("100");
    expect(count()).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: /set3/i }));
    expect(qty()).toHaveTextContent("3");
    expect(cost()).toHaveTextContent("300");

    await user.click(screen.getByRole("button", { name: /remove/i }));
    expect(qty()).toHaveTextContent("0");
    expect(cost()).toHaveTextContent("0");
    expect(count()).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: /add1/i }));
    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(qty()).toHaveTextContent("0");
    expect(count()).toHaveTextContent("0");
  });
});
