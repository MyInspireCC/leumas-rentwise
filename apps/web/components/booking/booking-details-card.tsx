import type { ReactNode } from "react";

import {
  formatBookingDate,
  getTimeSlotLabel,
} from "@/lib/constants/mock-booking";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import { cn } from "@/lib/utils";

import { BookingIdCopy } from "./booking-id-copy";

type BookingDetailsCardProps = {
  listing: ListingDetail;
  date: string;
  timeSlot: string;
  bookingId: string;
  className?: string;
};

type DetailRowProps = {
  label: string;
  value: string;
  subtitle?: string;
  customValue?: ReactNode;
};

function DetailRow({ label, value, subtitle, customValue }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4 last:border-b-0 last:pb-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-left sm:text-right">
        {customValue ?? (
          <>
            <p className="text-sm font-semibold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function BookingDetailsCard({
  listing,
  date,
  timeSlot,
  bookingId,
  className,
}: BookingDetailsCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-background p-5 shadow-[var(--shadow-card)] sm:p-6",
        className,
      )}
    >
      <h2 className="mb-2 text-lg font-bold text-foreground">Booking Details</h2>

      <div>
        <DetailRow
          label="Booking ID"
          value=""
          customValue={<BookingIdCopy bookingId={bookingId} />}
        />
        <DetailRow
          label="Property"
          value={listing.title}
          subtitle={listing.location}
        />
        <DetailRow label="Date" value={formatBookingDate(date)} />
        <DetailRow label="Time" value={getTimeSlotLabel(timeSlot)} />
      </div>
    </article>
  );
}
