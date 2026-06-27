import {
  Bath,
  Bed,
  Droplets,
  Shield,
  Users,
  Waves,
  Zap,
} from "lucide-react";

export type ListingBadgeType = "verified" | "inspected" | "pending";

export type AmenityIconKey =
  | "bed"
  | "bath"
  | "zap"
  | "shield"
  | "users"
  | "waves"
  | "droplets";

export type ListingAmenity = {
  label: string;
  icon?: AmenityIconKey;
};

export type MockListing = {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "apartment" | "studio" | "house";
  bedrooms: number;
  bathrooms: number;
  power: string;
  isVerified: boolean;
  badgeType: ListingBadgeType;
  image: string;
  amenities: ListingAmenity[];
  filterAmenities: string[];
};

export const AMENITY_ICONS = {
  bed: Bed,
  bath: Bath,
  zap: Zap,
  shield: Shield,
  users: Users,
  waves: Waves,
  droplets: Droplets,
} as const;

export const LISTINGS_PAGE_META = {
  totalCount: 124,
  locationLabel: "Lagos, Nigeria",
} as const;

const BROWSE_LISTINGS_BASE = [
  {
    id: "1",
    title: "Luxury 3-Bedroom Flat",
    price: 4_500_000,
    location: "Banana Island, Ikoyi, Lagos",
    type: "apartment" as const,
    bedrooms: 3,
    bathrooms: 3,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "verified" as const,
    image: "/images/listings/listing-1.jpg",
    filterAmenities: ["power", "security"],
  },
  {
    id: "2",
    title: "Executive Duplex",
    price: 8_500_000,
    location: "Maitama, Abuja",
    type: "house" as const,
    bedrooms: 4,
    bathrooms: 4,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "inspected" as const,
    image: "/images/listings/listing-2.jpg",
    filterAmenities: ["power", "water", "security"],
  },
  {
    id: "3",
    title: "Modern Studio Apartment",
    price: 2_800_000,
    location: "GRA Phase 2, Port Harcourt",
    type: "studio" as const,
    bedrooms: 1,
    bathrooms: 1,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "verified" as const,
    image: "/images/listings/listing-3.jpg",
    filterAmenities: ["power", "security"],
  },
  {
    id: "4",
    title: "Spacious 2-Bedroom Flat",
    price: 3_200_000,
    location: "Lekki Phase 1, Lagos",
    type: "apartment" as const,
    bedrooms: 2,
    bathrooms: 2,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "inspected" as const,
    image: "/images/listings/listing-1.jpg",
    filterAmenities: ["power"],
  },
  {
    id: "5",
    title: "Premium 4-Bedroom Duplex",
    price: 12_000_000,
    location: "Victoria Island, Lagos",
    type: "house" as const,
    bedrooms: 4,
    bathrooms: 5,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "verified" as const,
    image: "/images/listings/listing-2.jpg",
    filterAmenities: ["power", "security"],
  },
  {
    id: "6",
    title: "Cozy 1-Bedroom Apartment",
    price: 1_800_000,
    location: "Yaba, Lagos",
    type: "apartment" as const,
    bedrooms: 1,
    bathrooms: 1,
    power: "24/7 Power",
    isVerified: false,
    badgeType: "verified" as const,
    image: "/images/listings/listing-3.jpg",
    filterAmenities: ["power", "security"],
  },
  {
    id: "7",
    title: "Garden View 3-Bedroom House",
    price: 5_500_000,
    location: "Magodo, Lagos",
    type: "house" as const,
    bedrooms: 3,
    bathrooms: 3,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "inspected" as const,
    image: "/images/listings/listing-1.jpg",
    filterAmenities: ["power", "water", "security"],
  },
  {
    id: "8",
    title: "Waterfront 2-Bedroom Flat",
    price: 6_200_000,
    location: "Eko Atlantic, Lagos",
    type: "apartment" as const,
    bedrooms: 2,
    bathrooms: 2,
    power: "24/7 Power",
    isVerified: true,
    badgeType: "verified" as const,
    image: "/images/listings/listing-2.jpg",
    filterAmenities: ["power"],
  },
];

export function buildListingAmenities(
  listing: (typeof BROWSE_LISTINGS_BASE)[number],
): ListingAmenity[] {
  const base: ListingAmenity[] = [
    {
      label: `${listing.bedrooms} Bed${listing.bedrooms !== 1 ? "s" : ""}`,
      icon: "bed",
    },
    {
      label: `${listing.bathrooms} Bath${listing.bathrooms !== 1 ? "s" : ""}`,
      icon: "bath",
    },
    { label: listing.power, icon: "zap" },
  ];

  if (listing.id === "1" || listing.id === "5") {
    base.push({ label: "Gated", icon: "shield" });
    base.push({ label: "Pool", icon: "waves" });
  }

  if (listing.id === "2" || listing.id === "7") {
    base.push({ label: "Security", icon: "users" });
    base.push({ label: "Water", icon: "droplets" });
  }

  if (listing.id === "3" || listing.id === "6") {
    base.push({ label: "Gated", icon: "shield" });
  }

  return base;
}

export const BROWSE_LISTINGS_WITH_AMENITIES: MockListing[] =
  BROWSE_LISTINGS_BASE.map((listing) => ({
    ...listing,
    amenities: buildListingAmenities(listing),
  }));

export const FEATURED_LISTINGS: MockListing[] =
  BROWSE_LISTINGS_WITH_AMENITIES.slice(0, 3);
