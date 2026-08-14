"use client";

import { axisLabel, variantsOfType, type Selection } from "@/lib/product";
import type { Product, Variant } from "@/types";
import { cn } from "@/lib/utils";

export function VariantSelector({
  product,
  selection,
  onChange,
  compact = false,
}: {
  product: Product;
  selection: Selection;
  onChange: (axis: Variant["type"], value: string) => void;
  compact?: boolean;
}) {
  const axes = Array.from(new Set(product.variants.map((v) => v.type)));

  return (
    <div className={cn("space-y-5", compact && "space-y-4")}>
      {axes.map((axisType) => {
        const options = variantsOfType(product, axisType);
        const selected = selection[axisType];
        return (
          <fieldset key={axisType}>
            <legend className="mb-2.5 flex w-full items-baseline justify-between gap-4">
              <span className="eyebrow">{axisLabel(axisType)}</span>
              <span className="text-xs text-mitti-500">
                {options.find((o) => o.value === selected)?.label}
              </span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = option.value === selected;
                const disabled = !option.available;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={disabled}
                    aria-pressed={isSelected}
                    onClick={() => onChange(axisType, option.value)}
                    className={cn(
                      "relative rounded border px-3.5 py-2 text-[13px] font-medium transition",
                      compact ? "py-1.5" : "",
                      isSelected
                        ? "border-gerua-500 bg-gerua-50 text-gerua-700"
                        : "border-mitti-200 bg-sand-50 text-mitti-700 hover:border-mitti-400",
                      disabled && "cursor-not-allowed text-mitti-300 line-through hover:border-mitti-200"
                    )}
                  >
                    {option.label}
                    {option.quoteOnly ? (
                      <span className="ml-1.5 font-mono text-[9px] uppercase tracking-wider text-forest-600">
                        quote
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {options.every((o) => !o.available) ? (
              <p className="mt-2 text-xs text-gerua-600">This option is out of stock right now.</p>
            ) : null}
          </fieldset>
        );
      })}
    </div>
  );
}
