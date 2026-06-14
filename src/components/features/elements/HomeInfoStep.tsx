"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type HomeInfoFormValues, MOCK_HOME_INFO } from "@/types/HvacQuote.types";

interface HomeInfoStepProps {
  homeInfo?: HomeInfoFormValues;
  address?: string;
  onConfirm: () => void;
  onEdit: () => void;   // "No, I Need to Update This"
  onBack: () => void;   // "Back to Address"
}

export function HomeInfoStep({
  homeInfo = MOCK_HOME_INFO,
  address = "",
  onConfirm,
  onEdit,
  onBack,
}: HomeInfoStepProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37] leading-tight">
          Is the Info Below Correct?
        </h2>
        <p className="text-sm text-[#6B6B6B] leading-7">
          It looks like you have{" "}
          <span className="font-bold text-[#121F37] underline underline-offset-2">
            {homeInfo.bedrooms} bedrooms
          </span>{" "}
          in your{" "}
          <span className="font-bold text-[#121F37] underline underline-offset-2">
            {homeInfo.stories} story
          </span>
          ,{" "}
          <span className="font-bold text-[#121F37] underline underline-offset-2">
            {homeInfo.squareFootage.toLocaleString()} square foot
          </span>{" "}
          home that uses{" "}
          <span className="font-bold text-[#121F37] underline underline-offset-2">
            {homeInfo.heatingSource}
          </span>{" "}
          for its heating source.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          className="flex-1 h-12 rounded-xl border-[#D7DCE5] text-[#121F37] font-semibold hover:bg-[#F5F7FA] hover:border-[#B0B8C8] transition-all"
        >
          No, I Need to Update This
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          className="flex-1 h-12 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-extrabold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          Yes! Show Me My Options
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <hr className="border-[#E8EEF7]" />

      {/* Map section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#121F37]">Property Location</p>
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
              className="h-8 px-4 rounded-lg border-[#D7DCE5] text-[#121F37] text-xs font-semibold hover:bg-[#F5F7FA]"
            >
              Street View
            </Button>
          </div>
        </div>

        <div className="w-full h-44 rounded-xl bg-[#E8EEF7] flex items-center justify-center border border-[#D7DCE5]">
          <div className="text-center text-[#9AA3B2] text-sm">
            <div className="text-3xl mb-1">🗺️</div>
            <p>Map preview</p>
          </div>
        </div>

        {address && (
          <p className="text-xs text-[#6B6B6B]">Address: {address}</p>
        )}
      </div>

      {/* Back button */}
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