import { Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type VerificationFilterCardProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function VerificationFilterCard({
  checked,
  onChange,
  className,
}: VerificationFilterCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r from-[#FFF4E5] to-[#FFE4B8] p-4",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-accent">
          <Icon icon={Shield} size="sm" className="text-accent-foreground" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">Verification</h3>
      </div>
      <label
        htmlFor="verified-only"
        className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground"
      >
        <input
          id="verified-only"
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        />
        <span>Verified Listings Only</span>
      </label>
    </div>
  );
}
