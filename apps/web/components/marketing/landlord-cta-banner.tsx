import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandlordCtaBannerProps = {
  className?: string;
};

export function LandlordCtaBanner({ className }: LandlordCtaBannerProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r from-[#FFF4E5] to-[#FFE4B8] p-6 lg:flex lg:items-center lg:justify-between lg:p-10",
        className,
      )}
    >
      <div className="space-y-4 text-center lg:max-w-xl lg:text-left">
        <h2 className="text-2xl font-bold text-primary lg:text-3xl">
          Have a Property to Rent?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          List your property on RentWise and connect with verified tenants
          faster.
        </p>
      </div>

      <div className="mt-6 lg:mt-0 lg:shrink-0">
        <Button
          variant="primary"
          size="lg"
          className="w-full lg:w-auto"
          asChild
        >
          <Link href="/listings/create">List Your Property</Link>
        </Button>
      </div>
    </div>
  );
}
