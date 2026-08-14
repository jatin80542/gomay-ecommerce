import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg border border-mitti-200 bg-sand-100 p-4 "
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
        quality={90}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-mitti-900/75 via-mitti-900/10 to-transparent" aria-hidden />
      <span className="relative">
        <span className="deva block text-xs text-sand-200/80">{category.hindiName}</span>
        <span className="mt-0.5 block font-display text-[15px] font-semibold leading-tight text-sand-50">
          {category.name}
        </span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-sand-200/70">
          {category.purposeBlurb}
        </span>
      </span>
    </Link>
  );
}
