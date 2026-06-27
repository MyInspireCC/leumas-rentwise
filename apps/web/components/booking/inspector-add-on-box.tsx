"use client";

import { ShieldCheck } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type InspectorAddOnBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function InspectorAddOnBox({
  checked,
  onChange,
  className,
}: InspectorAddOnBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r from-[#FFF4E5] to-[#FFE4B8] p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
          <Icon icon={ShieldCheck} size="md" className="text-accent-foreground" />
        </span>

        <div className="min-w-0 space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Verified Inspector Recommended
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Add a verified RentWise agent to accompany your visit for safety and
              neutral reporting.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground">
            <input
              type="checkbox"
              checked={checked}
              onChange={(event) => onChange(event.target.checked)}
              className="size-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <span>Add for ₦5,000</span>
          </label>
        </div>
      </div>
    </div>
  );
}
