"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptionCard, PillToggle } from "./Elements";
import { CONCERNS, HOME_SIZES, SERVICE_OPTIONS, Step1Data } from "@/schemas/waterQuality.schema";
import { ArrowRight } from "lucide-react";


export default function Step1({ onNext, defaultValues }: { onNext: (data: Step1Data) => void; defaultValues?: Partial<Step1Data> }) {
  const [concerns, setConcerns] = useState<string[]>(defaultValues?.concerns || []);
  const [serviceType, setServiceType] = useState(defaultValues?.serviceType || "");
  const [homeSize, setHomeSize] = useState(defaultValues?.homeSize || "");
  const [hasWaterSoftener, setHasWaterSoftener] = useState(defaultValues?.hasWaterSoftener || false);
  const [hasFilterSystem, setHasFilterSystem] = useState(defaultValues?.hasFilterSystem || false);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState<number | undefined>(defaultValues?.numberOfBathrooms);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (concerns.length === 0) newErrors.concerns = "Please select at least one concern";
    if (!serviceType) newErrors.serviceType = "Please select a service type";
    if (!homeSize) newErrors.homeSize = "Please select your home size";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ concerns, serviceType, homeSize, hasWaterSoftener, hasFilterSystem, numberOfBathrooms });
    }
  };

  return (
    <div className="space-y-5">
      {/* Concerns */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37] mb-2">
          What water issues are you experiencing? <span className="text-[#E07B3F]">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {CONCERNS.map(c => (
            <PillToggle key={c} label={c} selected={concerns.includes(c)} onClick={() => {
              setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
              if (errors.concerns) setErrors(prev => ({ ...prev, concerns: "" }));
            }} />
          ))}
        </div>
        {errors.concerns && <p className="text-xs text-red-500 mt-1">{errors.concerns}</p>}
      </div>

      {/* Service Type */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37] mb-2">
          Which service are you interested in? <span className="text-[#E07B3F]">*</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICE_OPTIONS.map(s => (
            <OptionCard
              key={s.label}
              label={s.label}
              sub={s.sub}
              selected={serviceType === s.label}
              onClick={() => { setServiceType(s.label); if (errors.serviceType) setErrors(prev => ({ ...prev, serviceType: "" })); }}
            />
          ))}
        </div>
        {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
      </div>

      {/* Home Size */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37] mb-2">
          Home size <span className="text-[#E07B3F]">*</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {HOME_SIZES.map(s => (
            <OptionCard
              key={s}
              label={s}
              selected={homeSize === s}
              onClick={() => { setHomeSize(s); if (errors.homeSize) setErrors(prev => ({ ...prev, homeSize: "" })); }}
            />
          ))}
        </div>
        {errors.homeSize && <p className="text-xs text-red-500 mt-1">{errors.homeSize}</p>}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 text-sm text-[#121F37]">
          <input
            type="checkbox"
            checked={hasWaterSoftener}
            onChange={(e) => setHasWaterSoftener(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#E07B3F] focus:ring-[#E07B3F]"
          />
          Has Water Softener
        </label>
        <label className="flex items-center gap-2 text-sm text-[#121F37]">
          <input
            type="checkbox"
            checked={hasFilterSystem}
            onChange={(e) => setHasFilterSystem(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#E07B3F] focus:ring-[#E07B3F]"
          />
          Has Filter System
        </label>
      </div>

      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Number of Bathrooms (Optional)
        </Label>
        <Input
          type="number"
          min={0}
          max={20}
          placeholder="e.g. 3"
          value={numberOfBathrooms || ""}
          onChange={(e) => setNumberOfBathrooms(e.target.value ? parseInt(e.target.value) : undefined)}
          className="h-12 rounded-xl border-[#D7DCE5] bg-white mt-1"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}