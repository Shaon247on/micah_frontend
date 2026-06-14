"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScheduleFormData, TIME_SLOTS } from "@/data";
import { StepDots } from "./StepDots";
import { OptionButton } from "./OptionButton";


interface Step3ContactFormProps {
  formData: ScheduleFormData;
  onUpdateField: <K extends keyof ScheduleFormData>(
    key: K,
    value: ScheduleFormData[K]
  ) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: d },
  }),
};

function getDateLabel(date: ScheduleFormData["date"]): string {
  if (!date) return "TODAY";
  if (date === "asap") return "TODAY";
  return date
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

export function Step3ContactForm({
  formData,
  onUpdateField,
  onSubmit,
  onBack,
}: Step3ContactFormProps) {
  const isValid =
    !!formData.time &&
    formData.name.trim().length > 1 &&
    formData.phone.trim().length > 6 &&
    formData.email.includes("@") &&
    formData.zip.trim().length >= 4;

  const fields: {
    key: keyof ScheduleFormData;
    label: string;
    placeholder: string;
    type?: string;
  }[] = [
    { key: "name", label: "Full Name", placeholder: "Full name" },
      { key: "phone", label: "Phone", placeholder: "Phone Number", type: "tel" },
      { key: "email", label: "Email", placeholder: "you@gmail.com", type: "email" },
      { key: "zip", label: "Zip Code", placeholder: "ZIP Code" },
  ];

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
          <p className="mt-2 text-xs text-[#9AA3B2]">
            Select your preferred date and our team will contact you to confirm availability.
          </p>
        <StepDots total={3} current={3} className="mt-4" />
      </motion.div>

      {/* Time label */}
      <motion.p
        variants={fadeUp}
        custom={0.05}
        className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]"
      >
        {getDateLabel(formData.date)} – Select a preferred time window
      </motion.p>

      {/* Time slots */}
      <motion.div
        variants={fadeUp}
        custom={0.1}
        className="grid grid-cols-3 gap-2 sm:grid-cols-3"
      >
        {TIME_SLOTS.map((slot) => (
          <OptionButton
            key={slot}
            label={slot}
            selected={formData.time === slot}
            onClick={() => onUpdateField("time", slot)}
          />
        ))}
      </motion.div>

      {/* Date + time preview */}
      {formData.time && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3"
        >
          {/* <DatePreviewBadge date={formData.date} time={formData.time} /> */}
        </motion.div>
      )}

      {/* Contact fields */}
      <motion.div variants={fadeUp} custom={0.15} className="mt-5 space-y-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label
              htmlFor={f.key}
              className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#6B6B6B]"
            >
              {f.label}
            </Label>
            <Input
              id={f.key}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              value={(formData[f.key] as string) ?? ""}
              onChange={(e) =>
                onUpdateField(f.key, e.target.value as ScheduleFormData[typeof f.key])
              }
              className="h-13 rounded-xl border-[#D7DCE5] bg-white px-4 text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:border-[#DE7B42] focus-visible:ring-[#DE7B42]/20"
            />
          </div>
        ))}
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp} custom={0.2} className="mt-6">
        <Button
          onClick={onSubmit}
          disabled={!isValid}
          className="h-14 w-full gap-2.5 rounded-2xl bg-[#DE7B42] text-[13px] font-extrabold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[#cf6f38] active:scale-[0.99] disabled:bg-[#E0E0E0] disabled:text-white/70"
        >
          Get My Rejuvenation Scheduled
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Footer row */}
      <motion.div
        variants={fadeUp}
        custom={0.25}
        className="mt-3 flex items-center justify-between"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-1.5 text-sm font-semibold text-[#6B6B6B] hover:text-[#121F37]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <span className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
          <Shield className="h-3.5 w-3.5" />
          Your info is never shared.
        </span>
      </motion.div>
    </motion.div>
  );
}