"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, CheckCircle2, Wind, Droplets, Leaf, Shield, Home, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitIndoorAirQuality } from "@/actions/indoorAirQuality.actions";

// ─── Step Dots ────────────────────────────────────────────────────────────────
function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: current === i + 1 ? 22 : 10,
            backgroundColor: current > i + 1 ? "#E07B3F" : current === i + 1 ? "#E07B3F" : "#D1D5DB",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-2.5 rounded-full"
        />
      ))}
    </div>
  );
}

// ─── Pill Toggle ──────────────────────────────────────────────────────────────
function PillToggle({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer",
        selected
          ? "border-[#E07B3F] bg-[#FFF4EC] text-[#E07B3F] shadow-sm"
          : "border-[#D7DCE5] bg-white text-[#374151] hover:border-[#E07B3F]/60 hover:bg-[#FFF9F5]"
      )}
    >
      {label}
    </motion.button>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────
function OptionCard({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer",
        selected
          ? "border-[#E07B3F] bg-[#FFF4EC]"
          : "border-[#E8EEF7] bg-white hover:border-[#E07B3F]/40 hover:bg-[#FFF9F5]"
      )}
    >
      <p className={cn("text-sm font-semibold", selected ? "text-[#E07B3F]" : "text-[#121F37]")}>
        {label}
      </p>
      {sub && <p className="text-xs text-[#6B6B6B] mt-0.5">{sub}</p>}
    </motion.button>
  );
}

// ─── Slide Variants ──────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};
const slideTransition = { duration: 0.3, ease: "easeInOut" as const };

// ─── Constants ────────────────────────────────────────────────────────────────
const SYMPTOMS = [
  "Excessive dust",
  "Musty odors",
  "High humidity",
  "Low humidity",
  "Allergy symptoms",
  "Respiratory issues",
  "Static electricity",
  "Mold growth",
];

const PROPERTY_TYPES = ["RESIDENTIAL", "COMMERCIAL", "BOTH"];
const TIME_SLOTS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ onNext, defaultValues }: { onNext: (data: any) => void; defaultValues?: any }) {
  const [symptoms, setSymptoms] = useState<string[]>(defaultValues?.symptoms || []);
  const [propertySizeSqFt, setPropertySizeSqFt] = useState<number | null>(defaultValues?.propertySizeSqFt || null);
  const [hasHumidityIssue, setHasHumidityIssue] = useState(defaultValues?.hasHumidityIssue || false);
  const [hasDustIssue, setHasDustIssue] = useState(defaultValues?.hasDustIssue || false);
  const [hasOdorIssue, setHasOdorIssue] = useState(defaultValues?.hasOdorIssue || false);
  const [occupantsWithAllergy, setOccupantsWithAllergy] = useState<number | null>(defaultValues?.occupantsWithAllergy || null);
  const [currentSystem, setCurrentSystem] = useState(defaultValues?.currentSystem || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (symptoms.length === 0) newErrors.symptoms = "Please select at least one symptom";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ symptoms, propertySizeSqFt, hasHumidityIssue, hasDustIssue, hasOdorIssue, occupantsWithAllergy, currentSystem });
    }
  };

  return (
    <div className="space-y-5">
      {/* Symptoms */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37] mb-2">
          What air quality issues are you experiencing? <span className="text-[#E07B3F]">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map(s => (
            <PillToggle key={s} label={s} selected={symptoms.includes(s)} onClick={() => {
              setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
              if (errors.symptoms) setErrors(prev => ({ ...prev, symptoms: "" }));
            }} />
          ))}
        </div>
        {errors.symptoms && <p className="text-xs text-red-500 mt-1">{errors.symptoms}</p>}
      </div>

      {/* Property Size */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Property Size (sq ft) - Optional
        </Label>
        <Input
          type="number"
          min={0}
          placeholder="e.g. 2500"
          value={propertySizeSqFt || ""}
          onChange={(e) => setPropertySizeSqFt(e.target.value ? parseInt(e.target.value) : null)}
          className="h-12 rounded-xl border-[#D7DCE5] bg-white mt-1"
        />
      </div>

      {/* Issues Checkboxes */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 text-sm text-[#121F37]">
          <input
            type="checkbox"
            checked={hasHumidityIssue}
            onChange={(e) => setHasHumidityIssue(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#E07B3F] focus:ring-[#E07B3F]"
          />
          Humidity Issue
        </label>
        <label className="flex items-center gap-2 text-sm text-[#121F37]">
          <input
            type="checkbox"
            checked={hasDustIssue}
            onChange={(e) => setHasDustIssue(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#E07B3F] focus:ring-[#E07B3F]"
          />
          Dust Issue
        </label>
        <label className="flex items-center gap-2 text-sm text-[#121F37]">
          <input
            type="checkbox"
            checked={hasOdorIssue}
            onChange={(e) => setHasOdorIssue(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#E07B3F] focus:ring-[#E07B3F]"
          />
          Odor Issue
        </label>
      </div>

      {/* Occupants with Allergy */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Occupants with Allergies (Optional)
        </Label>
        <Input
          type="number"
          min={0}
          placeholder="e.g. 2"
          value={occupantsWithAllergy || ""}
          onChange={(e) => setOccupantsWithAllergy(e.target.value ? parseInt(e.target.value) : null)}
          className="h-12 rounded-xl border-[#D7DCE5] bg-white mt-1"
        />
      </div>

      {/* Current System */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Current HVAC System (Optional)
        </Label>
        <Input
          placeholder="e.g. Central AC with basic filter"
          value={currentSystem}
          onChange={(e) => setCurrentSystem(e.target.value)}
          className="h-12 rounded-xl border-[#D7DCE5] bg-white mt-1"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({ onNext, onBack, defaultValues }: { onNext: (data: any) => void; onBack: () => void; defaultValues?: any }) {
  const [fullName, setFullName] = useState(defaultValues?.fullName || "");
  const [phone, setPhone] = useState(defaultValues?.phone || "");
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [address, setAddress] = useState(defaultValues?.address || "");
  const [zipCode, setZipCode] = useState(defaultValues?.zipCode || "");
  const [propertyType, setPropertyType] = useState(defaultValues?.propertyType || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) newErrors.fullName = "Name must be at least 2 characters";
    if (phone.replace(/\D/g, "").length < 10) newErrors.phone = "Please enter a valid phone number";
    if (!email.includes("@") || !email.includes(".")) newErrors.email = "Please enter a valid email";
    if (address.trim().length < 5) newErrors.address = "Please enter your full address";
    if (zipCode.trim().length < 4) newErrors.zipCode = "Please enter a valid ZIP code";
    if (!propertyType) newErrors.propertyType = "Please select property type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ fullName, phone, email, address, zipCode, propertyType });
    }
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Full Name <span className="text-[#E07B3F]">*</span>
        </Label>
        <Input
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors(prev => ({ ...prev, fullName: "" })); }}
          className={cn("h-12 rounded-xl border-[#D7DCE5] mt-1", errors.fullName && "border-red-500")}
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            Phone <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            placeholder="Phone Number"
            inputMode="numeric"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors(prev => ({ ...prev, phone: "" })); }}
            className={cn("h-12 rounded-xl border-[#D7DCE5] mt-1", errors.phone && "border-red-500")}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            Email <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: "" })); }}
            className={cn("h-12 rounded-xl border-[#D7DCE5] mt-1", errors.email && "border-red-500")}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Address + ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            Service Address <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            placeholder="Enter your service address"
            value={address}
            onChange={(e) => { setAddress(e.target.value); if (errors.address) setErrors(prev => ({ ...prev, address: "" })); }}
            className={cn("h-12 rounded-xl border-[#D7DCE5] mt-1", errors.address && "border-red-500")}
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>
        <div>
          <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
            ZIP Code <span className="text-[#E07B3F]">*</span>
          </Label>
          <Input
            placeholder="ZIP Code"
            inputMode="numeric"
            maxLength={10}
            value={zipCode}
            onChange={(e) => { setZipCode(e.target.value); if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: "" })); }}
            className={cn("h-12 rounded-xl border-[#D7DCE5] mt-1", errors.zipCode && "border-red-500")}
          />
          {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Property Type <span className="text-[#E07B3F]">*</span>
        </Label>
        <Select value={propertyType} onValueChange={(v) => { setPropertyType(v); if (errors.propertyType) setErrors(prev => ({ ...prev, propertyType: "" })); }}>
          <SelectTrigger className={cn("h-12 rounded-xl border-[#D7DCE5] bg-white mt-1", errors.propertyType && "border-red-500")}>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.propertyType && <p className="text-xs text-red-500 mt-1">{errors.propertyType}</p>}
      </div>

      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#121F37] transition-colors mt-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      </div>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────
function Step3({ onNext, onBack, defaultValues, isSubmitting }: { onNext: (data: any) => void; onBack: () => void; defaultValues?: any; isSubmitting?: boolean }) {
  const [preferredDate, setPreferredDate] = useState(defaultValues?.preferredDate || "");
  const [preferredTime, setPreferredTime] = useState(defaultValues?.preferredTime || "");
  const [notes, setNotes] = useState(defaultValues?.notes || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!preferredDate) newErrors.preferredDate = "Please select a date";
    if (!preferredTime) newErrors.preferredTime = "Please select a time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({ preferredDate, preferredTime, notes });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Preferred Date <span className="text-[#E07B3F]">*</span>
        </Label>
        <Input
          type="date"
          value={preferredDate}
          onChange={(e) => { setPreferredDate(e.target.value); if (errors.preferredDate) setErrors(prev => ({ ...prev, preferredDate: "" })); }}
          className={cn("h-12 rounded-xl border-[#D7DCE5] bg-white mt-1", errors.preferredDate && "border-red-500")}
        />
        {errors.preferredDate && <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>}
      </div>

      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Preferred Time <span className="text-[#E07B3F]">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => { setPreferredTime(slot); if (errors.preferredTime) setErrors(prev => ({ ...prev, preferredTime: "" })); }}
              className={cn(
                "py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                preferredTime === slot
                  ? "border-[#E07B3F] bg-[#FFF4EC] text-[#E07B3F]"
                  : "border-[#E8EEF7] bg-white text-[#374151] hover:border-[#E07B3F]/50"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors.preferredTime && <p className="text-xs text-red-500 mt-1">{errors.preferredTime}</p>}
      </div>

      <div>
        <Label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37]">
          Additional Notes (Optional)
        </Label>
        <Textarea
          placeholder="Any special instructions or details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[80px] rounded-xl border-[#D7DCE5] mt-1 resize-none"
        />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] disabled:bg-[#C4C4C4] disabled:cursor-not-allowed text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
        >
          {isSubmitting ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Schedule Assessment
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#121F37] transition-colors mt-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Confirmation ────────────────────────────────────────────────────
function Step4({ onScheduleAnother, phone }: { onScheduleAnother: () => void; phone: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5"
    >
      <div className="flex flex-col items-center text-center space-y-3 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="h-14 w-14 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center"
        >
          <CheckCircle2 className="h-7 w-7 text-[#22c55e]" />
        </motion.div>
        <div>
          <h3 className="text-xl font-extrabold text-[#121F37]">You&apos;re tentatively scheduled!</h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mt-1 max-w-xs mx-auto">
            Our team will contact you shortly to confirm your appointment. Questions? Give us a call anytime.
          </p>
        </div>
        <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-lg font-extrabold text-[#E07B3F] hover:text-[#cf6f38] transition-colors">
          {phone}
        </a>
      </div>

      <button
        type="button"
        onClick={onScheduleAnother}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E07B3F] text-[#E07B3F] font-bold text-sm hover:bg-[#FFF4EC] transition-all duration-200"
      >
        Schedule Another Service
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const BENEFITS = [
  { icon: Wind, label: "Cleaner Air", desc: "Remove allergens, dust, and pollutants from your home's air" },
  { icon: Droplets, label: "Moisture Control", desc: "Prevent mold growth and maintain optimal humidity levels" },
  { icon: Leaf, label: "Healthier Home", desc: "Reduce allergy symptoms and respiratory issues" },
  { icon: Shield, label: "System Protection", desc: "Protect your HVAC system from dust and debris" },
];

export function IndoorAirQualitySection() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{ step1?: any; step2?: any; step3?: any }>({});

  function goNext(n: number) { setDir(1); setStep(n); }
  function goBack(n: number) { setDir(-1); setStep(n); }
  function reset() { setDir(-1); setStep(1); setFormData({}); }

  const handleFinalSubmit = async (step3Data: any) => {
    if (!formData.step1 || !formData.step2) {
      toast.error("Please complete all steps");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullData = {
        ...formData.step1,
        ...formData.step2,
        ...step3Data,
        propertySizeSqFt: formData.step1.propertySizeSqFt || null,
        occupantsWithAllergy: formData.step1.occupantsWithAllergy || null,
        phone: formData.step2.phone || "",
      };

      const result = await submitIndoorAirQuality(fullData);

      if (result.success) {
        toast.success(result.message);
        goNext(4);
      } else {
        toast.error(result.error || "Failed to schedule assessment");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="indoor-air-quality" className="w-full bg-[#F8F9FB] py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">Indoor Air Quality</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Breathe easier<br />in your home.
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            Professional air quality assessment and improvement solutions for healthier, more comfortable indoor environments.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left ── */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-[#E8EEF7]"
                >
                  <div className="h-9 w-9 rounded-xl bg-[#FFF4EC] flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-[#E07B3F]" />
                  </div>
                  <p className="text-sm font-bold text-[#121F37]">{item.label}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Services We Offer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-[#121F37] p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-4">Our Solutions Include</p>
              <ul className="space-y-2">
                {[
                  "Air quality testing & assessment",
                  "HVAC system inspection",
                  "Humidity control solutions",
                  "Air purification systems",
                  "Dust & allergen reduction",
                  "Odor elimination",
                ].map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E07B3F] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40 mt-4">
                Customized solutions based on your home&apos;s specific needs.
              </p>
            </motion.div>

            {/* Why It Matters */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-[#E8EEF7] bg-white p-6"
            >
              <p className="text-sm font-extrabold text-[#121F37] mb-4">Why Indoor Air Quality Matters</p>
              <div className="space-y-3">
                {[
                  "Americans spend 90% of their time indoors",
                  "Indoor air can be 2-5x more polluted than outdoor air",
                  "Poor air quality can trigger allergies & respiratory issues",
                  "Proper humidity control prevents mold growth",
                ].map((fact, i) => (
                  <div key={fact} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#FFF4EC] border border-[#E07B3F]/30 flex items-center justify-center text-xs font-bold text-[#E07B3F]">{i + 1}</div>
                    <p className="text-sm text-[#6B6B6B]">{fact}</p>
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
            className="w-full"
          >
            <div className="rounded-[28px] bg-white shadow-[0_20px_60px_rgba(18,31,55,0.10)] border border-[#E8EEF7] overflow-hidden">
              <div className="px-6 pt-7 pb-2 sm:px-8">
                <h3 className="text-xl font-extrabold text-[#121F37]">
                  {step === 4 ? "Request Submitted!" : "Schedule an Assessment"}
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
                      <Step1
                        defaultValues={formData.step1}
                        onNext={(v) => { setFormData(p => ({ ...p, step1: v })); goNext(2); }}
                      />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="iaq-s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step2
                        defaultValues={formData.step2}
                        onNext={(v) => { setFormData(p => ({ ...p, step2: v })); goNext(3); }}
                        onBack={() => goBack(1)}
                      />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="iaq-s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step3
                        defaultValues={formData.step3}
                        onNext={(v) => { setFormData(p => ({ ...p, step3: v })); handleFinalSubmit(v); }}
                        onBack={() => goBack(2)}
                        isSubmitting={isSubmitting}
                      />
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="iaq-s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>
                      <Step4 onScheduleAnother={reset} phone="(630) 854 0372" />
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