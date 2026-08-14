import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { brandConfig } from "@/config/brand";
import { footerNav } from "@/lib/navigation";
import { Newsletter } from "@/components/forms/Newsletter";

const columns = [
  { title: "Shop", links: footerNav.shop },
  { title: "For business", links: footerNav.business },
  { title: "About", links: footerNav.about },
  { title: "Help", links: footerNav.help },
];

const socials = [
  { icon: Instagram, href: brandConfig.social.instagram, label: "Instagram" },
  { icon: Facebook, href: brandConfig.social.facebook, label: "Facebook" },
  { icon: Youtube, href: brandConfig.social.youtube, label: "YouTube" },
  { icon: Linkedin, href: brandConfig.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-mitti-800 text-sand-200">
      <div className="block-rule opacity-30" aria-hidden />
      <div className="shell grid gap-12 py-14 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <Image src={brandConfig.logo.mark} alt="" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-2xl font-extrabold tracking-tight text-sand-50">
              {brandConfig.name}
            </span>
          </div>
          <p className="deva mt-4 text-lg text-sand-200/80">{brandConfig.hindiTagline}</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-sand-200/70">
            Traditionally crafted gomay products for everyday rituals, celebrations and natural living — in
            household packs, corporate boxes and wholesale quantities.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <a href={`tel:${brandConfig.contact.supportPhone}`} className="flex items-center gap-2 hover:text-saffron-300">
              <Phone className="h-4 w-4" aria-hidden /> {brandConfig.contact.supportPhone}
            </a>
            <a href={`mailto:${brandConfig.contact.email}`} className="flex items-center gap-2 hover:text-saffron-300">
              <Mail className="h-4 w-4" aria-hidden /> {brandConfig.contact.email}
            </a>
          </div>

          <div className="mt-6 flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded border border-sand-200/20 p-2.5 text-sand-200/80 transition hover:border-saffron-300 hover:text-saffron-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-saffron-300">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-sand-200/80 hover:text-sand-50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 sm:col-span-4">
            <Newsletter tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-sand-200/15">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-sand-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brandConfig.legalName}. Made in India. GST: {brandConfig.registration.gstin}.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono uppercase tracking-[0.14em]">Payments</span>
            {["UPI", "Cards", "Netbanking", "COD"].map((method) => (
              <span key={method} className="rounded-xs border border-sand-200/20 px-2 py-1 font-mono text-[10px]">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
