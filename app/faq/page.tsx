import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { homeFaqs, shippingFaqs, bulkFaqs, corporateFaqs } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";
import { brandConfig } from "@/config/brand";

export const metadata = pageMetadata({
  title: "FAQs — orders, shipping, bulk and corporate",
  description:
    "Answers on gomay products, ordering, shipping, returns, wholesale minimums, corporate branding and privacy.",
  path: "/faq",
});

const policy = {
  returns: [
    {
      question: "What can be returned?",
      answer:
        "Unopened retail packs can be returned within 7 days of delivery. Because these are natural, sun-dried products, minor colour and size variation isn't a defect — but a pack that arrives damaged in transit is replaced.",
    },
    {
      question: "How do I start a return?",
      answer:
        "Message the support desk with your order reference and a photo of the pack. Until the order backend is connected in Phase 2, returns are handled manually over WhatsApp or email.",
    },
    {
      question: "Are bulk and corporate orders returnable?",
      answer:
        "Custom-printed and private-label production can't be returned once printed, which is why artwork proofs are approved before production starts. Standard bulk stock follows the same 7-day rule.",
    },
  ],
  privacy: [
    {
      question: "What do you do with the details I submit?",
      answer:
        "Enquiry forms are used to prepare your quote and to contact you about it. In this Phase 1 build nothing is transmitted at all — the forms are frontend only and the payload is discarded.",
    },
    {
      question: "Do you share data with anyone?",
      answer:
        "When the backend is connected, lead details will flow to our CRM and courier partners only as needed to quote and deliver. A full privacy policy is published before the store starts taking payments.",
    },
  ],
  terms: [
    {
      question: "Are prices on this site final?",
      answer:
        "Retail prices shown are inclusive of taxes. Prices in this Phase 1 build are demonstration values and will be replaced with live pricing when the catalogue backend is connected.",
    },
    {
      question: "How are bulk quotes binding?",
      answer:
        "A written quote holds for the period stated on it, subject to stock. Freight is quoted separately by district.",
    },
  ],
  track: [
    {
      question: "How do I track my order?",
      answer:
        "Order tracking arrives with the order backend in Phase 2. Until then, despatch details and courier tracking numbers are shared directly on WhatsApp or email.",
    },
  ],
};

const sections = [
  { id: "general", title: "General", items: homeFaqs },
  { id: "shipping", title: "Shipping", items: shippingFaqs },
  { id: "returns", title: "Returns", items: policy.returns },
  { id: "bulk", title: "Bulk & wholesale", items: bulkFaqs },
  { id: "corporate", title: "Corporate gifting", items: corporateFaqs },
  { id: "track", title: "Track order", items: policy.track },
  { id: "privacy", title: "Privacy", items: policy.privacy },
  { id: "terms", title: "Terms", items: policy.terms },
];

export default function FaqPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQs", href: "/faq" }]} />
      <h1 className="text-[30px] leading-tight sm:text-[40px]">Questions & policies</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mitti-600">
        Everything we get asked, grouped by who&apos;s asking. If it isn&apos;t here, the support desk answers on
        WhatsApp at {brandConfig.contact.supportPhone}.
      </p>

      <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-mitti-200 bg-sand-50 px-3.5 py-1.5 text-sm text-mitti-700 hover:border-gerua-400 hover:text-gerua-600"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 max-w-3xl space-y-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="mb-4 font-display text-xl font-bold">{section.title}</h2>
            <Accordion items={section.items} defaultOpen={0} />
          </section>
        ))}
      </div>
    </div>
  );
}
