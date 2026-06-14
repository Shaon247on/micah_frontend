"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { ScheduleFormData } from "@/data";
import { StepDots } from "./StepDots";
import { MiniCalendar } from "./MiniCalendar";

interface Step2DatePickerProps {
  formData: ScheduleFormData;
  onSelectDate: (date: Date | "asap") => void;
  onNext: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: d },
  }),
};

export function Step2DatePicker({
  formData,
  onSelectDate,
  onNext,
  onBack,
}: Step2DatePickerProps) {
  const isAsap = formData.date === "asap";
  const hasDate = !!formData.date;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-0"
    >
      {/* Header */}
      <motion.div variants={fadeUp} custom={0} className="mb-5">
        <h3 className="text-xl font-extrabold text-[#121F37] sm:text-2xl">
          Schedule your Rejuvenation
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
          Our team will contact you to confirm your appointment.
        </p>
        <StepDots total={3} current={2} className="mt-4" />
      </motion.div>

      {/* Date label */}
      <motion.p
        variants={fadeUp}
        custom={0.05}
        className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]"
      >
        Pick a date
      </motion.p>

      {/* ASAP button */}
      <motion.button
        variants={fadeUp}
        custom={0.1}
        type="button"
        onClick={() => onSelectDate("asap")}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE7B42]/50",
          isAsap
            ? "border-[#DE7B42] bg-[#FEF0E8]"
            : "border-[#D7DCE5] bg-white hover:border-[#DE7B42]/50"
        )}
      >
        <Zap
          className={cn("h-5 w-5", isAsap ? "text-[#DE7B42]" : "text-[#6B6B6B]")}
        />
        <span
          className={cn(
            "text-sm font-bold",
            isAsap ? "text-[#DE7B42]" : "text-[#121F37]"
          )}
        >
          As soon as possible – today
        </span>
      </motion.button>

      {/* Divider */}
      <motion.div
        variants={fadeUp}
        custom={0.15}
        className="my-4 flex items-center gap-3"
      >
        <Separator className="flex-1" />
        <span className="text-xs text-[#6B6B6B]">or pick a date</span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Calendar */}
      <motion.div variants={fadeUp} custom={0.2}>
        <MiniCalendar
          selected={formData.date instanceof Date ? formData.date : null}
          onSelect={onSelectDate}
        />
      </motion.div>

      {/* Preview */}
      {hasDate && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {/* <DatePreviewBadge date={formData.date} /> */}
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        variants={fadeUp}
        custom={0.25}
        className="mt-6 flex items-center justify-between"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-1.5 text-sm font-semibold text-[#6B6B6B] hover:text-[#121F37]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasDate}
          className="gap-2 rounded-xl bg-[#DE7B42] px-6 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-[#cf6f38] active:scale-[0.99] disabled:bg-[#E0E0E0] disabled:text-white/70"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}