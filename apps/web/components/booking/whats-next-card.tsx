import { Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

const NEXT_STEPS = [
  "Agent contact revealed in dashboard",
  "SMS reminder before inspection",
  "Rate inspection to release escrow",
] as const;

type WhatsNextCardProps = {
  className?: string;
};

export function WhatsNextCard({ className }: WhatsNextCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg bg-primary p-5 text-primary-foreground sm:p-6",
        className,
      )}
    >
      <h2 className="mb-5 text-lg font-bold">What&apos;s Next?</h2>

      <ol className="space-y-4">
        {NEXT_STEPS.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-xs font-bold">
              {index + 1}
            </span>
            <p className="pt-0.5 text-sm leading-relaxed text-primary-foreground/90">
              {step}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
        <Icon icon={Shield} size="sm" className="text-primary-foreground" />
        RentWise Secure Escrow Active
      </div>
    </section>
  );
}
