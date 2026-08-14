"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { useStore } from "@/lib/store";
import { defaultSelection, resolvePrice } from "@/lib/product";
import { formatINR } from "@/lib/utils";

/** Mobile-only. Appears once the main CTA has scrolled away. */
export function StickyBuyBar({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const price = resolvePrice(product, defaultSelection(product));
  const quoteOnly = price.quoteOnly || !product.retailAvailable;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-mitti-200 bg-sand-50/97 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-mitti-800">{product.name}</p>
          <p className="font-mono text-xs text-mitti-500">
            {quoteOnly ? "Priced on quote" : `${formatINR(price.price)} · ${price.label}`}
          </p>
        </div>
        {quoteOnly ? (
          <Link
            href={`/bulk?product=${product.slug}`}
            className="shrink-0 rounded bg-forest-600 px-5 py-3 text-sm font-semibold text-sand-50"
          >
            Get quote
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product, price, Math.max(1, price.moq))}
            className="shrink-0 rounded bg-gerua-500 px-5 py-3 text-sm font-semibold text-sand-50"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
