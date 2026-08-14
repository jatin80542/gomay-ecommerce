import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/catalog";
import { brandConfig } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/shop", "/corporate-gifting", "/bulk", "/about", "/contact", "/faq"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${brandConfig.siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...collections.map((collection) => ({
      url: `${brandConfig.siteUrl}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${brandConfig.siteUrl}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
