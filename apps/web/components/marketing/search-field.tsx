import type { LucideIcon } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type SearchFieldProps = {
  icon: LucideIcon;
  label: string;
  placeholder?: string;
  variant?: "input" | "select";
  options?: { label: string; value: string }[];
  name?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  className?: string;
};

export function SearchField({
  icon,
  label,
  placeholder,
  variant = "input",
  options = [],
  name,
  id,
  value,
  defaultValue,
  onChange,
  className,
}: SearchFieldProps) {
  const fieldId = id ?? name;

  return (
    <div className={cn("flex min-w-0 flex-1 items-center gap-3 px-3 py-2", className)}>
      <Icon icon={icon} size="md" className="text-muted-foreground" />
      <label htmlFor={fieldId} className="sr-only">
        {label}
      </label>
      {variant === "select" ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-full min-w-0 appearance-none bg-transparent text-sm text-foreground outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      )}
    </div>
  );
}
