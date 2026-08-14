import { products } from "@/data/products";
import { fuzzyScore } from "@/lib/utils";
import type { Product } from "@/types";

export interface SearchHit {
  product: Product;
  score: number;
}

/** Client-side catalogue search. Phase 2 swaps this for a search API with the same signature. */
export function searchProducts(query: string, limit = 8): SearchHit[] {
  const q = query.trim();
  if (q.length < 2) return [];
  return products
    .map((product) => {
      const score = Math.max(
        fuzzyScore(product.name, q) * 1.2,
        fuzzyScore(product.hindiName, q),
        fuzzyScore(product.subcategory, q) * 0.7,
        fuzzyScore(product.category.replace(/-/g, " "), q) * 0.8,
        ...product.tags.map((t) => fuzzyScore(t, q) * 0.9),
        fuzzyScore(product.shortDescription, q) * 0.4
      );
      return { product, score };
    })
    .filter((hit) => hit.score > 12)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
    .slice(0, limit);
}

export const searchSuggestions = [
  "Cow dung cake",
  "Gobar upla",
  "Gomay diya",
  "Havan cup",
  "Dhoop",
  "Organic manure",
];
