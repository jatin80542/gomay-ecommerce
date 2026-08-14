import { cn } from "@/lib/utils";
import type { BadgeKind } from "@/types";

const labels: Record<BadgeKind, string> = {
  bestseller: "Bestseller",
  "made-in-india": "Made in India",
  handcrafted: "Handcrafted",
  "bulk-available": "Bulk available",
  "corporate-favourite": "Corporate favourite",
  "festival-special": "Festival special",
  new: "New",
};

const tones: Record<BadgeKind, string> = {
  bestseller: "bg-gerua-500 text-sand-50 border-gerua-500",
  "made-in-india": "bg-sand-50 text-mitti-700 border-mitti-300",
  handcrafted: "bg-sand-50 text-mitti-700 border-mitti-300",
  "bulk-available": "bg-forest-600 text-sand-50 border-forest-600",
  "corporate-favourite": "bg-mitti-800 text-sand-100 border-mitti-800",
  "festival-special": "bg-saffron-500 text-mitti-900 border-saffron-500",
  new: "bg-forest-100 text-forest-700 border-forest-200",
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        tones[kind],
        className
      )}
    >
      {labels[kind]}
    </span>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-mitti-200 bg-sand-50 px-3 py-1 text-xs text-mitti-600",
        className
      )}
    >
      {children}
    </span>
  );
}
