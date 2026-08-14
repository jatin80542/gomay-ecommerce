import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/catalog";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center py-20 text-center sm:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gerua-600">Error 404</p>
      <h1 className="mt-4 text-[34px] font-extrabold leading-tight sm:text-[46px]">
        This page isn&apos;t here
      </h1>
      <p className="deva mt-2 text-lg text-mitti-500">यह पृष्ठ नहीं मिला</p>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-mitti-600">
        The link may be old, or the product may have moved to a different range. The shop is the fastest way back.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop" size="lg">
          Browse the shop
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Go home
        </ButtonLink>
      </div>

      <div className="mt-12 w-full max-w-2xl border-t border-mitti-200 pt-8">
        <p className="eyebrow mb-4">Or jump to a range</p>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="rounded-full border border-mitti-200 bg-sand-50 px-3.5 py-1.5 text-sm text-mitti-700 hover:border-gerua-400 hover:text-gerua-600"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
