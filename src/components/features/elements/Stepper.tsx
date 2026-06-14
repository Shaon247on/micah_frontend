"use client";

import { cn } from "@/lib/utils";
import { STEPPER_STEPS, type QuoteStep } from "@/types/HvacQuote.types";

interface StepperProps {
  currentStep: QuoteStep;
}

export function Stepper({ currentStep }: StepperProps) {
  const currentIndex = STEPPER_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-between w-full px-2">
      {STEPPER_STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                  isCompleted &&
                    "bg-[#DE7B42] border-[#DE7B42] text-white",
                  isActive &&
                    "bg-[#DE7B42] border-[#DE7B42] text-white shadow-md shadow-[#DE7B42]/30",
                  !isCompleted &&
                    !isActive &&
                    "bg-white border-[#D7DCE5] text-[#9AA3B2]"
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold transition-colors duration-300",
                  isActive ? "text-[#DE7B42]" : "text-[#9AA3B2]",
                  isCompleted ? "text-[#DE7B42]" : ""
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPPER_STEPS.length - 1 && (
              <div className="flex-1 mx-2 mb-5">
                <div className="h-0.5 w-full bg-[#D7DCE5] relative overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 bg-[#DE7B42] transition-all duration-500 rounded-full",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}