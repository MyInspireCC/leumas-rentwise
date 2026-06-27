import type { LucideIcon } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type AmenityCardProps = {
  label: string;
  icon: LucideIcon;
  className?: string;
};

export function AmenityCard({ label, icon, className }: AmenityCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg bg-muted px-4 py-3",
        className,
      )}
    >
      <Icon icon={icon} size="sm" className="text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
