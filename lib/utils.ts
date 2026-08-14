import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (value: number): string => inr.format(value);

export const formatQty = (value: number): string => value.toLocaleString("en-IN");

export const discountPercent = (price: number, compareAt?: number): number | null => {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
};

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const titleCase = (value: string): string =>
  value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Naive fuzzy score: rewards prefix and substring hits. Good enough for a mock catalogue. */
export function fuzzyScore(haystack: string, needle: string): number {
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase().trim();
  if (!n) return 0;
  if (h === n) return 100;
  if (h.startsWith(n)) return 80;
  if (h.includes(n)) return 60;
  const words = n.split(/\s+/).filter(Boolean);
  const hits = words.filter((w) => h.includes(w)).length;
  if (hits) return 30 + (hits / words.length) * 20;
  // character-order match, e.g. "gmy dya"
  let i = 0;
  for (const ch of h) if (ch === n[i]) i++;
  return i === n.length ? 15 : 0;
}
