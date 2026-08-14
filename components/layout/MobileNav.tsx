"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { mainNav, shopMegaMenu, businessNav } from "@/lib/navigation";
import { brandConfig, whatsappLink } from "@/config/brand";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("By product");

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-mitti-900/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            aria-label="Main"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-sand-50 shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-mitti-200 px-5 py-4">
              <span className="font-display text-lg font-bold tracking-tight">{brandConfig.name}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded p-2 text-mitti-600 hover:bg-mitti-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-1">
                {mainNav
                  .filter((link) => link.label !== "Shop")
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block rounded px-2 py-3 font-display text-[17px] font-semibold text-mitti-800 hover:bg-mitti-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>

              <div className="mt-4 border-t border-mitti-200 pt-4">
                {shopMegaMenu.map((column) => {
                  const isOpen = expanded === column.title;
                  return (
                    <div key={column.title} className="border-b border-mitti-200/70 last:border-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : column.title)}
                        className="flex w-full items-center justify-between px-2 py-3.5 text-left"
                      >
                        <span className="eyebrow">{column.title}</span>
                        <ChevronDown
                          className={cn("h-4 w-4 text-mitti-400 transition-transform", isOpen && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                      {isOpen ? (
                        <ul className="space-y-1 pb-3">
                          {column.links.map((link) => (
                            <li key={link.label + link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="block rounded px-2 py-2.5 text-[15px] text-mitti-700 hover:bg-mitti-100"
                              >
                                {link.label}
                                {link.hindi ? <span className="deva ml-2 text-xs text-mitti-400">{link.hindi}</span> : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2">
                {businessNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-lg border border-mitti-200 bg-sand-100 px-4 py-3"
                  >
                    <span className="block text-sm font-semibold text-mitti-800">{link.label}</span>
                    <span className="block text-xs text-mitti-500">{link.description}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-mitti-200 p-5">
              <ButtonLink href={whatsappLink("retail")} variant="dark" className="w-full" size="md">
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
