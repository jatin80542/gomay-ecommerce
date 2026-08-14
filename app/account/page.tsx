import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/config/brand";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Account",
    description: "Customer accounts arrive with the Phase 2 backend.",
    path: "/account",
  }),
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <div className="shell py-12 sm:py-20">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Account", href: "/account" }]} />
      <div className="max-w-xl">
        <h1 className="text-[30px] leading-tight sm:text-[38px]">Account</h1>
        <p className="mt-4 flex items-start gap-2.5 rounded-lg border border-saffron-300 bg-saffron-100 px-4 py-3 text-[14px] text-mitti-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-saffron-700" aria-hidden />
          <span>
            Sign-in, saved addresses and order history connect with the Phase 2 backend. Rather than show a login
            form that can&apos;t authenticate anything, this page tells you what&apos;s coming.
          </span>
        </p>
        <p className="mt-6 text-[15px] leading-relaxed text-mitti-600">
          Your cart and wishlist already persist in this browser, so you can leave and come back without losing
          them. For order status in the meantime, message the support desk with your order reference.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={whatsappLink("retail")}>Message support</ButtonLink>
          <ButtonLink href="/shop" variant="secondary">
            Continue shopping
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
