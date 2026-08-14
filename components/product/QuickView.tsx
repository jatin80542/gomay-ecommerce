"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Variant } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { VariantSelector } from "./VariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { Stars } from "@/components/ui/Stars";
import { useStore } from "@/lib/store";
import { getProductBySlug } from "@/data/products";
import { defaultSelection, resolvePrice, type Selection } from "@/lib/product";
import { formatINR } from "@/lib/utils";

export function QuickView() {
  const { quickViewSlug, setQuickViewSlug } = useStore();
  const product = quickViewSlug ? getProductBySlug(quickViewSlug) : undefined;

  return (
    <Modal
      open={Boolean(product)}
      onClose={() => setQuickViewSlug(null)}
      title={product?.name ?? "Quick view"}
      size="lg"
    >
      {product ? <QuickViewBody key={product.id} slug={product.slug} /> : null}
    </Modal>
  );
}

function QuickViewBody({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)!;
  const { addToCart, setQuickViewSlug } = useStore();
  const [selection, setSelection] = useState<Selection>(() => defaultSelection(product));
  const [quantity, setQuantity] = useState(1);
  const price = useMemo(() => resolvePrice(product, selection), [product, selection]);

  const change = (axis: Variant["type"], value: string) =>
    setSelection((current) => ({ ...current, [axis]: value }));

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-mitti-200 bg-sand-100">
        <Image
          src={product.images[0]?.src ?? ""}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          quality={90}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mitti-400">{product.subcategory}</p>
        <h3 className="mt-1 font-display text-xl font-bold">{product.name}</h3>
        <p className="deva mt-0.5 text-sm text-mitti-500">{product.hindiName}</p>
        <div className="mt-2">
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-mitti-600">{product.shortDescription}</p>

        <p className="mt-4 font-display text-2xl font-bold">
          {price.quoteOnly ? "On quote" : formatINR(price.price)}
        </p>

        <div className="mt-5">
          <VariantSelector product={product} selection={selection} onChange={change} compact />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} min={price.moq} size="sm" />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {price.quoteOnly ? (
            <Link
              href={`/bulk?product=${product.slug}`}
              onClick={() => setQuickViewSlug(null)}
              className="rounded bg-forest-600 py-3 text-center font-display text-sm font-semibold text-sand-50"
            >
              Request quote
            </Link>
          ) : (
            <Button
              onClick={() => {
                addToCart(product, price, Math.max(quantity, price.moq));
                setQuickViewSlug(null);
              }}
            >
              Add to cart
            </Button>
          )}
          <Link
            href={`/products/${product.slug}`}
            onClick={() => setQuickViewSlug(null)}
            className="text-center text-sm font-semibold text-gerua-600 underline underline-offset-4"
          >
            See full details
          </Link>
        </div>
      </div>
    </div>
  );
}
