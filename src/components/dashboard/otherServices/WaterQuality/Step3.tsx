"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Step3Data, TIME_SLOTS } from "@/schemas/waterQuality.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function Step3({ onNext, onBack, defaultValues, isSubmitting }: { onNext: (data: Step3Data) => void; onBack: () => void; defaultValues?: Partial<Step3Data>; isSubmitting?: boolean }) {
  const [preferredDate, setPreferredDate] = useState(defaultValues?.preferredDate || "");
  const [preferredTime, setPreferredTime] = useState(defaultValues?.preferredTime || "");
  const [notes, setNotes] = useState(defaultValues?.notes || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!preferredDate) newErrors.preferredDate = "Please select a date";
    if (!preferredTime) newErrors.preferredTime = "Please select a time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ preferredDate, preferredTime, notes });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Preferred Date <span className="text-[#E07B3F]">*</span>
        </Label>
        <Input
          type="date"
          value={preferredDate}
          onChange={(e) => { setPreferredDate(e.target.value); if (errors.preferredDate) setErrors(prev => ({ ...prev, preferredDate: "" })); }}
          className={cn("h-12 rounded-xl border-[#D7DCE5] bg-white mt-1", errors.preferredDate && "border-red-500")}
        />
        {errors.preferredDate && <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>}
      </div>

      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Preferred Time <span className="text-[#E07B3F]">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => { setPreferredTime(slot); if (errors.preferredTime) setErrors(prev => ({ ...prev, preferredTime: "" })); }}
              className={cn(
                "py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                preferredTime === slot
                  ? "border-[#E07B3F] bg-[#FFF4EC] text-[#E07B3F]"
                  : "border-[#E8EEF7] bg-white text-[#374151] hover:border-[#E07B3F]/50"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors.preferredTime && <p className="text-xs text-red-500 mt-1">{errors.preferredTime}</p>}
      </div>

      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Additional Notes (Optional)
        </Label>
        <Textarea
          placeholder="Any special instructions or details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-20 rounded-xl border-[#D7DCE5] mt-1 resize-none"
        />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] disabled:bg-[#C4C4C4] disabled:cursor-not-allowed text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
        >
          {isSubmitting ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#121F37] transition-colors mt-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      </div>
    </div>
  );
}