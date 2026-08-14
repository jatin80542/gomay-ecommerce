"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/types";
import { ProductGrid } from "./ProductGrid";
import { ProductFilters, activeFilterCount, emptyFilters, type FilterState } from "./ProductFilters";
import { ProductSort, type SortValue } from "./ProductSort";
import { allPackLabels, allWeightLabels, priceBounds } from "@/data/products";

export function ShopBrowser({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ceiling = useMemo(() => Math.ceil(priceBounds().max / 500) * 500, []);
  const packOptions = useMemo(() => allPackLabels().slice(0, 12), []);
  const weightOptions = useMemo(() => allWeightLabels().slice(0, 12), []);

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...emptyFilters,
    categories: searchParams.get("category") ? [searchParams.get("category")!] : [],
    purposes: searchParams.get("purpose") ? [searchParams.get("purpose")!] : [],
    festiveOnly: searchParams.get("festive") === "true",
    bulkOnly: searchParams.get("bulk") === "true",
    maxPrice: ceiling,
  }));
  const [sort, setSort] = useState<SortValue>((searchParams.get("sort") as SortValue) ?? "featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Mirror filters into the URL so a filtered view can be shared and, later, indexed.
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length === 1) params.set("category", filters.categories[0]!);
    if (filters.purposes.length === 1) params.set("purpose", filters.purposes[0]!);
    if (filters.festiveOnly) params.set("festive", "true");
    if (filters.bulkOnly) params.set("bulk", "true");
    if (sort !== "featured") params.set("sort", sort);
    const query = params.toString();
    router.replace(query ? `/shop?${query}` : "/shop", { scroll: false });
  }, [filters, sort, router]);

  const visible = useMemo(() => {
    const max = filters.maxPrice || ceiling;
    const filtered = products.filter((product) => {
      if (filters.categories.length && !filters.categories.includes(product.category)) return false;
      if (filters.purposes.length && !product.purposes.some((p) => filters.purposes.includes(p))) return false;
      if (filters.packs.length && !product.variants.some((v) => v.type === "pack" && filters.packs.includes(v.label)))
        return false;
      if (
        filters.weights.length &&
        !product.variants.some((v) => v.type === "weight" && filters.weights.includes(v.label))
      )
        return false;
      if (product.price > max && product.price > 0) return false;
      if (filters.inStockOnly && product.stock === 0) return false;
      if (filters.festiveOnly && !product.festive) return false;
      if (filters.bulkOnly && !product.bulkAvailable) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "best-selling":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id.localeCompare(a.id));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.bestseller) - Number(a.bestseller) || b.rating - a.rating
        );
    }
    return sorted;
  }, [products, filters, sort, ceiling]);

  const count = activeFilterCount(filters, ceiling);
  const clear = () => setFilters({ ...emptyFilters, maxPrice: ceiling });

  const filterPanel = (
    <ProductFilters
      filters={filters}
      setFilters={setFilters}
      packOptions={packOptions}
      weightOptions={weightOptions}
      priceCeiling={ceiling}
      onClear={clear}
    />
  );

  return (
    <div className="lg:grid lg:grid-cols-[248px_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">{filterPanel}</div>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-mitti-500">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex h-10 items-center gap-2 rounded border border-mitti-200 bg-sand-50 px-3.5 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filters
              {count > 0 ? <span className="font-mono text-xs text-gerua-600">({count})</span> : null}
            </button>
            <ProductSort value={sort} onChange={setSort} />
          </div>
        </div>

        <ProductGrid products={visible} priorityCount={4} />
      </div>

      <AnimatePresence>
        {sheetOpen ? (
          <div className="fixed inset-0 z-[75] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-mitti-900/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-xl border-t border-mitti-200 bg-sand-50"
            >
              <div className="flex items-center justify-between border-b border-mitti-200 px-5 py-4">
                <p className="font-display font-semibold">Filters</p>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close filters"
                  className="rounded p-2 text-mitti-500 hover:bg-mitti-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">{filterPanel}</div>
              <div className="flex gap-3 border-t border-mitti-200 p-4">
                <button
                  type="button"
                  onClick={clear}
                  className="h-12 flex-1 rounded border border-mitti-300 font-display text-sm font-semibold"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="h-12 flex-[2] rounded bg-gerua-500 font-display text-sm font-semibold text-sand-50"
                >
                  Show {visible.length} products
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
