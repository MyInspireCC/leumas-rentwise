import { Headphones, Lock, Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Shield,
    title: "100% Verified",
    description: "Every listing is physically inspected before going live.",
  },
  {
    icon: Lock,
    title: "Secure Escrow",
    description: "Your payment is held safely until inspection is complete.",
  },
  {
    icon: Headphones,
    title: "Local Experts",
    description: "Our agents know Lagos neighborhoods inside and out.",
  },
] as const;

type WhyRentWiseCardProps = {
  className?: string;
};

export function WhyRentWiseCard({ className }: WhyRentWiseCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg bg-primary p-5 text-primary-foreground sm:p-6",
        className,
      )}
    >
      <h2 className="mb-5 text-lg font-bold">Why RentWise?</h2>

      <ul className="space-y-5">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10">
              <Icon icon={feature.icon} size="sm" className="text-primary-foreground" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{feature.title}</p>
              <p className="text-sm leading-relaxed text-primary-foreground/80">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
