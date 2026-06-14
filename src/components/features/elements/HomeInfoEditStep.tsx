"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  homeInfoEditSchema,
  type HomeInfoEditFormValues,
  type HomeInfoFormValues,
  MOCK_HOME_INFO,
} from "@/types/HvacQuote.types";

interface HomeInfoEditStepProps {
  homeInfo?: HomeInfoFormValues;
  address?: string;
  onNext: (updated: HomeInfoEditFormValues) => void;
  onBack: () => void;
}

const STORY_OPTIONS = [
  { value: 1, label: "1 Story" },
  { value: 2, label: "2 Stories" },
  { value: 3, label: "3 Stories" },
  { value: 4, label: "4 Stories" },
  { value: 5, label: "5 Stories" },
];

const HEATING_OPTIONS = [
  { value: "natural gas", label: "Natural Gas" },
  { value: "electric", label: "Electric" },
  { value: "propane", label: "Propane" },
  { value: "oil", label: "Oil" },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function HomeInfoEditStep({
  homeInfo = MOCK_HOME_INFO,
  address = "",
  onNext,
  onBack,
}: HomeInfoEditStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HomeInfoEditFormValues>({
    resolver: zodResolver(homeInfoEditSchema),
    defaultValues: {
      squareFootage: homeInfo.squareFootage,
      stories: homeInfo.stories,
      heatingSource: homeInfo.heatingSource,
      bedrooms: homeInfo.bedrooms,
    },
  });

  const stories = watch("stories");
  const heatingSource = watch("heatingSource");
  const bedrooms = watch("bedrooms");

  function onSubmit(values: HomeInfoEditFormValues) {
    onNext(values);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37] leading-tight">
          Please Update Your Home Info
        </h2>

        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Update your home details to see the best system options for you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Square Footage */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#121F37]">
              Total Square Footage
            </label>

            <Input
              type="number"
              placeholder="2000"
              className="rounded-xl border-[#D7DCE5] w-full"
              {...register("squareFootage", {
                valueAsNumber: true,
              })}
            />

            {errors.squareFootage && (
              <p className="text-xs text-red-500">
                {errors.squareFootage.message}
              </p>
            )}
          </div>

          {/* Stories */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#121F37]">
              Number of Stories/Levels
            </label>

            <Select
              value={stories ? String(stories) : ""}
              onValueChange={(v) =>
                setValue("stories", Number(v), {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full rounded-xl border-[#D7DCE5]">
                <SelectValue placeholder="Select stories" />
              </SelectTrigger>

              <SelectContent>
                {STORY_OPTIONS.map((o) => (
                  <SelectItem className="bg-white border-none" key={o.value} value={String(o.value)}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.stories && (
              <p className="text-xs text-red-500">
                {errors.stories.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Heating Source */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#121F37]">
              Heating Source
            </label>

            <Select
              value={heatingSource}
              onValueChange={(v) =>
                setValue("heatingSource", v as any, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full rounded-xl border-[#D7DCE5]">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>

              <SelectContent>
                {HEATING_OPTIONS.map((o) => (
                  <SelectItem className="bg-white border-none"  key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.heatingSource && (
              <p className="text-xs text-red-500">
                {errors.heatingSource.message}
              </p>
            )}
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#121F37]">
              Bedrooms
            </label>

            <Select
              value={bedrooms ? String(bedrooms) : ""}
              onValueChange={(v) =>
                setValue("bedrooms", Number(v), {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full rounded-xl border-[#D7DCE5]">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>

              <SelectContent>
                {BEDROOM_OPTIONS.map((n) => (
                  <SelectItem className="bg-white border-none" key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.bedrooms && (
              <p className="text-xs text-red-500">
                {errors.bedrooms.message}
              </p>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          type="submit"
          className="w-full h-14 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          Yes! Show Me My Options
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <hr className="border-[#E8EEF7]" />

      {/* Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#121F37]">
            Property Location
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              className="h-8 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-semibold"
            >
              Map
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-4 rounded-lg border-[#D7DCE5]"
            >
              Street View
            </Button>
          </div>
        </div>

        <div className="w-full h-44 rounded-xl bg-[#E8EEF7] border border-[#D7DCE5] flex items-center justify-center">
          <div className="text-center text-[#9AA3B2] text-sm">
            <div className="text-3xl mb-1">🗺️</div>
            <p>Map preview</p>
          </div>
        </div>

        {address && (
          <p className="text-xs text-[#6B6B6B]">
            Address: {address}
          </p>
        )}
      </div>

      {/* Back */}
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full h-12 rounded-xl border-[#D7DCE5] text-[#121F37] font-semibold hover:bg-[#F5F7FA]"
      >
        Back to Address
      </Button>
    </div>
  );
}