"use client";

import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { PaymentMethodSelector } from "@/components/booking/payment-method-selector";
import { CostBreakdownRow } from "@/components/listings/cost-breakdown-row";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { createInspection, createPayment } from "@/lib/api";
import {
  ADD_ON_FEE,
  getBookingTotal,
  INSPECTION_FEE,
  SERVICE_CHARGE,
  type PaymentMethod,
} from "@/lib/constants/mock-booking";
import { formatPriceFull } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const NAVIGATION_DELAY_MS = 1200;

type PaymentSummaryCardProps = {
  listingId: string;
  addOn?: boolean;
  className?: string;
};

export function PaymentSummaryCard({
  listingId,
  addOn = false,
  className,
}: PaymentSummaryCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasAddOn = addOn || searchParams.get("addOn") === "true";
  const total = getBookingTotal(hasAddOn);

  const handlePay = async () => {
    if (isLoading) return;

    const date = searchParams.get("date");
    const timeSlot = searchParams.get("timeSlot");
    const addOnParam = searchParams.get("addOn") === "true";
    const userRaw = localStorage.getItem("user");

    if (!date || !timeSlot) {
      setError("Missing booking details. Please start again.");
      return;
    }

    if (!userRaw) {
      router.push(`/login?redirect=/listings/${listingId}/book/confirm?${searchParams.toString()}`);
      return;
    }

    const user = JSON.parse(userRaw) as { id: string };

    setIsLoading(true);
    setError(null);

    try {
      const inspectionRes = await createInspection({
        listingId,
        userId: user.id,
        date,
        timeSlot,
        addOn: addOnParam,
      });

      if (!inspectionRes.success || !inspectionRes.data) {
        throw new Error(inspectionRes.error ?? "Failed to create inspection");
      }

      const inspectionId = inspectionRes.data.id;

      const paymentRes = await createPayment({
        inspectionId,
        addOn: addOnParam,
      });

      if (!paymentRes.success) {
        throw new Error(paymentRes.error ?? "Payment failed");
      }

      const params = new URLSearchParams();
      params.set("date", date);
      params.set("timeSlot", timeSlot);
      params.set("addOn", String(addOnParam));
      params.set("bookingId", inspectionId);

      const query = params.toString();

      window.setTimeout(() => {
        router.push(
          `/listings/${listingId}/book/success${query ? `?${query}` : ""}`,
        );
      }, NAVIGATION_DELAY_MS);
    } catch (payError) {
      setError(
        payError instanceof Error ? payError.message : "Something went wrong",
      );
      setIsLoading(false);
    }
  };

  return (
    <aside
      className={cn(
        "rounded-lg border border-border bg-background p-4 shadow-[var(--shadow-card)] sm:p-6",
        className,
      )}
    >
      <h2 className="mb-5 text-lg font-bold text-foreground">Payment Summary</h2>

      <div className="space-y-3">
        <CostBreakdownRow label="Inspection Fee" amount={INSPECTION_FEE} />
        {hasAddOn && (
          <CostBreakdownRow
            label="Verified Inspector (optional)"
            amount={ADD_ON_FEE}
          />
        )}
        <CostBreakdownRow label="Service Charge" amount={SERVICE_CHARGE} />
        <CostBreakdownRow label="Total to Pay" amount={total} emphasized />
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <PaymentMethodSelector value={selectedMethod} onChange={setSelectedMethod} />
      </div>

      {error && (
        <p className="mt-4 text-xs text-destructive">{error}</p>
      )}

      <Button
        type="button"
        variant="primary"
        className={cn("mt-6 h-11 w-full", isLoading && "cursor-wait opacity-70")}
        disabled={isLoading}
        onClick={handlePay}
      >
        {isLoading ? "Processing..." : `Pay ${formatPriceFull(total)}`}
      </Button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Icon icon={Lock} size="sm" />
        Secured by Paystack
      </p>
    </aside>
  );
}
