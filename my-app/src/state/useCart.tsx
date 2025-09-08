import { useContext } from "react";
import { CartCtx, type CartContextValue } from "./CartContext";

export function useCart(): CartContextValue {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
