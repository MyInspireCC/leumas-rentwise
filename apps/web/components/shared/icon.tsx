import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

type IconProps = {
  icon: LucideIcon;
  size?: keyof typeof sizeClasses;
  className?: string;
  "aria-hidden"?: boolean;
};

export function Icon({
  icon: IconComponent,
  size = "md",
  className,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <IconComponent
      className={cn(sizeClasses[size], "shrink-0", className)}
      strokeWidth={1.75}
      aria-hidden={ariaHidden}
    />
  );
}
