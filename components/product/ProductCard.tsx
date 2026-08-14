"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { useStore } from "@/lib/store";
import { defaultSelection, resolvePrice } from "@/lib/product";
import { cn, discountPercent, formatINR } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addToCart, setQuickViewSlug, toggleWishlist, isWishlisted, hydrated } = useStore();

  const axes = Array.from(new Set(product.variants.map((v) => v.type)));
  const needsOptions = axes.length > 1 || product.variants.filter((v) => v.type === axes[0]).length > 1;
  const quoteOnly = !product.retailAvailable;
  const outOfStock = product.stock === 0;
  const discount = discountPercent(product.price, product.compareAtPrice);
  const wishlisted = hydrated && isWishlisted(product.id);

  const packPreview = product.variants
    .filter((v) => v.type === "pack" || v.type === "weight")
    .slice(0, 3)
    .map((v) => v.label)
    .join(" · ");

  function quickAdd() {
    const selection = defaultSelection(product);
    const price = resolvePrice(product, selection);
    addToCart(product, price, Math.max(1, price.moq));
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-mitti-200 bg-sand-50 transition duration-300 hover:border-mitti-300 hover:shadow-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
        <Link href={`/products/${product.slug}`} className="block h-full w-full" tabIndex={-1} aria-hidden>
          <Image
            src={product.images[0]?.src ?? ""}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <Badge key={badge} kind={badge} />
          ))}
          {outOfStock ? (
            <span className="rounded-xs border border-mitti-800 bg-mitti-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sand-100">
              Out of stock
            </span>
          ) : null}
        </div>

        {discount ? (
          <span className="absolute right-3 top-3 rounded-xs bg-forest-600 px-2 py-0.5 font-mono text-[10px] text-sand-50">
            −{discount}%
          </span>
        ) : null}

        {/* Hover actions — always reachable on touch via the buttons below. */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 transition-opacity duration-300 focus-within:opacity-100 group-hover:opacity-100 max-lg:hidden">
          <button
            type="button"
            onClick={() => setQuickViewSlug(product.slug)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded border border-mitti-200 bg-sand-50/95 py-2 text-xs font-semibold text-mitti-800 backdrop-blur hover:bg-white"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden /> Quick view
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className="grid w-10 place-items-center rounded border border-mitti-200 bg-sand-50/95 backdrop-blur hover:bg-white"
          >
            <Heart className={cn("h-4 w-4", wishlisted ? "fill-gerua-500 text-gerua-500" : "text-mitti-600")} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mitti-400">
          {product.subcategory}
        </p>
        <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-mitti-800">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-mitti-600">{product.shortDescription}</p>

        <div className="mt-2.5">
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>

        {packPreview ? (
          <p className="mt-2 truncate font-mono text-[11px] text-mitti-400">{packPreview}</p>
        ) : null}

        <div className="mt-auto pt-3.5">
          {quoteOnly ? (
            <p className="font-display text-[15px] font-semibold text-forest-700">Priced on quote</p>
          ) : (
            <p className="flex items-baseline gap-2">
              <span className="font-display text-[17px] font-bold text-mitti-800">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="font-mono text-xs text-mitti-400 line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              ) : null}
              <span className="text-[11px] text-mitti-400">onwards</span>
            </p>
          )}

          <div className="relative z-10 mt-3 flex gap-2">
            {quoteOnly ? (
              <Link
                href={`/bulk?product=${product.slug}`}
                className="flex-1 rounded bg-forest-600 py-2.5 text-center text-[13px] font-semibold text-sand-50 hover:bg-forest-700"
              >
                Get bulk price
              </Link>
            ) : needsOptions ? (
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 rounded border border-mitti-800 bg-transparent py-2.5 text-center text-[13px] font-semibold text-mitti-800 hover:bg-mitti-800 hover:text-sand-50"
              >
                Select options
              </Link>
            ) : (
              <button
                type="button"
                onClick={quickAdd}
                disabled={outOfStock}
                className="flex flex-1 items-center justify-center gap-1.5 rounded bg-gerua-500 py-2.5 text-[13px] font-semibold text-sand-50 hover:bg-gerua-600 disabled:opacity-50"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                Add to cart
              </button>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
              aria-pressed={wishlisted}
              className="grid w-10 shrink-0 place-items-center rounded border border-mitti-200 hover:border-mitti-400 lg:hidden"
            >
              <Heart className={cn("h-4 w-4", wishlisted ? "fill-gerua-500 text-gerua-500" : "text-mitti-600")} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
