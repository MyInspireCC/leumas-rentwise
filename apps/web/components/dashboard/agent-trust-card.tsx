import { CheckCircle } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type AgentTrustCardProps = {
  verifiedListingsCount: number;
  className?: string;
};

export function AgentTrustCard({
  verifiedListingsCount,
  className,
}: AgentTrustCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg bg-primary p-5 text-primary-foreground shadow-[var(--shadow-card)] sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-bold">Verification Status</h2>
      <p className="mt-2 text-sm font-semibold text-primary-foreground/90">
        Verified Agent
      </p>
      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
        Your account and listings meet RentWise verification standards for trusted
        property management.
      </p>

      <ul className="mt-5 space-y-3">
        <li className="flex items-center gap-2 text-sm">
          <Icon icon={CheckCircle} size="sm" className="text-accent" />
          Identity Verified
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Icon icon={CheckCircle} size="sm" className="text-accent" />
          Listings Verified ({verifiedListingsCount})
        </li>
      </ul>
    </section>
  );
}
