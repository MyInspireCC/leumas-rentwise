import type { LucideIcon } from "lucide-react";

import { FilterGroup } from "@/components/listings/filter-group";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export type CheckboxFilterOption = {
  id: string;
  label: string;
  icon?: LucideIcon;
};

type CheckboxFilterListProps = {
  title: string;
  options: CheckboxFilterOption[];
  values: Record<string, boolean>;
  onChange: (id: string, checked: boolean) => void;
  className?: string;
};

export function CheckboxFilterList({
  title,
  options,
  values,
  onChange,
  className,
}: CheckboxFilterListProps) {
  return (
    <FilterGroup title={title} className={className}>
      <ul className="space-y-2.5">
        {options.map((option) => (
          <li key={option.id}>
            <label
              htmlFor={option.id}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground"
            >
              <input
                id={option.id}
                type="checkbox"
                checked={values[option.id] ?? false}
                onChange={(event) => onChange(option.id, event.target.checked)}
                className="size-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
              />
              {option.icon && (
                <Icon icon={option.icon} size="sm" className="text-muted-foreground" />
              )}
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </FilterGroup>
  );
}
