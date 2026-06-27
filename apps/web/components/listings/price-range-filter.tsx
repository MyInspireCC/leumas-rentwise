import { Input } from "@/components/ui/input";
import { FilterGroup } from "@/components/listings/filter-group";

type PriceRangeFilterProps = {
  minValue?: string;
  maxValue?: string;
  onMinChange?: (value: string) => void;
  onMaxChange?: (value: string) => void;
};

export function PriceRangeFilter({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  return (
    <FilterGroup title="Price Range (NGN/Year)">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="price-min" className="sr-only">
            Minimum price
          </label>
          <Input
            id="price-min"
            type="text"
            inputMode="numeric"
            placeholder="Min"
            value={minValue}
            onChange={(event) => onMinChange?.(event.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3 text-sm"
          />
        </div>
        <div>
          <label htmlFor="price-max" className="sr-only">
            Maximum price
          </label>
          <Input
            id="price-max"
            type="text"
            inputMode="numeric"
            placeholder="Max"
            value={maxValue}
            onChange={(event) => onMaxChange?.(event.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3 text-sm"
          />
        </div>
      </div>
    </FilterGroup>
  );
}
