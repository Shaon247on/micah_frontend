"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Loader2, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatCurrency, type HvacSystem } from "@/types/hvacQuote.types";
import { submitQuote } from "@/actions/hvacEstimate.actions";

const scheduleSchema = z.object({
  installDate: z.enum(["tomorrow", "pick"]),
  pickedDate: z.string().optional(),
  fullName: z.string().min(2, "Full name is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  notes: z.string().optional(),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service",
  }),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ScheduleStepProps {
  system: HvacSystem;
  homeInfo: {
    squareFootage: number;
    stories: number;
    bedrooms: number;
    heatingSource: string;
  };
  address: string;
  onBack: () => void;
  onComplete: () => void;
}

export function ScheduleStep({
  system,
  homeInfo,
  address,
  onBack,
  onComplete,
}: ScheduleStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      fullName: "",
      phoneNumber: "",
      email: "",
      notes: "",
      acceptedTerms: false,
    },
    mode: "onChange",
  });

  const installDate = watch("installDate");
  const acceptedTerms = watch("acceptedTerms");
  const discount = system.retailPrice - system.cashPrice;

  async function onSubmit(values: ScheduleFormValues) {
    setIsSubmitting(true);

    try {
      const quoteData = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        address: address,
        squareFootage: homeInfo.squareFootage,
        stories: homeInfo.stories,
        bedrooms: homeInfo.bedrooms,
        heatingSource: homeInfo.heatingSource,
        selectedTier: parseInt(system.id),
        systemBrand: system.brand,
        systemName: system.name,
        systemPrice: system.cashPrice,
        retailPrice: system.retailPrice,
        cashPrice: system.cashPrice,
        onlineSavings: system.onlineSavings,
        monthlyPayment: system.monthlyPrice,
        preferredDate: values.installDate === "pick" ? values.pickedDate : null,
        preferredTime: null,
        notes: values.notes || null,
      };

      const result = await submitQuote(quoteData);

      if (result.success) {
        toast.success("Quote submitted successfully!");
        // ✅ Pass the order number and all data to the parent
        onComplete({
          ...values,
          orderNumber: result.data?.orderNumber || "N/A",
        });
      } else {
        toast.error(
          result.error || "Failed to submit quote. Please try again.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37]">
          Final Step! Schedule Your Installation
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Enter your details and choose a preferred install date
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
      >
        {/* Left Column - Form */}
        <div className="col-span-1 lg:col-span-3 space-y-5">
          {/* Contact Info */}
          <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-4">
            <h3 className="text-base font-bold text-[#121F37]">
              Contact Information
            </h3>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-semibold text-[#121F37]">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="John Doe"
                  className="h-12 rounded-xl border-[#D7DCE5] mt-1"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#121F37]">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="(555) 123-4567"
                  className="h-12 rounded-xl border-[#D7DCE5] mt-1"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#121F37]">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="h-12 rounded-xl border-[#D7DCE5] mt-1"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-4">
            <h3 className="text-base font-bold text-[#121F37]">
              Preferred Install Date
            </h3>

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
              <div className="mt-2">
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

          {/* Notes */}
          <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-2">
            <Label className="text-sm font-semibold text-[#121F37]">
              Additional Notes
            </Label>
            <Textarea
              placeholder="Special requests or instructions..."
              className="min-h-20 rounded-xl border-[#D7DCE5] resize-none"
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-xs text-red-500">{errors.notes.message}</p>
            )}
          </div>
        </div>

        {/* Right Column - Price Summary */}
        <div className="col-span-1 lg:col-span-2">
          <div className="rounded-2xl border border-[#E8EEF7] bg-white p-5 space-y-4 sticky top-6">
            <h3 className="text-base font-bold text-[#121F37]">
              Price Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>System:</span>
                <span className="font-semibold text-[#121F37]">
                  {system.brand} {system.name}
                </span>
              </div>
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

            <hr className="border-[#E8EEF7]" />

            <div className="space-y-2">
              <div className="flex justify-between font-extrabold text-[#121F37] text-lg">
                <span>Cash Price:</span>
                <span>{formatCurrency(system.cashPrice)}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B] text-sm">
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
                  I accept the Terms of Service
                </span>
              </div>
              {errors.acceptedTerms && (
                <p className="text-xs text-red-500">
                  {errors.acceptedTerms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!acceptedTerms || isSubmitting}
              className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] disabled:bg-[#C4C4C4] text-white font-extrabold uppercase tracking-wide text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Claim My Quote & Submit
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4 text-[#6B6B6B]" />
                <p className="text-sm font-semibold text-[#121F37]">
                  No Payment Required Now
                </p>
              </div>
              <p className="text-xs text-[#9AA3B2]">
                We'll contact you before collecting payment
              </p>
            </div>
          </div>
        </div>
      </form>

      <div className="max-w-2xs mx-auto">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full h-12 rounded-xl border-[#D7DCE5] text-[#121F37] font-semibold hover:bg-[#F5F7FA]"
        >
          Back to Options
        </Button>
      </div>
    </div>
  );
}
