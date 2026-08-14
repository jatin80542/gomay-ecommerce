import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, count, className }: { rating: number; count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.round(rating) ? "fill-saffron-500 text-saffron-500" : "text-mitti-300"
            )}
          />
        ))}
      </span>
      <span className="font-mono text-xs text-mitti-500">
        {rating.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </span>
      <span className="sr-only">
        Rated {rating} out of 5{count !== undefined ? ` from ${count} placeholder reviews` : ""}
      </span>
    </span>
  );
}
