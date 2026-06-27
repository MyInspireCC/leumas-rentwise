import { AMENITY_ICONS } from "@/lib/constants/mock-listings";
import type { PropertyAmenityCard } from "@/lib/constants/mock-listing-details";

import { AmenityCard } from "./amenity-card";

type AmenitiesGridProps = {
  amenities: PropertyAmenityCard[];
};

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Amenities</h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => (
          <li key={amenity.label}>
            <AmenityCard
              label={amenity.label}
              icon={AMENITY_ICONS[amenity.icon]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
