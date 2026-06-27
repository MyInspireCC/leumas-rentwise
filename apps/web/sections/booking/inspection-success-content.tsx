import Link from "next/link";
import { Lock } from "lucide-react";

import { BookingDetailsCard } from "@/components/booking/booking-details-card";
import { BookingProgressStepper } from "@/components/booking/booking-progress-stepper";
import { InspectionSuccessHero } from "@/components/booking/inspection-success-hero";
import { WhatsNextCard } from "@/components/booking/whats-next-card";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { getBookingTotal } from "@/lib/constants/mock-booking";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";

type InspectionSuccessContentProps = {
  listing: ListingDetail;
  date: string;
  timeSlot: string;
  addOn: boolean;
  bookingId: string;
};

export function InspectionSuccessContent({
  listing,
  date,
  timeSlot,
  addOn,
  bookingId,
}: InspectionSuccessContentProps) {
  const total = getBookingTotal(addOn);
  return (
    <div className="bg-muted py-8 lg:py-10 animate-in fade-in duration-500">
      <Container>
        <div className="mx-auto max-w-4xl space-y-8 lg:space-y-10">
          <BookingProgressStepper currentStep={3} />

          <InspectionSuccessHero total={total} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BookingDetailsCard
              listing={listing}
              date={date}
              timeSlot={timeSlot}
              bookingId={bookingId}
            />
            <WhatsNextCard />
          </div>

          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button variant="primary" size="lg" className="h-11 w-full sm:w-auto sm:min-w-[200px]" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-11 w-full sm:w-auto sm:min-w-[200px]" asChild>
              <Link href="/listings">Back to Listings</Link>
            </Button>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <Icon icon={Lock} size="sm" />
            Secure Payment Certified
          </p>
        </div>
      </Container>
    </div>
  );
}
