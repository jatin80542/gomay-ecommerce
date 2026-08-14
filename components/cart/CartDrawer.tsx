"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { brandConfig } from "@/config/brand";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, savings, shipping, total, removeLine, setLineQuantity } = useStore();

  const upsells = products
    .filter((p) => p.retailAvailable && p.price < 500 && !lines.some((l) => l.productId === p.id))
    .slice(0, 2);

  const freeShippingGap = brandConfig.shipping.freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {cartOpen ? (
        <div className="fixed inset-0 z-[75]">
          <motion.div
            className="absolute inset-0 bg-mitti-900/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-sand-50 shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-mitti-200 px-5 py-4">
              <h2 className="font-display text-lg font-semibold">
                Your cart{" "}
                {lines.length > 0 ? (
                  <span className="font-mono text-sm text-mitti-500">({lines.length})</span>
                ) : null}
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="rounded p-2 text-mitti-500 hover:bg-mitti-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-mitti-300" aria-hidden />
                <p className="mt-4 font-display text-lg font-semibold text-mitti-800">Your cart is empty</p>
                <p className="mt-2 text-sm text-mitti-600">
                  Start with a pack of upla or a set of diyas — most households order both.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="mt-6 rounded bg-gerua-500 px-6 py-3 font-display text-sm font-semibold text-sand-50"
                >
                  Browse the shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {freeShippingGap > 0 ? (
                    <p className="mb-4 rounded border border-forest-200 bg-forest-50 px-3.5 py-2.5 text-[13px] text-forest-700">
                      <Truck className="mr-1.5 inline h-3.5 w-3.5" aria-hidden />
                      Add {formatINR(freeShippingGap)} more for free shipping.
                    </p>
                  ) : null}

                  <ul className="divide-y divide-mitti-200">
                    {lines.map((line) => (
                      <li key={line.key} className="flex gap-3.5 py-4">
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded border border-mitti-200 bg-sand-100"
                        >
                          <Image src={line.image} alt="" fill sizes="80px" className="object-cover" />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link
                                href={`/products/${line.slug}`}
                                onClick={() => setCartOpen(false)}
                                className="block truncate font-display text-sm font-semibold text-mitti-800"
                              >
                                {line.name}
                              </Link>
                              <p className="mt-0.5 font-mono text-[11px] text-mitti-500">{line.variantLabel}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLine(line.key)}
                              aria-label={`Remove ${line.name}`}
                              className="rounded p-1.5 text-mitti-400 hover:bg-mitti-100 hover:text-gerua-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <QuantitySelector
                              value={line.quantity}
                              onChange={(next) => setLineQuantity(line.key, next)}
                              min={line.moq}
                              size="sm"
                            />
                            <span className="font-display text-sm font-semibold">
                              {formatINR(line.unitPrice * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {upsells.length > 0 ? (
                    <div className="mt-6 border-t border-mitti-200 pt-5">
                      <p className="eyebrow mb-3">You may also need</p>
                      <div className="grid grid-cols-2 gap-3">
                        {upsells.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <Link
                    href="/bulk"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-forest-200 bg-forest-50 px-4 py-3.5"
                  >
                    <span>
                      <span className="block font-display text-sm font-semibold text-forest-700">
                        Ordering in bulk?
                      </span>
                      <span className="block text-xs text-forest-700/75">
                        Slab pricing starts at 500 pieces or 50 KG.
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                  </Link>
                </div>

                <div className="border-t border-mitti-200 bg-sand-100 px-5 py-4">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-mitti-600">Subtotal</dt>
                      <dd className="font-mono">{formatINR(subtotal)}</dd>
                    </div>
                    {savings > 0 ? (
                      <div className="flex justify-between text-forest-700">
                        <dt>You save</dt>
                        <dd className="font-mono">−{formatINR(savings)}</dd>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <dt className="text-mitti-600">Shipping</dt>
                      <dd className="font-mono">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-mitti-200 pt-2 font-display text-base font-bold">
                      <dt>Total</dt>
                      <dd>{formatINR(total)}</dd>
                    </div>
                  </dl>

                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 block rounded bg-gerua-500 py-3.5 text-center font-display font-semibold text-sand-50 hover:bg-gerua-600"
                  >
                    Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-2 w-full py-2 text-center text-sm text-mitti-600 hover:text-gerua-600"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
