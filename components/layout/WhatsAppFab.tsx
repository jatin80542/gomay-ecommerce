"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink, type WhatsAppContext } from "@/config/brand";

/** The opener changes with the journey the visitor is already in. */
function contextFor(pathname: string): { context: WhatsAppContext; label: string } {
  if (pathname.startsWith("/corporate-gifting")) return { context: "corporate", label: "Talk to corporate sales" };
  if (pathname.startsWith("/bulk")) return { context: "bulk", label: "Ask for bulk pricing" };
  return { context: "retail", label: "Chat with us" };
}

export function WhatsAppFab() {
  const pathname = usePathname();
  const { context, label } = contextFor(pathname);

  return (
    <a
      href={whatsappLink(context)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="group fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full border border-forest-700/30 bg-forest-600 px-4 py-3 text-sand-50 shadow-lift transition hover:bg-forest-700 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden text-sm font-semibold sm:inline">{label}</span>
    </a>
  );
}
