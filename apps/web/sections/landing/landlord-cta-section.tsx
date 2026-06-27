import { Container } from "@/components/layout/container";
import { LandlordCtaBanner } from "@/components/marketing/landlord-cta-banner";

export function LandlordCtaSection() {
  return (
    <section className="bg-background py-12 lg:py-16">
      <Container>
        <LandlordCtaBanner />
      </Container>
    </section>
  );
}
