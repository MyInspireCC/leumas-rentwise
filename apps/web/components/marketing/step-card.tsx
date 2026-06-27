import type { LucideIcon } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type StepCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function StepCard({
  title,
  description,
  icon,
  className,
}: StepCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/5">
        <Icon icon={icon} className="size-7 text-white" aria-hidden />
      </div>

      <h3 className="mt-6 text-base font-semibold text-white sm:text-lg">
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80 sm:max-w-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}
