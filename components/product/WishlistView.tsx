"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/data/products";
import { ProductGrid } from "./ProductGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ProductGridSkeleton } from "@/components/ui/Skeletons";

export function WishlistView() {
  const { wishlist, hydrated } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="shell py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Wishlist", href: "/wishlist" }]} />
      <h1 className="text-[30px] leading-tight sm:text-[38px]">Wishlist</h1>

      <div className="mt-8">
        {!hydrated ? (
          <ProductGridSkeleton count={4} />
        ) : saved.length === 0 ? (
          <div className="rounded-xl border border-dashed border-mitti-300 bg-sand-100 px-6 py-16 text-center">
            <Heart className="mx-auto h-10 w-10 text-mitti-300" aria-hidden />
            <p className="mt-4 font-display text-xl font-semibold text-mitti-800">Nothing saved yet</p>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-mitti-600">
              Tap the heart on any product to keep it here while you decide.
            </p>
            <ButtonLink href="/shop" className="mt-6">
              Browse the shop
            </ButtonLink>
          </div>
        ) : (
          <ProductGrid products={saved} />
        )}
      </div>
    </div>
  );
}
