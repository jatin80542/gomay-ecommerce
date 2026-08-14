import Image from "next/image";
import { Award, Boxes, CalendarClock, MapPin, MessageSquare, Sparkles, Stamp, UserRound } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CorporateProductCard } from "@/components/business/CorporateProductCard";
import { CorporateForm } from "@/components/forms/CorporateForm";
import { corporateProducts } from "@/data/products";
import { corporateFaqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/brand";

export const metadata = pageMetadata({
  title: "Corporate gifting — gomay gift boxes with your branding",
  description:
    "Sustainable Indian gifting for companies: custom gomay gift boxes with your logo, sleeve and product combination, from 50 boxes, delivered across India.",
  path: "/corporate-gifting",
});

const categories = [
  { title: "Diwali boxes", copy: "The season's largest run. Book artwork by early autumn." },
  { title: "Employee gifts", copy: "One SKU, many addresses — home delivery included." },
  { title: "Client gifts", copy: "Heavier boxes, brass-embossed sleeves, personalised cards." },
  { title: "Event gifts", copy: "Conference and offsite quantities with staged delivery." },
  { title: "Wedding gifts", copy: "Return gifts in matched sets, sized to guest count." },
  { title: "Spiritual gift sets", copy: "Havan and pooja sets for temple trusts and foundations." },
  { title: "Eco-conscious gifts", copy: "Plastic-free packing and natural materials throughout." },
];

const customisations = [
  { icon: Stamp, label: "Company logo" },
  { icon: Boxes, label: "Custom sleeve" },
  { icon: MessageSquare, label: "Custom message card" },
  { icon: Sparkles, label: "Branded packaging" },
  { icon: Award, label: "Custom product combination" },
  { icon: CalendarClock, label: "Bulk pricing" },
  { icon: MapPin, label: "Multiple delivery addresses" },
  { icon: UserRound, label: "Dedicated account support" },
];

const journey = [
  { step: "Brief", copy: "Quantity, budget per gift and the date it has to land." },
  { step: "Box options", copy: "Two or three combinations priced at your quantity." },
  { step: "Artwork", copy: "You send the logo; we send a sleeve proof for approval." },
  { step: "Production", copy: "10–18 working days depending on box and finish." },
  { step: "Delivery", copy: "One address or many, tracked, with a single invoice." },
];

export default function CorporateGiftingPage() {
  const boxes = corporateProducts().slice(0, 6);
  const corporateVoices = testimonials.filter((t) => t.segment === "corporate");

  return (
    <>
      <div className="border-b border-mitti-200 bg-mitti-800 text-sand-100">
        <div className="shell grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <div className="[&_a]:text-sand-200/70 [&_span]:text-sand-200">
              <Breadcrumbs
                items={[
                  { name: "Home", href: "/" },
                  { name: "Corporate gifting", href: "/corporate-gifting" },
                ]}
              />
            </div>
            <p className="eyebrow mb-3 text-brass-400">For companies and institutions</p>
            <h1 className="text-[36px] font-extrabold leading-[1.08] text-sand-50 sm:text-[50px]">
              Gifts rooted in India.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-sand-200/80">
              Sustainable Indian gifting for companies, celebrations, employees, clients and events — built around
              gomay products your recipients will actually use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#quote" size="lg" className="bg-brass-500 text-mitti-900 hover:bg-brass-400">
                Request corporate quote
              </ButtonLink>
              <ButtonLink
                href={whatsappLink("corporate")}
                size="lg"
                variant="outline"
                className="border-sand-200/30 text-sand-100 hover:border-sand-200/70"
              >
                Talk to corporate sales
              </ButtonLink>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-sand-200/50">
              Minimum 50 boxes · Artwork proof before production · Single invoice
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-sand-200/15">
            <Image
              src="/images/lifestyle/corporate-gifting.svg"
              alt="Gomay corporate gift boxes with printed sleeves and message cards"
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
            eyebrow="What we gift"
            title="Seven gifting occasions, one supplier"
            copy="Each of these runs on a different calendar. Tell us which one you're planning and the quote comes back sized for it."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.title} className="rounded-lg border border-mitti-200 bg-sand-50 p-5">
                <h3 className="font-display text-[15px] font-semibold text-mitti-800">{category.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mitti-600">{category.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="shell">
          <SectionHeading
            eyebrow="Gift collections"
            title="Start from a box, then change everything in it"
            copy="These are base boxes. The contents, the sleeve and the card are all decided with you before production."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boxes.map((product) => (
              <CorporateProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Customisation" title="What can be changed" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {customisations.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-mitti-200 bg-sand-50 px-4 py-3"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brass-500" aria-hidden />
                  <span className="text-[14px] text-mitti-700">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="How it runs" title="Brief to delivery" />
            <ol className="relative space-y-6 border-l border-mitti-200 pl-6">
              {journey.map((item, index) => (
                <li key={item.step} className="relative">
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-mitti-300 bg-sand-50 font-mono text-[10px] text-mitti-600">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-[15px] font-semibold text-mitti-800">{item.step}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-mitti-600">{item.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="default" id="quote">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Request a quote"
              title="Tell us the quantity and the date"
              copy="Those two answers decide almost everything else. The rest we can work out together."
            />
            <div className="rounded-lg border border-mitti-200 bg-sand-100 p-5">
              <p className="eyebrow mb-3">Typical turnaround</p>
              <dl className="space-y-2.5 text-sm">
                {[
                  ["Quote", "Within 1 working day"],
                  ["Artwork proof", "2–3 working days"],
                  ["Production", "10–18 working days"],
                  ["Delivery", "Quoted with the order"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-mitti-600">{label}</dt>
                    <dd className="font-mono text-[13px] text-mitti-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="rounded-xl border border-mitti-200 bg-sand-50 p-6 sm:p-8">
            <CorporateForm />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Questions" title="Corporate FAQs" />
            <Accordion items={corporateFaqs} defaultOpen={0} />
          </div>
          <div className="space-y-5">
            {corporateVoices.map((testimonial) => (
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
