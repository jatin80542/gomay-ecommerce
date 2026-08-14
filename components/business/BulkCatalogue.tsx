"use client";

import { useState } from "react";
import { BulkProductCard } from "./BulkProductCard";
import { SampleRequestModal } from "@/components/forms/SampleRequestModal";
import type { Product } from "@/types";

export function BulkCatalogue({ products }: { products: Product[] }) {
  const [sampleFor, setSampleFor] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-5">
        {products.map((product) => (
          <BulkProductCard key={product.id} product={product} onRequestSample={setSampleFor} />
        ))}
      </div>
      <SampleRequestModal
        open={sampleFor !== null}
        onClose={() => setSampleFor(null)}
        presetProduct={sampleFor ?? undefined}
      />
    </>
  );
}

export function SampleRequestButton({ label = "Request a sample" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded border border-mitti-300 bg-sand-50 px-6 py-3 font-display text-sm font-semibold text-mitti-800 hover:border-mitti-500"
      >
        {label}
      </button>
      <SampleRequestModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
