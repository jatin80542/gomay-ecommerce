import { Boxes, Handshake, PackageCheck, Sprout } from "lucide-react";

const items = [
  { icon: Sprout, title: "Natural materials", copy: "Built around cow dung and the ingredients named on each pack." },
  { icon: Boxes, title: "Retail to bulk", copy: "A pack of six, or a pallet. Same catalogue, different lane." },
  { icon: Handshake, title: "Custom packaging", copy: "Retail-ready, private label and branded corporate boxes." },
  { icon: PackageCheck, title: "Careful packing", copy: "Ventilated cartons and straw separators so pieces arrive intact." },
];

export function TrustStrip() {
  return (
    <div className="border-y border-mitti-200 bg-sand-100">
      <div className="shell grid gap-x-8 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gerua-500" aria-hidden />
            <div>
              <p className="font-display text-sm font-semibold text-mitti-800">{title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-mitti-600">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
