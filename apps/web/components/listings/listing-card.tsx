"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";

import { FeatureTag } from "@/components/listings/feature-tag";
import { PriceDisplay } from "@/components/listings/price-display";
import { VerifiedBadge } from "@/components/listings/verified-badge";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import type { AmenityIconKey, MockListing } from "@/lib/constants/mock-listings";
import { AMENITY_ICONS } from "@/lib/constants/mock-listings";
import { cn } from "@/lib/utils";

type ListingCardProps = {
  listing: MockListing;
  variant?: "featured" | "browse";
  showFavorite?: boolean;
  className?: string;
};

export function ListingCard({
  listing,
  variant = "featured",
  showFavorite = true,
  className,
}: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const features =
    listing.amenities.length > 0
      ? listing.amenities
      : [
          {
            label: `${listing.bedrooms} Bed${listing.bedrooms !== 1 ? "s" : ""}`,
          },
          {
            label: `${listing.bathrooms} Bath${listing.bathrooms !== 1 ? "s" : ""}`,
          },
          { label: listing.power },
        ];

  const getAmenityIcon = (iconKey?: AmenityIconKey) =>
    iconKey ? AMENITY_ICONS[iconKey] : undefined;

  if (variant === "featured") {
    return (
      <article className={cn("h-full", className)}>
        <Link
          href={`/listings/${listing.id}`}
          className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-background shadow-[var(--shadow-card)] transition hover:scale-[1.01] hover:shadow-md"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover transition group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {listing.isVerified ? (
              <span className="absolute top-3 left-3 rounded-md bg-success px-2 py-1 text-xs font-medium text-white">
                Verified
              </span>
            ) : (
              <span className="absolute top-3 left-3 rounded-md bg-muted-foreground px-2 py-1 text-xs font-medium text-white">
                Pending Review
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {listing.title}
              </h3>
              <PriceDisplay amount={listing.price} />
            </div>

            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon icon={MapPin} size="sm" className="text-muted-foreground" />
              {listing.location}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {features.map((feature) => (
                <FeatureTag
                  key={feature.label}
                  label={feature.label}
                  icon={getAmenityIcon(feature.icon)}
                />
              ))}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg bg-background shadow-[var(--shadow-card)] transition hover:scale-[1.01] hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] max-h-52 w-full overflow-hidden sm:max-h-56">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <VerifiedBadge
          variant={listing.badgeType}
          className="absolute top-3 left-3"
        />
        {showFavorite && (
          <button
            type="button"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((value) => !value)}
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
          >
            <Icon
              icon={Heart}
              size="sm"
              className={cn(isFavorite && "fill-primary text-primary")}
            />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground sm:text-base">
            {listing.title}
          </h3>
          <PriceDisplay
            amount={listing.price}
            className="shrink-0 text-right text-sm sm:text-base"
          />
        </div>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Icon icon={MapPin} size="sm" className="text-muted-foreground" />
          {listing.location}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {features.map((feature) => (
            <FeatureTag
              key={feature.label}
              label={feature.label}
              icon={getAmenityIcon(feature.icon)}
            />
          ))}
        </div>

        <Button variant="primary" className="mt-1 h-10 w-full" asChild>
          <Link href={`/listings/${listing.id}`}>View Details</Link>
        </Button>
      </div>
    </article>
  );
}
