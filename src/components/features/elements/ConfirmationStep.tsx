"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type HvacSystem,
  type ScheduleFormValues,
  formatCurrency,
  generateOrderNumber,
} from "@/types/HvacQuote.types";
import { useMemo } from "react";

interface ConfirmationStepProps {
  system: HvacSystem;
  schedule: ScheduleFormValues;
  address: string;
  onClose: () => void;
}

const NEXT_STEPS = [
  "Our team will review your order and contact you within 1 hour to confirm your order and scheduling details.",
  "A licensed technician will perform a verification call to confirm your installation date and discuss any specific requirements.",
  "We'll arrive at your home on the scheduled date within a 2 hour window for the installation.",
];

function getInstallDateLabel(schedule: ScheduleFormValues): string {
  if (schedule.installDate === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  if (schedule.pickedDate) {
    return new Date(schedule.pickedDate + "T00:00:00").toLocaleDateString(
      "en-US",
      { month: "long", day: "numeric", year: "numeric" },
    );
  }
  return "TBD";
}

export function ConfirmationStep({
  system,
  schedule,
  address,
  onClose,
}: ConfirmationStepProps) {
  const orderNumber = useMemo(() => generateOrderNumber(), []);
  const discount = system.retailPrice - system.cashPrice;
  const installDateLabel = getInstallDateLabel(schedule);

  return (
    <div className="space-y-6">
      {/* Success header */}
      <div className="text-center space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdf4] border border-[#bbf7d0]">
          <CheckCircle2 className="h-7 w-7 text-[#22c55e]" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37] leading-tight">
            Request Received
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed max-w-sm mx-auto">
            Your request has been received. Our team will contact you to confirm.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-[#121F37]">
          What Happens Next?
        </h3>
        <div className="space-y-3">
          {NEXT_STEPS.map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D7DCE5] text-xs font-bold text-[#6B6B6B]">
                {i + 1}
              </span>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-[#121F37]">Order Summary</h3>

        {/* Order number */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B6B6B]">Order Number:</span>
          <span className="text-sm font-extrabold text-[#121F37]">
            {orderNumber}
          </span>
        </div>

        <hr className="border-[#E8EEF7]" />

        {/* Address */}
        <div>
          <p className="text-sm font-bold text-[#121F37]">
            Installation Address:
          </p>
          <p className="text-sm text-[#6B6B6B] mt-0.5">{address}</p>
        </div>

        {/* System */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B6B6B]">System:</span>
          <span className="text-sm font-semibold text-[#121F37] text-right max-w-45">
            {system.brand} {system.name}
          </span>
        </div>

        {/* System badges */}
        <div className="grid grid-cols-2 gap-2">
          {[
            `SEER2: ${system.seer2.replace(" SEER2", "")}`,
            "Sound Level: Moderate",
            `Parts Warranty: ${system.partsWarranty} Parts Warranty`,
            `Labor Warranty: ${system.laborWarranty} Parts Warranty`,
          ].map((badge) => (
            <div
              key={badge}
              className="rounded-lg bg-[#F5F7FA] px-3 py-2 text-xs text-[#6B6B6B] font-medium"
            >
              {badge}
            </div>
          ))}
        </div>

        <hr className="border-[#E8EEF7]" />

        {/* Pricing rows */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#6B6B6B]">
            <span>Installation Preferred Date:</span>
            <span className="font-semibold text-[#121F37]">
              {installDateLabel}
            </span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>Retails Price:</span>
            <span className="font-semibold text-[#121F37]">
              {formatCurrency(system.retailPrice)}
            </span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>Online Discount:</span>
            <span className="font-semibold text-[#22c55e]">
              -{formatCurrency(discount)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-[#22c55e]">
            <span>Total Savings:</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>Cash Amount</span>
            <span className="font-extrabold text-[#121F37]">
              {formatCurrency(system.cashPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#6B6B6B]">
            <span>Financing Option:</span>
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-[#e8f5e9] px-2.5 py-1 text-sm font-extrabold text-[#2e7d32]">
                ${system.monthlyPrice}
              </span>
              <span className="text-sm text-[#6B6B6B]">/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Support line */}
      <p className="text-center text-xs text-[#6B6B6B]">
        Need to make changes or have questions? Contact us at <strong className="text-[#121F37]">Phone Number</strong>
      </p>

      <div className="max-w-2xs mx-auto">
        <Button
          type="button"
          onClick={onClose}
          className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm transition-all"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
