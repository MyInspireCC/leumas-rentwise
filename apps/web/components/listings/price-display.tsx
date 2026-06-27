import { formatPrice, formatPriceFull } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  amount: number;
  period?: string;
  format?: "compact" | "full";
  size?: "default" | "lg";
  className?: string;
};

export function PriceDisplay({
  amount,
  period = "yr",
  format = "compact",
  size = "default",
  className,
}: PriceDisplayProps) {
  const value =
    format === "full"
      ? formatPriceFull(amount, period)
      : formatPrice(amount, period);

  return (
    <p
      className={cn(
        "font-bold text-foreground",
        size === "default" && "text-base sm:text-lg",
        size === "lg" && "text-2xl sm:text-3xl",
        className,
      )}
    >
      {value}
    </p>
  );
}
