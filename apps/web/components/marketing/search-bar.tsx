"use client";

import { Home, MapPin } from "lucide-react";

import { SearchField } from "@/components/marketing/search-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES = [
  { label: "Apartment", value: "apartment" },
  { label: "Duplex", value: "duplex" },
  { label: "Studio", value: "studio" },
] as const;

type SearchBarProps = {
  className?: string;
};

export function SearchBar({ className }: SearchBarProps) {
  return (
    <form
      role="search"
      aria-label="Search properties"
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg bg-background p-2 shadow-[var(--shadow-elevated)] md:flex-row md:items-stretch md:gap-0 md:p-3",
        className,
      )}
      onSubmit={(event) => event.preventDefault()}
    >
      <SearchField
        icon={MapPin}
        label="Location"
        name="location"
        placeholder="Enter location"
        className="md:py-3"
      />

      <div
        className="hidden w-px shrink-0 self-center bg-border md:block md:h-10"
        aria-hidden
      />

      <SearchField
        icon={Home}
        label="Property type"
        name="propertyType"
        variant="select"
        options={[...PROPERTY_TYPES]}
        defaultValue={PROPERTY_TYPES[0].value}
        className="md:py-3"
      />

      <Button
        type="submit"
        variant="primary"
        className="h-11 w-full shrink-0 md:ml-2 md:w-auto md:min-w-[120px]"
      >
        Search
      </Button>
    </form>
  );
}
