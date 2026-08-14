import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-mitti-500">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-mitti-700">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-gerua-600">
                  {item.name}
                </Link>
              )}
              {last ? null : <ChevronRight className="h-3.5 w-3.5 text-mitti-300" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
