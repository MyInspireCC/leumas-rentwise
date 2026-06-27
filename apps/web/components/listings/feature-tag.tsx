import type { LucideIcon } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type FeatureTagProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export function FeatureTag({ label, icon, className }: FeatureTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {icon && <Icon icon={icon} size="sm" className="text-muted-foreground" />}
      {label}
    </span>
  );
}
