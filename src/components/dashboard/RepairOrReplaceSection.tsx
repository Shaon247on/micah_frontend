"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  repairReplaceStep1Schema,
  repairReplaceStep2Schema,
  repairReplaceStep3Schema,
  type RepairReplaceStep1,
  type RepairReplaceStep2,
  type RepairReplaceStep3,
} from "@/types/services.type";
import {
  StepDots,
  slideVariants,
  slideTransition,
  PillToggle,
  OptionCard,
  NextBtn,
  ConfirmationCard,
  FieldLabel,
} from "@/components/shared/ServiceFormShell";
import { SharedContactStep, SharedDateTimeStep } from "../shared/SharedSteps";
import { submitRepairReplace } from "@/actions/repairReplace.actions";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────
const SYSTEM_TYPES = [
  { label: "Central A/C", sub: "Split system air conditioning" },
  { label: "Furnace / Heating", sub: "Gas, electric, or heat pump" },
  { label: "Heat Pump", sub: "Heating & cooling combined" },
  { label: "Mini-Split", sub: "Ductless system" },
];
const ISSUES = [
  "Not cooling/heating",
  "Strange noises",
  "High energy bills",
  "Short cycling",
  "Won't turn on",
  "Ice buildup",
  "Bad airflow",
  "Frequent repairs",
];
const SYSTEM_AGES = ["Under 5 years", "5–10 years", "11–15 years", "15+ years"];
const URGENCY_OPTIONS = [
  { label: "Emergency", sub: "System is completely down" },
  { label: "Urgent", sub: "Significant performance issues" },
  { label: "Routine", sub: "Planning ahead or maintenance" },
];

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: (v: RepairReplaceStep1) => void }) {
  const form = useForm<RepairReplaceStep1>({
    resolver: zodResolver(repairReplaceStep1Schema),
    defaultValues: { systemType: "", issue: [], systemAge: "", urgency: "" },
  });

  const systemType = form.watch("systemType");
  const issues = form.watch("issue") ?? [];
  const systemAge = form.watch("systemAge");
  const urgency = form.watch("urgency");

  function toggleIssue(v: string) {
    const cur = form.getValues("issue") ?? [];
    form.setValue(
      "issue",
      cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
      { shouldValidate: true },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        {/* System Type */}
        <FormField
          control={form.control}
          name="systemType"
          render={() => (
            <FormItem>
              <FieldLabel required>What type of system?</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                {SYSTEM_TYPES.map((opt) => (
                  <OptionCard
                    key={opt.label}
                    label={opt.label}
                    sub={opt.sub}
                    selected={systemType === opt.label}
                    onClick={() =>
                      form.setValue("systemType", opt.label, {
                        shouldValidate: true,
                      })
                    }
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Issues */}
        <FormField
          control={form.control}
          name="issue"
          render={() => (
            <FormItem>
              <FieldLabel required>What are you experiencing?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {ISSUES.map((i) => (
                  <PillToggle
                    key={i}
                    label={i}
                    selected={issues.includes(i)}
                    onClick={() => toggleIssue(i)}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Age + Urgency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="systemAge"
            render={() => (
              <FormItem>
                <FieldLabel required>How old is your system?</FieldLabel>
                <div className="space-y-2">
                  {SYSTEM_AGES.map((a) => (
                    <OptionCard
                      key={a}
                      label={a}
                      selected={systemAge === a}
                      onClick={() =>
                        form.setValue("systemAge", a, { shouldValidate: true })
                      }
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgency"
            render={() => (
              <FormItem>
                <FieldLabel required>How urgent is this?</FieldLabel>
                <div className="space-y-2">
                  {URGENCY_OPTIONS.map((o) => (
                    <OptionCard
                      key={o.label}
                      label={o.label}
                      sub={o.sub}
                      selected={urgency === o.label}
                      onClick={() =>
                        form.setValue("urgency", o.label, {
                          shouldValidate: true,
                        })
                      }
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <NextBtn label="Continue" />
      </form>
    </Form>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function RepairOrReplaceSection() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    step1?: RepairReplaceStep1;
    step2?: RepairReplaceStep2;
    step3?: RepairReplaceStep3;
  }>({});

  function goNext(n: number) {
    setDir(1);
    setStep(n);
  }
  function goBack(n: number) {
    setDir(-1);
    setStep(n);
  }
  function reset() {
    setDir(-1);
    setStep(1);
    setFormData({});
  }

  // In RepairOrReplaceSection.tsx
  const handleFinalSubmit = async (step3Data: RepairReplaceStep3) => {
    if (!formData.step1 || !formData.step2) {
      toast.error("Please complete all steps");
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine all form data with proper field names
      const fullData = {
        // Step 1 - using 'issue' (not 'issues')
        systemType: formData.step1.systemType || "",
        issue: formData.step1.issue || [],
        systemAge: formData.step1.systemAge || "",
        urgency: formData.step1.urgency || "",

        // Step 2
        fullName: formData.step2.fullName || "",
        phone: formData.step2.phone || "",
        email: formData.step2.email || "",
        address: formData.step2.address || "",
        zipCode: formData.step2.zipCode || "",
        serviceType: formData.step2.serviceType || "RESIDENTIAL",

        // Step 3
        preferredDate: step3Data.preferredDate || "",
        preferredTime: step3Data.preferredTime || "",
        notes: step3Data.notes || "",
      };

      console.log("📝 Submitting full data:", fullData);

      const result = await submitRepairReplace(fullData);

      if (result.success) {
        toast.success(result.message);
        goNext(4);
      } else {
        toast.error(result.error || "Failed to schedule appointment");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const INFO_POINTS = [
    {
      label: "Honest Diagnosis",
      desc: "We assess whether repair or replacement makes more financial sense for your situation.",
    },
    {
      label: "Transparent Pricing",
      desc: "No hidden fees. You'll know the full cost before any work begins.",
    },
    {
      label: "Expert Technicians",
      desc: "Certified HVAC professionals with years of residential experience.",
    },
    {
      label: "Same-Day Service",
      desc: "Emergency appointments often available for complete system failures.",
    },
  ];

  return (
    <section
      id="repair-replace"
      className="w-full bg-[#F8F9FB] py-16 md:py-24 scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* ... left side content remains the same ... */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
                HVAC Services
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
                Repair or Replace?
                <br />
                <span className="text-[#E07B3F]">
                  We&lsquo;ll be straight with you.
                </span>
              </h2>
              <p className="mt-5 text-lg text-[#6B6B6B] leading-8">
                Not every failing system needs to be replaced. We diagnose
                honestly — sometimes a repair extends life by years. When
                replacement makes more sense, we&lsquo;ll show you exactly why.
              </p>
            </div>

            {/* Info points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INFO_POINTS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-[#E8EEF7] shadow-sm"
                >
                  <div className="h-2 w-8 rounded-full bg-[#E07B3F] mb-3" />
                  <p className="text-sm font-bold text-[#121F37]">{p.label}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Credit card */}
            <div className="rounded-2xl bg-[#121F37] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-4">
                Your Credit Toward a New System
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4 border border-white/20">
                  <p className="text-3xl font-extrabold text-white">25%</p>
                  <p className="text-xs font-bold text-[#E07B3F] mt-1">
                    3-Year Plan
                  </p>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">
                    25% of your service cost applied toward a new system when
                    you upgrade.
                  </p>
                </div>
                <div className="rounded-xl bg-[#E07B3F] p-4">
                  <p className="text-3xl font-extrabold text-white">50%</p>
                  <p className="text-xs font-bold text-white/80 mt-1">
                    5-Year Plan
                  </p>
                  <p className="text-xs text-white/90 mt-2 leading-relaxed">
                    Full service cost back as credit toward a new system when
                    you upgrade.
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-4">
                Credit available with honest HVAC services maintenance plan.
              </p>
            </div>
          </motion.div>

          {/* ── Right: Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="rounded-[28px] bg-white shadow-[0_20px_60px_rgba(18,31,55,0.10)] overflow-hidden">
              <div className="px-6 pt-7 pb-2 sm:px-8">
                <h3 className="text-xl font-extrabold text-[#121F37]">
                  {step === 4 ? "Request Submitted!" : "Schedule a Diagnostic"}
                </h3>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  {step === 4
                    ? "Our team will contact you to confirm."
                    : "Our team will contact you to confirm your appointment."}
                </p>
                {step < 4 && <StepDots total={3} current={step} />}
              </div>

              <div className="px-6 pb-7 sm:px-8 sm:pb-8 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <Step1
                        onNext={(v) => {
                          setFormData((p) => ({ ...p, step1: v }));
                          goNext(2);
                        }}
                      />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div
                      key="s2"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <SharedContactStep
                        defaultValues={formData.step2}
                        onNext={(v) => {
                          setFormData((p) => ({ ...p, step2: v }));
                          goNext(3);
                        }}
                        onBack={() => goBack(1)}
                      />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div
                      key="s3"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <SharedDateTimeStep
                        defaultValues={formData.step3}
                        onNext={(v) => {
                          setFormData((p) => ({ ...p, step3: v }));
                          handleFinalSubmit(v);
                        }}
                        onBack={() => goBack(2)}
                        submitLabel={
                          isSubmitting ? "Submitting..." : "Submit Request"
                        }
                        isSubmitting={isSubmitting}
                      />
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div
                      key="s4"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <ConfirmationCard
                        title="You're tentatively scheduled!"
                        body="Our team will contact you shortly to confirm your appointment. Questions? Give us a call anytime."
                        phone="(630) 854 0372"
                        onScheduleAnother={reset}
                      />
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
