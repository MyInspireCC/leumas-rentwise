import Image from "next/image";
import { Star } from "lucide-react";

import { VerifiedBadge } from "@/components/listings/verified-badge";
import { Icon } from "@/components/shared/icon";
import type { ListingHost } from "@/lib/constants/mock-listing-details";
import { cn } from "@/lib/utils";

type HostCardProps = {
  host: ListingHost;
  className?: string;
};

export function HostCard({ host, className }: HostCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg bg-muted p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
          <Image
            src={host.image}
            alt={host.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{host.name}</h3>
            <VerifiedBadge variant="host" />
          </div>

          <p className="flex items-center gap-1.5 text-sm text-foreground">
            <Icon icon={Star} size="sm" className="fill-accent text-accent" />
            <span>
              {host.rating} Rating ({host.reviewCount} Reviews)
            </span>
          </p>

          <p className="text-sm text-muted-foreground">
            Host for {host.yearsHosting} year{host.yearsHosting !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
