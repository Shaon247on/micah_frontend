'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Stepper } from './Stepper';
import { AddressStep } from './AddressStep';
import { HomeInfoStep } from './HomeInfoStep';
import { SystemStep } from './SystemStep';
import { ScheduleStep } from './ScheduleStep';
import { ConfirmationStep } from './ConfirmationStep';
import { type HvacSystem } from '@/types/hvacQuote.types';

type QuoteStep = 'address' | 'home-info' | 'system' | 'schedule' | 'confirmation';

interface HvacQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAddress?: string;
}

export function HvacQuoteDialog({
  open,
  onOpenChange,
  initialAddress = '',
}: HvacQuoteDialogProps) {
  const [currentStep, setCurrentStep] = useState<QuoteStep>('address');
  const [address, setAddress] = useState(initialAddress);
  const [selectedSystem, setSelectedSystem] = useState<HvacSystem | null>(null);
  const [homeInfo, setHomeInfo] = useState({
    squareFootage: 2000,
    stories: 2,
    heatingSource: 'natural gas',
    bedrooms: 3,
  });
  const [submittedData, setSubmittedData] = useState<any>(null);

  const stepMap: Record<QuoteStep, number> = {
    address: 1,
    'home-info': 2,
    system: 3,
    schedule: 4,
    confirmation: 5,
  };

  function goTo(step: QuoteStep) {
    setCurrentStep(step);
  }

  function handleOpenChange(val: boolean) {
    if (!val) {
      // ✅ Reset all state when dialog closes
      setTimeout(() => {
        setCurrentStep('address');
        setAddress('');
        setSelectedSystem(null);
        setHomeInfo({
          squareFootage: 2000,
          stories: 2,
          heatingSource: 'natural gas',
          bedrooms: 3,
        });
        setSubmittedData(null);
      }, 300);
    }
    onOpenChange(val);
  }

  // ✅ Handle reset after confirmation
  const handleConfirmationClose = () => {
    // Reset the dialog and close it
    setTimeout(() => {
      setCurrentStep('address');
      setAddress('');
      setSelectedSystem(null);
      setHomeInfo({
        squareFootage: 2000,
        stories: 2,
        heatingSource: 'natural gas',
        bedrooms: 3,
      });
      setSubmittedData(null);
      onOpenChange(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl p-0 gap-0 border-0 shadow-2xl bg-white"
        aria-describedby={undefined}
      >
        <DialogTitle className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 border-b border-[#E8EEF7]">
          <Stepper currentStep={stepMap[currentStep]} />
        </DialogTitle>

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          {currentStep === 'address' && (
            <AddressStep
              defaultAddress={address}
              onNext={(addr) => {
                setAddress(addr);
                goTo('home-info');
              }}
            />
          )}

          {currentStep === 'home-info' && (
            <HomeInfoStep
              address={address}
              onNext={(info) => {
                setHomeInfo(info);
                goTo('system');
              }}
              onBack={() => goTo('address')}
            />
          )}

          {currentStep === 'system' && (
            <SystemStep
              homeInfo={homeInfo}
              address={address}
              onSelect={(system) => {
                setSelectedSystem(system);
                goTo('schedule');
              }}
              onBack={() => goTo('home-info')}
            />
          )}

          {currentStep === 'schedule' && selectedSystem && (
            <ScheduleStep
              system={selectedSystem}
              homeInfo={homeInfo}
              address={address}
              onBack={() => goTo('system')}
              onComplete={(data) => {
                setSubmittedData(data);
                goTo('confirmation');
              }}
            />
          )}

          {currentStep === 'confirmation' && selectedSystem && submittedData && (
            <ConfirmationStep
              system={selectedSystem}
              schedule={{
                ...submittedData,
                orderNumber: submittedData.orderNumber,
              }}
              homeInfo={homeInfo}
              address={address}
              onClose={handleConfirmationClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}