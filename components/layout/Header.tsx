"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { mainNav } from "@/lib/navigation";
import { brandConfig } from "@/config/brand";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { itemCount, wishlist, setCartOpen, setSearchOpen, hydrated } = useStore();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={cn(
          "border-b bg-sand-50/95 backdrop-blur transition-shadow",
          scrolled ? "border-mitti-200 shadow-[0_6px_20px_-18px_rgba(48,31,20,0.7)]" : "border-transparent"
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="shell flex h-16 items-center gap-3 sm:h-[72px]">
          <button
            type="button"
            className="-ml-2 rounded p-2 text-mitti-700 lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="flex items-center gap-2.5" aria-label={`${brandConfig.name} home`}>
            <Image src={brandConfig.logo.mark} alt="" width={34} height={34} className="h-8 w-8" priority />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[21px] font-extrabold tracking-tight text-mitti-800">
                {brandConfig.name}
              </span>
              <span className="mt-0.5 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-mitti-400 sm:block">
                {brandConfig.descriptor}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
            {mainNav.map((link) =>
              link.label === "Shop" ? (
                <button
                  key={link.href}
                  type="button"
                  className={cn(
                    "flex items-center gap-1 rounded px-3 py-2 text-[14px] font-medium text-mitti-700 hover:text-gerua-600",
                    megaOpen && "text-gerua-600"
                  )}
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                  onMouseEnter={() => setMegaOpen(true)}
                >
                  Shop
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaOpen && "rotate-180")} aria-hidden />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={cn(
                    "rounded px-3 py-2 text-[14px] font-medium text-mitti-700 hover:text-gerua-600",
                    pathname === link.href && "text-gerua-600"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="rounded p-2.5 text-mitti-700 hover:bg-mitti-100"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden rounded p-2.5 text-mitti-700 hover:bg-mitti-100 sm:block"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${hydrated ? wishlist.length : 0} items`}
              className="relative rounded p-2.5 text-mitti-700 hover:bg-mitti-100"
            >
              <Heart className="h-5 w-5" />
              {hydrated && wishlist.length > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-forest-600 font-mono text-[9px] text-sand-50">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart, ${hydrated ? itemCount : 0} items`}
              className="relative rounded p-2.5 text-mitti-700 hover:bg-mitti-100"
            >
              <ShoppingBag className="h-5 w-5" />
              {hydrated && itemCount > 0 ? (
                <span className="absolute right-0.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gerua-500 px-1 font-mono text-[9px] text-sand-50">
                  {itemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {megaOpen ? (
          <div className="hidden border-t border-mitti-200 bg-sand-50 shadow-lift lg:block">
            <MegaMenu onNavigate={() => setMegaOpen(false)} />
          </div>
        ) : null}
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
