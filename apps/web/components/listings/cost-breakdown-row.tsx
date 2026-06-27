import { formatPriceFull } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type CostBreakdownRowProps = {
  label: string;
  amount: number;
  emphasized?: boolean;
  className?: string;
};

export function CostBreakdownRow({
  label,
  amount,
  emphasized = false,
  className,
}: CostBreakdownRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 text-sm",
        emphasized && "border-t border-border pt-3 text-base font-semibold",
        className,
      )}
    >
      <span className={emphasized ? "text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={emphasized ? "text-foreground" : "text-foreground"}>
        {formatPriceFull(amount)}
      </span>
    </div>
  );
}
