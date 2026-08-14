import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { shopMegaMenu, businessNav } from "@/lib/navigation";

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="shell grid gap-8 py-8 lg:grid-cols-12">
      {shopMegaMenu.map((column) => (
        <div key={column.title} className="lg:col-span-3">
          <p className="eyebrow mb-4">{column.title}</p>
          <ul className="space-y-2.5">
            {column.links.map((link) => (
              <li key={link.label + link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="group flex items-baseline gap-2 text-[15px] text-mitti-700 hover:text-gerua-600"
                >
                  {link.label}
                  {link.hindi ? <span className="deva text-xs text-mitti-400">{link.hindi}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="lg:col-span-3">
        <p className="eyebrow mb-4">Buying for a business?</p>
        <div className="overflow-hidden rounded-lg border border-mitti-200">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/gomay/lifestyle/corporate.jpg"
              alt="Boxed gomay gifts with custom sleeves"
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              quality={90}
              className="object-cover"
            />
          </div>
          <ul className="divide-y divide-mitti-200 bg-sand-100">
            {businessNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-sand-200"
                >
                  <span>
                    <span className="block text-sm font-semibold text-mitti-800">{link.label}</span>
                    <span className="block text-xs text-mitti-500">{link.description}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-gerua-500" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
