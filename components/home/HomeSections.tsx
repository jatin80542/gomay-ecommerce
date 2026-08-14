import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Building2, Handshake, Leaf, Package, Truck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CategoryCard } from "./CategoryCard";
import { TestimonialCard } from "./TestimonialCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, purposes } from "@/data/catalog";
import { testimonials } from "@/data/testimonials";
import { bestsellers, festiveProducts, productsByCategory, products } from "@/data/products";
import { brandConfig } from "@/config/brand";
import { Newsletter } from "@/components/forms/Newsletter";

export function FeaturedCategories() {
  return (
    <Section tone="sand">
      <div className="shell">
        <SectionHeading
          eyebrow="The catalogue"
          title="Eight ranges, one gaushala"
          action={
            <ButtonLink href="/shop" variant="secondary" size="sm">
              Browse everything
            </ButtonLink>
          }
        />
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export function BestSellers() {
  return (
    <Section>
      <div className="shell">
        <SectionHeading
          eyebrow="Reordered most"
          title="Best sellers"
          copy="The packs that come back on the same list every month."
          action={
            <ButtonLink href="/shop?sort=best-selling" variant="secondary" size="sm">
              See all
            </ButtonLink>
          }
        />
        <ProductGrid products={bestsellers().slice(0, 4)} />
      </div>
    </Section>
  );
}

export function BrandPhilosophy() {
  return (
    <Section tone="paper">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-mitti-200">
          <Image
            src="/images/lifestyle/craft-hands.svg"
            alt="Gomay cakes being shaped by hand"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow mb-3">What we&apos;re building</p>
          <h2 className="text-[26px] leading-[1.15] sm:text-[34px]">
            An old material, made properly and sold at scale.
          </h2>
          <p className="deva mt-3 text-xl text-gerua-600">{brandConfig.hindiAccent}</p>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-mitti-600">
            <p>
              Cow dung has been shaped into fuel, lamps and manure in Indian villages for as long as anyone has
              kept count. Nothing about that needs reinventing. What it does need is consistency — the same
              thickness, the same drying, the same weight in every carton.
            </p>
            <p>
              So we describe what these products are and what they&apos;ve traditionally been used for, and stop
              there. No medical claims, no purification claims, no certifications we haven&apos;t been issued.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-gerua-600"
          >
            Read our story <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}

export function CapabilityBand() {
  const lanes = [
    {
      icon: Package,
      title: "Retail",
      copy: "Household packs from four pieces up. Cart, checkout, done — no enquiry forms.",
      href: "/shop",
      cta: "Shop retail",
    },
    {
      icon: Building2,
      title: "Corporate",
      copy: "Branded boxes from 50 units, artwork approval to multi-address delivery in under three weeks.",
      href: "/corporate-gifting",
      cta: "Corporate gifting",
    },
    {
      icon: Truck,
      title: "Wholesale",
      copy: "Cartons, pallets and tonnes with slab pricing, private label and scheduled repeat supply.",
      href: "/bulk",
      cta: "Bulk pricing",
    },
  ];

  return (
    <Section tone="dark">
      <div className="shell">
        <SectionHeading
          eyebrow="Capability"
          title="One supplier across all three lanes"
          copy="The same production line feeds a six-piece pack and a tonne consignment. What changes is packaging, pricing and how you order."
          tone="light-text"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {lanes.map(({ icon: Icon, title, copy, href, cta }) => (
            <div key={title} className="flex flex-col rounded-lg border border-sand-200/15 bg-mitti-900/30 p-6">
              <Icon className="h-6 w-6 text-saffron-300" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-bold text-sand-50">{title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-sand-200/75">{copy}</p>
              <Link
                href={href}
                className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-saffron-300"
              >
                {cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function FeaturedProducts() {
  const featured = [...productsByCategory("cow-dung-cakes"), ...productsByCategory("havan-cups")].slice(0, 4);
  return (
    <Section tone="sand">
      <div className="shell">
        <SectionHeading
          eyebrow="Core range"
          title="Cow dung cakes & havan cups"
          hindi="गोमय उपला एवं हवन कप"
          copy="The two ranges that carry most of our production, in household packs and carton quantities."
          action={
            <ButtonLink href="/collections/pooja-havan" variant="secondary" size="sm">
              Pooja & havan
            </ButtonLink>
          }
        />
        <ProductGrid products={featured} />
      </div>
    </Section>
  );
}

export function CorporateBanner() {
  return (
    <section className="relative overflow-hidden bg-mitti-800">
      <div className="shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow mb-3 text-brass-400">Corporate gifting</p>
          <h2 className="text-[28px] leading-[1.12] text-sand-50 sm:text-[36px]">Give something rooted in India.</h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-sand-200/80">
            Custom gomay gift collections for employees, clients, events and festive celebrations — your logo on
            the sleeve, your combination in the box.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-y-2.5 text-sm text-sand-200/85">
            {["Custom branding", "Bulk quantities", "Premium packaging", "Pan-India delivery"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brass-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href="/corporate-gifting" size="lg" className="mt-8 bg-brass-500 text-mitti-900 hover:bg-brass-400">
            Explore corporate gifting
          </ButtonLink>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-sand-200/15">
          <Image
            src="/images/lifestyle/corporate-gifting.svg"
            alt="Corporate gomay gift boxes with printed sleeves"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function FestiveCollection() {
  return (
    <Section>
      <div className="shell">
        <SectionHeading
          eyebrow="In season"
          title="Festive collection"
          hindi="त्योहार संग्रह"
          copy="Diyas, boxes and decor produced ahead of the season. Stock closes when the season does."
          action={
            <ButtonLink href="/collections/diwali" variant="secondary" size="sm">
              All festive
            </ButtonLink>
          }
        />
        <ProductGrid products={festiveProducts().slice(0, 4)} />
      </div>
    </Section>
  );
}

export function WhyChooseUs() {
  const points = [
    { icon: Leaf, title: "Made in India", copy: "Rooted in Indian craftsmanship and sourcing." },
    { icon: Handshake, title: "Natural materials", copy: "Built around naturally sourced cow dung and the ingredients named on each pack." },
    { icon: Boxes, title: "Retail to bulk", copy: "Order individual packs, or enquire for large-volume supply." },
    { icon: Package, title: "Multiple pack sizes", copy: "From four pieces to a tonne, across most ranges." },
    { icon: Building2, title: "Corporate customisation", copy: "Sleeves, message cards, logo printing and custom product mixes." },
    { icon: Truck, title: "Careful packaging", copy: "Packed so pieces arrive whole, not as a box of crumbs." },
  ];

  return (
    <Section tone="sand">
      <div className="shell">
        <SectionHeading eyebrow="Why buy here" title="What we can actually promise" />
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {points.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} delay={index * 50}>
              <div className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-mitti-200 bg-sand-50">
                  <Icon className="h-4.5 w-4.5 text-gerua-500" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-mitti-800">{title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-mitti-600">{copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function ShopByPurpose() {
  return (
    <Section>
      <div className="shell">
        <SectionHeading
          eyebrow="Shop by purpose"
          title="Start from the occasion, not the product"
          copy="Most people arrive knowing the ritual, not the item. These entry points map one to the other."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {purposes.map((purpose) => (
            <Link
              key={purpose.slug}
              href={`/shop?purpose=${purpose.slug}`}
              className="group rounded-lg border border-mitti-200 bg-sand-50 p-4 transition hover:border-gerua-400 hover:bg-white"
            >
              <span className="deva block text-sm text-gerua-600">{purpose.hindi}</span>
              <span className="mt-1 block font-display text-[15px] font-semibold text-mitti-800">
                {purpose.name}
              </span>
              <span className="mt-1 block text-[12px] leading-snug text-mitti-500">{purpose.blurb}</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function ComboBoxesSection() {
  const boxes = productsByCategory("combo-boxes").filter((p) => p.retailAvailable).slice(0, 4);
  return (
    <Section tone="paper">
      <div className="shell">
        <SectionHeading
          eyebrow="Boxes"
          title="Everything for one ritual, in one box"
          copy="Assembled against what a household or temple actually uses, so you reorder one item instead of five."
          action={
            <ButtonLink href="/shop?category=combo-boxes" variant="secondary" size="sm">
              All boxes
            </ButtonLink>
          }
        />
        <ProductGrid products={boxes} />

        <div className="mt-10 rounded-lg border border-mitti-200 bg-sand-50 p-6 sm:p-8">
          <p className="eyebrow mb-4">What&apos;s inside the Complete Havan Box</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {(products.find((p) => p.slug === "complete-havan-box")?.whatsInside ?? []).map((item) => (
              <li
                key={item}
                className="rounded border border-mitti-200 bg-sand-100 px-3.5 py-3 font-mono text-[12px] text-mitti-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section tone="sand">
      <div className="shell">
        <SectionHeading
          eyebrow="From all three lanes"
          title="What buyers say"
          copy="Placeholder feedback shown for layout. Real, attributable reviews replace these before launch."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export function SourcingStory() {
  return (
    <Section>
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Sourcing</p>
          <h2 className="text-[26px] leading-[1.15] sm:text-[34px]">Bought from the sheds, not from a market</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mitti-600">
            We buy directly from cattle sheds and gaushalas, which is the only way to know how fresh the material
            is when it reaches the drying yard. Every batch is traced back to the shed it came from, so a problem
            in one carton doesn&apos;t become a problem across a season.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-mitti-600">
            Details of our partner gaushalas, capacity and locations are published as each arrangement is
            confirmed — rather than stated as round numbers here.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-mitti-200">
          <Image
            src="/images/lifestyle/sourcing.svg"
            alt="Map-like illustration of sourcing across India"
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}

export function BulkCta() {
  return (
    <Section tone="forest">
      <div className="shell grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow mb-3 text-saffron-300">Wholesale</p>
          <h2 className="text-[28px] leading-[1.12] text-sand-50 sm:text-[36px]">
            Need 500, 5,000 or 50,000 units?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-sand-50/80">
            Whether you&apos;re a retailer, distributor, temple, institution or event organiser, talk to us for
            volume pricing and customised supply.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["MOQ", "500 pcs"],
              ["Lead time", "5–10 days"],
              ["Packaging", "4 formats"],
              ["Supply", "Monthly repeat"],
            ].map(([label, value]) => (
              <div key={label} className="border-l border-sand-50/25 pl-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-sand-50/60">{label}</dt>
                <dd className="mt-1 font-mono text-sm text-sand-50">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <ButtonLink href="/bulk" size="lg" className="bg-sand-50 text-forest-700 hover:bg-white">
            Get bulk pricing
          </ButtonLink>
          <ButtonLink href="/bulk#sample" size="lg" variant="outline" className="border-sand-50/40 text-sand-50 hover:border-sand-50">
            Request a sample
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export function NewsletterBand() {
  return (
    <Section tone="sand">
      <div className="shell grid gap-8 rounded-xl border border-mitti-200 bg-sand-50 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-3">Stay in touch</p>
          <h2 className="text-[24px] leading-tight sm:text-[30px]">Know when the season&apos;s stock opens</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-mitti-600">
            Diwali and Holi production runs to a fixed calendar. We send one note when a run opens and one when
            it&apos;s nearly closed — that&apos;s the whole mailing list.
          </p>
        </div>
        <div className="rounded-lg border border-mitti-200 bg-sand-100 p-5">
          <Newsletter />
        </div>
      </div>
    </Section>
  );
}
