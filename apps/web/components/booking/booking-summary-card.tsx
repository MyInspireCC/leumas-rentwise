import { Calendar, Clock, MapPin } from "lucide-react";

import { ListingImage } from "@/components/listings/listing-image";
import { VerifiedBadge } from "@/components/listings/verified-badge";
import { Icon } from "@/components/shared/icon";
import { formatBookingDate, getTimeSlotLabel } from "@/lib/constants/mock-booking";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import { cn } from "@/lib/utils";

type BookingSummaryCardProps = {
  listing: ListingDetail;
  date: string;
  timeSlot: string;
  addOn?: boolean;
  className?: string;
};

export function BookingSummaryCard({
  listing,
  date,
  timeSlot,
  addOn = false,
  className,
}: BookingSummaryCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-background shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-48 sm:min-h-[200px] md:w-56">
          <ListingImage
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5">
          <VerifiedBadge variant="inspected" className="w-fit" />

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">{listing.title}</h2>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon icon={MapPin} size="sm" className="shrink-0" />
              {listing.location}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
              <Icon icon={Calendar} size="sm" className="text-muted-foreground" />
              {formatBookingDate(date)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
              <Icon icon={Clock} size="sm" className="text-muted-foreground" />
              {getTimeSlotLabel(timeSlot)}
            </span>
          </div>

          {addOn && (
            <p className="text-sm text-primary">+ Verified Inspector included</p>
          )}
        </div>
      </div>
    </article>
  );
}
