"use client";

import { useEffect, useState } from "react";

import { getListing } from "@/lib/api";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import {
  mapApiListingToDetail,
  type ApiListing,
} from "@/lib/listings/map-api-listing";
import { PropertyDetailsContent } from "@/sections/listings/property-details-content";

type PropertyDetailsPageContentProps = {
  id: string;
};

export function PropertyDetailsPageContent({ id }: PropertyDetailsPageContentProps) {
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

  return <PropertyDetailsContent listing={listing} />;
}
