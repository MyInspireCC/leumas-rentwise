import type { AmenityIconKey } from "./mock-listings";
import { BROWSE_LISTINGS_WITH_AMENITIES } from "./mock-listings";

export type PropertyAmenityCard = {
  label: string;
  icon: AmenityIconKey;
};

export type ListingHost = {
  name: string;
  rating: number;
  reviewCount: number;
  yearsHosting: number;
  image: string;
};

export type ListingDetail = {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  bathroomsLabel: string;
  sqft: number;
  images: string[];
  description: string;
  amenityCards: PropertyAmenityCard[];
  serviceCharge: number;
  agencyFeeLabel: string;
  agencyFee: number;
  totalMoveIn: number;
  host: ListingHost;
};

const DEFAULT_AMENITY_CARDS: PropertyAmenityCard[] = [
  { label: "24/7 Power Supply", icon: "zap" },
  { label: "Armed Security", icon: "shield" },
  { label: "Infinity Pool", icon: "waves" },
  { label: "Gated Parking", icon: "shield" },
  { label: "Fiber Internet", icon: "zap" },
  { label: "Private Gym", icon: "users" },
];

const DETAIL_OVERRIDES: Record<string, Partial<ListingDetail>> = {
  "1": {
    title: "The Pinnacle Skyloft: 3BR Penthouse",
    location: "Lekki Phase 1, Lagos",
    price: 12_500_000,
    bedrooms: 3,
    bathrooms: 4,
    bathroomsLabel: "3.5",
    sqft: 2400,
    images: [
      "/images/listings/listing-1.jpg",
      "/images/listings/listing-2.jpg",
      "/images/listings/listing-3.jpg",
    ],
    description:
      "Experience unparalleled luxury in this meticulously designed 3-bedroom penthouse. Featuring floor-to-ceiling windows with panoramic city views, a chef's kitchen with premium appliances, and a private terrace perfect for entertaining. Located in the heart of Lekki Phase 1 with 24/7 security and dedicated parking.",
    serviceCharge: 1_200_000,
    agencyFeeLabel: "Agency & Legal (10%)",
    agencyFee: 1_250_000,
    totalMoveIn: 14_950_000,
    host: {
      name: "Chief Emeka O.",
      rating: 4.9,
      reviewCount: 24,
      yearsHosting: 3,
      image: "/images/listings/listing-1.jpg",
    },
  },
};

function buildListingDetail(listing: (typeof BROWSE_LISTINGS_WITH_AMENITIES)[number]): ListingDetail {
  const override = DETAIL_OVERRIDES[listing.id] ?? {};

  const price = override.price ?? listing.price;
  const serviceCharge = override.serviceCharge ?? Math.round(price * 0.1);
  const agencyFee = override.agencyFee ?? Math.round(price * 0.1);
  const totalMoveIn =
    override.totalMoveIn ?? price + serviceCharge + agencyFee;

  return {
    id: listing.id,
    title: override.title ?? listing.title,
    location: override.location ?? listing.location,
    price,
    bedrooms: override.bedrooms ?? listing.bedrooms,
    bathrooms: override.bathrooms ?? listing.bathrooms,
    bathroomsLabel:
      override.bathroomsLabel ?? String(override.bathrooms ?? listing.bathrooms),
    sqft: override.sqft ?? listing.bedrooms * 800,
    images: override.images ?? [
      listing.image,
      "/images/listings/listing-2.jpg",
      "/images/listings/listing-3.jpg",
    ],
    description:
      override.description ??
      `A well-maintained ${listing.bedrooms}-bedroom property in ${listing.location}. This home offers reliable power, secure access, and convenient access to major roads, shopping, and business districts.`,
    amenityCards: override.amenityCards ?? DEFAULT_AMENITY_CARDS,
    serviceCharge,
    agencyFeeLabel: override.agencyFeeLabel ?? "Agency & Legal (10%)",
    agencyFee,
    totalMoveIn,
    host:
      override.host ?? {
        name: "RentWise Host",
        rating: 4.8,
        reviewCount: 12,
        yearsHosting: 2,
        image: listing.image,
      },
  };
}

export function getListingDetail(id: string): ListingDetail | undefined {
  const listing = BROWSE_LISTINGS_WITH_AMENITIES.find((item) => item.id === id);
  if (!listing) return undefined;
  return buildListingDetail(listing);
}

export function getAllListingIds(): string[] {
  return BROWSE_LISTINGS_WITH_AMENITIES.map((listing) => listing.id);
}
