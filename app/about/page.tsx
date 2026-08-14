import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StoryTimeline } from "@/components/home/StoryTimeline";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { brandConfig } from "@/config/brand";

export const metadata = pageMetadata({
  title: "Our story — from gaushala to your home",
  description:
    "How Gomay sources, prepares, dries and packs cow dung products in India — and what we will and won't claim about them.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-mitti-200 bg-sand-100">
        <div className="shell grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-18">
          <div>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Our story", href: "/about" }]} />
            <p className="eyebrow mb-3">Our story</p>
            <h1 className="text-[34px] font-extrabold leading-[1.1] sm:text-[46px]">
              From <span className="deva">गौशाला</span> to your home
            </h1>
            <p className="deva mt-3 text-xl text-gerua-600">{brandConfig.hindiTagline}</p>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-mitti-600">
              We make things Indian households have made for themselves for generations — cakes for the ritual
              fire, lamps for the festival evening, manure for the pots on the terrace. What we&apos;ve added is
              consistency, packaging that survives a courier, and the ability to send the same product to one home
              or to a thousand.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-mitti-200">
            <Image
              src="/images/lifestyle/story.svg"
              alt="Gomay products drying in the sun at a village yard"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <StoryTimeline />

      <Section tone="default">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="What we claim" title="Traditional use, described as traditional use" />
            <div className="space-y-4 text-[15px] leading-relaxed text-mitti-600">
              <p>
                Cow dung has a long history in Indian ritual, farming and household practice. We describe that
                history and we describe what our products are made of. We don&apos;t translate either into medical,
                air-purification or anti-radiation claims, because we can&apos;t support those.
              </p>
              <p>
                We also don&apos;t publish certifications we haven&apos;t been issued, counts of cattle we
                haven&apos;t verified, or customer numbers we can&apos;t evidence. Where a number would be useful
                and we don&apos;t have it yet, we leave it out rather than round it up.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="What we control" title="The parts that decide quality" />
            <ul className="space-y-4">
              {[
                ["Freshness at collection", "Material reaches the yard the same morning it's collected."],
                ["Drying discipline", "Turned through the cycle. Under-dried cakes smoulder; over-dried ones crumble."],
                ["Sorting", "Thickness and finish checked by hand before packing. Broken pieces go back."],
                ["Packing", "Ventilated cartons and separators — the difference between a box of cakes and a box of dust."],
              ].map(([title, copy]) => (
                <li key={title} className="border-l-2 border-gerua-300 pl-4">
                  <p className="font-display text-[15px] font-semibold text-mitti-800">{title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-mitti-600">{copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="sand" id="sourcing">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-mitti-200">
            <Image
              src="/images/lifestyle/gaushala.svg"
              alt="Cattle shed at dawn"
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Sourcing" title="Bought from the sheds we know" />
            <p className="text-[15px] leading-relaxed text-mitti-600">
              We buy directly from cattle sheds and gaushalas rather than through a market, so every batch traces
              back to where it came from. As arrangements are formalised, partner details and capacity will be
              published here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="secondary">
                Partner with us
              </ButtonLink>
              <ButtonLink href="/bulk" variant="ghost">
                Wholesale supply
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <TrustStrip />

      <Section tone="default">
        <div className="shell text-center">
          <h2 className="text-[26px] sm:text-[32px]">Start with one pack</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-mitti-600">
            Try a small pack before you commit to a monthly order — most households and most temples do exactly
            that.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Shop products
            </ButtonLink>
            <Link
              href="/faq"
              className="inline-flex h-[52px] items-center px-4 font-display text-sm font-semibold text-mitti-700 underline underline-offset-4"
            >
              Read the FAQs
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
