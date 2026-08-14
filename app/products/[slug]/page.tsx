import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Stars } from "@/components/ui/Stars";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCart } from "@/components/product/AddToCart";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products, getProductBySlug, relatedProducts, frequentlyBoughtTogether } from "@/data/products";
import { categoryBySlug } from "@/data/catalog";
import { shippingFaqs } from "@/data/faqs";
import { breadcrumbJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return pageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${product.slug}`,
    image: product.images[0]?.src,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: category?.name ?? "Products", href: `/shop?category=${product.category}` },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  const related = relatedProducts(product);
  const together = frequentlyBoughtTogether(product);
  const togetherTotal = product.price + together.reduce((sum, p) => sum + p.price, 0);

  const detailSections = [
    { question: "Product description", answer: <p>{product.description}</p> },
    ...(product.whatsInside
      ? [
          {
            question: "What's inside",
            answer: (
              <ul className="space-y-1.5">
                {product.whatsInside.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gerua-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(product.howToUse
      ? [
          {
            question: "How to use",
            answer: (
              <ol className="space-y-2">
                {product.howToUse.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-xs text-mitti-400">{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            ),
          },
        ]
      : []),
    {
      question: "Specifications",
      answer: (
        <dl className="divide-y divide-mitti-200 border-y border-mitti-200">
          {product.specifications.map((spec) => (
            <div key={spec.label} className="flex justify-between gap-6 py-2.5">
              <dt className="text-mitti-500">{spec.label}</dt>
              <dd className="text-right font-mono text-[13px] text-mitti-800">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      question: "Storage instructions",
      answer: <p>{product.storage ?? "Store in a cool, dry place away from moisture and direct sunlight."}</p>,
    },
    {
      question: "Shipping information",
      answer: (
        <ul className="space-y-2">
          {shippingFaqs.map((faq) => (
            <li key={faq.question}>
              <span className="font-medium text-mitti-700">{faq.question}</span> {faq.answer}
            </li>
          ))}
        </ul>
      ),
    },
    ...(product.faqs
      ? [
          {
            question: "Frequently asked questions",
            answer: (
              <ul className="space-y-3">
                {product.faqs.map((faq) => (
                  <li key={faq.question}>
                    <p className="font-medium text-mitti-700">{faq.question}</p>
                    <p className="mt-1">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      <div className="shell py-6 sm:py-10">
        <Breadcrumbs items={crumbs} />

        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap gap-1.5">
              {product.badges.map((badge) => (
                <Badge key={badge} kind={badge} />
              ))}
            </div>

            <h1 className="mt-3.5 text-[28px] font-extrabold leading-tight sm:text-[34px]">{product.name}</h1>
            <p className="deva mt-1 text-lg text-mitti-500">{product.hindiName}</p>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Stars rating={product.rating} count={product.reviewCount} />
              <span className="text-xs text-mitti-400">Placeholder ratings — real reviews replace these</span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-mitti-600">{product.shortDescription}</p>

            <div className="mt-6">
              <AddToCart product={product} />
            </div>
          </div>
        </div>

        <div className="mt-14 grid min-w-0 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold">Product details</h2>
            <Accordion items={detailSections} defaultOpen={0} />
          </div>

          <aside>
            <h2 className="mb-4 font-display text-xl font-bold">Frequently bought together</h2>
            <div className="rounded-lg border border-mitti-200 bg-sand-100 p-5">
              <ul className="space-y-3">
                <li className="flex justify-between gap-4 text-sm">
                  <span className="font-medium text-mitti-800">{product.name}</span>
                  <span className="font-mono">{formatINR(product.price)}</span>
                </li>
                {together.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 text-sm">
                    <Link href={`/products/${item.slug}`} className="text-mitti-600 hover:text-gerua-600">
                      {item.name}
                    </Link>
                    <span className="font-mono text-mitti-600">{formatINR(item.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex justify-between border-t border-mitti-200 pt-3 font-display font-semibold">
                <span>Together</span>
                <span>{formatINR(togetherTotal)}</span>
              </p>
              <p className="mt-2 text-xs text-mitti-500">
                Add each item from its own page to choose the pack size you need.
              </p>
            </div>

            <h2 className="mb-4 mt-10 font-display text-xl font-bold">Reviews</h2>
            <div className="rounded-lg border border-dashed border-mitti-300 bg-sand-50 p-5">
              <Stars rating={product.rating} count={product.reviewCount} />
              <p className="mt-3 text-sm leading-relaxed text-mitti-600">
                Written reviews are collected after delivery and will appear here once the order backend is
                connected. The rating shown is placeholder data, not verified customer feedback.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Section tone="sand">
        <div className="shell">
          <SectionHeading eyebrow="Related" title="You may also need" />
          <ProductGrid products={related} />
        </div>
      </Section>

      <StickyBuyBar product={product} />
    </>
  );
}
