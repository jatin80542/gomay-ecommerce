import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { brandConfig, whatsappLink } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Gomay",
  description: "Reach the retail support desk, the corporate gifting team or the wholesale trade desk.",
  path: "/contact",
});

const desks = [
  {
    title: "Retail support",
    copy: "Order help, delivery questions, product advice.",
    email: brandConfig.contact.email,
    phone: brandConfig.contact.supportPhone,
    whatsapp: whatsappLink("retail"),
  },
  {
    title: "Corporate gifting",
    copy: "Branded boxes, artwork, multi-address delivery.",
    email: brandConfig.contact.corporateEmail,
    phone: brandConfig.contact.corporatePhone,
    whatsapp: whatsappLink("corporate"),
  },
  {
    title: "Wholesale trade desk",
    copy: "Slab pricing, MOQ, packaging, repeat supply.",
    email: brandConfig.contact.wholesaleEmail,
    phone: brandConfig.contact.supportPhone,
    whatsapp: whatsappLink("bulk"),
  },
];

export default function ContactPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <h1 className="text-[30px] leading-tight sm:text-[40px]">Contact</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mitti-600">
        Three desks, because a household question and a tonne enquiry need different people. WhatsApp is usually
        the fastest of the three routes.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {desks.map((desk) => (
          <div key={desk.title} className="rounded-lg border border-mitti-200 bg-sand-50 p-6">
            <h2 className="font-display text-lg font-bold text-mitti-800">{desk.title}</h2>
            <p className="mt-1.5 text-[14px] text-mitti-600">{desk.copy}</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${desk.email}`} className="flex items-center gap-2.5 text-mitti-700 hover:text-gerua-600">
                  <Mail className="h-4 w-4 text-mitti-400" aria-hidden />
                  {desk.email}
                </a>
              </li>
              <li>
                <a href={`tel:${desk.phone}`} className="flex items-center gap-2.5 text-mitti-700 hover:text-gerua-600">
                  <Phone className="h-4 w-4 text-mitti-400" aria-hidden />
                  {desk.phone}
                </a>
              </li>
              <li>
                <a
                  href={desk.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2.5 text-forest-700 hover:text-forest-600"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <Section tone="sand" className="mt-12 rounded-xl">
        <div className="shell grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Registered details" title="Where we are" />
            <address className="not-italic text-[15px] leading-relaxed text-mitti-600">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-mitti-400" aria-hidden />
                <span>
                  {brandConfig.legalName}
                  <br />
                  {brandConfig.address.line1}
                  <br />
                  {brandConfig.address.city}, {brandConfig.address.state} {brandConfig.address.pincode}
                  <br />
                  {brandConfig.address.country}
                </span>
              </span>
            </address>
            <p className="mt-4 font-mono text-xs text-mitti-500">GST: {brandConfig.registration.gstin}</p>
            <p className="mt-1 text-xs text-mitti-400">
              Registration details are placeholders until the issued numbers are added to the brand config.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Response times" title="When to expect a reply" />
            <dl className="divide-y divide-mitti-200 border-y border-mitti-200">
              {[
                ["Retail support", "Same working day"],
                ["Corporate quote", "Within 1 working day"],
                ["Wholesale quote", "1–2 working days"],
                ["Sample despatch", "Confirmed on WhatsApp"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 py-3">
                  <dt className="text-[15px] text-mitti-600">{label}</dt>
                  <dd className="font-mono text-[13px] text-mitti-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </div>
  );
}
