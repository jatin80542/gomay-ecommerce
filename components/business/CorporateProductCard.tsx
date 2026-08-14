"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { formatINR, formatQty } from "@/lib/utils";

/** Corporate cards lead with presentation and customisation, never with "Add to cart". */
export function CorporateProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-mitti-200 bg-sand-50 transition hover:shadow-card">
      <div className="relative aspect-[5/4] overflow-hidden bg-sand-100">
        <Image
          src={product.images[2]?.src ?? product.images[0]?.src ?? ""}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-xs bg-mitti-800 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-sand-100">
          Customisable
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-mitti-800">{product.name}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-mitti-600">{product.shortDescription}</p>

        {product.whatsInside ? (
          <ul className="mt-4 space-y-1 text-[13px] text-mitti-600">
            {product.whatsInside.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brass-500" aria-hidden />
                {item}
              </li>
            ))}
            {product.whatsInside.length > 3 ? (
              <li className="pl-3 text-mitti-400">+ {product.whatsInside.length - 3} more inside</li>
            ) : null}
          </ul>
        ) : null}

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-mitti-200 pt-4">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-mitti-400">From</dt>
            <dd className="font-display text-lg font-bold text-mitti-800">
              {formatINR(product.corporateFromPrice ?? product.price)}
              <span className="ml-1 text-xs font-normal text-mitti-500">/ box</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-mitti-400">MOQ</dt>
            <dd className="font-mono text-sm text-mitti-700">
              {formatQty(product.corporateMoqBoxes ?? 50)} boxes
            </dd>
          </div>
        </dl>

        <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-brass-600">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Custom branding available
        </p>

        <Link
          href={`/corporate-gifting#quote?product=${product.slug}`}
          className="mt-5 rounded bg-mitti-800 py-3 text-center font-display text-sm font-semibold text-sand-100 transition hover:bg-mitti-900"
        >
          Customise this box
        </Link>
      </div>
    </article>
  );
}
