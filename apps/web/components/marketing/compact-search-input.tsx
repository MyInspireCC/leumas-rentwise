"use client";

import { Search } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CompactSearchInputProps = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function CompactSearchInput({
  className,
  value,
  onChange,
}: CompactSearchInputProps) {
  return (
    <form
      role="search"
      aria-label="Search by location"
      className={cn("relative w-full max-w-md", className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <Icon
        icon={Search}
        size="sm"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        name="location"
        placeholder="Search by location..."
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-9 rounded-md border border-border bg-background pr-3 pl-9 text-sm shadow-none"
      />
    </form>
  );
}
