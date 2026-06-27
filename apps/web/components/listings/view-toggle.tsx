"use client";

import { List, Map } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "map";

type ViewToggleProps = {
  value?: ViewMode;
  onChange?: (value: ViewMode) => void;
  className?: string;
};

export function ViewToggle({
  value = "list",
  onChange,
  className,
}: ViewToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-border bg-background p-1",
        className,
      )}
      role="group"
      aria-label="View mode"
    >
      <button
        type="button"
        aria-pressed={value === "list"}
        onClick={() => onChange?.("list")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          value === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon icon={List} size="sm" className="text-current" />
        List
      </button>
      <button
        type="button"
        aria-pressed={value === "map"}
        disabled
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground",
        )}
      >
        <Icon icon={Map} size="sm" />
        Map
      </button>
    </div>
  );
}
