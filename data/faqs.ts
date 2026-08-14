export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    question: "What exactly are gomay products?",
    answer:
      "Gomay is cow dung prepared for use — sun-dried, shaped and packed. We make cakes and cups for ritual fires, diyas and dhoop for daily worship, larger sticks and logs for havan, and dried powder and manure for gardens and fields.",
  },
  {
    question: "Do you make health or environmental claims?",
    answer:
      "No. We describe traditional usage as traditional usage. We don't claim medical benefits, air purification or any scientifically unverified effect, and we don't display certifications we haven't been issued.",
  },
  {
    question: "How small an order can I place?",
    answer:
      "Retail packs start at a pack of four to six pieces. There is no minimum on the retail store — the minimum quantities you see apply only to wholesale and corporate orders.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes. Retail orders ship by courier and larger consignments move by surface transport. Delivery timelines and freight for bulk orders are confirmed with your quote.",
  },
  {
    question: "Can I get products with my own branding?",
    answer:
      "Yes, on corporate and wholesale orders. Corporate gifting covers sleeves, message cards and logo printing; wholesale covers retail-ready pouches and private label packing.",
  },
  {
    question: "How should I store these products?",
    answer:
      "Keep everything dry and off the floor. Cakes, cups and lakdi absorb moisture in humid weather, which makes them harder to light. Powder should be resealed after use.",
  },
];

export const shippingFaqs: Faq[] = [
  { question: "When does my order leave?", answer: "Retail orders are dispatched in 2–4 working days. Bulk and corporate consignments follow the timeline confirmed on your quote." },
  { question: "Is there free shipping?", answer: "Retail orders above ₹999 ship free. Below that a flat rate applies, shown at checkout before payment." },
  { question: "Do you deliver to more than one address?", answer: "Corporate orders can be split across multiple delivery addresses. Share the list with your quote request." },
];

export const bulkFaqs: Faq[] = [
  { question: "What is the minimum order?", answer: "Minimums vary by product — 500 pieces on cakes and cups, 50 KG on lakdi and logs, 100 KG on manure. Each product page shows its own MOQ." },
  { question: "How is bulk pricing decided?", answer: "By quantity, packaging format and delivery district. Repeat monthly commitments are priced differently from one-off consignments." },
  { question: "Can I get a sample first?", answer: "Yes. Request a sample from any bulk product and we'll confirm what's available and the courier timeline." },
  { question: "Do you do private label?", answer: "Yes, on wholesale orders — your brand on retail-ready packs. Artwork requirements are shared once quantities are agreed." },
];

export const corporateFaqs: Faq[] = [
  { question: "What's the minimum for a corporate order?", answer: "50 boxes. Below that, the retail gift sets are usually the better fit." },
  { question: "How long does branding take?", answer: "10–18 working days after artwork approval, depending on the box and the finish." },
  { question: "Can we mix our own combination of products?", answer: "Yes. The box, the sleeve and the contents are all decided with you before production." },
  { question: "Can you deliver to employees' home addresses?", answer: "Yes, with an address list. Per-address courier costs are included in the quote." },
];
