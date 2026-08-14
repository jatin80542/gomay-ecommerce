import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { collections, collectionBySlug } from "@/data/catalog";
import { productsByCollection } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };
  return pageMetadata({
    title: `${collection.name} — gomay products`,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: collection.image,
  });
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  const items = productsByCollection(collection.slug);

  return (
    <div>
      <div className="relative border-b border-mitti-200 bg-sand-100">
        <div className="shell grid items-center gap-8 py-10 lg:grid-cols-[1.2fr_1fr] lg:py-14">
          <div>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/shop" },
                { name: collection.name, href: `/collections/${collection.slug}` },
              ]}
            />
            <h1 className="text-[30px] leading-tight sm:text-[40px]">{collection.name}</h1>
            {collection.hindiName ? (
              <p className="deva mt-1.5 text-lg text-gerua-600">{collection.hindiName}</p>
            ) : null}
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mitti-600">{collection.description}</p>
            <p className="mt-4 font-mono text-xs text-mitti-500">
              {items.length} products in this collection
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-mitti-200">
            <Image
              src={collection.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <ProductGrid products={items} priorityCount={4} />
      </div>
    </div>
  );
}
