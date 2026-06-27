import { Bell, Settings } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  name: string;
  className?: string;
};

export function DashboardHeader({ name, className }: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {name}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Here&apos;s what&apos;s happening with your properties and inspections.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="size-9" aria-label="Notifications">
          <Icon icon={Bell} size="sm" />
        </Button>
        <Button variant="outline" size="icon" className="size-9" aria-label="Settings">
          <Icon icon={Settings} size="sm" />
        </Button>
      </div>
    </header>
  );
}
