import { Suspense } from "react";
import { ShopBrowser } from "@/components/product/ShopBrowser";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { retailProducts } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop all gomay products",
  description:
    "Browse cow dung cakes, diyas, havan cups, dhoop, havan lakdi, manure and gift boxes. Filter by category, use, pack size, weight and price.",
  path: "/shop",
});

export default function ShopPage() {
  const products = retailProducts();

  return (
    <div className="shell py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }]} />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-[30px] leading-tight sm:text-[40px]">Shop</h1>
        <p className="deva mt-1.5 text-lg text-mitti-500">सम्पूर्ण संग्रह</p>
        <p className="mt-3 text-[15px] leading-relaxed text-mitti-600">
          {products.length} products across pooja, havan, festive and gardening. Wholesale-only formats live on the{" "}
          <a href="/bulk" className="font-semibold text-gerua-600 underline underline-offset-4">
            bulk page
          </a>
          .
        </p>
      </header>

      {/* The fallback is also what static HTML contains (ShopBrowser reads useSearchParams),
          so it renders the real catalogue rather than a skeleton — crawlers and no-JS visitors
          still get every product link. */}
      <Suspense fallback={<ProductGrid products={products} />}>
        <ShopBrowser products={products} />
      </Suspense>
    </div>
  );
}
