"use client";

import { X } from "lucide-react";
import { categories, purposes } from "@/data/catalog";
import { cn, formatINR } from "@/lib/utils";

export interface FilterState {
  categories: string[];
  purposes: string[];
  packs: string[];
  weights: string[];
  maxPrice: number;
  inStockOnly: boolean;
  festiveOnly: boolean;
  bulkOnly: boolean;
}

export const emptyFilters: FilterState = {
  categories: [],
  purposes: [],
  packs: [],
  weights: [],
  maxPrice: 0,
  inStockOnly: false,
  festiveOnly: false,
  bulkOnly: false,
};

export const activeFilterCount = (filters: FilterState, priceCeiling: number): number =>
  filters.categories.length +
  filters.purposes.length +
  filters.packs.length +
  filters.weights.length +
  (filters.maxPrice && filters.maxPrice < priceCeiling ? 1 : 0) +
  (filters.inStockOnly ? 1 : 0) +
  (filters.festiveOnly ? 1 : 0) +
  (filters.bulkOnly ? 1 : 0);

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-mitti-200 py-5 first:pt-0 last:border-0">
      <p className="eyebrow mb-3">{title}</p>
      {children}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 py-1.5 text-[14px] font-normal text-mitti-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-mitti-300 p-0 accent-gerua-500"
      />
      <span>
        {label}
        {hint ? <span className="ml-1.5 text-xs text-mitti-400">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ProductFilters({
  filters,
  setFilters,
  packOptions,
  weightOptions,
  priceCeiling,
  onClear,
  className,
}: {
  filters: FilterState;
  setFilters: (next: FilterState) => void;
  packOptions: string[];
  weightOptions: string[];
  priceCeiling: number;
  onClear: () => void;
  className?: string;
}) {
  const toggle = (key: "categories" | "purposes" | "packs" | "weights", value: string) => {
    const list = filters[key];
    setFilters({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  const count = activeFilterCount(filters, priceCeiling);

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between pb-4">
        <p className="font-display text-sm font-semibold text-mitti-800">
          Filters {count > 0 ? <span className="font-mono text-xs text-gerua-600">({count})</span> : null}
        </p>
        {count > 0 ? (
          <button type="button" onClick={onClear} className="flex items-center gap-1 text-xs text-mitti-500 hover:text-gerua-600">
            <X className="h-3.5 w-3.5" aria-hidden /> Clear all
          </button>
        ) : null}
      </div>

      <Group title="Category">
        {categories.map((category) => (
          <Check
            key={category.slug}
            label={category.name}
            checked={filters.categories.includes(category.slug)}
            onChange={() => toggle("categories", category.slug)}
          />
        ))}
      </Group>

      <Group title="Use">
        {purposes.map((purpose) => (
          <Check
            key={purpose.slug}
            label={purpose.name}
            checked={filters.purposes.includes(purpose.slug)}
            onChange={() => toggle("purposes", purpose.slug)}
          />
        ))}
      </Group>

      {packOptions.length > 0 ? (
        <Group title="Pack size">
          <div className="flex flex-wrap gap-2">
            {packOptions.map((pack) => (
              <button
                key={pack}
                type="button"
                onClick={() => toggle("packs", pack)}
                aria-pressed={filters.packs.includes(pack)}
                className={cn(
                  "rounded border px-2.5 py-1 font-mono text-[11px]",
                  filters.packs.includes(pack)
                    ? "border-gerua-500 bg-gerua-50 text-gerua-700"
                    : "border-mitti-200 text-mitti-600 hover:border-mitti-400"
                )}
              >
                {pack}
              </button>
            ))}
          </div>
        </Group>
      ) : null}

      {weightOptions.length > 0 ? (
        <Group title="Weight">
          <div className="flex flex-wrap gap-2">
            {weightOptions.map((weight) => (
              <button
                key={weight}
                type="button"
                onClick={() => toggle("weights", weight)}
                aria-pressed={filters.weights.includes(weight)}
                className={cn(
                  "rounded border px-2.5 py-1 font-mono text-[11px]",
                  filters.weights.includes(weight)
                    ? "border-gerua-500 bg-gerua-50 text-gerua-700"
                    : "border-mitti-200 text-mitti-600 hover:border-mitti-400"
                )}
              >
                {weight}
              </button>
            ))}
          </div>
        </Group>
      ) : null}

      <Group title="Price">
        <label htmlFor="max-price" className="sr-only">
          Maximum price
        </label>
        <input
          id="max-price"
          type="range"
          min={0}
          max={priceCeiling}
          step={50}
          value={filters.maxPrice || priceCeiling}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="h-1.5 w-full appearance-none rounded-full border-0 bg-mitti-200 p-0 accent-gerua-500"
        />
        <p className="mt-2 font-mono text-xs text-mitti-500">
          Up to {formatINR(filters.maxPrice || priceCeiling)}
        </p>
      </Group>

      <Group title="Availability">
        <Check
          label="In stock only"
          checked={filters.inStockOnly}
          onChange={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
        <Check
          label="Festive products"
          checked={filters.festiveOnly}
          onChange={() => setFilters({ ...filters, festiveOnly: !filters.festiveOnly })}
        />
        <Check
          label="Bulk available"
          checked={filters.bulkOnly}
          onChange={() => setFilters({ ...filters, bulkOnly: !filters.bulkOnly })}
        />
      </Group>
    </div>
  );
}
