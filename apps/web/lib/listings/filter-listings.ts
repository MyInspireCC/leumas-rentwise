import type { MockListing } from "@/lib/constants/mock-listings";

export type ListingPropertyType = "apartment" | "studio" | "house";

export type ListingsFilters = {
  location: string;
  propertyType: string;
  verifiedOnly: boolean;
  minPrice: string;
  maxPrice: string;
  amenities: string[];
};

export const INITIAL_LISTINGS_FILTERS: ListingsFilters = {
  location: "",
  propertyType: "",
  verifiedOnly: false,
  minPrice: "",
  maxPrice: "",
  amenities: [],
};

export function filterListings(
  listings: MockListing[],
  filters: ListingsFilters,
): MockListing[] {
  return listings.filter((listing) => {
    if (
      filters.location &&
      !listing.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (filters.propertyType && listing.type !== filters.propertyType) {
      return false;
    }

    if (filters.verifiedOnly && !listing.isVerified) {
      return false;
    }

    if (filters.minPrice && listing.price < Number(filters.minPrice)) {
      return false;
    }

    if (filters.maxPrice && listing.price > Number(filters.maxPrice)) {
      return false;
    }

    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((amenity) =>
        listing.filterAmenities?.includes(amenity),
      );
      if (!hasAll) return false;
    }

    return true;
  });
}
