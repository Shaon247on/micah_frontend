"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AC_AGES, ScheduleFormData, SYMPTOMS } from "@/data";
import { StepDots } from "./StepDots";
import { SelectionChip } from "./SelectionChip";
import { OptionButton } from "./OptionButton";

interface Step1SymptomsProps {
  formData: ScheduleFormData;
  onToggleSymptom: (symptom: string) => void;
  onSelectAge: (age: string) => void;
  onNext: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Step1Symptoms({
  formData,
  onToggleSymptom,
  onSelectAge,
  onNext,
}: Step1SymptomsProps) {
  const canProceed = !!formData.age;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-0"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-5">
        <h3 className="text-xl font-extrabold text-[#121F37] sm:text-2xl">
          Schedule your Rejuvenation
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
          Our team will contact you to confirm your appointment.
        </p>
        <StepDots total={3} current={1} className="mt-4" />
      </motion.div>

      {/* Symptoms */}
      <motion.div variants={itemVariants}>
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
          What are you noticing?
        </p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((symptom) => (
            <SelectionChip
              key={symptom}
              label={symptom}
              selected={formData.symptoms.includes(symptom)}
              onClick={() => onToggleSymptom(symptom)}
            />
          ))}
        </div>
      </motion.div>

      {/* Age */}
      <motion.div variants={itemVariants} className="mt-6">
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
          How old is your A/C?
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {AC_AGES.map((age) => (
            <OptionButton
              key={age}
              label={age}
              selected={formData.age === age}
              onClick={() => onSelectAge(age)}
            />
          ))}
        </div>
      </motion.div>

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