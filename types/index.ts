/**
 * Domain model for the Gomay storefront.
 * These interfaces are the contract the Phase 2 backend must satisfy:
 * every field a future admin dashboard needs to control lives here.
 */

export type Currency = "INR";

export type CategorySlug =
  | "cow-dung-cakes"
  | "diyas"
  | "havan-cups"
  | "dhoop"
  | "havan-sticks"
  | "manure"
  | "festive"
  | "combo-boxes";

export type CollectionSlug =
  | "pooja-havan"
  | "gardening"
  | "diwali"
  | "festive"
  | "corporate-gifting"
  | "bestsellers";

export type VariantType = "pack" | "weight" | "size" | "fragrance" | "design" | "quantity";

export type PurposeSlug =
  | "pooja"
  | "havan"
  | "diwali"
  | "griha-pravesh"
  | "daily-rituals"
  | "gardening"
  | "farming"
  | "corporate-gifting"
  | "bulk-supply";

export type BadgeKind =
  | "bestseller"
  | "made-in-india"
  | "handcrafted"
  | "bulk-available"
  | "corporate-favourite"
  | "festival-special"
  | "new";

export interface ProductImage {
  src: string;
  alt: string;
  kind: "product" | "lifestyle" | "packaging";
}

export interface Variant {
  id: string;
  type: VariantType;
  /** Human label shown in the selector, e.g. "Pack of 12" */
  label: string;
  /** Machine value used for URLs and future API calls, e.g. "pack-12" */
  value: string;
  sku: string;
  /**
   * Absolute price for the primary axis (the first variant type on the product).
   * For secondary axes (fragrance, design, size) use `priceDelta` instead.
   */
  price: number;
  /** Added to the selected primary-axis price. Secondary axes only. */
  priceDelta?: number;
  compareAtPrice?: number;
  available: boolean;
  /** Minimum order quantity for this variant, in units of the variant itself */
  moq?: number;
  /** Very large variants are quote-only: no cart, no price shown */
  quoteOnly?: boolean;
}

export interface Specification {
  label: string;
  value: string;
}

export interface BulkPriceTier {
  minQuantity: number;
  maxQuantity: number | null;
  /** null unitPrice = "Request quote" tier */
  unitPrice: number | null;
  label: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  subcategory: string;
  collections: CollectionSlug[];
  purposes: PurposeSlug[];
  images: ProductImage[];
  /** Starting price = price of the first available variant */
  price: number;
  compareAtPrice?: number;
  currency: Currency;
  variants: Variant[];
  bulkTiers?: BulkPriceTier[];
  specifications: Specification[];
  features: string[];
  uses: string[];
  whatsInside?: string[];
  howToUse?: string[];
  storage?: string;
  faqs?: ProductFaq[];
  tags: string[];
  badges: BadgeKind[];
  retailAvailable: boolean;
  corporateAvailable: boolean;
  bulkAvailable: boolean;
  /** Corporate MOQ in boxes; bulk MOQ in units/kg depending on category */
  moq?: number;
  /** Unit the MOQ is counted in — "pcs", "KG", "packs". Shown on wholesale cards. */
  moqUnit?: string;
  corporateFromPrice?: number;
  corporateMoqBoxes?: number;
  bulkFormats?: string[];
  bulkPackaging?: string[];
  bulkPriceRange?: string;
  stock: number;
  bestseller: boolean;
  isNew: boolean;
  festive: boolean;
  festivals?: string[];
  rating: number;
  reviewCount: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  hindiName: string;
  description: string;
  image: string;
  purposeBlurb: string;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  hindiName?: string;
  description: string;
  image: string;
  categories: CategorySlug[];
}

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  variantId: string;
  variantLabel: string;
  unitPrice: number;
  compareAtPrice?: number;
  quantity: number;
  moq: number;
}

export type BuyerType =
  | "distributor"
  | "retailer"
  | "temple"
  | "institution"
  | "event-organiser"
  | "farm-nursery"
  | "exporter"
  | "other";

export interface CorporateLead {
  name: string;
  company: string;
  workEmail: string;
  phone: string;
  quantityBand: string;
  budgetPerGift: string;
  deliveryDate: string;
  city: string;
  giftingType: string;
  brandingRequired: "yes" | "no" | "not-sure";
  message: string;
}

export interface BulkLead {
  name: string;
  company: string;
  email: string;
  phone: string;
  buyerType: BuyerType;
  products: string[];
  quantity: string;
  monthlyRequirement: string;
  city: string;
  state: string;
  country: string;
  packaging: string;
  message: string;
}

export interface SampleLead {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  businessType: string;
  expectedQuantity: string;
  pincode: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  segment: "home" | "temple" | "retailer" | "corporate" | "farm";
}
