"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getListing } from "@/lib/api";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import {
  mapApiListingToDetail,
  type ApiListing,
} from "@/lib/listings/map-api-listing";
import { ConfirmPayContent } from "@/sections/booking/confirm-pay-content";

type ConfirmPayPageContentProps = {
  id: string;
};

export function ConfirmPayPageContent({ id }: ConfirmPayPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const date = searchParams.get("date") ?? "";
  const timeSlot = searchParams.get("timeSlot") ?? "";
  const addOn = searchParams.get("addOn") === "true";

  useEffect(() => {
    if (!date || !timeSlot) {
      router.replace(`/listings/${id}/book`);
    }
  }, [date, timeSlot, id, router]);

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

  if (!date || !timeSlot) {
    return null;
  }

  if (error) {
    return (
      <p className="px-4 py-16 text-center text-sm text-muted-foreground">{error}</p>
    );
  }

  if (!listing) {
    return <p className="px-4 py-16 text-center text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <ConfirmPayContent
      listing={listing}
      date={date}
      timeSlot={timeSlot}
      addOn={addOn}
    />
  );
}
