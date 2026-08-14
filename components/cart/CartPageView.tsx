"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { brandConfig } from "@/config/brand";

export function CartPageView() {
  const { lines, subtotal, savings, shipping, total, removeLine, setLineQuantity, hydrated } = useStore();

  return (
    <div className="shell py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Cart", href: "/cart" }]} />
      <h1 className="text-[30px] leading-tight sm:text-[38px]">Your cart</h1>

      {!hydrated ? (
        <div className="mt-8 space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="skeleton h-28 rounded-lg" />
          ))}
        </div>
      ) : lines.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-mitti-300 bg-sand-100 px-6 py-16 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-mitti-300" aria-hidden />
          <p className="mt-4 font-display text-xl font-semibold text-mitti-800">Nothing here yet</p>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-mitti-600">
            Most first orders are a pack of upla and a set of diyas. Start there, or browse by what you&apos;re
            preparing for.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/shop">Browse the shop</ButtonLink>
            <ButtonLink href="/collections/pooja-havan" variant="secondary">
              Pooja & havan
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <ul className="divide-y divide-mitti-200 border-y border-mitti-200">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 py-5">
                <Link
                  href={`/products/${line.slug}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden rounded border border-mitti-200 bg-sand-100"
                >
                  <Image src={line.image} alt="" fill sizes="96px" className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${line.slug}`} className="font-display font-semibold text-mitti-800">
                        {line.name}
                      </Link>
                      <p className="mt-1 font-mono text-xs text-mitti-500">{line.variantLabel}</p>
                      <p className="mt-1 font-mono text-xs text-mitti-400">SKU {line.variantId}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      aria-label={`Remove ${line.name}`}
                      className="rounded p-2 text-mitti-400 hover:bg-mitti-100 hover:text-gerua-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <QuantitySelector
                      value={line.quantity}
                      onChange={(next) => setLineQuantity(line.key, next)}
                      min={line.moq}
                      size="sm"
                    />
                    <p className="font-display font-semibold">{formatINR(line.unitPrice * line.quantity)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-mitti-200 bg-sand-100 p-6">
              <h2 className="font-display text-lg font-bold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
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
                <div className="flex justify-between border-t border-mitti-200 pt-3 font-display text-base font-bold">
                  <dt>Total</dt>
                  <dd>{formatINR(total)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-mitti-500">
                Inclusive of all taxes. {brandConfig.shipping.dispatchCopy}.
              </p>
              <ButtonLink href="/checkout" size="lg" className="mt-5 w-full">
                Checkout
              </ButtonLink>
              <ButtonLink href="/shop" variant="ghost" className="mt-2 w-full">
                Continue shopping
              </ButtonLink>
            </div>

            <Link
              href="/bulk"
              className="mt-5 block rounded-lg border border-forest-200 bg-forest-50 p-5 hover:border-forest-400"
            >
              <p className="font-display font-semibold text-forest-700">Ordering in bulk?</p>
              <p className="mt-1 text-[13px] text-forest-700/80">
                Above 500 pieces or 50 KG, slab pricing beats the retail cart every time.
              </p>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
