import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { QuickView } from "@/components/product/QuickView";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { brandConfig } from "@/config/brand";
import { organisationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.siteUrl),
  title: {
    default: `${brandConfig.name} — ${brandConfig.descriptor}`,
    template: `%s | ${brandConfig.name}`,
  },
  description:
    "Traditionally crafted cow dung products for pooja, havan, festivals, gardening and gifting — in retail packs, corporate boxes and wholesale quantities across India.",
  keywords: [
    "cow dung cakes",
    "gomay upla",
    "cow dung diya",
    "havan cups",
    "cow dung dhoop",
    "organic cow dung manure",
    "corporate gifting India",
    "wholesale cow dung products",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: brandConfig.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#301F14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Loaded via <link> rather than next/font so builds work without network access to Google Fonts. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Tiro+Devanagari+Hindi&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-mitti-800 focus:px-4 focus:py-2 focus:text-sand-50"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <QuickView />
          <WhatsAppFab />
        </StoreProvider>
      </body>
    </html>
  );
}
