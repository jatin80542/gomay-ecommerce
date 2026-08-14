"use client";

import { ChevronDown } from "lucide-react";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function ProductSort({ value, onChange }: { value: SortValue; onChange: (value: SortValue) => void }) {
  return (
    <div className="relative">
      <label htmlFor="sort" className="sr-only">
        Sort products
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="h-10 w-full min-w-[180px] rounded border border-mitti-200 bg-sand-50 py-0 pl-3.5 pr-9 text-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mitti-400" aria-hidden />
    </div>
  );
}
