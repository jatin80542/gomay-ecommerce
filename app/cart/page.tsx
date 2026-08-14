import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/CartPageView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Your cart",
    description: "Review the gomay products in your cart before checkout.",
    path: "/cart",
  }),
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageView />;
}
