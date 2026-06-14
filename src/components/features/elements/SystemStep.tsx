"use client";

import { useState } from "react";
import { Minus, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MOCK_SYSTEMS,
  type HvacSystem,
  formatCurrency,
} from "@/types/HvacQuote.types";

interface SystemStepProps {
  onSelect: (system: HvacSystem) => void;
  onBack: () => void;
}

function StarRating({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "w-4 h-4",
            i < count ? "text-[#DE7B42]" : "text-[#E8EEF7]"
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function SystemCard({
  system,
  onSelect,
}: {
  system: HvacSystem;
  onSelect: () => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col rounded-2xl border border-[#E8EEF7] bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Tier badge */}
      <span className="mb-3 self-start rounded-lg border border-[#D7DCE5] bg-[#F5F7FA] px-3 py-1 text-xs font-semibold text-[#6B6B6B]">
        {system.tier}
      </span>

      {/* Brand + name */}
      <h3 className="text-lg font-extrabold text-[#DE7B42] leading-tight">
        {system.brand}
        <br />
        {system.name}
      </h3>

      {/* Type + fuel */}
      <div className="mt-2 flex items-center gap-2 text-sm text-[#6B6B6B]">
        <span>{system.type}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#D7DCE5]" />
        <span>{system.fuel}</span>
      </div>

      {/* Specs */}
      <div className="mt-4 space-y-2.5 border-t border-[#E8EEF7] pt-4">
        {[
          {
            label: "Efficiency",
            value: system.seer2,
            stars: 3,
          },
          {
            label: "Dehumidification",
            value: null,
            stars: system.dehumidification,
          },
          {
            label: "Noise Level",
            value: system.noiseLevel,
            stars: system.noiseStars,
          },
          {
            label: "Parts Warranty",
            value: system.partsWarranty,
            stars: system.partsStars,
          },
          {
            label: "Labor Warranty",
            value: system.laborWarranty,
            stars: system.laborStars,
          },
        ].map((spec) => (
          <div key={spec.label} className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-1 text-[#121F37] font-medium shrink-0">
              {spec.label}
              <Info className="h-3.5 w-3.5 text-[#9AA3B2]" />
              {spec.value && (
                <span className="text-[#6B6B6B] font-normal">
                  : {spec.value}
                </span>
              )}
            </div>
            <StarRating count={spec.stars} />
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="mt-4 border-t border-[#E8EEF7] pt-4 space-y-1">
        <p className="text-sm text-[#9AA3B2]">
          Retail Price:{" "}
          <span className="line-through">{formatCurrency(system.retailPrice)}</span>
        </p>
        <p className="text-3xl font-extrabold text-[#121F37]">
          {formatCurrency(system.cashPrice)}
        </p>
        <div className="flex items-center gap-1.5 text-sm text-[#6B6B6B]">
          <span>Or</span>
          <span className="rounded-md bg-[#e8f5e9] px-2 py-0.5 font-extrabold text-[#2e7d32] text-sm">
            ${system.monthlyPrice}
          </span>
          <span>/mo</span>
          <Info className="h-3.5 w-3.5 text-[#9AA3B2]" />
        </div>
        <p className="text-sm font-semibold text-[#DE7B42]">
          {formatCurrency(system.onlineSavings)} online savings
        </p>
        <p className="text-xs text-[#9AA3B2] flex items-center gap-1">
          Complete installation included in price
          <Info className="h-3 w-3" />
        </p>
      </div>

      {/* Quantity */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm font-semibold text-[#121F37]">Quantity</span>
        <div className="flex items-center gap-2 rounded-xl border border-[#D7DCE5] px-3 py-1.5">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="text-[#6B6B6B] hover:text-[#121F37] font-bold text-lg leading-none"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-[#121F37]">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="text-[#6B6B6B] hover:text-[#121F37] font-bold text-lg leading-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Select CTA */}
      <Button
        type="button"
        onClick={onSelect}
        className="mt-4 w-full h-12 rounded-xl bg-[#DE7B42] hover:bg-[#cf6f38] text-white font-extrabold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        Select
      </Button>
    </div>
  );
}

export function SystemStep({ onSelect, onBack }: SystemStepProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37] leading-tight">
          Top 3 Matches for you
        </h2>
        <p className="text-sm text-[#6B6B6B]">
          All 3 are a match. Now choose what fits your comfort and budget.
        </p>
      </div>

      {/* Cards — stacked vertically inside dialog */}
      <div className="space-y-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {MOCK_SYSTEMS.map((system) => (
          <SystemCard
            key={system.id}
            system={system}
            onSelect={() => onSelect(system)}
          />
        ))}
      </div>

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