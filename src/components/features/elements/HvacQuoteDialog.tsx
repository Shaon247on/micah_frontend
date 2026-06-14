"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Stepper } from "./Stepper";
import {
  MOCK_HOME_INFO,
  getStepperKey,
  type QuoteStep,
  type ContactFormValues,
  type HomeInfoFormValues,
  type HomeInfoEditFormValues,
  type HvacSystem,
  type ScheduleFormValues,
} from "@/types/HvacQuote.types";
import { AddressStep } from "./Addressstep";
import { ContactStep } from "./Contactstep";
import { SystemStep } from "./SystemStep";
import { ScheduleStep } from "./ScheduleStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { HomeInfoStep } from "./HomeInfoStep";
import { HomeInfoEditStep } from "./HomeInfoEditStep";

interface HvacQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAddress?: string;
}

export function HvacQuoteDialog({
  open,
  onOpenChange,
  initialAddress = "",
}: HvacQuoteDialogProps) {
  const [currentStep, setCurrentStep] = useState<QuoteStep>("address");
  const [address, setAddress] = useState(initialAddress);
  const [homeInfo, setHomeInfo] = useState<HomeInfoFormValues>(MOCK_HOME_INFO);
  const [_contact, setContact] = useState<ContactFormValues | undefined>();
  const [selectedSystem, setSelectedSystem] = useState<
    HvacSystem | undefined
  >();
  const [schedule, setSchedule] = useState<ScheduleFormValues | undefined>();

  function goTo(step: QuoteStep) {
    setCurrentStep(step);
  }

  function handleOpenChange(val: boolean) {
    if (!val) {
      // Delay reset so the closing animation plays cleanly
      setTimeout(() => {
        setCurrentStep("address");
        setHomeInfo(MOCK_HOME_INFO);
        setContact(undefined);
        setSelectedSystem(undefined);
        setSchedule(undefined);
      }, 300);
    }
    onOpenChange(val);
  }

  const showStepper =
    currentStep !== "address" && currentStep !== "confirmation";
  const stepperKey = getStepperKey(currentStep);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl p-0 gap-0 border-0 shadow-2xl bg-white"
        aria-describedby={undefined}
      >
        {/* Stepper bar */}
        {showStepper ? (
          <DialogTitle className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 border-b border-[#E8EEF7]">
            <Stepper currentStep={stepperKey} />
          </DialogTitle>
        ) : (
          <DialogTitle className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 border-b border-[#E8EEF7]">
            <Stepper currentStep={stepperKey} />
          </DialogTitle>
        )}

        {/* Step content */}
        <div className="px-6 py-7 sm:px-8 sm:py-8">
          {/* ── Step 1: Address ── */}
          {currentStep === "address" && (
            <AddressStep
              defaultAddress={address}
              onNext={(addr) => {
                setAddress(addr);
                goTo("home-info");
              }}
            />
          )}

          {/* ── Step 2a: Home Info confirm ── */}
          {currentStep === "home-info" && (
            <HomeInfoStep
              homeInfo={homeInfo}
              address={address}
              onConfirm={() => goTo("contact")}
              onEdit={() => goTo("home-info-edit")}
              onBack={() => goTo("address")}
            />
          )}

          {/* ── Step 2b: Home Info edit form ── */}
          {currentStep === "home-info-edit" && (
            <HomeInfoEditStep
              homeInfo={homeInfo}
              address={address}
              onNext={(updated: HomeInfoEditFormValues) => {
                // Merge edited values back into homeInfo state
                setHomeInfo((prev) => ({
                  ...prev,
                  bedrooms: updated.bedrooms,
                  stories: updated.stories,
                  squareFootage: updated.squareFootage,
                  heatingSource: updated.heatingSource,
                }));
                goTo("contact");
              }}
              onBack={() => goTo("address")}
            />
          )}

          {/* ── Step 3: Contact (We Found 3 Matches) ── */}
          {currentStep === "contact" && (
            <ContactStep
              onNext={(contact) => {
                setContact(contact);
                goTo("system");
              }}
              onBack={() => goTo("home-info")}
            />
          )}

          {/* ── Step 4: System selection ── */}
          {currentStep === "system" && (
            <SystemStep
              onSelect={(system) => {
                setSelectedSystem(system);
                goTo("schedule");
              }}
              onBack={() => goTo("contact")}
            />
          )}

          {/* ── Step 5: Schedule ── */}
          {currentStep === "schedule" && selectedSystem && (
            <ScheduleStep
              system={selectedSystem}
              onSubmit={(values) => {
                setSchedule(values);
                goTo("confirmation");
              }}
              onBack={() => goTo("system")}
            />
          )}

          {/* ── Step 6: Confirmation ── */}
          {currentStep === "confirmation" && selectedSystem && schedule && (
            <ConfirmationStep
              system={selectedSystem}
              schedule={schedule}
              address={address}
              onClose={() => handleOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
