import type { AmenityIconKey } from "@/lib/constants/mock-listings";
import type { ListingDetail } from "@/lib/constants/mock-listing-details";
import type { MockListing } from "@/lib/constants/mock-listings";
import { getListingImageSrc } from "@/lib/listings/listing-image";

export type ApiListing = {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size?: number | null;
  description?: string | null;
  amenities?: string[];
  serviceCharge?: number | null;
  agencyFee?: number | null;
  isVerified: boolean;
  agentId: string;
  image: string;
  createdAt?: string;
  agent?: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
};

const DEFAULT_DESCRIPTION =
  "Well-maintained property with reliable amenities and convenient access to major roads, shopping, and business districts.";

function inferPropertyType(title: string): MockListing["type"] {
  const lower = title.toLowerCase();

  if (lower.includes("studio")) return "studio";
  if (lower.includes("duplex") || lower.includes("house")) return "house";
  return "apartment";
}

function inferFilterAmenities(listing: ApiListing): string[] {
  const amenities = ["power"];

  if (listing.isVerified) {
    amenities.push("security");
  }

  if (listing.bathrooms >= 3) {
    amenities.push("water");
  }

  return amenities;
}

function amenityLabelToIcon(label: string): AmenityIconKey {
  const lower = label.toLowerCase();

  if (lower.includes("security") || lower.includes("parking")) {
    return "shield";
  }

  if (lower.includes("pool") || lower.includes("gym")) {
    return "users";
  }

  if (lower.includes("water")) {
    return "waves";
  }

  return "zap";
}

function mapAmenitiesToCards(amenities: string[]) {
  return amenities.map((label) => ({
    label,
    icon: amenityLabelToIcon(label),
  }));
}

export function mapApiListingToCard(listing: ApiListing): MockListing {
  const base = {
    id: listing.id,
    title: listing.title,
    price: listing.price,
    location: listing.location,
    type: inferPropertyType(listing.title),
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    power: "24/7 Power",
    isVerified: listing.isVerified,
    badgeType: listing.isVerified
      ? ("verified" as const)
      : ("pending" as const),
    image: getListingImageSrc(listing.image),
    filterAmenities: inferFilterAmenities(listing),
  };

  return {
    ...base,
    amenities: [
      {
        label: `${listing.bedrooms} Bed${listing.bedrooms !== 1 ? "s" : ""}`,
        icon: "bed" as const,
      },
      {
        label: `${listing.bathrooms} Bath${listing.bathrooms !== 1 ? "s" : ""}`,
        icon: "bath" as const,
      },
      { label: "24/7 Power", icon: "zap" as const },
    ],
  };
}

export function mapApiListingToDetail(listing: ApiListing): ListingDetail {
  const sqft = listing.size ?? 2000;
  const description = listing.description ?? DEFAULT_DESCRIPTION;
  const amenities = listing.amenities ?? [];
  const serviceCharge =
    listing.serviceCharge ?? Math.round(listing.price * 0.1);
  const agencyFee = listing.agencyFee ?? Math.round(listing.price * 0.1);
  const totalMoveIn =
    listing.price + (serviceCharge || 0) + (agencyFee || 0);

  return {
    id: listing.id,
    title: listing.title,
    location: listing.location,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    bathroomsLabel: String(listing.bathrooms),
    sqft,
    images: [
      getListingImageSrc(listing.image),
      "/images/listings/listing-2.jpg",
      "/images/listings/listing-3.jpg",
    ],
    description,
    amenityCards: mapAmenitiesToCards(amenities),
    serviceCharge,
    agencyFeeLabel: "Agency & Legal Fee",
    agencyFee,
    totalMoveIn,
    host: {
      name: listing.agent?.name ?? "RentWise Host",
      rating: 4.8,
      reviewCount: 12,
      yearsHosting: 2,
      image: getListingImageSrc(listing.image),
    },
  };
}
