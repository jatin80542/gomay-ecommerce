import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";
import type { Product } from "@/types";

/**
 * Per-page metadata.
 *
 * `image` is intentionally optional and normally left unset: app/opengraph-image.tsx
 * generates a real 1200x630 PNG that Next attaches automatically. Social platforms
 * don't render SVG previews, so the placeholder product art is never used as an OG
 * image. Once real photography exists, pass a JPG/PNG path here per page.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${brandConfig.siteUrl}${path}`;
  const usable = image && !image.endsWith(".svg") ? image : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: brandConfig.name,
      ...(usable ? { images: [{ url: usable }] } : {}),
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(usable ? { images: [usable] } : {}),
    },
  };
}

/** Product structured data. Wired to mock prices now; the same shape carries real data later. */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.id,
    brand: { "@type": "Brand", name: brandConfig.name },
    image: product.images.map((i) => `${brandConfig.siteUrl}${i.src}`),
    aggregateRating:
      product.reviewCount > 0
        ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount }
        : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: product.price,
      offerCount: product.variants.filter((v) => !v.quoteOnly).length,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${brandConfig.siteUrl}/products/${product.slug}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${brandConfig.siteUrl}${item.href}`,
    })),
  };
}

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandConfig.name,
    url: brandConfig.siteUrl,
    logo: `${brandConfig.siteUrl}${brandConfig.logo.mark}`,
    sameAs: Object.values(brandConfig.social),
  };
}
