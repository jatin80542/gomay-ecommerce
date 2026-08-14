export interface NavLink {
  label: string;
  href: string;
  hindi?: string;
  description?: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Pooja & Havan", href: "/collections/pooja-havan" },
  { label: "Gardening", href: "/collections/gardening" },
  { label: "Festive", href: "/collections/diwali" },
  { label: "Corporate Gifting", href: "/corporate-gifting" },
  { label: "Bulk / Wholesale", href: "/bulk" },
  { label: "Our Story", href: "/about" },
];

export const shopMegaMenu: MegaMenuColumn[] = [
  {
    title: "By product",
    links: [
      { label: "Cow Dung Cakes", href: "/collections/pooja-havan", hindi: "गोमय उपला" },
      { label: "Diyas", href: "/collections/diwali", hindi: "दीया" },
      { label: "Havan & Sambrani Cups", href: "/collections/pooja-havan", hindi: "हवन कप" },
      { label: "Dhoop", href: "/collections/pooja-havan", hindi: "धूप" },
      { label: "Havan Lakdi & Logs", href: "/collections/pooja-havan", hindi: "हवन लकड़ी" },
      { label: "Manure & Powder", href: "/collections/gardening", hindi: "गोबर खाद" },
    ],
  },
  {
    title: "By purpose",
    links: [
      { label: "Daily rituals", href: "/shop?purpose=daily-rituals" },
      { label: "Havan & yagya", href: "/shop?purpose=havan" },
      { label: "Diwali", href: "/shop?purpose=diwali" },
      { label: "Griha Pravesh", href: "/shop?purpose=griha-pravesh" },
      { label: "Gardening", href: "/shop?purpose=gardening" },
      { label: "Farming", href: "/shop?purpose=farming" },
    ],
  },
  {
    title: "Boxes & sets",
    links: [
      { label: "Daily Puja Box", href: "/products/daily-puja-box" },
      { label: "Complete Havan Box", href: "/products/complete-havan-box" },
      { label: "Gomay Essentials Box", href: "/products/gomay-essentials-box" },
      { label: "Festive Diwali Box", href: "/products/festive-diwali-box" },
      { label: "गृह प्रवेश Box", href: "/products/griha-pravesh-box" },
      { label: "Temple Supply Pack", href: "/products/temple-supply-pack" },
    ],
  },
];

export const businessNav: NavLink[] = [
  { label: "Corporate gifting", href: "/corporate-gifting", description: "Branded boxes, 50+ quantities" },
  { label: "Bulk & wholesale", href: "/bulk", description: "Cartons, pallets, repeat supply" },
  { label: "Request a sample", href: "/bulk#sample", description: "Before you commit to volume" },
];

export const footerNav = {
  shop: [
    { label: "Cow Dung Cakes", href: "/collections/pooja-havan" },
    { label: "Diyas", href: "/collections/diwali" },
    { label: "Havan Products", href: "/collections/pooja-havan" },
    { label: "Dhoop", href: "/shop?category=dhoop" },
    { label: "Gardening", href: "/collections/gardening" },
    { label: "Gift Boxes", href: "/shop?category=combo-boxes" },
  ],
  business: [
    { label: "Corporate Gifting", href: "/corporate-gifting" },
    { label: "Wholesale", href: "/bulk" },
    { label: "Distributor Enquiry", href: "/bulk#enquiry" },
    { label: "Request Sample", href: "/bulk#sample" },
    { label: "Custom Packaging", href: "/bulk#packaging" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Sourcing", href: "/about#sourcing" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ],
  help: [
    { label: "Shipping", href: "/faq#shipping" },
    { label: "Returns", href: "/faq#returns" },
    { label: "Privacy", href: "/faq#privacy" },
    { label: "Terms", href: "/faq#terms" },
    { label: "Track Order", href: "/faq#track" },
  ],
} as const;
