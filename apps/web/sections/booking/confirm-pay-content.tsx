"use client";

import { BookingProgressStepper } from "@/components/booking/booking-progress-stepper";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { PaymentSummaryCard } from "@/components/booking/payment-summary-card";
import { TrustGuaranteeBanner } from "@/components/booking/trust-guarantee-banner";
import { Container } from "@/components/layout/container";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";

type ConfirmPayContentProps = {
  listing: ListingDetail;
  date: string;
  timeSlot: string;
  addOn: boolean;
};

export function ConfirmPayContent({
  listing,
  date,
  timeSlot,
  addOn,
}: ConfirmPayContentProps) {
  return (
    <div className="bg-muted py-8 lg:py-10">
      <Container>
        <div className="space-y-8 lg:space-y-10">
          <BookingProgressStepper currentStep={2} />

          <header className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Confirm &amp; Pay
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Review your booking details and complete payment to secure your inspection.
            </p>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            <div className="order-1 min-w-0 space-y-6 lg:w-[65%]">
              <BookingSummaryCard
                listing={listing}
                date={date}
                timeSlot={timeSlot}
                addOn={addOn}
              />
              <div className="hidden lg:block">
                <TrustGuaranteeBanner />
              </div>
            </div>

            <div className="order-2 min-w-0 lg:w-[35%]">
              <PaymentSummaryCard listingId={listing.id} addOn={addOn} />
            </div>

            <div className="order-3 lg:hidden">
              <TrustGuaranteeBanner />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
