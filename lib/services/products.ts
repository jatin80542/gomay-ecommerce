import { products, getProductBySlug, productsByCategory, productsByCollection } from "@/data/products";
import type { Product } from "@/types";

/** Reads the mock catalogue today; becomes `fetch('/api/products')` in Phase 2. */
export async function fetchProducts(): Promise<Product[]> {
  return products;
}

export async function fetchProduct(slug: string): Promise<Product | undefined> {
  return getProductBySlug(slug);
}

export async function fetchCategoryProducts(category: string): Promise<Product[]> {
  return productsByCategory(category);
}

export async function fetchCollectionProducts(collection: string): Promise<Product[]> {
  return productsByCollection(collection);
}

/** Inventory is read from the product record today; Phase 2 hits a stock service. */
export async function fetchStock(sku: string): Promise<number> {
  const product = products.find((p) => p.variants.some((v) => v.sku === sku));
  return product?.stock ?? 0;
}
