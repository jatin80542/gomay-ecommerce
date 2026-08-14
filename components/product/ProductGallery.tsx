"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const current = images[active] ?? images[0];

  return (
    // min-w-0 is load-bearing: as a grid item this would otherwise default to
    // min-width:auto and be sized by the 82vw slides below, overflowing the page.
    <div className="min-w-0 lg:sticky lg:top-28">
      {/* Desktop: single frame with thumbnails. Mobile: swipeable rail. */}
      <div
        className={cn(
          "relative hidden overflow-hidden rounded-lg border border-mitti-200 bg-sand-100 lg:block",
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onClick={() => setZoomed((v) => !v)}
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={current?.src ?? ""}
            alt={current?.alt ?? name}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            quality={90}
            priority
            className={cn("object-cover transition-transform duration-500", zoomed && "scale-[1.7]")}
          />
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-sand-50/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mitti-600 backdrop-blur">
          <ZoomIn className="h-3.5 w-3.5" aria-hidden /> {zoomed ? "Click to reset" : "Click to zoom"}
        </span>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:hidden"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className="relative aspect-square w-[82vw] shrink-0 snap-center overflow-hidden rounded-lg border border-mitti-200 bg-sand-100"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="82vw"
              quality={90}
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 hidden grid-cols-4 gap-3 lg:grid">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => {
              setActive(index);
              setZoomed(false);
            }}
            aria-label={`Show image ${index + 1}: ${image.kind}`}
            aria-current={index === active}
            className={cn(
              "relative aspect-square overflow-hidden rounded border bg-sand-100 transition",
              index === active ? "border-gerua-500" : "border-mitti-200 hover:border-mitti-400"
            )}
          >
            <Image src={image.src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
