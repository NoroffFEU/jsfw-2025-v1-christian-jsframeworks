import { useMemo, useReducer } from "react";
import { CartCtx, type CartItem, type CartContextValue } from "./CartContext";

type CartState = { items: CartItem[] };
type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const ex = state.items.find((i) => i.id === action.item.id);
      if (ex) {
        return {
          items: state.items.map((i) =>
            i.id === ex.id ? { ...i, qty: i.qty + action.item.qty } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const totalQty = useMemo(
    () => state.items.reduce((a, b) => a + b.qty, 0),
    [state.items]
  );
  const totalCost = useMemo(
    () => state.items.reduce((a, b) => a + b.qty * b.price, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    totalQty,
    totalCost,
    add: (item: CartItem) => dispatch({ type: "ADD", item }),
    remove: (id: string) => dispatch({ type: "REMOVE", id }),
    setQty: (id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
