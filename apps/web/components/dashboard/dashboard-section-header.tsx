import Link from "next/link";

import { cn } from "@/lib/utils";

type DashboardSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export function DashboardSectionHeader({
  title,
  actionLabel,
  actionHref = "#",
  className,
}: DashboardSectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-4", className)}>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {actionLabel && (
        <Link
          href={actionHref}
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
