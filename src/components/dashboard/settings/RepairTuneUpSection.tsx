'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  repairTuneUpStep1Schema,
  type RepairTuneUpStep1,
  type RepairTuneUpStep2,
  type RepairTuneUpStep3,
} from '@/schemas/repairTuneUp.schema';
import {
  StepDots,
  slideVariants,
  slideTransition,
  PillToggle,
  OptionCard,
  NextBtn,
  ConfirmationCard,
  FieldLabel,
} from '@/components/shared/ServiceFormShell';
import { submitRepairTuneUp } from '@/actions/repairTuneUp.actions';
import { toast } from 'sonner';
import { SharedContactStep, SharedDateTimeStep } from '@/components/shared/SharedSteps';

// ─── Constants ────────────────────────────────────────────────────────────────
const SYSTEM_TYPES = [
  { label: 'Central A/C', sub: 'Split system air conditioning' },
  { label: 'Furnace / Heating', sub: 'Gas, electric, or heat pump' },
  { label: 'Heat Pump', sub: 'Heating & cooling combined' },
  { label: 'Mini-Split', sub: 'Ductless system' },
  { label: 'Boiler', sub: 'Radiant heating system' },
  { label: 'Packaged Unit', sub: 'All-in-one rooftop unit' },
];

const CONCERNS = [
  'Poor air flow',
  'Uneven heating/cooling',
  'Strange noises',
  'High energy bills',
  'System short cycling',
  'Water leaks',
  'Foul odors',
  'Thermostat issues',
  'Frequent cycling on/off',
  'System won\'t start',
];

const NOISE_LEVELS = [
  'None',
  'Mild',
  'Moderate',
  'Severe',
  'Very Loud',
];

const EFFICIENCY_RATINGS = [
  'Excellent',
  'Good',
  'Average',
  'Poor',
  'Not Sure',
];

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: (v: RepairTuneUpStep1) => void }) {
  const form = useForm<RepairTuneUpStep1>({
    resolver: zodResolver(repairTuneUpStep1Schema),
    defaultValues: {
      systemType: '',
      specificConcerns: [],
      noiseLevel: null,
      energyEfficiency: null,
      lastTuneUpDate: null,
    },
  });

  const systemType = form.watch('systemType');
  const concerns = form.watch('specificConcerns') ?? [];

  function toggleConcern(v: string) {
    const cur = form.getValues('specificConcerns') ?? [];
    form.setValue('specificConcerns', cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v], { shouldValidate: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        {/* System Type */}
        <FormField control={form.control} name="systemType" render={() => (
          <FormItem>
            <FieldLabel required>What type of system?</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {SYSTEM_TYPES.map(opt => (
                <OptionCard
                  key={opt.label}
                  label={opt.label}
                  sub={opt.sub}
                  selected={systemType === opt.label}
                  onClick={() => form.setValue('systemType', opt.label, { shouldValidate: true })}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Specific Concerns */}
        <FormField control={form.control} name="specificConcerns" render={() => (
          <FormItem>
            <FieldLabel required>What are your concerns?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map(c => (
                <PillToggle
                  key={c}
                  label={c}
                  selected={concerns.includes(c)}
                  onClick={() => toggleConcern(c)}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Noise Level + Energy Efficiency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="noiseLevel" render={({ field }) => (
            <FormItem>
              <FieldLabel>Noise Level (Optional)</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger className="h-12 rounded-xl border-[#D7DCE5] bg-white">
                  <SelectValue placeholder="Select noise level" />
                </SelectTrigger>
                <SelectContent>
                  {NOISE_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="energyEfficiency" render={({ field }) => (
            <FormItem>
              <FieldLabel>Energy Efficiency (Optional)</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger className="h-12 rounded-xl border-[#D7DCE5] bg-white">
                  <SelectValue placeholder="Select efficiency" />
                </SelectTrigger>
                <SelectContent>
                  {EFFICIENCY_RATINGS.map(rating => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Last Tune Up Date */}
        <FormField control={form.control} name="lastTuneUpDate" render={({ field }) => (
          <FormItem>
            <FieldLabel>Last Tune Up Date (Optional)</FieldLabel>
            <FormControl>
              <input
                type="date"
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value || null)}
                className="h-12 w-full rounded-xl border border-[#D7DCE5] bg-white px-4 text-[#121F37] focus:border-[#E07B3F] focus:outline-none focus:ring-2 focus:ring-[#E07B3F]/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <NextBtn label="Continue" />
      </form>
    </Form>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function RepairTuneUpSection() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    step1?: RepairTuneUpStep1;
    step2?: RepairTuneUpStep2;
    step3?: RepairTuneUpStep3;
  }>({});

  function goNext(n: number) { setDir(1); setStep(n); }
  function goBack(n: number) { setDir(-1); setStep(n); }
  function reset() { setDir(-1); setStep(1); setFormData({}); }

  const handleFinalSubmit = async (step3Data: RepairTuneUpStep3) => {
    if (!formData.step1 || !formData.step2) {
      toast.error('Please complete all steps');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullData = {
        ...formData.step1,
        ...formData.step2,
        ...step3Data,
        phone: formData.step2.phone || '',
        serviceType: formData.step2.serviceType || 'RESIDENTIAL',
      };

      const result = await submitRepairTuneUp(fullData as any);

      if (result.success) {
        toast.success(result.message);
        goNext(4);
      } else {
        toast.error(result.error || 'Failed to schedule tune up');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const INFO_POINTS = [
    { label: 'Preventative Care', desc: 'Regular tune-ups prevent breakdowns and extend system life by up to 30%.' },
    { label: 'Energy Savings', desc: 'A well-tuned system runs 10-15% more efficiently, saving on monthly bills.' },
    { label: 'Expert Technicians', desc: 'Certified professionals who know exactly what to look for.' },
    { label: 'Same-Day Service', desc: 'Emergency appointments often available for urgent issues.' },
  ];

  return (
    <section id="repair-tune-up" className="w-full bg-[#F8F9FB] py-16 md:py-24 scroll-mt-20">
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
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
                HVAC Services
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
                Repair &amp; Tune Up
                <br />
                <span className="text-[#E07B3F]">Keep your system running strong.</span>
              </h2>
              <p className="mt-5 text-lg text-[#6B6B6B] leading-8">
                Regular maintenance is the key to a long-lasting, efficient HVAC system. Our comprehensive tune-up service identifies small issues before they become costly repairs, saving you money and extending your system&lsquo;s life.
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
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Benefits Card */}
            <div className="rounded-2xl bg-[#121F37] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-4">
                What&apos;s Included in a Tune Up
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#E07B3F] text-lg">✓</span>
                  <span className="text-xs text-white/80">Inspect &amp; clean coils</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E07B3F] text-lg">✓</span>
                  <span className="text-xs text-white/80">Check refrigerant levels</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E07B3F] text-lg">✓</span>
                  <span className="text-xs text-white/80">Inspect electrical connections</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E07B3F] text-lg">✓</span>
                  <span className="text-xs text-white/80">Calibrate thermostat</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E07B3F] text-lg">✓</span>
                  <span className="text-xs text-white/80">Lubricate moving parts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E07B3F] text-lg">✓</span>
                  <span className="text-xs text-white/80">Check &amp; clean blower assembly</span>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-4">Includes a full system diagnostic and performance report.</p>
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
                  {step === 4 ? 'Request Submitted!' : 'Schedule Your Tune Up'}
                </h3>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  {step === 4
                    ? 'Our team will contact you to confirm.'
                    : 'Our team will contact you to confirm your appointment.'}
                </p>
                {step < 4 && <StepDots total={3} current={step} />}
              </div>

              <div className="px-6 pb-7 sm:px-8 sm:pb-8 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  {step === 1 && (
                    <motion.div key="s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step1
                        onNext={(v) => { setFormData(p => ({ ...p, step1: v })); goNext(2); }}
                      />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedContactStep
                        defaultValues={formData.step2}
                        onNext={(v) => { setFormData(p => ({ ...p, step2: v })); goNext(3); }}
                        onBack={() => goBack(1)}
                      />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <SharedDateTimeStep
                        defaultValues={formData.step3}
                        onNext={(v) => {
                          setFormData(p => ({ ...p, step3: v }));
                          handleFinalSubmit(v);
                        }}
                        onBack={() => goBack(2)}
                        submitLabel={isSubmitting ? 'Submitting...' : 'Schedule Tune Up'}
                        isSubmitting={isSubmitting}
                      />
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
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