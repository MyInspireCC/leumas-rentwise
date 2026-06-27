import { ListingImage } from "@/components/listings/listing-image";
import { PriceDisplay } from "@/components/listings/price-display";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import { cn } from "@/lib/utils";

type PropertySummaryCardProps = {
  listing: ListingDetail;
  className?: string;
};

export function PropertySummaryCard({
  listing,
  className,
}: PropertySummaryCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-background shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full">
        <ListingImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <span className="inline-flex rounded-md bg-accent/20 px-2 py-1 text-xs font-semibold text-accent-foreground">
          POPULAR CHOICE
        </span>

        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {listing.title}
        </h3>

        <div className="border-t border-border pt-4">
          <PriceDisplay
            amount={listing.price}
            period="year"
            format="full"
            size="default"
          />
        </div>
      </div>
    </article>
  );
}
