import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { brandConfig } from "@/config/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand-100">
      <div className="shell grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow">Retail packs · Corporate gifting · Wholesale supply</p>
          <h1 className="mt-4 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[52px] lg:text-[58px]">
            Pure Gomay.
            <br />
            Rooted in Bharat.
          </h1>
          <p className="deva mt-3 text-xl text-gerua-600">{brandConfig.hindiTagline}</p>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-mitti-600">
            Traditional Indian cow dung products, thoughtfully prepared for your home, pooja, celebrations, garden
            and business — from a pack of six to a tonne.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Shop products
            </ButtonLink>
            <ButtonLink href="/bulk" size="lg" variant="secondary">
              Buy in bulk
            </ButtonLink>
          </div>

          <Link
            href="/corporate-gifting"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mitti-700 underline decoration-brass-400 decoration-2 underline-offset-4 hover:text-gerua-600"
          >
            Corporate gifting <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-mitti-200 lg:aspect-[5/6]">
            <Image
              src="/images/lifestyle/hero.svg"
              alt="Morning at the gaushala, with gomay products drying in natural daylight"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              priority
              className="object-cover"
            />
          </div>
          {/* Signature detail: the quantity ladder, stated up front rather than hidden in a B2B page. */}
          <dl className="absolute -bottom-5 left-4 right-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-mitti-200 bg-mitti-200 shadow-card sm:left-8 sm:right-8 lg:-left-6 lg:right-auto lg:w-[300px] lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-mitti-200">
            {[
              ["Pack of 6", "Household"],
              ["500 pcs", "Temple / retail"],
              ["1 tonne+", "Distributor"],
            ].map(([qty, who]) => (
              <div key={qty} className="bg-sand-50 px-3 py-3 lg:px-5 lg:py-3.5">
                <dt className="font-mono text-[13px] font-medium text-mitti-800">{qty}</dt>
                <dd className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-mitti-400">{who}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="block-rule" aria-hidden />
    </section>
  );
}
