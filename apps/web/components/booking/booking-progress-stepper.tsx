"use client";

import { Check } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { BOOKING_STEPS } from "@/lib/constants/mock-booking";
import { cn } from "@/lib/utils";

type BookingProgressStepperProps = {
  currentStep: 1 | 2 | 3;
  className?: string;
};

export function BookingProgressStepper({
  currentStep,
  className,
}: BookingProgressStepperProps) {
  return (
    <nav
      aria-label="Booking progress"
      className={cn("flex items-center justify-center gap-2 sm:gap-4", className)}
    >
      {BOOKING_STEPS.map((step, index) => {
        const isTerminalStep = currentStep === 3;
        const isComplete =
          step.id < currentStep || (isTerminalStep && step.id === currentStep);
        const isActive = step.id === currentStep && !isTerminalStep;
        const isUpcoming = step.id > currentStep;
        const connectorComplete =
          step.id < currentStep || (isTerminalStep && step.id < BOOKING_STEPS.length);

        return (
          <div key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-semibold",
                  isComplete && "bg-primary text-primary-foreground",
                  isActive && "bg-primary text-primary-foreground",
                  isUpcoming && "bg-muted text-muted-foreground",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? (
                  <Icon icon={Check} size="sm" className="text-primary-foreground" />
                ) : (
                  step.id
                )}
              </span>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  isComplete && "text-primary",
                  isActive && "font-semibold text-primary",
                  isUpcoming && "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>

            {index < BOOKING_STEPS.length - 1 && (
              <div
                className={cn(
                  "w-8 sm:w-12",
                  connectorComplete ? "h-1 bg-primary" : "h-px bg-border",
                )}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
