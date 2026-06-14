"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wind, Thermometer, Layers, Activity } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  iaqStep1Schema, type IaqStep1, type IaqStep2, type IaqStep3,
} from "@/types/services.type";
import {
  StepDots, slideVariants, slideTransition,
  PillToggle, OptionCard, NextBtn, ConfirmationCard, FieldLabel,
} from "@/components/shared/ServiceFormShell";
import { SharedContactStep, SharedDateTimeStep } from "@/components/shared/SharedSteps";

// ─── Constants ────────────────────────────────────────────────────────────────
const IAQ_PROBLEMS = [
  "Excess humidity", "Dry air in winter", "Musty odors", "Dust & allergens",
  "Uncomfortable rooms", "Stale air", "Moisture in crawl space", "Airflow issues",
];

const SERVICE_AREAS = [
  { label: "Whole-Home IAQ", sub: "Humidifiers, dehumidifiers, air purifiers" },
  { label: "Air Purification", sub: "HEPA, UV, media air cleaners" },
  { label: "Crawl Space", sub: "Encapsulation, vapor barriers, dehumidifiers" },
  { label: "Ventilation", sub: "Fresh air systems, duct sealing" },
];

const HOME_TYPES = ["Single Family", "Townhome / Condo", "Multi-Level Home", "Commercial / Office"];

const IAQ_SOLUTIONS = [
  "Whole-home humidifiers", "Whole-home dehumidifiers", "Air purification systems",
  "Media air cleaners", "HEPA filtration upgrades", "UV air purification",
  "Fresh air ventilation systems", "Smart IAQ controls",
];

const CRAWL_SOLUTIONS = [
  "Crawl space encapsulation", "Vapor barriers", "Crawl space dehumidifiers",
  "Air sealing", "Duct sealing & insulation", "Insulation upgrades", "Ventilation improvements",
];

const ICONS = [
  { icon: Wind, label: "Air Quality", desc: "Reduce airborne dust, allergens & stale air" },
  { icon: Thermometer, label: "Humidity Control", desc: "Balance dry winter air and excess summer moisture" },
  { icon: Layers, label: "Crawl Space", desc: "Seal moisture before it affects your living space" },
  { icon: Activity, label: "HVAC Efficiency", desc: "Proper IAQ improves overall system performance" },
];

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: (v: IaqStep1) => void }) {
  const form = useForm<IaqStep1>({
    resolver: zodResolver(iaqStep1Schema),
    defaultValues: { problems: [], serviceArea: "", homeType: "" },
  });

  const problems = form.watch("problems") ?? [];
  const serviceArea = form.watch("serviceArea");
  const homeType = form.watch("homeType");

  function toggleProblem(v: string) {
    const cur = form.getValues("problems") ?? [];
    form.setValue("problems", cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v], { shouldValidate: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        <FormField control={form.control} name="problems" render={() => (
          <FormItem>
            <FieldLabel required>What are you experiencing?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {IAQ_PROBLEMS.map(p => (
                <PillToggle key={p} label={p} selected={problems.includes(p)} onClick={() => toggleProblem(p)} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="serviceArea" render={() => (
          <FormItem>
            <FieldLabel required>What area are you focused on?</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_AREAS.map(s => (
                <OptionCard key={s.label} label={s.label} sub={s.sub} selected={serviceArea === s.label} onClick={() => form.setValue("serviceArea", s.label, { shouldValidate: true })} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="homeType" render={() => (
          <FormItem>
            <FieldLabel required>Home type</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {HOME_TYPES.map(t => (
                <OptionCard key={t} label={t} selected={homeType === t} onClick={() => form.setValue("homeType", t, { shouldValidate: true })} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <NextBtn label="Continue" />
      </form>
    </Form>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function IndoorAirQualitySection() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState<{
    step1?: IaqStep1; step2?: IaqStep2; step3?: IaqStep3;
  }>({});

  function goNext(n: number) { setDir(1); setStep(n); }
  function goBack(n: number) { setDir(-1); setStep(n); }
  function reset() { setDir(-1); setStep(1); setFormData({}); }

  return (
    <section id="indoor-air-quality" className="w-full bg-[#F8F9FB] py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">Indoor Air Quality & Moisture Control</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Your home&lsquo;s comfort depends<br />on more than temperature.
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            Humidity, airflow, filtration, and moisture control all impact your indoor environment — and your HVAC efficiency. We provide practical solutions that address the whole picture.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left */}
          <div className="space-y-8">
            {/* Benefit icons */}
            <div className="grid grid-cols-2 gap-4">
              {ICONS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-[#E8EEF7] shadow-sm"
                >
                  <div className="h-9 w-9 rounded-xl bg-[#FFF4EC] flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-[#E07B3F]" />
                  </div>
                  <p className="text-sm font-bold text-[#121F37]">{item.label}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* IAQ Solutions dark card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl bg-(--primary) p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-4">Indoor Air Quality Solutions</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {IAQ_SOLUTIONS.map(s => (
                  <div key={s} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E07B3F] shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Crawl Space card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-[#E8EEF7] bg-white p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-1">Crawl Space & Moisture Control</p>
              <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">Moisture beneath your home directly affects indoor air quality, odors, and HVAC efficiency.</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {CRAWL_SOLUTIONS.map(s => (
                  <div key={s} className="flex items-start gap-2 text-sm text-[#374151]">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E07B3F] shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Whole-home approach */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-2xl bg-[#FFF4EC] border border-[#E07B3F]/20 p-6"
            >
              <p className="text-sm font-extrabold text-[#121F37] mb-2">A Whole-Home Comfort Approach</p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Our team evaluates how your HVAC system, airflow, humidity, and home conditions work together to identify practical solutions that fit your goals and budget.
              </p>
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
                  {step === 4 ? "Request Submitted!" : "Schedule a Consultation"}
                </h3>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  {step === 4 ? "Our team will contact you to confirm." : "Our team will contact you to confirm your appointment."}
                </p>
                {step < 4 && <StepDots total={3} current={step} />}
              </div>
              <div className="px-6 pb-7 sm:px-8 sm:pb-8 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  {step === 1 && (
                    <motion.div key="iaq-s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step1 onNext={(v) => { setFormData(p => ({ ...p, step1: v })); goNext(2); }} />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="iaq-s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedContactStep defaultValues={formData.step2} onNext={(v) => { setFormData(p => ({ ...p, step2: v })); goNext(3); }} onBack={() => goBack(1)} />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="iaq-s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedDateTimeStep defaultValues={formData.step3} onNext={(v) => { setFormData(p => ({ ...p, step3: v })); goNext(4); }} onBack={() => goBack(2)} submitLabel="Schedule Consultation" />
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="iaq-s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <ConfirmationCard title="You're tentatively scheduled!" body="Our team will contact you shortly to confirm your appointment. Questions? Give us a call anytime." phone="Phone Number" onScheduleAnother={reset} />
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