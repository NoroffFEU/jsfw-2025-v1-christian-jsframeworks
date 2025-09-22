import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../state/CartProvider";

export function renderWithProviders(
  ui: ReactNode,
  { route = "/", ...options }: { route?: string } & RenderOptions = {}
) {
  window.history.pushState({}, "Test", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>,
    options
  );
}
