import Link from "next/link";
import { Building2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/shared/icon";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className }: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-lg tracking-tight",
        isDark ? "text-primary-foreground" : "text-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          isDark ? "bg-primary-foreground/10" : "bg-primary text-primary-foreground",
        )}
      >
        <Icon icon={Building2} size="sm" />
      </span>
      <span>RentWise</span>
    </Link>
  );
}
