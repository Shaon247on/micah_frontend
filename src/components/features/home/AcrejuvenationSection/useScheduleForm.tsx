"use client";

import { useState, useCallback } from "react";
import {
  ScheduleFormData,
  ScheduleStep,
  INITIAL_FORM_DATA,
} from "@/data/index";

export function useScheduleForm() {
  const [step, setStep] = useState<ScheduleStep>(1);
  const [formData, setFormData] = useState<ScheduleFormData>(INITIAL_FORM_DATA);

  const updateField = useCallback(
    <K extends keyof ScheduleFormData>(key: K, value: ScheduleFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleSymptom = useCallback((symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  }, []);

  const goToStep = useCallback((s: ScheduleStep) => setStep(s), []);

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
  }, []);

  const formatSelectedDate = (date: ScheduleFormData["date"]): string => {
    if (!date) return "";
    if (date === "asap") return "Today";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return {
    step,
    formData,
    updateField,
    toggleSymptom,
    goToStep,
    reset,
    formatSelectedDate,
  };
}