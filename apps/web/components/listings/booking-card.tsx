import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { CostBreakdownRow } from "@/components/listings/cost-breakdown-row";
import { PriceDisplay } from "@/components/listings/price-display";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import { cn } from "@/lib/utils";

type BookingCardProps = {
  listing: ListingDetail;
  className?: string;
};

export function BookingCard({ listing, className }: BookingCardProps) {
  return (
    <aside
      className={cn(
        "rounded-lg border border-border bg-background p-5 shadow-[var(--shadow-card)] sm:p-6",
        className,
      )}
    >
      <div className="space-y-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Annual Rent</p>
          <PriceDisplay
            amount={listing.price}
            period="year"
            format="full"
            size="lg"
          />
        </div>

        <div className="space-y-3">
          <CostBreakdownRow
            label="Service Charge"
            amount={listing.serviceCharge}
          />
          <CostBreakdownRow
            label={listing.agencyFeeLabel}
            amount={listing.agencyFee}
          />
          <CostBreakdownRow
            label="Total Move-in Cost"
            amount={listing.totalMoveIn}
            emphasized
          />
        </div>

        <div className="space-y-3">
          <Button variant="primary" className="h-11 w-full" asChild>
            <Link href={`/listings/${listing.id}/book`}>Book Inspection</Link>
          </Button>
          <Button variant="outline" className="h-11 w-full">
            <Icon icon={MessageCircle} size="sm" />
            Chat with Landlord
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          You won&apos;t be charged yet
        </p>
      </div>
    </aside>
  );
}
