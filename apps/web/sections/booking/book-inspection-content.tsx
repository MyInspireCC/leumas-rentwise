"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BookingProgressStepper } from "@/components/booking/booking-progress-stepper";
import { DatePickerUI } from "@/components/booking/date-picker-ui";
import { InspectorAddOnBox } from "@/components/booking/inspector-add-on-box";
import { PropertySummaryCard } from "@/components/booking/property-summary-card";
import { TimeSlotSelector } from "@/components/booking/time-slot-selector";
import { WhyRentWiseCard } from "@/components/booking/why-rentwise-card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  formatBookingDate,
  getTimeSlotLabel,
  INSPECTION_FEE,
} from "@/lib/constants/mock-booking";
import { formatPriceFull } from "@/lib/formatters";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import { cn } from "@/lib/utils";

const NAVIGATION_DELAY_MS = 1200;

type BookInspectionContentProps = {
  listing: ListingDetail;
};

export function BookInspectionContent({ listing }: BookInspectionContentProps) {
  const router = useRouter();
  const [date, setDate] = useState<string | undefined>();
  const [timeSlot, setTimeSlot] = useState<string | undefined>();
  const [addOn, setAddOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const canContinue = Boolean(date && timeSlot);

  const handleConfirm = () => {
    if (!date || !timeSlot || isLoading) return;

    setIsLoading(true);

    const params = new URLSearchParams({
      date,
      timeSlot,
      addOn: String(addOn),
    });

    window.setTimeout(() => {
      router.push(`/listings/${listing.id}/book/confirm?${params.toString()}`);
    }, NAVIGATION_DELAY_MS);
  };

  return (
    <div className="bg-muted py-8 lg:py-10">
      <Container>
        <div className="space-y-8 lg:space-y-10">
          <BookingProgressStepper currentStep={1} />

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="min-w-0 space-y-6 lg:w-[65%]">
              <header className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Choose an Inspection Time
                </h1>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Select a convenient date and time to view the {listing.title} in{" "}
                  {listing.location}.
                </p>
              </header>

              <div className="rounded-lg border border-border bg-background p-4 shadow-[var(--shadow-card)] sm:p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <DatePickerUI value={date} onChange={setDate} />
                  <TimeSlotSelector value={timeSlot} onChange={setTimeSlot} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-4">
                <span className="text-sm text-muted-foreground">
                  Inspection Fee{" "}
                  <span className="text-xs">per visit</span>
                </span>
                <span className="font-semibold">{formatPriceFull(INSPECTION_FEE)}</span>
              </div>

              <InspectorAddOnBox checked={addOn} onChange={setAddOn} />

              {canContinue && (
                <p className="text-sm text-muted-foreground">
                  Selected:{" "}
                  <span className="font-medium text-primary">
                    {formatBookingDate(date!)} • {getTimeSlotLabel(timeSlot!)}
                  </span>
                </p>
              )}

              {!canContinue && (
                <p className="text-xs text-muted-foreground">
                  Please select a date and time to continue
                </p>
              )}

              <Button
                type="button"
                variant="primary"
                size="lg"
                className={cn(
                  "h-11 w-full sm:w-auto sm:min-w-[200px]",
                  isLoading && "cursor-wait opacity-70",
                )}
                disabled={!canContinue || isLoading}
                onClick={handleConfirm}
              >
                {isLoading ? "Processing..." : "Confirm Selection"}
              </Button>
            </div>

            <aside className="min-w-0 space-y-6 lg:w-[35%]">
              <WhyRentWiseCard />
              <PropertySummaryCard listing={listing} />
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
