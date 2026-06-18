"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  contactSchema,
  type ContactFormValues,
} from "@/types/hvacQuote.types";

interface ContactStepProps {
  onNext: (contact: ContactFormValues) => void;
  onBack: () => void;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits ? `(${digits}` : "";
  if (digits.length <= 6)
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function ContactStep({ onNext, onBack }: ContactStepProps) {
  const [phoneValid, setPhoneValid] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phoneNumber: "",
    },
  });

  const phoneValue = watch("phoneNumber");

  function onSubmit(values: ContactFormValues) {
    onNext(values);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37]">
          We Found 3 Matches!
        </h2>
        <p className="text-sm text-[#6B6B6B]">
          Enter your details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="text-sm font-semibold text-[#121F37]">
            Full Name
          </label>
          <Input
            placeholder="Enter your full name"
            className="h-14 rounded-xl"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold text-[#121F37]">
            Phone Number
          </label>

          <div className="relative">
            <Input
              placeholder="Phone Number"
              inputMode="numeric"
              className={cn(
                "h-14 rounded-xl pr-12",
                phoneValid
                  ? "border-green-500 bg-green-50"
                  : "border-[#D7DCE5]"
              )}
              value={phoneValue}
              {...register("phoneNumber")}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                setValue("phoneNumber", formatted, {
                  shouldValidate: true,
                });
                setPhoneValid(formatted.replace(/\D/g, "").length === 10);
              }}
            />

            {phoneValid && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
          </div>

          {errors.phoneNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full h-14 bg-[#DE7B42] text-white font-bold uppercase"
        >
          View My Quotes
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full h-12"
        >
          Back
        </Button>
      </form>
    </div>
  );
}