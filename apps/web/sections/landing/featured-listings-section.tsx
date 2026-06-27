import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/marketing/section-header";
import { FEATURED_LISTINGS } from "@/lib/constants/mock-listings";

export function FeaturedListingsSection() {
  return (
    <section className="bg-muted py-12 lg:py-16">
      <Container>
        <div className="space-y-8 lg:space-y-10">
          <SectionHeader
            title="Featured Listings"
            action={{ label: "View All", href: "/listings" }}
            align="left"
          />

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_LISTINGS.map((listing) => (
              <li key={listing.id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
