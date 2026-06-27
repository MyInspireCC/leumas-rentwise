"use client";

import { Building2, CreditCard, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import {
  PAYMENT_METHODS,
  type PaymentMethod,
} from "@/lib/constants/mock-booking";
import { cn } from "@/lib/utils";

const METHOD_ICONS: Record<PaymentMethod, LucideIcon> = {
  card: CreditCard,
  bank: Building2,
  ussd: Smartphone,
};

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  className?: string;
};

export function PaymentMethodSelector({
  value,
  onChange,
  className,
}: PaymentMethodSelectorProps) {
  return (
    <div className={cn("min-w-0", className)} role="radiogroup" aria-label="Payment method">
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Payment method
      </p>

      <ul className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = value === method.id;

          return (
            <li key={method.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange(method.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon icon={METHOD_ICONS[method.id]} size="sm" />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {method.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {method.description}
                  </span>
                </span>

                <span
                  className={cn(
                    "ml-auto size-4 shrink-0 rounded-full border-2",
                    isSelected ? "border-primary bg-primary" : "border-border",
                  )}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
