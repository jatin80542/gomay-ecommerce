# Gomay — Premium Cow Dung Ecommerce Frontend

Phase 1 frontend for **Gomay**, a swadeshi cow dung products brand serving three
customer segments from one catalogue: **retail households**, **corporate gifting
buyers**, and **bulk / wholesale trade buyers**.

This is a **frontend-only build**. There is no backend, no database, no payment
gateway and no authentication. Every screen, state and interaction works against
mock data, and the architecture is shaped so Phase 2 can plug real services in
without rewriting components. See [Phase 2 integration map](#phase-2-integration-map).

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Development server with hot reload             |
| `npm run build`     | Production build (63 static pages)             |
| `npm run start`     | Serve the production build                     |
| `npm run typecheck` | TypeScript strict check, no emit               |
| `npm run lint`      | ESLint (flat config, Next core-web-vitals)     |

Requires **Node 18.18+** (built and verified on Node 22).

---

## Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 15.5 (App Router, React 19)            |
| Language   | TypeScript, `strict: true`                     |
| Styling    | Tailwind CSS 3.4 with a custom design token set |
| Icons      | lucide-react                                   |
| Motion     | framer-motion (used sparingly)                 |
| State      | React Context + reducer, persisted to localStorage |

---

## Design system

### Palette

Defined in `tailwind.config.ts`. Every colour has a 50–900 scale.

| Token     | Role                                                        |
| --------- | ----------------------------------------------------------- |
| `mitti`   | Deep earth brown — primary text, dark surfaces, corporate    |
| `gerua`   | Terracotta — primary CTA, links, retail accents              |
| `sand`    | Cream / off-white — page and card surfaces                   |
| `forest`  | Deep green — the wholesale lane, trust signals               |
| `saffron` | Muted saffron — festive accents, notices                     |
| `brass`   | Metallic accent — **corporate surfaces only**, used sparingly |

No neon, no pure black, no pure white on large surfaces.

### Typography

| Family                  | Variable        | Used for                                    |
| ----------------------- | --------------- | ------------------------------------------- |
| Plus Jakarta Sans       | `--font-display` | Headings, buttons, product names            |
| Inter                   | `--font-body`    | Body copy                                   |
| Tiro Devanagari Hindi   | `--font-deva`    | Hindi accents (`.deva` utility)             |
| IBM Plex Mono           | `--font-mono`    | **Quantities, SKUs, MOQ, price ladders**    |

The mono face is the signature idea of the design: as order quantity climbs from a
household pack to a corporate box to a tonne consignment, the interface becomes
progressively more technical and less decorative. Retail reads warm; wholesale reads
like a spec sheet. That's deliberate, not inconsistency.

**Fonts are loaded via `<link>` in `app/layout.tsx`, not `next/font`.** This keeps
the build working in environments without network access to Google Fonts. If you
prefer self-hosting later, swap in `next/font/local` and delete the `<link>` tags —
the CSS variables stay the same, so nothing else changes.

### Utilities in `app/globals.css`

`.shell` (page container) · `.eyebrow` (small caps label) · `.deva` (Devanagari) ·
`.block-rule` (block-print divider) · `.paper` (subtle texture) · `.skeleton`
(shimmer) · `.no-scrollbar`

`prefers-reduced-motion` is respected globally.

---

## Folder structure

```
app/                      Routes (App Router)
  layout.tsx              Shell: providers, header, footer, overlays, fonts, org JSON-LD
  page.tsx                Homepage — 20 sections
  opengraph-image.tsx     Generated 1200x630 PNG social card
  shop/                   Catalogue with filters, sort, search
  products/[slug]/        Product detail (40 static pages)
  collections/[slug]/     Curated collections (6 static pages)
  corporate-gifting/      Corporate journey — quote-based, no cart
  bulk/                   Wholesale journey — slabs, MOQ, samples
  cart/  checkout/        Cart and checkout UI
  about/ contact/ faq/    Content pages
  wishlist/ account/      Saved items, account placeholder
  not-found.tsx           404
  error.tsx               Error boundary
  loading.tsx             Route-level skeleton
  sitemap.ts robots.ts    SEO

components/
  layout/                 Header, MegaMenu, MobileNav, Footer, AnnouncementBar,
                          SearchOverlay, TrustStrip, WhatsAppFab
  home/                   Hero, CustomerTypeCard, CategoryCard, StoryTimeline,
                          TestimonialCard, FaqAccordion, HomeSections
  product/                ProductCard, ProductGrid, ProductGallery, ProductFilters,
                          ProductSort, ShopBrowser, VariantSelector, QuantitySelector,
                          PricingTiers, AddToCart, StickyBuyBar, QuickView, WishlistView
  business/               CorporateProductCard, BulkProductCard, BulkCatalogue
  cart/                   CartDrawer, CartPageView, CheckoutView
  forms/                  Field primitives, Newsletter, CorporateForm, BulkForm,
                          SampleRequestModal
  ui/                     Button, Badge, Section, Accordion, Modal, Reveal, Stars,
                          Skeletons, Breadcrumbs

config/brand.ts           ALL brand strings in one file — start here to rebrand
data/                     products.ts (40), catalog.ts, testimonials.ts, faqs.ts
lib/                      store.tsx (cart/wishlist), product.ts (pricing), search.ts,
                          seo.ts, navigation.ts, utils.ts, services/ (mock API layer)
types/index.ts            Domain model — the contract Phase 2 must satisfy
scripts/                  generate-placeholder-art.mjs
public/images/            120 product SVGs + lifestyle, category, pattern art
```

---

## Rebranding

Everything brand-specific lives in **`config/brand.ts`**: name, legal name, tagline,
Hindi tagline, descriptor, logo paths, all contact emails and phones, WhatsApp number
and per-context opening messages, GST placeholder, registered address, social links,
shipping thresholds.

Change that one file and the entire site follows. `brandConfig.name` currently reads
`Gomay` — a placeholder for the real brand name.

---

## The three customer journeys

These are deliberately **not** merged. Each lane answers a different first question.

| | **Retail** | **Corporate** | **Bulk / Wholesale** |
| --- | --- | --- | --- |
| Entry | `/shop` | `/corporate-gifting` | `/bulk` |
| Card | `ProductCard` | `CorporateProductCard` | `BulkProductCard` |
| Leads with | Price, pack size | Presentation, customisation | MOQ, formats, packaging |
| Primary action | Add to cart | Customise this box | Get bulk price / Request sample |
| Pricing shown | Absolute | "From ₹X / box" | Slab ladder + indicative range |
| Conversion | Cart → checkout | Quote form | Quote form + sample |
| Accent colour | `gerua` | `brass` on `mitti` | `forest` |

Above 5,000 units, variants become **quote-only**: no price, no cart, a quote CTA
instead. That threshold lives in the product data, not in component logic.

---

## Content policy — read before editing copy

This catalogue deliberately makes **no**:

- medical, health, therapeutic or wellness claims
- air-purification or anti-radiation claims
- ISO / organic / FSSAI or any other certification claims
- invented statistics, cow counts, years in business, or customer numbers
- fabricated testimonials presented as real

Testimonials in `data/testimonials.ts` are flagged `testimonialsArePlaceholders = true`
and authored as "Placeholder name" so they cannot be mistaken for real feedback.
Ratings on product pages are labelled as placeholder data in the UI. GST number and
registered address are marked as placeholders.

Products are described by **what they are made of and how they have traditionally been
used** — nothing further. There is an automated sweep for banned claim language in the
QA harness; keep it passing.

---

## Imagery

Photography lives under `public/images/gomay/` in four groups:

| Folder | Ratio | Used by |
| --- | --- | --- |
| `banners/` | 4:5 portrait | Homepage hero column |
| `story/` | 2:1 | Gaushala, drying, craft, packaging, sourcing bands |
| `lifestyle/` | 2:1 | Home puja, havan, garden, corporate, warehouse |
| `category/` | 4:3 | Category tiles and collection headers |
| `products/` | 4:3 | Product cards, galleries, quick view |

**Sourcing.** These are commissioned concept photographs, shot to a single visual
brief so the catalogue reads as one shoot: warm natural daylight, earthy palette,
plain cream studio background for every product frame. All files are delivered at
full working resolution (2000x1000 scenes, 1600x1200 cards, 1600x2000 hero), so
nothing is upscaled and nothing is soft.

**Photography is per category, not per SKU.** All products in a range share a photo
set (see `photoSets` in `data/products.ts`) — every diya SKU shows the same three
frames. That is the one place to change when per-product photography exists.

**Image quality.** `next/image` is pinned to `quality={90}` with `qualities: [75, 90]`
declared in `next.config.ts`. The Next default of 75 visibly softens this kind of
warm, low-contrast photography — don't drop it back without looking at a product
page first.

**Layout ratios follow the photography, not the reverse.** The source material is
landscape, so product cards, the gallery and category tiles are 4:3 rather than the
portrait crops used earlier. If you reshoot in portrait, change `aspect-[4/3]` in
`ProductCard`, `QuickView`, `ProductGallery`, `Skeletons` and `CategoryCard` together
so the grid stays even.

**Social cards:** `app/opengraph-image.tsx` generates a real 1200x630 PNG. Social
platforms don't render SVG previews, so `lib/seo.ts` deliberately ignores any `.svg`
passed as an OG image.

## Phase 2 integration map

The mock service layer in `lib/services/` is the seam. Components already call these
functions and never touch `data/` directly — swap the implementations and the UI is
unchanged.

| What | Where the seam is | Replace with |
| --- | --- | --- |
| Product catalogue | `lib/services/products.ts` | `GET /api/products`, `GET /api/products/:slug` |
| Search | `lib/search.ts` (same signature) | `GET /api/search?q=` |
| Corporate lead | `submitCorporateLead` in `lib/services/leads.ts` | `POST /api/leads/corporate` |
| Bulk lead | `submitBulkLead` | `POST /api/leads/bulk` |
| Sample request | `submitSampleLead` | `POST /api/leads/sample` |
| Newsletter | `submitNewsletter` | `POST /api/newsletter` |
| Cart | `lib/store.tsx` (localStorage) | Server cart + `POST /api/cart` |
| Pincode serviceability | `components/cart/CheckoutView.tsx` | `GET /api/shipping/serviceability` |
| Shipping rates | `CheckoutView.tsx` | `GET /api/shipping/rates` |
| Order creation | `CheckoutView.tsx` | `POST /api/orders` |
| Payment | `CheckoutView.tsx` | `POST /api/checkout/session` → Razorpay / PayU / Cashfree |
| Payment confirmation | — | `POST /api/webhooks/payment` |
| Auth / account | `app/account/page.tsx` | Auth provider + order history |
| Error reporting | `app/error.tsx` | Sentry or equivalent |

Every one of these locations carries an inline comment marking the integration point.

The checkout **Place order** button is deliberately disabled rather than faking a
transaction, with a WhatsApp fallback so orders can still be taken manually today.

---

## Localisation readiness

Copy is English with Hindi used as an emotional accent (`hindiName`, `hindiTagline`,
`.deva` class), not as a parallel translation. Products carry `hindiName` fields and
the `lang` attribute is set on `<html>`. To add `hi` / `pa` locales, introduce Next's
i18n routing and lift the strings — the Devanagari font pipeline is already in place.

---

## QA status

Verified on the production build:

- `npm run build` — 63 static pages, zero errors
- `npm run typecheck` — clean
- `npm run lint` — clean
- All routes return 200; unknown routes return 404
- All 40 product pages and 6 collection pages render
- **76 unique internal links crawled — zero broken**
- **70 unique referenced images — zero missing files**
- One `<h1>`, title, meta description, canonical and JSON-LD on every page
- Zero images missing `alt` text
- Sitemap emits 53 URLs; robots disallows cart / checkout / account / wishlist
- Automated claim sweep across all 40 products — no banned health or certification language
- Bulk price ladders verified monotonically decreasing on all 13 tiered products
- Product page opening price verified to match the card price on every variant axis

### States implemented

Loading skeletons · empty cart · empty wishlist · empty search · no products match
filters · out of stock · on sale · new · bulk-only · quote-only variant · unavailable
variant · form validation errors · form success · 404 · error boundary.

---

## Accessibility

Skip-to-content link · semantic landmarks · visible focus rings · focus trap and Esc
in modals and drawers · `aria-label` on all icon-only buttons · alt text on every
image · keyboard-operable accordions, filters and gallery · `prefers-reduced-motion`
honoured.

---

## Responsive

Verified layouts at 375 / 390 / 430 / 768 / 1024 / 1280 / 1536px. No horizontal scroll
at any width. Mobile specifics: bottom-sheet filter drawer, sticky Add to Cart bar on
product pages, swipeable gallery rail, slide-out navigation, `/` keyboard shortcut for
search on desktop.

---

## Known placeholders

These are intentional and must be replaced before launch:

1. Brand name, logo, GST number, registered address, phone numbers, email addresses (`config/brand.ts`)
2. All product photography (SVG placeholder art)
3. All 40 products' prices, stock levels and ratings (demonstration values)
4. All testimonials (explicitly flagged as placeholders)
5. `siteUrl` in `config/brand.ts` — currently `https://gomay.vercel.app`
6. Privacy policy, terms and returns policy text in `app/faq/page.tsx` — written as
   reasonable defaults, but should be reviewed by whoever handles your compliance
