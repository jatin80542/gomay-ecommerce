/**
 * Generates the local placeholder artwork used across the storefront.
 * Real photography drops into the same paths later — filenames and aspect
 * ratios are the contract, so cards never re-layout when photos arrive.
 *
 *   node scripts/generate-placeholder-art.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
const C = {
  cream: "#F7F1E6",
  creamDeep: "#EFE6D5",
  sand: "#E4D7C0",
  mitti: "#452F1F",
  mittiSoft: "#78593C",
  gerua: "#B4552D",
  geruaSoft: "#DA8F6B",
  forest: "#2F4A3A",
  saffron: "#C98A2E",
  brass: "#A98442",
};

const write = (rel, svg) => {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, svg.trim() + "\n");
};

const blockPrint = (id, color, opacity = 0.14) => `
<pattern id="${id}" width="64" height="64" patternUnits="userSpaceOnUse">
  <rect width="64" height="64" fill="none"/>
  <path d="M32 8 L40 24 L32 32 L24 24 Z" fill="${color}" opacity="${opacity}"/>
  <circle cx="8" cy="48" r="3.5" fill="${color}" opacity="${opacity}"/>
  <circle cx="56" cy="48" r="3.5" fill="${color}" opacity="${opacity}"/>
  <path d="M0 40 Q16 32 32 40 T64 40" stroke="${color}" stroke-width="1.2" fill="none" opacity="${opacity}"/>
</pattern>`;

const grain = (id) => `
<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/>
<feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer>
<feComposite operator="in" in2="SourceGraphic"/></filter>`;

/* ---------- product line-art shapes, drawn on a 400x500 stage ---------- */
const art = {
  cake: `
    <g transform="translate(200 258)">
      <ellipse cx="0" cy="58" rx="132" ry="20" fill="${C.mitti}" opacity="0.10"/>
      <circle r="118" fill="${C.mittiSoft}" opacity="0.20"/>
      <circle r="118" fill="none" stroke="${C.mitti}" stroke-width="3"/>
      <circle r="96" fill="none" stroke="${C.mitti}" stroke-width="1.4" opacity="0.5" stroke-dasharray="7 9"/>
      <path d="M-38 -22 q38 -26 76 0" stroke="${C.mitti}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M-44 12 q44 -30 88 0" stroke="${C.mitti}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M-34 46 q34 -24 68 0" stroke="${C.mitti}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="-62" r="9" fill="${C.mitti}" opacity="0.35"/>
    </g>`,
  diya: `
    <g transform="translate(200 260)">
      <ellipse cx="0" cy="96" rx="120" ry="18" fill="${C.mitti}" opacity="0.10"/>
      <path d="M-46 -70 q10 -46 46 -46 q36 0 46 46" fill="none" stroke="${C.saffron}" stroke-width="3" opacity="0.55"/>
      <path d="M0 -104 q22 30 0 52 q-22 -22 0 -52Z" fill="${C.saffron}"/>
      <path d="M-120 -18 q120 44 240 0 q-26 96 -120 96 q-94 0 -120 -96Z" fill="${C.gerua}" opacity="0.22"/>
      <path d="M-120 -18 q120 44 240 0 q-26 96 -120 96 q-94 0 -120 -96Z" fill="none" stroke="${C.mitti}" stroke-width="3"/>
      <path d="M-90 6 q90 34 180 0" stroke="${C.mitti}" stroke-width="1.6" fill="none" opacity="0.55"/>
    </g>`,
  cup: `
    <g transform="translate(200 250)">
      <ellipse cx="0" cy="120" rx="118" ry="18" fill="${C.mitti}" opacity="0.10"/>
      <path d="M-92 -60 L92 -60 L64 108 L-64 108 Z" fill="${C.mittiSoft}" opacity="0.2"/>
      <path d="M-92 -60 L92 -60 L64 108 L-64 108 Z" fill="none" stroke="${C.mitti}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="0" cy="-60" rx="92" ry="24" fill="${C.cream}" stroke="${C.mitti}" stroke-width="3"/>
      <ellipse cx="0" cy="-58" rx="62" ry="15" fill="${C.mitti}" opacity="0.28"/>
      <path d="M-24 -96 q16 -30 0 -54 M24 -96 q-16 -30 0 -54" stroke="${C.forest}" stroke-width="2.6" fill="none" opacity="0.6" stroke-linecap="round"/>
      <path d="M-58 26 L58 26" stroke="${C.mitti}" stroke-width="1.4" opacity="0.4"/>
    </g>`,
  dhoop: `
    <g transform="translate(200 250)">
      <ellipse cx="0" cy="140" rx="108" ry="16" fill="${C.mitti}" opacity="0.10"/>
      ${[-60, -20, 20, 60]
        .map(
          (x, i) => `<g transform="translate(${x} ${i % 2 ? 8 : 0}) rotate(${(i - 1.5) * 5})">
        <rect x="-9" y="-118" width="18" height="256" rx="9" fill="${C.mittiSoft}" opacity="0.22"/>
        <rect x="-9" y="-118" width="18" height="256" rx="9" fill="none" stroke="${C.mitti}" stroke-width="2.6"/>
        <rect x="-9" y="-118" width="18" height="46" rx="9" fill="${C.gerua}" opacity="0.5"/></g>`
        )
        .join("")}
      <path d="M-8 -150 q22 -22 0 -44" stroke="${C.forest}" stroke-width="2.4" fill="none" opacity="0.55" stroke-linecap="round"/>
    </g>`,
  log: `
    <g transform="translate(200 256)">
      <ellipse cx="0" cy="124" rx="130" ry="18" fill="${C.mitti}" opacity="0.10"/>
      ${[
        [-58, -50, -14],
        [10, -6, 6],
        [-30, 62, 0],
      ]
        .map(
          ([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">
        <rect x="-108" y="-30" width="216" height="60" rx="30" fill="${C.mittiSoft}" opacity="0.22"/>
        <rect x="-108" y="-30" width="216" height="60" rx="30" fill="none" stroke="${C.mitti}" stroke-width="3"/>
        <ellipse cx="-78" cy="0" rx="14" ry="26" fill="${C.cream}" stroke="${C.mitti}" stroke-width="2.4"/>
        <path d="M-40 -8 L60 -8 M-40 10 L44 10" stroke="${C.mitti}" stroke-width="1.6" opacity="0.4"/></g>`
        )
        .join("")}
    </g>`,
  manure: `
    <g transform="translate(200 254)">
      <ellipse cx="0" cy="132" rx="122" ry="18" fill="${C.mitti}" opacity="0.10"/>
      <path d="M-96 -54 q96 -34 192 0 l14 176 q-110 26 -220 0Z" fill="${C.forest}" opacity="0.16"/>
      <path d="M-96 -54 q96 -34 192 0 l14 176 q-110 26 -220 0Z" fill="none" stroke="${C.mitti}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-70 -62 q70 -46 140 0" fill="none" stroke="${C.mitti}" stroke-width="3"/>
      <rect x="-56" y="16" width="112" height="72" rx="6" fill="${C.cream}" stroke="${C.mitti}" stroke-width="2.4"/>
      <path d="M0 34 q-16 18 0 34 q16 -16 0 -34Z" fill="${C.forest}" opacity="0.7"/>
      <path d="M-30 74 L30 74" stroke="${C.mitti}" stroke-width="2" opacity="0.5"/>
    </g>`,
  box: `
    <g transform="translate(200 252)">
      <ellipse cx="0" cy="130" rx="132" ry="18" fill="${C.mitti}" opacity="0.10"/>
      <rect x="-118" y="-24" width="236" height="150" rx="8" fill="${C.gerua}" opacity="0.18"/>
      <rect x="-118" y="-24" width="236" height="150" rx="8" fill="none" stroke="${C.mitti}" stroke-width="3"/>
      <rect x="-132" y="-64" width="264" height="46" rx="6" fill="${C.cream}" stroke="${C.mitti}" stroke-width="3"/>
      <path d="M0 -64 L0 126" stroke="${C.brass}" stroke-width="10" opacity="0.5"/>
      <path d="M0 -64 L0 126" stroke="${C.mitti}" stroke-width="1.6" opacity="0.35"/>
      <path d="M-34 -70 q34 -44 68 0" fill="none" stroke="${C.brass}" stroke-width="3"/>
      <path d="M-70 60 L-24 60 M24 60 L70 60" stroke="${C.mitti}" stroke-width="1.6" opacity="0.4"/>
    </g>`,
  idol: `
    <g transform="translate(200 258)">
      <ellipse cx="0" cy="124" rx="112" ry="18" fill="${C.mitti}" opacity="0.10"/>
      <path d="M-86 118 q0 -110 86 -110 q86 0 86 110Z" fill="${C.mittiSoft}" opacity="0.2"/>
      <path d="M-86 118 q0 -110 86 -110 q86 0 86 110Z" fill="none" stroke="${C.mitti}" stroke-width="3"/>
      <circle cx="0" cy="-14" r="46" fill="${C.cream}" stroke="${C.mitti}" stroke-width="3"/>
      <path d="M0 -2 q-8 34 -30 30" stroke="${C.mitti}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="-72" r="16" fill="none" stroke="${C.saffron}" stroke-width="3"/>
      <path d="M-58 -48 q58 -44 116 0" fill="none" stroke="${C.brass}" stroke-width="2.6" opacity="0.8"/>
    </g>`,
};

const cowLine = `
<g opacity="0.10" transform="translate(300 372) scale(1.05)">
  <path d="M-118 0 q-14 -40 10 -58 q-6 -22 12 -26 q10 16 24 12 q40 -12 82 0 q34 8 40 40 l14 8 q10 6 4 16 l-16 4 l-6 40 l-14 0 l-4 -30 q-40 12 -80 0 l-6 30 l-14 0 Z"
    fill="none" stroke="${C.mitti}" stroke-width="3"/>
  <circle cx="-84" cy="-58" r="3" fill="${C.mitti}"/>
</g>`;

function productSvg({ title, kind, tone = C.cream }) {
  const shape = art[kind] ?? art.cake;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500" role="img" aria-label="${title}">
<defs>${blockPrint("bp", C.mitti, 0.09)}${grain("gr")}</defs>
<rect width="400" height="500" fill="${tone}"/>
<rect width="400" height="500" fill="url(#bp)"/>
<rect width="400" height="500" filter="url(#gr)" fill="${C.mitti}"/>
<rect x="16" y="16" width="368" height="468" rx="10" fill="none" stroke="${C.mitti}" stroke-opacity="0.14"/>
${shape}
<text x="200" y="452" text-anchor="middle" font-family="Georgia, serif" font-size="17" fill="${C.mitti}" opacity="0.62">${title}</text>
</svg>`;
}

function sceneSvg({ title, sub, w = 1600, h = 900, tone = C.creamDeep, accent = C.gerua }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">
<defs>${blockPrint("bp2", C.mitti, 0.08)}${grain("gr2")}
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${tone}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#sky)"/>
<rect width="${w}" height="${h}" fill="url(#bp2)"/>
<circle cx="${w * 0.78}" cy="${h * 0.24}" r="${h * 0.16}" fill="${C.saffron}" opacity="0.18"/>
<path d="M0 ${h * 0.72} q${w * 0.25} -${h * 0.14} ${w * 0.5} 0 q${w * 0.25} ${h * 0.12} ${w * 0.5} -0.5 L${w} ${h} L0 ${h} Z" fill="${C.forest}" opacity="0.16"/>
<path d="M0 ${h * 0.84} q${w * 0.3} -${h * 0.1} ${w * 0.6} 0 q${w * 0.2} ${h * 0.08} ${w * 0.4} 0 L${w} ${h} L0 ${h} Z" fill="${accent}" opacity="0.18"/>
<g transform="translate(${w * 0.1} ${h * 0.62}) scale(${h / 620})">${cowLine}</g>
<rect width="${w}" height="${h}" filter="url(#gr2)" fill="${C.mitti}"/>
<text x="${w * 0.5}" y="${h - 54}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(h * 0.032)}" fill="${C.mitti}" opacity="0.5">${title}${sub ? " — " + sub : ""}</text>
</svg>`;
}

/* ---------- product images ---------- */
const products = [
  ["gomay-upla-regular", "Gomay Upla — Regular", "cake"],
  ["premium-havan-cow-dung-cakes", "Premium Havan Cakes", "cake"],
  ["traditional-round-gomay-kanda", "Round Gomay Kanda", "cake"],
  ["small-pooja-cow-dung-cakes", "Small Pooja Cakes", "cake"],
  ["holika-dahan-cake-pack", "Holika Dahan Pack", "cake"],
  ["bulk-gomay-upla-carton", "Bulk Upla Carton", "cake"],
  ["classic-gomay-diya", "Classic Gomay Diya", "diya"],
  ["designer-gomay-diya", "Designer Gomay Diya", "diya"],
  ["floral-gomay-diya", "Floral Gomay Diya", "diya"],
  ["traditional-deepak", "Traditional Deepak", "diya"],
  ["festive-diya-pack", "Festive Diya Pack", "diya"],
  ["premium-gift-diya-set", "Premium Gift Diya Set", "diya"],
  ["empty-havan-cups", "Empty Havan Cups", "cup"],
  ["guggal-havan-cups", "Guggal Havan Cups", "cup"],
  ["sambrani-cups", "Sambrani Cups", "cup"],
  ["herbal-havan-cups", "Herbal Havan Cups", "cup"],
  ["traditional-dhuni-cup", "Traditional Dhuni Cup", "cup"],
  ["traditional-cow-dung-dhoop", "Cow Dung Dhoop", "dhoop"],
  ["guggal-dhoop-sticks", "Guggal Dhoop Sticks", "dhoop"],
  ["chandan-dhoop-batti", "Chandan Dhoop Batti", "dhoop"],
  ["gomay-dhoop-cones", "Gomay Dhoop Cones", "dhoop"],
  ["havan-dhoop-mix", "Havan Dhoop", "dhoop"],
  ["havan-lakdi-sticks", "Havan Lakdi", "log"],
  ["gomay-logs", "Gomay Logs", "log"],
  ["ceremonial-havan-fuel-pack", "Ceremonial Fuel Pack", "log"],
  ["organic-cow-dung-powder", "Cow Dung Powder", "manure"],
  ["natural-garden-manure", "Garden Manure", "manure"],
  ["nursery-grade-manure", "Nursery Grade Manure", "manure"],
  ["farm-bulk-manure", "Farm Bulk Manure", "manure"],
  ["daily-puja-box", "Daily Puja Box", "box"],
  ["complete-havan-box", "Complete Havan Box", "box"],
  ["gomay-essentials-box", "Gomay Essentials Box", "box"],
  ["festive-diwali-box", "Festive Diwali Box", "box"],
  ["temple-supply-pack", "Temple Supply Pack", "box"],
  ["griha-pravesh-box", "Griha Pravesh Box", "box"],
  ["corporate-heritage-box", "Corporate Heritage Box", "box"],
  ["premium-swadeshi-gift-box", "Premium Swadeshi Box", "box"],
  ["gomay-ganesh-idol", "Gomay Ganesh", "idol"],
  ["ganesh-lakshmi-set", "Ganesh–Lakshmi Set", "idol"],
  ["gomay-wall-decor", "Gomay Wall Decor", "idol"],
];

for (const [slug, title, kind] of products) {
  write(`products/${slug}.svg`, productSvg({ title, kind }));
  write(`products/${slug}-alt.svg`, productSvg({ title: title + " — detail", kind, tone: C.sand }));
  write(`products/${slug}-pack.svg`, productSvg({ title: title + " — packaging", kind: "box", tone: C.creamDeep }));
}

/* ---------- scenes, categories, collections ---------- */
write("lifestyle/hero.svg", sceneSvg({ title: "Gaushala morning", sub: "natural daylight", w: 1600, h: 1100 }));
const scenes = [
  ["lifestyle/gaushala.svg", "Gaushala", "responsible collection"],
  ["lifestyle/drying-yard.svg", "Drying yard", "sun-dried"],
  ["lifestyle/craft-hands.svg", "Handcrafted", "village craftsmanship"],
  ["lifestyle/packaging.svg", "Packing table", "careful packaging"],
  ["lifestyle/corporate-gifting.svg", "Corporate gifting", "custom sleeves"],
  ["lifestyle/bulk-warehouse.svg", "Bulk despatch", "pan-India supply"],
  ["lifestyle/story.svg", "From gaushala to your home", ""],
  ["lifestyle/sourcing.svg", "Sourced across India", ""],
];
for (const [p, t, s] of scenes) write(p, sceneSvg({ title: t, sub: s }));

const cats = [
  ["cow-dung-cakes", "Cow dung cakes"],
  ["diyas", "Diyas"],
  ["havan-cups", "Havan cups"],
  ["dhoop", "Dhoop"],
  ["havan-sticks", "Havan lakdi"],
  ["manure", "Manure"],
  ["festive", "Festive"],
  ["combo-boxes", "Gift boxes"],
];
for (const [slug, title] of cats) write(`categories/${slug}.svg`, sceneSvg({ title, sub: "", w: 900, h: 900, tone: C.sand }));

write("patterns/gomay-mark.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Gomay mark">
<circle cx="32" cy="32" r="30" fill="none" stroke="${C.mitti}" stroke-width="2.5"/>
<path d="M32 12 q12 10 12 22 a12 12 0 0 1 -24 0 q0 -12 12 -22Z" fill="${C.gerua}" opacity="0.85"/>
<path d="M32 44 q-9 -8 -9 -16" stroke="${C.cream}" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="32" cy="32" r="24" fill="none" stroke="${C.mitti}" stroke-width="1" stroke-dasharray="3 5" opacity="0.6"/>
</svg>`);

write("patterns/block-print.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs>${blockPrint("bp3", C.mitti, 0.5)}</defs><rect width="64" height="64" fill="url(#bp3)"/></svg>`);

write("og-default.svg", sceneSvg({ title: "Gomay — Pure Gomay. Rooted in Bharat.", sub: "", w: 1200, h: 630 }));

console.log("placeholder art written");
