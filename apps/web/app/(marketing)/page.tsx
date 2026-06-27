import { FeaturedListingsSection } from "@/sections/landing/featured-listings-section";
import { HeroSection } from "@/sections/landing/hero-section";
import { HowItWorksSection } from "@/sections/landing/how-it-works-section";
import { LandlordCtaSection } from "@/sections/landing/landlord-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedListingsSection />
      <HowItWorksSection />
      <LandlordCtaSection />
    </>
  );
}
