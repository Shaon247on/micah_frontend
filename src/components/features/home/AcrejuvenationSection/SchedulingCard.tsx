"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useScheduleForm } from "./useScheduleForm";
import { StepDots } from "./StepDots";
import { Step1Symptoms } from "./Step1Symptoms";
import { Step2DatePicker } from "./Step2DatePicker";
import { Step3ContactForm } from "./Step3ContactForm";
import { Step4Confirmation } from "./Step4Confirmation";

const TOTAL_STEPS = 3;

const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export function SchedulingCard() {
  const { step, formData, toggleSymptom, updateField, goToStep, reset } =
    useScheduleForm();

  return (
    <Card className="w-full overflow-hidden rounded-[28px] border-0 shadow-[0_20px_60px_rgba(18,31,55,0.10)]">
      <CardContent className="px-7 pb-7 pt-5">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <Step1Symptoms
                formData={formData}
                onToggleSymptom={toggleSymptom}
                onSelectAge={(age) => updateField("age", age)}
                onNext={() => goToStep(2)}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <Step2DatePicker
                formData={formData}
                onSelectDate={(date) => updateField("date", date)}
                onNext={() => goToStep(3)}
                onBack={() => goToStep(1)}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <Step3ContactForm
                formData={formData}
                onUpdateField={updateField}
                onSubmit={() => goToStep(4)}
                onBack={() => goToStep(2)}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <Step4Confirmation onScheduleAnother={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
