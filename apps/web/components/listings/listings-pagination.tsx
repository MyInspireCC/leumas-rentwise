"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type ListingsPaginationProps = {
  totalPages?: number;
  className?: string;
};

export function ListingsPagination({
  totalPages = 3,
  className,
}: ListingsPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        className="flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon icon={ChevronLeft} size="sm" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => setCurrentPage(page)}
            className={cn(
              "flex size-10 items-center justify-center rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "border border-border text-foreground hover:bg-muted",
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((page) => Math.min(totalPages, page + 1))
        }
        className="flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon icon={ChevronRight} size="sm" />
      </button>
    </nav>
  );
}
