import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { CartItem, Part } from "@/types/part";

const CART_STORAGE_KEY = "autoservice-cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (part: Part, quantity?: number) => void;
  removeItem: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  }, []);

  const addItem = useCallback(
    (part: Part, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === part.id);
        let next: CartItem[];
        if (existing) {
          next = prev.map((i) =>
            i.id === part.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          next = [...prev, { ...part, quantity }];
        }
        saveCart(next);
        return next;
      });
    },
    []
  );

  const removeItem = useCallback((partId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== partId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((partId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) {
        const next = prev.filter((i) => i.id !== partId);
        saveCart(next);
        return next;
      }
      const next = prev.map((i) =>
        i.id === partId ? { ...i, quantity } : i
      );
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => persist([]), [persist]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, count, addItem, removeItem, updateQuantity, clearCart }),
    [items, count, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
