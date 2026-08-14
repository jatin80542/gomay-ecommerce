import type { Category, Collection, CategorySlug, PurposeSlug } from "@/types";

export const categories: Category[] = [
  {
    slug: "cow-dung-cakes",
    name: "Cow Dung Cakes",
    hindiName: "गोमय उपला",
    description:
      "Sun-dried gomay cakes for pooja, havan and ceremonial fires. Sold in household packs and in cartons for temples and event suppliers.",
    image: "/images/categories/cow-dung-cakes.svg",
    purposeBlurb: "Pooja • Havan • Holika Dahan",
  },
  {
    slug: "diyas",
    name: "Cow Dung Diyas",
    hindiName: "गोमय दीया",
    description:
      "Hand-shaped diyas in plain and decorated finishes, packed for daily lamps, festival evenings and gifting.",
    image: "/images/categories/diyas.svg",
    purposeBlurb: "Diwali • Daily rituals • Gifting",
  },
  {
    slug: "havan-cups",
    name: "Havan & Sambrani Cups",
    hindiName: "हवन कप",
    description:
      "Cup-shaped gomay bases, empty or filled with traditional resins, for quick havan and evening dhuni.",
    image: "/images/categories/havan-cups.svg",
    purposeBlurb: "Havan • Dhuni • Temples",
  },
  {
    slug: "dhoop",
    name: "Dhoop",
    hindiName: "धूप",
    description: "Gomay-based dhoop sticks, batti and cones in natural and traditional fragrances.",
    image: "/images/categories/dhoop.svg",
    purposeBlurb: "Daily rituals • Aarti",
  },
  {
    slug: "havan-sticks",
    name: "Havan Lakdi & Logs",
    hindiName: "हवन लकड़ी",
    description:
      "Larger ceremonial fuel — gomay sticks and logs sold by piece, by kilo and by the tonne for institutional havans.",
    image: "/images/categories/havan-sticks.svg",
    purposeBlurb: "Havan kund • Yagya • Institutions",
  },
  {
    slug: "manure",
    name: "Manure & Powder",
    hindiName: "गोबर खाद",
    description:
      "Dried cow dung powder and cured manure for balcony pots, nurseries and field application.",
    image: "/images/categories/manure.svg",
    purposeBlurb: "Gardening • Nursery • Farming",
  },
  {
    slug: "festive",
    name: "Festive & Decor",
    hindiName: "त्योहार",
    description: "Seasonal gomay pieces — decorated diyas, idols and wall decor for festivals and housewarmings.",
    image: "/images/categories/festive.svg",
    purposeBlurb: "Diwali • Navratri • Griha Pravesh",
  },
  {
    slug: "combo-boxes",
    name: "Combo & Gift Boxes",
    hindiName: "पूजा बॉक्स",
    description: "Ready-assembled boxes for daily pooja, full havan, festivals, temples and corporate gifting.",
    image: "/images/categories/combo-boxes.svg",
    purposeBlurb: "Gifting • Temples • Festivals",
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const collections: Collection[] = [
  {
    slug: "pooja-havan",
    name: "Pooja & Havan",
    hindiName: "पूजा एवं हवन",
    description: "Everything the ritual needs — cakes, cups, dhoop and lakdi, in household and temple quantities.",
    image: "/images/lifestyle/craft-hands.svg",
    categories: ["cow-dung-cakes", "havan-cups", "dhoop", "havan-sticks"],
  },
  {
    slug: "gardening",
    name: "Gardening & Farming",
    hindiName: "बागवानी",
    description: "Cow dung powder and cured manure, from a 1 KG balcony pack to field quantities.",
    image: "/images/lifestyle/drying-yard.svg",
    categories: ["manure"],
  },
  {
    slug: "diwali",
    name: "Diwali Collection",
    hindiName: "दीपावली",
    description: "Diyas, festive boxes and decor prepared for the Diwali season.",
    image: "/images/lifestyle/story.svg",
    categories: ["diyas", "festive", "combo-boxes"],
  },
  {
    slug: "festive",
    name: "Festive",
    description: "Seasonal products across Diwali, Navratri, Holi, weddings and housewarmings.",
    image: "/images/categories/festive.svg",
    categories: ["diyas", "festive", "combo-boxes"],
  },
  {
    slug: "corporate-gifting",
    name: "Corporate Gifting",
    description: "Boxes built to be customised — company logo, sleeve, message card and product mix.",
    image: "/images/lifestyle/corporate-gifting.svg",
    categories: ["combo-boxes", "diyas", "festive"],
  },
  {
    slug: "bestsellers",
    name: "Best Sellers",
    description: "The packs households and temples reorder most often.",
    image: "/images/lifestyle/packaging.svg",
    categories: ["cow-dung-cakes", "diyas", "havan-cups"],
  },
];

export const collectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);

export const purposes: { slug: PurposeSlug; name: string; hindi: string; blurb: string; categories: CategorySlug[] }[] = [
  { slug: "pooja", name: "Pooja", hindi: "पूजा", blurb: "Daily and occasion worship", categories: ["cow-dung-cakes", "dhoop", "diyas"] },
  { slug: "havan", name: "Havan", hindi: "हवन", blurb: "Kund, samagri and fuel", categories: ["havan-cups", "havan-sticks", "cow-dung-cakes"] },
  { slug: "diwali", name: "Diwali", hindi: "दीपावली", blurb: "Diyas, boxes, decor", categories: ["diyas", "festive", "combo-boxes"] },
  { slug: "griha-pravesh", name: "Griha Pravesh", hindi: "गृह प्रवेश", blurb: "Housewarming sets", categories: ["combo-boxes", "diyas"] },
  { slug: "daily-rituals", name: "Daily Rituals", hindi: "नित्य पूजा", blurb: "Small packs, quick reorder", categories: ["dhoop", "diyas", "cow-dung-cakes"] },
  { slug: "gardening", name: "Gardening", hindi: "बागवानी", blurb: "Pots, terrace, balcony", categories: ["manure"] },
  { slug: "farming", name: "Farming", hindi: "खेती", blurb: "Field and nursery volumes", categories: ["manure"] },
  { slug: "corporate-gifting", name: "Corporate Gifting", hindi: "कॉर्पोरेट", blurb: "Branded, boxed, delivered", categories: ["combo-boxes", "festive"] },
  { slug: "bulk-supply", name: "Bulk Supply", hindi: "थोक", blurb: "Cartons, pallets, repeat supply", categories: ["cow-dung-cakes", "manure", "havan-sticks"] },
];
