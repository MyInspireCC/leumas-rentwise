"use client";

import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { ListingCard } from "@/components/listings/listing-card";
import { ListingsFilterSidebar } from "@/components/listings/listings-filter-sidebar";
import { useListingsFilters } from "@/components/listings/listings-filter-provider";
import { ListingsPagination } from "@/components/listings/listings-pagination";
import { ListingsResultsHeader } from "@/components/listings/listings-results-header";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getListings } from "@/lib/api";
import { LISTINGS_PAGE_META } from "@/lib/constants/mock-listings";
import type { MockListing } from "@/lib/constants/mock-listings";
import { filterListings } from "@/lib/listings/filter-listings";
import {
  mapApiListingToCard,
  type ApiListing,
} from "@/lib/listings/map-api-listing";

export function ListingsPageContent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [listings, setListings] = useState<MockListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { filters, setFilters, resetFilters } = useListingsFilters();

  useEffect(() => {
    let isMounted = true;

    getListings()
      .then((data) => {
        if (!isMounted) return;
        setListings((data as ApiListing[]).map(mapApiListingToCard));
      })
      .catch((fetchError: Error) => {
        if (!isMounted) return;
        setError(fetchError.message);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredListings = useMemo(
    () => filterListings(listings, filters),
    [listings, filters],
  );

  return (
    <div className="bg-background py-8 lg:py-10">
      <Container>
        <div className="mb-6 lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="normal-case tracking-normal">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">
                <ListingsFilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClear={resetFilters}
                  onApply={() => setIsFilterOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="hidden w-[280px] shrink-0 lg:block">
            <ListingsFilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClear={resetFilters}
            />
          </div>

          <div className="min-w-0 flex-1 space-y-8">
            <ListingsResultsHeader
              totalCount={filteredListings.length}
              locationLabel={LISTINGS_PAGE_META.locationLabel}
            />

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : error ? (
              <p className="rounded-lg border border-border bg-muted px-4 py-10 text-center text-sm text-muted-foreground">
                {error}
              </p>
            ) : filteredListings.length === 0 ? (
              <p className="rounded-lg border border-border bg-muted px-4 py-10 text-center text-sm text-muted-foreground">
                {listings.length === 0
                  ? "No listings found"
                  : "No properties match your filters"}
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-in fade-in duration-500">
                {filteredListings.map((listing) => (
                  <li key={listing.id}>
                    <ListingCard listing={listing} variant="browse" />
                  </li>
                ))}
              </ul>
            )}

            <ListingsPagination className="mt-10" />
          </div>
        </div>
      </Container>
    </div>
  );
}
