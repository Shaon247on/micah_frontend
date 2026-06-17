"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  AC_AGES,
  AC_TYPES,
  REFRIGERANT_TYPES,
  PERFORMANCE_RATINGS,
  SYMPTOMS,
  ScheduleFormData,
} from "@/data";
import { StepDots } from "./StepDots";
import { SelectionChip } from "./SelectionChip";

interface Step1SymptomsProps {
  formData: ScheduleFormData;
  onUpdateField: <K extends keyof ScheduleFormData>(
    key: K,
    value: ScheduleFormData[K],
  ) => void;
  onNext: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Step1Symptoms({
  formData,
  onUpdateField,
  onNext,
}: Step1SymptomsProps) {
  const canProceed =
    formData.issues.length > 0 &&
    formData.acAge !== null &&
    formData.acType !== "";

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-0">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-5">
        <h3 className="text-xl font-extrabold text-[#121F37] sm:text-2xl">
          Schedule your Rejuvenation
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
          Tell us about your AC system
        </p>
        <StepDots total={3} current={1} className="mt-4" />
      </motion.div>

      {/* Symptoms */}
      <motion.div variants={itemVariants}>
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
          What issues are you noticing? (Select all that apply)
        </p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((symptom) => (
            <SelectionChip
              key={symptom}
              label={symptom}
              selected={formData.issues.includes(symptom)}
              onClick={() => {
                const newIssues = formData.issues.includes(symptom)
                  ? formData.issues.filter((s) => s !== symptom)
                  : [...formData.issues, symptom];
                onUpdateField("issues", newIssues);
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* AC Age */}
      <motion.div variants={itemVariants} className="mt-6">
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
          How old is your AC?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {AC_AGES.map((age) => (
            <button
              key={age.value}
              type="button"
              onClick={() => onUpdateField("acAge", age.value)}
              className={`rounded-xl border px-3 py-3.5 text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE7B42]/50
                ${
                  formData.acAge === age.value
                    ? "border-[#DE7B42] bg-[#FEF0E8] font-bold text-[#DE7B42]"
                    : "border-[#D7DCE5] bg-white text-[#121F37] hover:border-[#DE7B42]/50"
                }`}
            >
              {age.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* AC Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-5 mt-6">
        <motion.div variants={itemVariants} className="">
          <Label className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
            AC Type
          </Label>
          <Select
            value={formData.acType}
            onValueChange={(value) => onUpdateField("acType", value)}
          >
            <SelectTrigger className="h-12 rounded-xl border-[#D7DCE5] bg-white">
              <SelectValue placeholder="Select AC type" />
            </SelectTrigger>
            <SelectContent>
              {AC_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Refrigerant Type */}
        <motion.div variants={itemVariants} className="">
          <Label className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
            Refrigerant Type (Optional)
          </Label>
          <Select
            value={formData.refrigerantType}
            onValueChange={(value) => onUpdateField("refrigerantType", value)}
          >
            <SelectTrigger className="h-12 rounded-xl border-[#D7DCE5] bg-white">
              <SelectValue placeholder="Select refrigerant type" />
            </SelectTrigger>
            <SelectContent>
              {REFRIGERANT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Performance Rating */}
        <motion.div variants={itemVariants} className="mt-4">
          <Label className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
            Current Performance (Optional)
          </Label>
          <Select
            value={formData.currentPerformance}
            onValueChange={(value) =>
              onUpdateField("currentPerformance", value)
            }
          >
            <SelectTrigger className="h-12 rounded-xl border-[#D7DCE5] bg-white">
              <SelectValue placeholder="Select performance" />
            </SelectTrigger>
            <SelectContent>
              {PERFORMANCE_RATINGS.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Last Service Date (simplified) */}
        <motion.div variants={itemVariants} className="mt-4">
          <Label className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
            Last Service Date (Optional)
          </Label>
          <input
            type="date"
            value={
              formData.lastServiceDate
                ? new Date(formData.lastServiceDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              onUpdateField("lastServiceDate", date);
            }}
            className="h-12 w-full rounded-xl border border-[#D7DCE5] bg-white px-4 text-[#121F37] focus:border-[#DE7B42] focus:outline-none focus:ring-2 focus:ring-[#DE7B42]/20"
          />
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="mt-7">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="h-14 w-full gap-2.5 rounded-2xl bg-[#DE7B42] text-sm font-extrabold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[#cf6f38] active:scale-[0.99] disabled:bg-[#E0E0E0] disabled:text-white/70"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
