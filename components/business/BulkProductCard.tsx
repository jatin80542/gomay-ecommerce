"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatQty } from "@/lib/utils";

/** Wholesale cards lead with formats, MOQ and packaging — the things a trade buyer decides on. */
export function BulkProductCard({
  product,
  onRequestSample,
}: {
  product: Product;
  onRequestSample: (productName: string) => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-mitti-200 bg-sand-50 sm:flex-row">
      <div className="relative aspect-[4/3] w-full shrink-0 bg-sand-100 sm:aspect-auto sm:w-44">
        <Image
          src={product.images[0]?.src ?? ""}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 100vw, 176px"
          quality={90}
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-[17px] font-bold text-mitti-800">{product.name}</h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-forest-600">
            MOQ {formatQty(product.moq ?? 500)} {product.moqUnit ?? "pcs"}
          </p>
        </div>
        <p className="mt-1.5 text-[14px] leading-relaxed text-mitti-600">{product.shortDescription}</p>

        <dl className="mt-4 grid gap-3 border-t border-mitti-200 pt-4 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-mitti-400">Formats</dt>
            <dd className="mt-1 font-mono text-[12px] leading-relaxed text-mitti-700">
              {(product.bulkFormats ?? ["On request"]).join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-mitti-400">Packaging</dt>
            <dd className="mt-1 font-mono text-[12px] leading-relaxed text-mitti-700">
              {(product.bulkPackaging ?? ["Standard bulk"]).join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-mitti-400">Indicative</dt>
            <dd className="mt-1 font-mono text-[12px] leading-relaxed text-mitti-700">
              {product.bulkPriceRange ?? "Quoted by volume"}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href={`/bulk#enquiry`}
            className="rounded bg-forest-600 px-5 py-2.5 font-display text-[13px] font-semibold text-sand-50 hover:bg-forest-700"
          >
            Get bulk price
          </Link>
          <button
            type="button"
            onClick={() => onRequestSample(product.name)}
            className="rounded border border-mitti-300 px-5 py-2.5 font-display text-[13px] font-semibold text-mitti-800 hover:border-mitti-500"
          >
            Request sample
          </button>
        </div>
      </div>
    </article>
  );
}
