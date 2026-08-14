import type { Product, Variant } from "@/types";

/** The axis that carries absolute price — always the first variant type declared. */
export const primaryAxis = (product: Product): Variant["type"] | undefined => product.variants[0]?.type;

export const variantAxes = (product: Product): Variant["type"][] =>
  Array.from(new Set(product.variants.map((v) => v.type)));

export const variantsOfType = (product: Product, type: Variant["type"]): Variant[] =>
  product.variants.filter((v) => v.type === type);

export const axisLabel = (type: Variant["type"]): string =>
  ({ pack: "Pack size", weight: "Weight", size: "Size", fragrance: "Fragrance", design: "Design", quantity: "Quantity" })[type];

export interface Selection {
  [axis: string]: string; // axis type -> variant value
}

export function defaultSelection(product: Product): Selection {
  const selection: Selection = {};
  const axes = variantAxes(product);

  for (const [index, type] of axes.entries()) {
    const options = variantsOfType(product, type);
    const sellable = options.filter((v) => v.available && !v.quoteOnly);
    const pool = sellable.length > 0 ? sellable : options;

    // Secondary axes only shift the price. Open on the neutral option (delta 0) so the
    // price on the product page matches the "from" price shown on the card and in search.
    const preferred =
      index === 0 ? pool[0] : pool.find((v) => (v.priceDelta ?? 0) === 0) ?? pool[0];

    if (preferred) selection[type] = preferred.value;
  }
  return selection;
}

export function selectedVariant(product: Product, selection: Selection, type: Variant["type"]): Variant | undefined {
  return variantsOfType(product, type).find((v) => v.value === selection[type]);
}

export interface ResolvedPrice {
  price: number;
  compareAtPrice?: number;
  quoteOnly: boolean;
  moq: number;
  sku: string;
  label: string;
  available: boolean;
}

/** Combines the primary axis price with any secondary-axis deltas. */
export function resolvePrice(product: Product, selection: Selection): ResolvedPrice {
  const axes = variantAxes(product);
  const primary = axes[0];
  const base = primary ? selectedVariant(product, selection, primary) : undefined;
  const delta = axes
    .slice(1)
    .reduce((sum, type) => sum + (selectedVariant(product, selection, type)?.priceDelta ?? 0), 0);
  const labelParts = axes
    .map((type) => selectedVariant(product, selection, type)?.label)
    .filter(Boolean) as string[];

  return {
    price: (base?.price ?? product.price) + delta,
    compareAtPrice: base?.compareAtPrice ? base.compareAtPrice + delta : undefined,
    quoteOnly: Boolean(base?.quoteOnly),
    moq: base?.moq ?? 1,
    sku: base?.sku ?? product.id,
    label: labelParts.join(" · "),
    available: base?.available ?? true,
  };
}

export const startingPrice = (product: Product): number => product.price;

export const hasQuoteOnlyVariants = (product: Product): boolean =>
  product.variants.some((v) => v.quoteOnly);
