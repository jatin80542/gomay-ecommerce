import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
  columns = 4,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
  priorityCount?: number;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-mitti-300 bg-sand-100 px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold text-mitti-800">No products match these filters</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-mitti-600">
          Clear a filter or two and the list will fill back up. If you need a size we don&apos;t stock, ask for a
          bulk quote — most formats can be made to order.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3.5 sm:gap-5",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
