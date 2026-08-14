import type { Metadata } from "next";
import { WishlistView } from "@/components/product/WishlistView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Your wishlist",
    description: "Products you've saved for later.",
    path: "/wishlist",
  }),
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistView />;
}
