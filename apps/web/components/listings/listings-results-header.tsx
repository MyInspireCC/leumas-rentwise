"use client";

import { ViewToggle } from "@/components/listings/view-toggle";
import { cn } from "@/lib/utils";

type ListingsResultsHeaderProps = {
  totalCount: number;
  locationLabel: string;
  className?: string;
};

export function ListingsResultsHeader({
  totalCount,
  locationLabel,
  className,
}: ListingsResultsHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Found {totalCount} Properties
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Showing the most reliable rentals in {locationLabel}.
        </p>
      </div>

      <ViewToggle />
    </div>
  );
}
