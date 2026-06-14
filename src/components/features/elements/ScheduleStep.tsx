"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import {
  scheduleSchema,
  type ScheduleFormValues,
  type HvacSystem,
  formatCurrency,
} from "@/types/HvacQuote.types";

interface ScheduleStepProps {
  system: HvacSystem;
  onSubmit: (values: ScheduleFormValues) => void;
  onBack: () => void;
}

export function ScheduleStep({ system, onSubmit, onBack }: ScheduleStepProps) {
  const [promoApplied, setPromoApplied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      installDate: "tomorrow",
      pickedDate: "",
      email: "",
      notes: "",
      promoCode: "",
      acceptedTerms: false,
    },
    mode: "onChange",
  });

  const installDate = watch("installDate");
  const promoCode = watch("promoCode");
  const acceptedTerms = watch("acceptedTerms");

  const discount = system.retailPrice - system.cashPrice;

  function handleApplyPromo() {
    if (promoCode?.trim()) {
      setPromoApplied(true);
    }
  }

  function handleFormSubmit(values: ScheduleFormValues) {
    onSubmit(values);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37]">
          Final Step! Choose an Install Date
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5 grid grid-cols-1 lg:grid-cols-5 items-start justify-center gap-3"
      >
        {/* System Summary */}
        <div className="rounded-2xl h-full col-span-1 lg:col-span-3 border border-[#E8EEF7] bg-white p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#121F37]">
              Schedule My Installation
            </h3>

            <p className="text-sm font-semibold text-[#6B6B6B] mt-1">
              {system.brand} {system.name} HVAC System
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#9AA3B2]">
            {[
              system.type,
              system.fuel,
              `${system.seer2}`,
              `${system.partsWarranty} Parts Warranty`,
              `${system.laborWarranty} Labor Warranty`,
            ].map((tag, i, arr) => (
              <span key={tag} className="flex items-center gap-3">
                {tag}

                {i < arr.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-[#D7DCE5]" />
                )}
              </span>
            ))}
          </div>

          {/* Install Date */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#DE7B42]">
              Select a Preferred Install Date
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  value: "tomorrow",
                  label: "Tomorrow",
                  sub: "Next-Day Installation",
                },
                {
                  value: "pick",
                  label: "Pick a Day",
                  sub: "Select an Install Date",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setValue("installDate", opt.value as "tomorrow" | "pick", {
                      shouldValidate: true,
                    })
                  }
                  className={cn(
                    "rounded-xl border-2 px-4 py-4 text-left transition-all duration-200",
                    installDate === opt.value
                      ? "border-[#DE7B42] bg-[#FFF5EF]"
                      : "border-[#D7DCE5] bg-white hover:border-[#DE7B42]/50",
                  )}
                >
                  <p className="font-bold text-[#121F37] text-sm">
                    {opt.label}
                  </p>

                  <p className="text-xs text-[#9AA3B2] mt-0.5">{opt.sub}</p>
                </button>
              ))}
            </div>

            {errors.installDate && (
              <p className="text-xs text-red-500">
                {errors.installDate.message}
              </p>
            )}

            {installDate === "pick" && (
              <div className="space-y-2">
                <Input
                  type="date"
                  className="h-12 rounded-xl border-[#D7DCE5]"
                  {...register("pickedDate")}
                />

                {errors.pickedDate && (
                  <p className="text-xs text-red-500">
                    {errors.pickedDate.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#121F37]">
              Email Address <span className="text-red-500">*</span>
            </label>

            <Input
              type="email"
              placeholder="your@email.com"
              className="h-13 rounded-xl border-[#D7DCE5]"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#121F37]">
              Additional Notes
            </label>

            <Textarea
              placeholder="Special requests or instructions..."
              className="min-h-25 rounded-xl border-[#D7DCE5] resize-none"
              {...register("notes")}
            />

            {errors.notes && (
              <p className="text-xs text-red-500">{errors.notes.message}</p>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className="rounded-2xl h-full col-span-1 lg:col-span-2 border border-[#E8EEF7] bg-white p-5 space-y-4">
          <h3 className="text-base font-bold text-[#121F37]">Price Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#6B6B6B]">
              <span>Retail Price:</span>

              <span className="font-semibold text-[#121F37]">
                {formatCurrency(system.retailPrice)}
              </span>
            </div>

            <div className="flex justify-between text-[#DE7B42] font-semibold">
              <span>Online Discount:</span>

              <span>-{formatCurrency(discount)}</span>
            </div>
          </div>

          {/* Promo */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                className="h-11 rounded-xl border-[#D7DCE5]"
                {...register("promoCode")}
              />

              <Button
                type="button"
                onClick={handleApplyPromo}
                className="h-11 px-5 rounded-xl bg-[#3D4E6B] text-white"
              >
                Apply
              </Button>
            </div>

            {promoApplied && (
              <p className="text-xs text-[#22c55e]">✓ Promo code applied!</p>
            )}
          </div>

          <hr className="border-[#E8EEF7]" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between font-semibold text-[#DE7B42]">
              <span>Total Savings:</span>

              <span>-{formatCurrency(discount)}</span>
            </div>

            <div className="flex justify-between font-extrabold text-[#121F37] text-base">
              <span>Cash Price:</span>

              <span>{formatCurrency(system.cashPrice)}</span>
            </div>

            <div className="flex justify-between text-[#6B6B6B]">
              <span>Monthly payment</span>

              <span className="font-semibold text-[#121F37]">
                ${system.monthlyPrice}/mo
              </span>
            </div>
          </div>

          <hr className="border-[#E8EEF7]" />

          {/* Terms */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  setValue("acceptedTerms", !acceptedTerms, {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 rounded border-2 flex items-center justify-center",
                  acceptedTerms
                    ? "border-[#DE7B42] bg-[#DE7B42]"
                    : "border-[#D7DCE5] bg-white",
                )}
              >
                {acceptedTerms && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              <span className="text-sm text-[#6B6B6B]">
                I accept the{" "}
                <button type="button" className="text-[#2563EB] underline">
                  Terms of Service
                </button>
              </span>
            </div>

            {errors.acceptedTerms && (
              <p className="text-xs text-red-500">
                {errors.acceptedTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!acceptedTerms}
            className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] disabled:bg-[#C4C4C4] text-white font-extrabold uppercase tracking-wide text-sm flex items-center justify-center gap-2"
          >
            Claim My Quote & Submit
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* Footer */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 text-[#6B6B6B]" />

              <p className="text-sm font-semibold text-[#121F37]">
                No Payment Required Now
              </p>
            </div>

            <p className="text-xs text-[#9AA3B2] leading-relaxed">
              We'll contact you before collecting payment and confirming your
              installation date.
            </p>
          </div>
        </div>

        {/* Back */}
      </form>
      <div className="max-w-2xs mx-auto">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full h-12 rounded-xl border-[#D7DCE5] text-[#121F37] font-semibold hover:bg-[#F5F7FA]"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
