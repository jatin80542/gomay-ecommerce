"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { CartLine, Product } from "@/types";
import { brandConfig } from "@/config/brand";
import type { ResolvedPrice } from "@/lib/product";

/* ------------------------------------------------------------------ *
 * Cart + wishlist live in React state and are mirrored to localStorage.
 * Phase 2 replaces the reducer's persistence with the Cart API in
 * lib/services/cart.ts — the context surface stays identical.
 * ------------------------------------------------------------------ */

const CART_KEY = "gomay.cart.v1";
const WISHLIST_KEY = "gomay.wishlist.v1";

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "remove"; key: string }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "clear" };

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = state.find((l) => l.key === action.line.key);
      if (existing) {
        return state.map((l) =>
          l.key === action.line.key ? { ...l, quantity: l.quantity + action.line.quantity } : l
        );
      }
      return [...state, action.line];
    }
    case "remove":
      return state.filter((l) => l.key !== action.key);
    case "setQuantity":
      return state.map((l) =>
        l.key === action.key ? { ...l, quantity: Math.max(l.moq, action.quantity) } : l
      );
    case "clear":
      return [];
    default:
      return state;
  }
}

export interface StoreContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  addToCart: (product: Product, price: ResolvedPrice, quantity: number) => void;
  removeLine: (key: string) => void;
  setLineQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  quickViewSlug: string | null;
  setQuickViewSlug: (slug: string | null) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  hydrated: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Read persisted state after mount so server and first client render match.
  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_KEY);
      if (rawCart) dispatch({ type: "hydrate", lines: JSON.parse(rawCart) as CartLine[] });
      const rawWishlist = window.localStorage.getItem(WISHLIST_KEY);
      if (rawWishlist) setWishlist(JSON.parse(rawWishlist) as string[]);
    } catch {
      // Corrupt or unavailable storage is not worth breaking the page over.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, hydrated]);

  // Lock scroll while a drawer or overlay owns the screen.
  useEffect(() => {
    const locked = cartOpen || searchOpen || quickViewSlug !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, quickViewSlug]);

  const addToCart = useCallback((product: Product, price: ResolvedPrice, quantity: number) => {
    const line: CartLine = {
      key: `${product.id}::${price.sku}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src ?? "",
      variantId: price.sku,
      variantLabel: price.label,
      unitPrice: price.price,
      compareAtPrice: price.compareAtPrice,
      quantity: Math.max(quantity, price.moq),
      moq: price.moq,
    };
    dispatch({ type: "add", line });
    setCartOpen(true);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  }, []);

  const value = useMemo<StoreContextValue>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
    const savings = lines.reduce(
      (sum, l) => sum + (l.compareAtPrice ? (l.compareAtPrice - l.unitPrice) * l.quantity : 0),
      0
    );
    const shipping =
      subtotal === 0 || subtotal >= brandConfig.shipping.freeShippingThreshold
        ? 0
        : brandConfig.shipping.flatRate;
    return {
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      savings,
      shipping,
      total: subtotal + shipping,
      addToCart,
      removeLine: (key) => dispatch({ type: "remove", key }),
      setLineQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      clearCart: () => dispatch({ type: "clear" }),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      quickViewSlug,
      setQuickViewSlug,
      wishlist,
      toggleWishlist,
      isWishlisted: (productId) => wishlist.includes(productId),
      hydrated,
    };
  }, [lines, cartOpen, searchOpen, quickViewSlug, wishlist, hydrated, addToCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside <StoreProvider>");
  return context;
}
