import { MapPin, Package, Sprout } from "lucide-react";

const notices = [
  { icon: MapPin, text: "Proudly made in India" },
  { icon: Sprout, text: "Natural & traditionally crafted" },
  { icon: Package, text: "Bulk & corporate orders available" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-mitti-800 text-sand-100">
      <div className="shell flex h-9 items-center justify-center gap-8 overflow-hidden">
        {notices.map(({ icon: Icon, text }, index) => (
          <p
            key={text}
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
              index === 0 ? "" : "hidden sm:flex"
            }`}
          >
            <Icon className="h-3.5 w-3.5 text-saffron-300" aria-hidden />
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
