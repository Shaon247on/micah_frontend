"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Droplets, ShieldCheck, Zap, FlaskConical } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  waterQualityStep1Schema,
  type WaterQualityStep1,
  type WaterQualityStep2,
  type WaterQualityStep3,
} from "@/types/services.type";
import {
  StepDots, slideVariants, slideTransition,
  PillToggle, OptionCard, NextBtn, ConfirmationCard, FieldLabel,
} from "@/components/shared/ServiceFormShell";
import { SharedContactStep, SharedDateTimeStep } from "@/components/shared/SharedSteps";

// ─── Constants ────────────────────────────────────────────────────────────────
const CONCERNS = [
  "Hard water / scale buildup", "Chlorine taste or odor",
  "Sediment / particles", "Drinking water quality",
  "Mineral contamination", "Spotty dishes / fixtures",
];

const SERVICE_TYPES = [
  { label: "Whole-Home Water Softener", sub: "Remove hardness minerals" },
  { label: "Reverse Osmosis System", sub: "Drinking water purification" },
  { label: "Carbon Filtration", sub: "Chlorine & odor removal" },
  { label: "UV Purification", sub: "Bacteria & pathogen control" },
  { label: "Sediment Filtration", sub: "Particles & sediment" },
  { label: "Water Quality Testing", sub: "Know what's in your water" },
];

const HOME_SIZES = ["Under 1,500 sq ft", "1,500–2,500 sq ft", "2,500–4,000 sq ft", "4,000+ sq ft"];

const WHY_UPGRADE = [
  { icon: ShieldCheck, label: "Protect Appliances", desc: "Extend lifespan of water heaters, dishwashers & more" },
  { icon: Droplets, label: "Better Tasting Water", desc: "Remove chlorine taste and odor from every tap" },
  { icon: Zap, label: "Reduce Scale Buildup", desc: "Prevent costly pipe and fixture damage" },
  { icon: FlaskConical, label: "Healthier Home", desc: "Filter sediment, minerals & harmful contaminants" },
];

const SERVICES_LIST = [
  "Whole-home water softeners", "Reverse osmosis drinking systems",
  "Carbon filtration systems", "Sediment filtration",
  "UV purification systems", "Water quality testing",
  "Filter replacement & maintenance",
];

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: (v: WaterQualityStep1) => void }) {
  const form = useForm<WaterQualityStep1>({
    resolver: zodResolver(waterQualityStep1Schema),
    defaultValues: { concerns: [], serviceType: "", homeSize: "" },
  });

  const concerns = form.watch("concerns") ?? [];
  const serviceType = form.watch("serviceType");
  const homeSize = form.watch("homeSize");

  function toggleConcern(v: string) {
    const cur = form.getValues("concerns") ?? [];
    form.setValue("concerns", cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v], { shouldValidate: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        {/* Concerns */}
        <FormField control={form.control} name="concerns" render={() => (
          <FormItem>
            <FieldLabel required>What water issues are you experiencing?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map(c => (
                <PillToggle key={c} label={c} selected={concerns.includes(c)} onClick={() => toggleConcern(c)} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Service Type */}
        <FormField control={form.control} name="serviceType" render={() => (
          <FormItem>
            <FieldLabel required>Which service are you interested in?</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_TYPES.map(s => (
                <OptionCard key={s.label} label={s.label} sub={s.sub} selected={serviceType === s.label} onClick={() => form.setValue("serviceType", s.label, { shouldValidate: true })} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Home Size */}
        <FormField control={form.control} name="homeSize" render={() => (
          <FormItem>
            <FieldLabel required>Home size</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {HOME_SIZES.map(s => (
                <OptionCard key={s} label={s} selected={homeSize === s} onClick={() => form.setValue("homeSize", s, { shouldValidate: true })} />
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
export function WaterQualitySection() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState<{
    step1?: WaterQualityStep1;
    step2?: WaterQualityStep2;
    step3?: WaterQualityStep3;
  }>({});

  function goNext(n: number) { setDir(1); setStep(n); }
  function goBack(n: number) { setDir(-1); setStep(n); }
  function reset() { setDir(-1); setStep(1); setFormData({}); }

  return (
    <section id="water-quality" className="w-full bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">Water Quality Solutions</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Protect your home,<br />plumbing & appliances.
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            Professionally installed water treatment systems that improve your water quality from every tap in your home.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left ── */}
          <div className="space-y-8">
            {/* Why Upgrade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_UPGRADE.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#F8F9FB] rounded-2xl p-5 border border-[#E8EEF7]"
                >
                  <div className="h-9 w-9 rounded-xl bg-[#FFF4EC] flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-[#E07B3F]" />
                  </div>
                  <p className="text-sm font-bold text-[#121F37]">{item.label}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Services We Coordinate */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-(--primary) p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-4">Services We Coordinate</p>
              <ul className="space-y-2">
                {SERVICES_LIST.map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E07B3F] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40 mt-4">
                Installations are completed by licensed trade professionals where applicable under local and state requirements.
              </p>
            </motion.div>

            {/* Process steps */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-[#E8EEF7] bg-white p-6"
            >
              <p className="text-sm font-extrabold text-[#121F37] mb-4">Simple, Professional Installation</p>
              <div className="space-y-3">
                {["Consultation & system recommendation", "Equipment sourcing & scheduling", "Licensed professional installation", "Ongoing support & maintenance"].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-[#FFF4EC] border border-[#E07B3F]/30 flex items-center justify-center text-xs font-bold text-[#E07B3F]">{i + 1}</div>
                    <p className="text-sm text-[#6B6B6B]">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
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
                    <motion.div key="wq-s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step1 onNext={(v) => { setFormData(p => ({ ...p, step1: v })); goNext(2); }} />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="wq-s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedContactStep defaultValues={formData.step2} onNext={(v) => { setFormData(p => ({ ...p, step2: v })); goNext(3); }} onBack={() => goBack(1)} />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="wq-s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedDateTimeStep defaultValues={formData.step3} onNext={(v) => { setFormData(p => ({ ...p, step3: v })); goNext(4); }} onBack={() => goBack(2)} submitLabel="Schedule Consultation" />
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="wq-s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
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