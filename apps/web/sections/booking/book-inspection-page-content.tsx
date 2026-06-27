"use client";

import { useEffect, useState } from "react";

import { getListing } from "@/lib/api";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import {
  mapApiListingToDetail,
  type ApiListing,
} from "@/lib/listings/map-api-listing";
import { BookInspectionContent } from "@/sections/booking/book-inspection-content";

type BookInspectionPageContentProps = {
  id: string;
};

export function BookInspectionPageContent({ id }: BookInspectionPageContentProps) {
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getListing(id)
      .then((data) => {
        if (!isMounted) return;
        setListing(mapApiListingToDetail(data as ApiListing));
      })
      .catch((fetchError: Error) => {
        if (!isMounted) return;
        setError(fetchError.message);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) {
    return (
      <p className="px-4 py-16 text-center text-sm text-muted-foreground">{error}</p>
    );
  }

  if (!listing) {
    return <p className="px-4 py-16 text-center text-sm text-muted-foreground">Loading...</p>;
  }

  return <BookInspectionContent listing={listing} />;
}
