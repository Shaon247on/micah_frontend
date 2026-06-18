'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: 'Address' },
  { id: 2, label: 'Home Info' },
  { id: 3, label: 'Options' },
  { id: 4, label: 'Schedule' },
  { id: 5, label: 'Confirm' },
];

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                    isCompleted
                      ? 'border-[#E07B3F] bg-[#E07B3F] text-white'
                      : isActive
                      ? 'border-[#E07B3F] bg-white text-[#E07B3F]'
                      : 'border-gray-300 bg-white text-gray-400'
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium hidden sm:block',
                    isActive || isCompleted ? 'text-[#121F37]' : 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'h-0.5 w-full flex-1 transition-all duration-200',
                    isCompleted ? 'bg-[#E07B3F]' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}