import { Container } from "@/components/layout/container";
import { AmenitiesGrid } from "@/components/listings/amenities-grid";
import { BookingCard } from "@/components/listings/booking-card";
import { HostCard } from "@/components/listings/host-card";
import { PropertyDescription } from "@/components/listings/property-description";
import { PropertyHeader } from "@/components/listings/property-header";
import { PropertyImageGallery } from "@/components/listings/property-image-gallery";
import { VerificationPromiseBanner } from "@/components/listings/verification-promise-banner";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";

type PropertyDetailsContentProps = {
  listing: ListingDetail;
};

export function PropertyDetailsContent({ listing }: PropertyDetailsContentProps) {
  return (
    <div className="bg-background py-8 lg:py-10">
      <Container>
        <PropertyImageGallery images={listing.images} title={listing.title} />

        <div className="mt-6 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:gap-12">
          <div className="min-w-0 space-y-8 lg:w-[65%]">
            <PropertyHeader listing={listing} />

            <div className="lg:hidden">
              <BookingCard listing={listing} />
            </div>

            <PropertyDescription description={listing.description} />
            <AmenitiesGrid amenities={listing.amenityCards} />
            <VerificationPromiseBanner />

            <div className="lg:hidden">
              <HostCard host={listing.host} />
            </div>
          </div>

          <div className="hidden min-w-0 lg:block lg:w-[35%]">
            <div className="space-y-6 lg:sticky lg:top-24">
              <BookingCard listing={listing} />
              <HostCard host={listing.host} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
