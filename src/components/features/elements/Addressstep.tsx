"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  addressSchema,
  type AddressFormValues,
} from "@/types/HvacQuote.types";

interface AddressStepProps {
  defaultAddress: string;
  onNext: (address: string) => void;
}

export function AddressStep({
  defaultAddress,
  onNext,
}: AddressStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: defaultAddress,
    },
  });

  function onSubmit(values: AddressFormValues) {
    onNext(values.address);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase text-[#DE7B42] font-bold">
          HVAC Quote
        </p>
        <h2 className="text-2xl font-extrabold text-[#121F37]">
          Real HVAC Prices, No Noise
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-[#121F37]">
            Address
          </label>

          <Input
            placeholder="Enter your service address"
            className="h-14 rounded-xl"
            {...register("address")}
          />

          {errors.address && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-[#DE7B42] text-white font-bold flex gap-2"
        >
          Look Up My Home Info
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}