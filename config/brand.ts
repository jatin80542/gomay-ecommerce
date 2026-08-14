/**
 * Single source of truth for brand identity.
 * Change values here and the whole site follows — nothing is hard-coded in components.
 */
export const brandConfig = {
  name: "Gomay",
  legalName: "Gomay Naturals",
  descriptor: "Pure Indian Cow Dung Products",
  tagline: "Pure Gomay. Rooted in Bharat.",
  hindiTagline: "मिट्टी से जुड़ा। परंपरा से बना।",
  hindiAccent: "परंपरा भी। प्रकृति भी।",
  logo: { mark: "/images/patterns/gomay-mark.svg", alt: "Gomay" },

  contact: {
    supportPhone: "+91 00000 00000",
    corporatePhone: "+91 00000 00000",
    email: "hello@example.com",
    corporateEmail: "corporate@example.com",
    wholesaleEmail: "wholesale@example.com",
    /** digits only, country code first — used to build wa.me links */
    whatsappNumber: "910000000000",
  },

  address: {
    line1: "Unit address to be confirmed",
    line2: "",
    city: "City",
    state: "State",
    pincode: "000000",
    country: "India",
  },

  /** Placeholders — replace with issued registrations before going live. */
  registration: {
    gstin: "GSTIN to be added",
    fssai: "",
    cin: "",
  },

  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/",
  },

  /** Prefilled WhatsApp openers by journey. */
  whatsappContexts: {
    retail: "Hi, I need help with an order.",
    bulk: "Hi, I would like bulk pricing.",
    corporate: "Hi, I want to discuss corporate gifting.",
    sample: "Hi, I would like to request a product sample.",
  },

  shipping: {
    freeShippingThreshold: 999,
    flatRate: 79,
    dispatchCopy: "Dispatched in 2–4 working days",
  },

  siteUrl: "https://gomay.vercel.app",
} as const;

export type WhatsAppContext = keyof typeof brandConfig.whatsappContexts;

export function whatsappLink(context: WhatsAppContext, extra?: string): string {
  const base = brandConfig.whatsappContexts[context];
  const text = extra ? `${base} ${extra}` : base;
  return `https://wa.me/${brandConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
