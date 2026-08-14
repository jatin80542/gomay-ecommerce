"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, ShoppingBag, Truck } from "lucide-react";
import type { Product, Variant } from "@/types";
import { Button } from "@/components/ui/Button";
import { VariantSelector } from "./VariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { PricingTiers } from "./PricingTiers";
import { useStore } from "@/lib/store";
import { defaultSelection, resolvePrice, type Selection } from "@/lib/product";
import { brandConfig } from "@/config/brand";
import { discountPercent, formatINR } from "@/lib/utils";

export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [selection, setSelection] = useState<Selection>(() => defaultSelection(product));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = useMemo(() => resolvePrice(product, selection), [product, selection]);
  const discount = discountPercent(price.price, price.compareAtPrice);

  function change(axis: Variant["type"], value: string) {
    setSelection((current) => ({ ...current, [axis]: value }));
    setAdded(false);
  }

  function handleAdd() {
    addToCart(product, price, Math.max(quantity, price.moq));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {price.quoteOnly ? (
          <p className="font-display text-2xl font-bold text-forest-700">Priced on quote</p>
        ) : (
          <>
            <p className="font-display text-[28px] font-bold text-mitti-800">{formatINR(price.price)}</p>
            {price.compareAtPrice ? (
              <p className="font-mono text-sm text-mitti-400 line-through">{formatINR(price.compareAtPrice)}</p>
            ) : null}
            {discount ? (
              <span className="rounded-xs bg-forest-600 px-2 py-0.5 font-mono text-[11px] text-sand-50">
                −{discount}%
              </span>
            ) : null}
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-mitti-500">
        Inclusive of all taxes · {brandConfig.shipping.dispatchCopy}
      </p>

      <div className="mt-7">
        <VariantSelector product={product} selection={selection} onChange={change} />
      </div>

      {price.quoteOnly ? (
        <div className="mt-7 rounded-lg border border-forest-200 bg-forest-50 p-5">
          <p className="font-display font-semibold text-forest-700">This quantity is quoted, not carted</p>
          <p className="mt-1.5 text-sm text-forest-700/80">
            At this volume the price depends on packaging and delivery district. Send the requirement and you&apos;ll
            get a slab price back.
          </p>
          <Link
            href={`/bulk?product=${product.slug}`}
            className="mt-4 inline-flex items-center gap-2 rounded bg-forest-600 px-5 py-3 font-display text-sm font-semibold text-sand-50 hover:bg-forest-700"
          >
            Request quote <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} min={price.moq} max={999} />
            <span className="font-mono text-xs text-mitti-500">
              {price.moq > 1 ? `Minimum ${price.moq}` : "In stock"}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <Button onClick={handleAdd} size="lg" className="flex-1" disabled={!price.available}>
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden /> Add to cart
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                addToCart(product, price, Math.max(quantity, price.moq));
                window.location.href = "/checkout";
              }}
              variant="dark"
              size="lg"
              className="flex-1"
              disabled={!price.available}
            >
              Buy now
            </Button>
          </div>
        </>
      )}

      {product.bulkTiers ? (
        <div className="mt-7 rounded-lg border border-mitti-200 bg-sand-100 p-4">
          <p className="eyebrow mb-2">Quantity ladder</p>
          <PricingTiers tiers={product.bulkTiers} unit={product.category === "manure" ? "KG" : "pc"} activeQuantity={quantity} />
        </div>
      ) : null}

      <div className="mt-6 space-y-2.5">
        {product.bulkAvailable ? (
          <Link
            href={`/bulk?product=${product.slug}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-mitti-200 bg-sand-50 px-4 py-3 hover:border-forest-400"
          >
            <span className="flex items-center gap-2.5 text-sm text-mitti-700">
              <Truck className="h-4 w-4 text-forest-600" aria-hidden />
              Need {product.moq ? product.moq.toLocaleString("en-IN") : "100"}+ units? Get wholesale pricing
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-mitti-400" aria-hidden />
          </Link>
        ) : null}
        {product.corporateAvailable ? (
          <Link
            href={`/corporate-gifting?product=${product.slug}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-mitti-200 bg-sand-50 px-4 py-3 hover:border-mitti-500"
          >
            <span className="flex items-center gap-2.5 text-sm text-mitti-700">
              <Building2 className="h-4 w-4 text-mitti-700" aria-hidden />
              Buying for your organisation? Talk to corporate sales
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-mitti-400" aria-hidden />
          </Link>
        ) : null}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-y-2 border-t border-mitti-200 pt-5 text-[13px] text-mitti-600">
        {["Traditional product", "Made in India", "Carefully packed", "Bulk orders available"].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-forest-600" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
