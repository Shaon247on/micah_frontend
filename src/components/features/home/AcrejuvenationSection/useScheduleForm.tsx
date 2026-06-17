'use client';

import { useState, useCallback } from 'react';
import { ScheduleFormData, INITIAL_FORM_DATA, ScheduleStep } from '@/data';
import { submitAcRejuvenation } from '@/actions/acRejuvenation.actions';
import { toast } from 'sonner';

export function useScheduleForm() {
  const [step, setStep] = useState<ScheduleStep>(1);
  const [formData, setFormData] = useState<ScheduleFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    <K extends keyof ScheduleFormData>(key: K, value: ScheduleFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const goToStep = useCallback((s: ScheduleStep) => setStep(s), []);

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      const result = await submitAcRejuvenation(formData);
      
      if (result.success) {
        toast.success(result.message);
        goToStep(4); // Go to confirmation
      } else {
        toast.error(result.error || 'Failed to schedule appointment');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, goToStep]);

  return {
    step,
    formData,
    isSubmitting,
    updateField,
    goToStep,
    reset,
    handleSubmit,
  };
}