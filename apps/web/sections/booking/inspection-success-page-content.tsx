"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getListing } from "@/lib/api";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import {
  mapApiListingToDetail,
  type ApiListing,
} from "@/lib/listings/map-api-listing";
import { InspectionSuccessContent } from "@/sections/booking/inspection-success-content";

type InspectionSuccessPageContentProps = {
  id: string;
};

export function InspectionSuccessPageContent({ id }: InspectionSuccessPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const date = searchParams.get("date") ?? "";
  const timeSlot = searchParams.get("timeSlot") ?? "";
  const addOn = searchParams.get("addOn") === "true";
  const bookingId = searchParams.get("bookingId") ?? "";

  useEffect(() => {
    if (!date || !timeSlot || !bookingId) {
      router.replace(`/listings/${id}/book`);
    }
  }, [date, timeSlot, bookingId, id, router]);

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

  if (!date || !timeSlot || !bookingId) {
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
    <InspectionSuccessContent
      listing={listing}
      date={date}
      timeSlot={timeSlot}
      addOn={addOn}
      bookingId={bookingId}
    />
  );
}
