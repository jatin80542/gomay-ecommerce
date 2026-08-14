import { Hero } from "@/components/home/Hero";
import { CustomerTypeCards } from "@/components/home/CustomerTypeCard";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { StoryTimeline } from "@/components/home/StoryTimeline";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import {
  BestSellers,
  BrandPhilosophy,
  BulkCta,
  CapabilityBand,
  ComboBoxesSection,
  CorporateBanner,
  FeaturedCategories,
  FeaturedProducts,
  FestiveCollection,
  NewsletterBand,
  ShopByPurpose,
  SourcingStory,
  Testimonials,
  WhyChooseUs,
} from "@/components/home/HomeSections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gomay — Pure Indian Cow Dung Products",
  description:
    "Cow dung cakes, diyas, havan cups, dhoop and organic manure — traditionally crafted in India. Retail packs, corporate gift boxes and wholesale supply from one catalogue.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CustomerTypeCards />
      <FeaturedCategories />
      <BestSellers />
      <BrandPhilosophy />
      <StoryTimeline />
      <CapabilityBand />
      <FeaturedProducts />
      <CorporateBanner />
      <FestiveCollection />
      <WhyChooseUs />
      <ShopByPurpose />
      <ComboBoxesSection />
      <Testimonials />
      <SourcingStory />
      <BulkCta />
      <FaqAccordion />
      <NewsletterBand />
      <TrustStrip />
    </>
  );
}
