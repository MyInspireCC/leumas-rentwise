import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import {
  formatBookingDate,
  getTimeSlotLabel,
} from "@/lib/constants/mock-booking";
import type { AgentInspection } from "@/lib/dashboard/agent-dashboard-data";
import { cn } from "@/lib/utils";

type InspectionRequestCardProps = {
  inspection: AgentInspection;
  className?: string;
};

function getStatusLabel(status: string) {
  if (status === "confirmed") return "Confirmed";
  if (status === "completed") return "Completed";
  return "Pending";
}

export function InspectionRequestCard({
  inspection,
  className,
}: InspectionRequestCardProps) {
  const statusLabel = getStatusLabel(inspection.status);

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-background p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md sm:w-40">
        <Image
          src={inspection.listing.image}
          alt={inspection.listing.title}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">
            {inspection.listing.title}
          </h3>
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {statusLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Icon icon={Calendar} size="sm" />
            {formatBookingDate(inspection.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon icon={Clock} size="sm" />
            {getTimeSlotLabel(inspection.timeSlot)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon icon={MapPin} size="sm" />
            {inspection.listing.location}
          </span>
        </div>
      </div>

      <Button variant="primary" className="h-10 shrink-0 sm:w-auto" asChild>
        <Link href={`/listings/${inspection.listing.id}`}>View Details</Link>
      </Button>
    </article>
  );
}
