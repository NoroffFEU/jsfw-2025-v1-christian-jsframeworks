import { createContext } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  qty: number;
};

export type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  totalCost: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const CartCtx = createContext<CartContextValue | null>(null);
