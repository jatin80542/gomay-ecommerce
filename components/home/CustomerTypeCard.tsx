import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const lanes = [
  {
    title: "For your home",
    hindi: "आपके घर के लिए",
    copy: "Household packs of upla, diyas, dhoop and pooja boxes. Order in minutes, delivered to your door.",
    cta: "Shop retail",
    href: "/shop",
    image: "/images/lifestyle/packaging.svg",
    scale: "₹100 – ₹1,000",
  },
  {
    title: "For your business",
    hindi: "आपके व्यवसाय के लिए",
    copy: "Branded gift boxes for employees, clients and events — your logo, your combination, delivered anywhere.",
    cta: "Corporate solutions",
    href: "/corporate-gifting",
    image: "/images/lifestyle/corporate-gifting.svg",
    scale: "50+ boxes",
  },
  {
    title: "For bulk buyers",
    hindi: "थोक खरीदारों के लिए",
    copy: "Cartons, pallets and tonnes for distributors, retailers, temples, nurseries and event suppliers.",
    cta: "Request bulk pricing",
    href: "/bulk",
    image: "/images/lifestyle/bulk-warehouse.svg",
    scale: "500 pcs – 10 tonne",
  },
];

export function CustomerTypeCards() {
  return (
    <Section tone="default">
      <div className="shell">
        <div className="mb-8 max-w-2xl sm:mb-11">
          <p className="eyebrow mb-3">Three ways to buy</p>
          <h2 className="text-[26px] leading-[1.15] sm:text-[34px] lg:text-[38px]">
            Same products. Three very different orders.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-mitti-600">
            A household buying a pack of twelve and a distributor buying a tonne need different things from a
            website. Pick your lane and the site changes with you.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {lanes.map((lane, index) => (
            <Reveal key={lane.title} delay={index * 90}>
              <Link
                href={lane.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-mitti-200 bg-sand-50 transition hover:border-mitti-400 hover:shadow-lift"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-sand-100">
                  <Image
                    src={lane.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-xs bg-sand-50/95 px-2.5 py-1 font-mono text-[11px] text-mitti-700 backdrop-blur">
                    {lane.scale}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-mitti-800">{lane.title}</h3>
                  <p className="deva mt-1 text-sm text-mitti-500">{lane.hindi}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-mitti-600">{lane.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-gerua-600">
                    {lane.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
