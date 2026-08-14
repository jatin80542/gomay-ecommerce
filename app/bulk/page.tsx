import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { BulkForm } from "@/components/forms/BulkForm";
import { BulkCatalogue, SampleRequestButton } from "@/components/business/BulkCatalogue";
import { PricingTiers } from "@/components/product/PricingTiers";
import { bulkProducts, getProductBySlug } from "@/data/products";
import { bulkFaqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/brand";

export const metadata = pageMetadata({
  title: "Bulk & wholesale cow dung products — slab pricing",
  description:
    "Wholesale gomay supply for distributors, retailers, temples, institutions, event organisers, nurseries and exporters. Carton, pallet and tonne quantities with slab pricing.",
  path: "/bulk",
});

const buyerTypes = [
  ["Distributor", "Territory pricing, monthly commitments"],
  ["Retailer", "Retail-ready pouches, shelf-friendly cartons"],
  ["Temple", "Fixed-date monthly despatch"],
  ["Institution", "Single invoice, scheduled supply"],
  ["Event organiser", "Staged delivery against event dates"],
  ["Farm / Nursery", "Sacks and tonne quantities"],
  ["Exporter", "Documentation and container loads"],
  ["Other", "Tell us what you're planning"],
];

const packagingOptions = [
  { title: "Standard bulk", copy: "Plain ventilated cartons or woven sacks. Lowest cost per unit." },
  { title: "Retail ready", copy: "Printed pouches and shelf cartons, ready to put out." },
  { title: "Private label", copy: "Your brand on the pack, our production behind it." },
  { title: "Custom packaging", copy: "Sized, printed and packed to your specification." },
];

export default function BulkPage() {
  const products = bulkProducts();
  const upla = getProductBySlug("bulk-gomay-upla-carton");
  const tradeVoices = testimonials.filter((t) => t.segment === "retailer" || t.segment === "temple" || t.segment === "farm");

  return (
    <>
      <div className="border-b border-mitti-200 bg-forest-600 text-sand-50">
        <div className="shell grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <div className="[&_a]:text-sand-50/70 [&_span]:text-sand-50">
              <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Bulk & wholesale", href: "/bulk" }]} />
            </div>
            <p className="eyebrow mb-3 text-saffron-300">Wholesale</p>
            <h1 className="text-[36px] font-extrabold leading-[1.08] text-sand-50 sm:text-[50px]">
              Buy direct. Buy in bulk.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-sand-50/80">
              For distributors, retailers, temples, institutions, event organisers, exporters and large-volume
              buyers — priced by slab, packed to your format, delivered to your district.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#enquiry" size="lg" className="bg-sand-50 text-forest-700 hover:bg-white">
                Get wholesale pricing
              </ButtonLink>
              <ButtonLink
                href={whatsappLink("bulk")}
                size="lg"
                variant="outline"
                className="border-sand-50/40 text-sand-50 hover:border-sand-50"
              >
                WhatsApp the trade desk
              </ButtonLink>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["MOQ", "500 pcs / 50 KG"],
                ["Lead time", "5–10 days"],
                ["Formats", "Carton to tonne"],
                ["Supply", "One-off or monthly"],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-sand-50/25 pl-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-sand-50/60">{label}</dt>
                  <dd className="mt-1 font-mono text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-sand-50/15">
            <Image
              src="/images/lifestyle/bulk-warehouse.svg"
              alt="Cartons of gomay products staged for despatch"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <Section tone="default">
        <div className="shell">
          <SectionHeading
            eyebrow="Who buys this way"
            title="Eight kinds of trade buyer, priced differently"
            copy="Slab pricing depends on quantity, packaging and how often you reorder — so the first question is what kind of buyer you are."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {buyerTypes.map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-mitti-200 bg-sand-50 p-4">
                <h3 className="font-display text-[15px] font-semibold text-mitti-800">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-mitti-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="shell grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Trade catalogue"
              title="Available in volume"
              copy="Indicative ranges only. Your slab price comes back against quantity, packaging and delivery district."
            />
            <BulkCatalogue products={products} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-mitti-200 bg-sand-50 p-6">
              <p className="eyebrow mb-3">Example slab — bulk upla</p>
              {upla?.bulkTiers ? <PricingTiers tiers={upla.bulkTiers} unit="pc" /> : null}
              <p className="mt-4 text-[13px] leading-relaxed text-mitti-600">
                Every product page carries its own ladder. Above the top slab, pricing is quoted rather than
                listed — that&apos;s where freight and packaging start to move the number.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-mitti-200 bg-sand-100 p-6" id="sample">
              <p className="eyebrow mb-2">Before you commit</p>
              <h3 className="font-display text-lg font-bold text-mitti-800">Request a sample</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mitti-600">
                Most trade buyers want to light a cake or crumble a handful of manure before signing off on a
                tonne. Tell us what to send and where.
              </p>
              <div className="mt-4">
                <SampleRequestButton />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper" id="packaging">
        <div className="shell">
          <SectionHeading
            eyebrow="Packaging"
            title="Four ways it can leave our floor"
            copy="Packaging changes the unit price as much as quantity does, so decide it early."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packagingOptions.map((option) => (
              <div key={option.title} className="rounded-lg border border-mitti-200 bg-sand-50 p-5">
                <h3 className="font-display text-[15px] font-semibold text-mitti-800">{option.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mitti-600">{option.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="default" id="enquiry">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Wholesale enquiry"
              title="Get wholesale pricing"
              copy="The more precise the quantity and delivery district, the tighter the price that comes back."
            />
            <div className="rounded-lg border border-mitti-200 bg-sand-100 p-5">
              <p className="eyebrow mb-3">What you get back</p>
              <ul className="space-y-2.5 text-[14px] text-mitti-600">
                {[
                  "Slab pricing against your quantity",
                  "Packaging options and their cost impact",
                  "Freight estimate to your district",
                  "Lead time and repeat-supply schedule",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-forest-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-mitti-200 bg-sand-50 p-6 sm:p-8">
            <BulkForm />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Questions" title="Wholesale FAQs" />
            <Accordion items={bulkFaqs} defaultOpen={0} />
          </div>
          <div className="space-y-5">
            {tradeVoices.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
            <p className="text-xs text-mitti-500">
              Placeholder feedback shown for layout. Real, attributable quotes replace these before launch.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
