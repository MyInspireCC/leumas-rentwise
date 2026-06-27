"use client";

import { Droplets, Shield, Zap } from "lucide-react";

import { CheckboxFilterList } from "@/components/listings/checkbox-filter-list";
import { PriceRangeFilter } from "@/components/listings/price-range-filter";
import { VerificationFilterCard } from "@/components/listings/verification-filter-card";
import { Button } from "@/components/ui/button";
import type { ListingsFilters } from "@/lib/listings/filter-listings";
import { cn } from "@/lib/utils";

const PROPERTY_TYPE_OPTIONS = [
  { id: "apartment", label: "Apartment" },
  { id: "studio", label: "Studio" },
  { id: "house", label: "House" },
];

const AMENITY_OPTIONS = [
  { id: "power", label: "24/7 Power", icon: Zap },
  { id: "water", label: "Central Water", icon: Droplets },
  { id: "security", label: "Gated Security", icon: Shield },
];

type ListingsFilterSidebarProps = {
  filters: ListingsFilters;
  onFiltersChange: (updater: (current: ListingsFilters) => ListingsFilters) => void;
  onClear: () => void;
  className?: string;
  onApply?: () => void;
};

export function ListingsFilterSidebar({
  filters,
  onFiltersChange,
  onClear,
  className,
  onApply,
}: ListingsFilterSidebarProps) {
  const propertyTypeValues = {
    apartment: filters.propertyType === "apartment",
    studio: filters.propertyType === "studio",
    house: filters.propertyType === "house",
  };

  const amenityValues = {
    power: filters.amenities.includes("power"),
    water: filters.amenities.includes("water"),
    security: filters.amenities.includes("security"),
  };

  return (
    <aside className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Clear all
        </button>
      </div>

      <PriceRangeFilter
        minValue={filters.minPrice}
        maxValue={filters.maxPrice}
        onMinChange={(value) =>
          onFiltersChange((current) => ({ ...current, minPrice: value }))
        }
        onMaxChange={(value) =>
          onFiltersChange((current) => ({ ...current, maxPrice: value }))
        }
      />

      <CheckboxFilterList
        title="Property Type"
        options={PROPERTY_TYPE_OPTIONS}
        values={propertyTypeValues}
        onChange={(id, checked) =>
          onFiltersChange((current) => ({
            ...current,
            propertyType: checked ? id : "",
          }))
        }
      />

      <VerificationFilterCard
        checked={filters.verifiedOnly}
        onChange={(checked) =>
          onFiltersChange((current) => ({ ...current, verifiedOnly: checked }))
        }
      />

      <CheckboxFilterList
        title="Essential Amenities"
        options={AMENITY_OPTIONS}
        values={amenityValues}
        onChange={(id, checked) =>
          onFiltersChange((current) => ({
            ...current,
            amenities: checked
              ? [...current.amenities, id]
              : current.amenities.filter((amenity) => amenity !== id),
          }))
        }
      />

      <Button
        type="button"
        variant="primary"
        className="w-full"
        onClick={onApply}
      >
        Apply Filter
      </Button>
    </aside>
  );
}
