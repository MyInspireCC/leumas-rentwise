import { BadgeCheck, CheckCircle, Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import type { ListingBadgeType } from "@/lib/constants/mock-listings";

type VerifiedBadgeVariant = ListingBadgeType | "listing" | "host";

const BADGE_CONFIG = {
  verified: {
    label: "Verified Provider",
    className: "bg-success text-white",
    icon: CheckCircle,
  },
  inspected: {
    label: "Inspected Property",
    className: "bg-accent text-accent-foreground",
    icon: Shield,
  },
  pending: {
    label: "Pending Review",
    className: "bg-muted-foreground text-white",
    icon: Shield,
  },
  listing: {
    label: "Verified Listing",
    className: "bg-accent text-accent-foreground",
    icon: CheckCircle,
  },
  host: {
    label: "VERIFIED HOST",
    className: "bg-primary text-primary-foreground",
    icon: BadgeCheck,
  },
} as const;

type VerifiedBadgeProps = {
  variant?: VerifiedBadgeVariant;
  className?: string;
};

export function VerifiedBadge({
  variant = "verified",
  className,
}: VerifiedBadgeProps) {
  const config = BADGE_CONFIG[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
        variant === "host" && "uppercase tracking-wide",
        config.className,
        className,
      )}
    >
      <Icon icon={config.icon} size="sm" className="text-current" />
      {config.label}
    </span>
  );
}
