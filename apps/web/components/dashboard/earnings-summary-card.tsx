import { Wallet } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { formatPriceFull } from "@/lib/formatters";
import type { AgentInspection } from "@/lib/dashboard/agent-dashboard-data";
import { getRecentEarnings, getTotalEarnings } from "@/lib/dashboard/agent-dashboard-data";
import { cn } from "@/lib/utils";

type EarningsSummaryCardProps = {
  inspections: AgentInspection[];
  className?: string;
};

export function EarningsSummaryCard({
  inspections,
  className,
}: EarningsSummaryCardProps) {
  const totalEarnings = getTotalEarnings(inspections);
  const recentEarnings = getRecentEarnings(inspections);

  return (
    <section
      id="earnings"
      className={cn(
        "rounded-lg border border-border bg-background p-5 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-muted">
          <Icon icon={Wallet} size="sm" className="text-primary" />
        </span>
        <h2 className="text-lg font-semibold text-foreground">Earnings</h2>
      </div>

      <p className="text-sm text-muted-foreground">Total Earnings</p>
      <p className="mt-1 text-2xl font-bold text-foreground">
        {formatPriceFull(totalEarnings)}
      </p>

      <div className="mt-5 space-y-3 border-t border-border pt-4">
        {recentEarnings.length === 0 ? (
          <p className="text-sm text-muted-foreground">No earnings yet</p>
        ) : (
          recentEarnings.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{entry.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-foreground">
                {formatPriceFull(entry.amount)}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
