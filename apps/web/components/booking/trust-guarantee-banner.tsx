import { Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type TrustGuaranteeBannerProps = {
  className?: string;
};

export function TrustGuaranteeBanner({ className }: TrustGuaranteeBannerProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg bg-[#FFF9E6] p-4 sm:p-5",
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/30">
        <Icon icon={Shield} size="md" className="text-accent-foreground" />
      </span>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Your payment is protected
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Funds are held in secure escrow and only released to the landlord after
          your inspection is completed. If anything doesn&apos;t match the listing,
          we&apos;ll help you resolve it.
        </p>
      </div>
    </div>
  );
}
