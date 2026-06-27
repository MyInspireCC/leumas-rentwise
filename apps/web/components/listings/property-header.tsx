import { Bath, Bed, Maximize2 } from "lucide-react";

import { VerifiedBadge } from "@/components/listings/verified-badge";
import { Icon } from "@/components/shared/icon";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";

type PropertyHeaderProps = {
  listing: ListingDetail;
};

export function PropertyHeader({ listing }: PropertyHeaderProps) {
  const features = [
    { icon: Bed, label: `${listing.bedrooms} Bedroom${listing.bedrooms !== 1 ? "s" : ""}` },
    { icon: Bath, label: `${listing.bathroomsLabel} Baths` },
    { icon: Maximize2, label: `${listing.sqft.toLocaleString("en-NG")} sq ft` },
  ];

  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <VerifiedBadge variant="listing" />
        <span aria-hidden>•</span>
        <span>{listing.location}</span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {listing.title}
      </h1>

      <ul className="flex flex-wrap gap-6">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-center gap-2 text-sm text-foreground">
            <Icon icon={feature.icon} size="sm" className="text-muted-foreground" />
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </header>
  );
}
