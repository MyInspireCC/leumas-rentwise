"use client";

import { Check } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { MOCK_TIME_SLOTS } from "@/lib/constants/mock-booking";
import { cn } from "@/lib/utils";

type TimeSlotSelectorProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function TimeSlotSelector({
  value,
  onChange,
  className,
}: TimeSlotSelectorProps) {
  return (
    <div className={cn("min-w-0", className)} role="radiogroup" aria-label="Available slots">
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Available slots
      </p>

      <ul className="space-y-3">
        {MOCK_TIME_SLOTS.map((slot) => {
          const isSelected = value === slot.id;

          return (
            <li key={slot.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange?.(slot.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                <span>{slot.label}</span>
                {isSelected && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary">
                    <Icon icon={Check} size="sm" className="text-primary-foreground" />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {!value && (
        <p className="mt-2 text-xs text-muted-foreground">
          Select a time slot to continue
        </p>
      )}
    </div>
  );
}
