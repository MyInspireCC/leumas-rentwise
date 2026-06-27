import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type SectionHeaderAction = {
  label: string;
  href: string;
};

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: SectionHeaderAction;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        isCenter && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("space-y-2", isCenter && "text-center")}>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80",
            isCenter && "sm:mt-0",
          )}
        >
          {action.label}
          <Icon icon={ChevronRight} size="sm" />
        </Link>
      )}
    </div>
  );
}
