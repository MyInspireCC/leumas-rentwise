import { CircleCheck } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { formatPriceFull } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type InspectionSuccessHeroProps = {
  total: number;
  className?: string;
};

export function InspectionSuccessHero({ total, className }: InspectionSuccessHeroProps) {
  return (
    <div className={cn("space-y-4 text-center", className)}>
      <div className="flex justify-center">
        <span className="animate-scale-in flex size-16 items-center justify-center rounded-full bg-success/15 sm:size-20">
          <Icon icon={CircleCheck} size="lg" className="size-10 text-success sm:size-12" />
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Inspection Scheduled!
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We&apos;ve received your payment of {formatPriceFull(total)}. This
          is held in escrow and will be released after your inspection is completed.
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation has been sent to your email.
        </p>
      </div>
    </div>
  );
}
