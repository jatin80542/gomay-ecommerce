import type { MetadataRoute } from "next";
import { brandConfig } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/checkout", "/cart", "/account", "/wishlist"] }],
    sitemap: `${brandConfig.siteUrl}/sitemap.xml`,
  };
}
