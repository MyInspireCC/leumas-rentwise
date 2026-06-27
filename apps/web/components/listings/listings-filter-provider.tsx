"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  INITIAL_LISTINGS_FILTERS,
  type ListingsFilters,
} from "@/lib/listings/filter-listings";

type ListingsFilterContextValue = {
  filters: ListingsFilters;
  setFilters: React.Dispatch<React.SetStateAction<ListingsFilters>>;
  resetFilters: () => void;
};

const ListingsFilterContext = createContext<ListingsFilterContextValue | null>(
  null,
);

export function ListingsFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ListingsFilters>(INITIAL_LISTINGS_FILTERS);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      resetFilters: () => setFilters(INITIAL_LISTINGS_FILTERS),
    }),
    [filters],
  );

  return (
    <ListingsFilterContext.Provider value={value}>
      {children}
    </ListingsFilterContext.Provider>
  );
}

export function useListingsFilters() {
  const context = useContext(ListingsFilterContext);

  if (!context) {
    throw new Error("useListingsFilters must be used within ListingsFilterProvider");
  }

  return context;
}

export function useListingsFiltersOptional() {
  return useContext(ListingsFilterContext);
}
