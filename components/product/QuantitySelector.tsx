"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 9999,
  step = 1,
  size = "md",
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const dims = size === "sm" ? "h-9" : "h-11";

  return (
    <div className={cn("inline-flex items-stretch rounded border border-mitti-300 bg-sand-50", dims)}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="grid w-10 place-items-center rounded-l text-mitti-700 hover:bg-mitti-100 disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
        className="w-14 border-0 bg-transparent px-0 text-center font-mono text-sm focus:bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="grid w-10 place-items-center rounded-r text-mitti-700 hover:bg-mitti-100 disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
