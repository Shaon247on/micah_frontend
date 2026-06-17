"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Building2, Refrigerator } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  hvacServicesStep1Schema, type HvacServicesStep1, type HvacServicesStep2, type HvacServicesStep3,
} from "@/types/services.type";
import {
  StepDots, slideVariants, slideTransition,
  OptionCard, NextBtn, ConfirmationCard, FieldLabel,
} from "@/components/shared/ServiceFormShell";
import { SharedContactStep, SharedDateTimeStep } from "@/components/shared/SharedSteps";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { label: "Residential", sub: "Home, condo, or townhome", icon: Home },
  { label: "Light Commercial", sub: "Office, retail, restaurant", icon: Building2 },
  { label: "Refrigeration", sub: "Walk-in coolers, freezers", icon: Refrigerator },
];

const SERVICE_TYPES_BY_PROPERTY: Record<string, string[]> = {
  Residential: [
    "A/C Repair", "A/C Replacement", "Furnace Repair", "Furnace Installation",
    "Heat Pump Service", "Mini-Split Install", "Seasonal Maintenance",
    "HVAC Diagnostics", "Thermostat Upgrade", "Ductwork / Airflow",
  ],
  "Light Commercial": [
    "Rooftop Unit Service", "Rooftop Unit Replacement", "Commercial Furnace",
    "Split-System Repair", "Preventive Maintenance", "Thermostat / Controls",
    "Airflow Troubleshooting", "Equipment Planning", "Emergency Service",
  ],
  Refrigeration: [
    "Walk-In Cooler Service", "Walk-In Freezer Repair", "Reach-In Cooler Repair",
    "Refrigeration Maintenance", "Temperature Troubleshooting",
    "Condenser / Evaporator Service", "Component Replacement", "Emergency Service",
  ],
};

const SYSTEM_TYPES = [
  "Central Split System", "Heat Pump", "Mini-Split / Ductless",
  "Rooftop Unit (RTU)", "Package Unit", "Boiler", "Walk-In Cooler/Freezer", "Not Sure",
];

const RESIDENTIAL_SERVICES = [
  "Air conditioning repair & replacement", "Furnace repair & installation",
  "Heat pump systems", "Mini-split systems", "Seasonal maintenance",
  "HVAC diagnostics", "Thermostat upgrades", "Airflow & comfort solutions",
  "Ductwork modifications", "Indoor air quality upgrades",
];

const COMMERCIAL_SERVICES = [
  "Rooftop unit service & replacement", "Commercial furnace service",
  "Split-system repair & diagnostics", "Preventive maintenance",
  "Thermostat & control upgrades", "Airflow troubleshooting",
  "Equipment replacement planning", "Emergency service",
];

const REFRIGERATION_SERVICES = [
  "Walk-in cooler service & repair", "Walk-in freezer diagnostics",
  "Reach-in cooler repair", "Refrigeration maintenance",
  "Temperature troubleshooting", "Condenser & evaporator service",
  "Refrigeration component replacement", "Emergency refrigeration service",
];

const APPROACH = [
  "Practical solutions", "Clear communication", "Reliable workmanship",
  "Proper system application", "Long-term performance",
];

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: (v: HvacServicesStep1) => void }) {
  const form = useForm<HvacServicesStep1>({
    resolver: zodResolver(hvacServicesStep1Schema),
    defaultValues: { propertyType: "", serviceNeeded: "", systemType: "", description: "" },
  });

  const propertyType = form.watch("propertyType");
  const serviceNeeded = form.watch("serviceNeeded");
  const systemType = form.watch("systemType");
  const availableServices = propertyType ? SERVICE_TYPES_BY_PROPERTY[propertyType] ?? [] : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        {/* Property Type */}
        <FormField control={form.control} name="propertyType" render={({ field }) => (
          <FormItem>
            <FieldLabel required>Property type</FieldLabel>
            <div className="grid grid-cols-1 gap-2">
              {PROPERTY_TYPES.map(p => (
                <motion.button
                  key={p.label}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    field.onChange(p.label);
                    form.setValue("serviceNeeded", "", { shouldValidate: true });
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200",
                    field.value === p.label
                      ? "border-[#E07B3F] bg-[#FFF4EC]"
                      : "border-[#E8EEF7] bg-white hover:border-[#E07B3F]/40"
                  )}
                >
                  <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                    field.value === p.label ? "bg-[#E07B3F]" : "bg-[#F5F7FA]"
                  )}>
                    <p.icon className={cn("h-4 w-4", field.value === p.label ? "text-white" : "text-[#6B6B6B]")} />
                  </div>
                  <div>
                    <p className={cn("text-sm font-bold", field.value === p.label ? "text-[#E07B3F]" : "text-[#121F37]")}>{p.label}</p>
                    <p className="text-xs text-[#6B6B6B]">{p.sub}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Service Needed — only shown once property type selected */}
        {propertyType && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <FormField control={form.control} name="serviceNeeded" render={({ field }) => (
              <FormItem>
                <FieldLabel required>Service needed</FieldLabel>
                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                  {availableServices.map(s => (
                    <OptionCard key={s} label={s} selected={field.value === s} onClick={() => field.onChange(s)} />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>
        )}

        {/* System Type */}
        <FormField control={form.control} name="systemType" render={({ field }) => (
          <FormItem>
            <FieldLabel required>System type</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {SYSTEM_TYPES.map(t => (
                <OptionCard key={t} label={t} selected={field.value === t} onClick={() => field.onChange(t)} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Description */}
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FieldLabel required>Describe the issue</FieldLabel>
            <Textarea
              placeholder="Please describe what you're experiencing in as much detail as possible..."
              className="min-h-[90px] rounded-xl border-[#D7DCE5] text-[#121F37] placeholder:text-[#9AA3B2] focus-visible:ring-[#E07B3F]/20 focus-visible:border-[#E07B3F] resize-none text-sm"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )} />

        <NextBtn label="Continue" />
      </form>
    </Form>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function HvacServicesSection() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [activeTab, setActiveTab] = useState<"residential" | "commercial" | "refrigeration">("residential");
  const [formData, setFormData] = useState<{
    step1?: HvacServicesStep1; step2?: HvacServicesStep2; step3?: HvacServicesStep3;
  }>({});

  function goNext(n: number) { setDir(1); setStep(n); }
  function goBack(n: number) { setDir(-1); setStep(n); }
  function reset() { setDir(-1); setStep(1); setFormData({}); }

  const TABS = [
    { key: "residential" as const, label: "Residential", icon: Home },
    { key: "commercial" as const, label: "Commercial", icon: Building2 },
    { key: "refrigeration" as const, label: "Refrigeration", icon: Refrigerator },
  ];

  const tabServices = activeTab === "residential" ? RESIDENTIAL_SERVICES : activeTab === "commercial" ? COMMERCIAL_SERVICES : REFRIGERATION_SERVICES;

  return (
    <section id="hvac-services" className="w-full bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">HVAC Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Residential, Light Commercial<br />&amp; Refrigeration Services
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            Reliable heating, cooling, ventilation, and light refrigeration solutions. Dependable workmanship, honest recommendations, and long-term system performance.
          </p>
        </motion.div>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#repair-replace" className="inline-flex items-center justify-center rounded-full border border-[#E8EEF7] bg-white px-5 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#E07B3F] hover:text-[#E07B3F]">
            Repair or Replace
          </a>
          <a href="#repair-replace" className="inline-flex items-center justify-center rounded-full border border-[#E8EEF7] bg-white px-5 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#E07B3F] hover:text-[#E07B3F]">
            Repair & Tune-Up
          </a>
          <a href="#ac-rejuvenation" className="inline-flex items-center justify-center rounded-full border border-[#E8EEF7] bg-white px-5 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#E07B3F] hover:text-[#E07B3F]">
            A/C Rejuvenation
          </a>
        </div>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left */}
          <div className="space-y-8">
            {/* Tab switcher */}
            <div className="flex rounded-2xl bg-[#F5F7FA] p-1.5 gap-1">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    activeTab === tab.key
                      ? "bg-white text-[#121F37] shadow-sm"
                      : "text-[#6B6B6B] hover:text-[#121F37]"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Services list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-(--primary) p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-4">
                  {activeTab === "residential" ? "Residential Services Include" : activeTab === "commercial" ? "Commercial HVAC Services Include" : "Refrigeration Services Include"}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {tabServices.map(s => (
                    <div key={s} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E07B3F] shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Commercial We Service */}
            {activeTab === "commercial" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[#E8EEF7] bg-white p-6"
              >
                <p className="text-sm font-extrabold text-[#121F37] mb-3">We Service</p>
                <div className="flex flex-wrap gap-2">
                  {["Offices","Retail spaces","Restaurants","Small warehouses","Multi-tenant spaces","Light commercial buildings"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-[#F5F7FA] border border-[#E8EEF7] text-xs font-medium text-[#374151]">{t}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Our Approach */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-[#FFF4EC] border border-[#E07B3F]/20 p-6"
            >
              <p className="text-sm font-extrabold text-[#121F37] mb-3">Honest Recommendations. Quality Work.</p>
              <p className="text-xs text-[#6B6B6B] mb-4 leading-relaxed">
                We believe homeowners and businesses deserve straightforward service without unnecessary pressure or upselling.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {APPROACH.map(a => (
                  <div key={a} className="flex items-start gap-2 text-sm text-[#374151]">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E07B3F] shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[28px] bg-white shadow-[0_20px_60px_rgba(18,31,55,0.10)] border border-[#E8EEF7] overflow-hidden">
              <div className="px-6 pt-7 pb-2 sm:px-8">
                <h3 className="text-xl font-extrabold text-[#121F37]">
                  {step === 4 ? "Request Submitted!" : "Schedule Service"}
                </h3>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  {step === 4 ? "Our team will contact you to confirm." : "Our team will contact you to confirm your appointment."}
                </p>
                {step < 4 && <StepDots total={3} current={step} />}
              </div>
              <div className="px-6 pb-7 sm:px-8 sm:pb-8 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  {step === 1 && (
                    <motion.div key="hvac-s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step1 onNext={(v) => { setFormData(p => ({ ...p, step1: v })); goNext(2); }} />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="hvac-s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedContactStep defaultValues={formData.step2} onNext={(v) => { setFormData(p => ({ ...p, step2: v })); goNext(3); }} onBack={() => goBack(1)} />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="hvac-s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedDateTimeStep defaultValues={formData.step3} onNext={(v) => { setFormData(p => ({ ...p, step3: v })); goNext(4); }} onBack={() => goBack(2)} submitLabel="Submit Service Request" />
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="hvac-s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <ConfirmationCard title="You're tentatively scheduled!" body="Our team will contact you shortly to confirm your appointment. Questions? Give us a call anytime." phone="(630) 854 0372" onScheduleAnother={reset} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}