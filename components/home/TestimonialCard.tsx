import type { Testimonial } from "@/types";

const segmentLabels: Record<Testimonial["segment"], string> = {
  home: "Home customer",
  temple: "Temple buyer",
  retailer: "Retailer",
  corporate: "Corporate buyer",
  farm: "Nursery / farm buyer",
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-mitti-200 bg-sand-50 p-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-gerua-600">
        {segmentLabels[testimonial.segment]}
      </span>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-mitti-700">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-mitti-200 pt-4 text-[13px] text-mitti-500">
        <span className="font-medium text-mitti-700">{testimonial.author}</span> · {testimonial.role} ·{" "}
        {testimonial.location}
      </figcaption>
    </figure>
  );
}
