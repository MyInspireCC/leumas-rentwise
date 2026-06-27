import { cn } from "@/lib/utils";

type FilterGroupProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function FilterGroup({ title, children, className }: FilterGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}
