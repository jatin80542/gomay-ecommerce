import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { homeFaqs } from "@/data/faqs";

export function FaqAccordion() {
  return (
    <Section tone="default">
      <div className="shell grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          eyebrow="Questions"
          title="Before you order"
          copy="If something isn't answered here, WhatsApp is usually faster than email."
        />
        <div>
          <Accordion items={homeFaqs} defaultOpen={0} />
          <p className="mt-6 text-sm text-mitti-600">
            More detail on shipping, returns and bulk terms sits on the{" "}
            <Link href="/faq" className="font-semibold text-gerua-600 underline underline-offset-4">
              full FAQ page
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
