import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/CheckoutView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Checkout",
    description: "Checkout interface for gomay retail orders.",
    path: "/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
