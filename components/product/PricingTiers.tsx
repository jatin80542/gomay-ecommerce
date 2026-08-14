import type { BulkPriceTier } from "@/types";
import { formatINR, formatQty, cn } from "@/lib/utils";

/**
 * The quantity ladder. Deliberately set in mono — as quantities climb the
 * interface gets more commercial and less decorative.
 */
export function PricingTiers({
  tiers,
  unit = "unit",
  activeQuantity,
  className,
}: {
  tiers: BulkPriceTier[];
  unit?: string;
  activeQuantity?: number;
  className?: string;
}) {
  return (
    <table className={cn("w-full border-collapse text-left", className)}>
      <caption className="sr-only">Quantity based pricing</caption>
      <thead>
        <tr className="border-b border-mitti-200">
          <th scope="col" className="py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mitti-500">
            Quantity
          </th>
          <th scope="col" className="py-2 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-mitti-500">
            Per {unit}
          </th>
        </tr>
      </thead>
      <tbody>
        {tiers.map((tier) => {
          const active =
            activeQuantity !== undefined &&
            activeQuantity >= tier.minQuantity &&
            (tier.maxQuantity === null || activeQuantity <= tier.maxQuantity);
          return (
            <tr
              key={tier.label}
              className={cn(
                "border-b border-mitti-200/60 last:border-0",
                active && "bg-gerua-50"
              )}
            >
              <td className="py-2.5 font-mono text-[13px] text-mitti-700">
                {tier.label}
                {active ? <span className="ml-2 text-[10px] uppercase text-gerua-600">your slab</span> : null}
              </td>
              <td className="py-2.5 text-right font-mono text-[13px]">
                {tier.unitPrice === null ? (
                  <span className="text-forest-600">Request quote</span>
                ) : (
                  <span className="text-mitti-800">{formatINR(tier.unitPrice)}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function MoqLine({ moq, unit = "units" }: { moq: number; unit?: string }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mitti-500">
      MOQ {formatQty(moq)} {unit}
    </p>
  );
}
