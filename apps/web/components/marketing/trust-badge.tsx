import type { LucideIcon } from "lucide-react";
import { CheckCircle, MessageCircle, Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  { icon: CheckCircle, label: "Verified Listings Only" },
  { icon: Shield, label: "Secure Payments" },
  { icon: MessageCircle, label: "24/7 Support" },
] as const;

type TrustBadgeProps = {
  icon: LucideIcon;
  label: string;
};

export function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent">
        <Icon icon={icon} size="sm" className="text-accent-foreground" />
      </span>
      <span className="text-sm text-white/90">{label}</span>
    </div>
  );
}

type TrustBadgeRowProps = {
  className?: string;
};

export function TrustBadgeRow({ className }: TrustBadgeRowProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3",
        className,
      )}
    >
      {TRUST_ITEMS.map((item) => (
        <li key={item.label}>
          <TrustBadge icon={item.icon} label={item.label} />
        </li>
      ))}
    </ul>
  );
}
