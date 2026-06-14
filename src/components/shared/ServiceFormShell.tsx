"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Step Dots ────────────────────────────────────────────────────────────────
export function StepDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: current === i + 1 ? 22 : 10,
            backgroundColor:
              current > i + 1
                ? "#E07B3F"
                : current === i + 1
                ? "#E07B3F"
                : "#D1D5DB",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-2.5 rounded-full"
        />
      ))}
    </div>
  );
}

// ─── Slide variants ───────────────────────────────────────────────────────────
export const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export const slideTransition = { duration: 0.3, ease: "easeInOut" as const };

// ─── Pill toggle button ───────────────────────────────────────────────────────
export function PillToggle({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
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

// ─── Option card (single-select) ──────────────────────────────────────────────
export function OptionCard({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
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

// ─── Next button ─────────────────────────────────────────────────────────────
export function NextBtn({
  label = "Next",
  disabled = false,
  loading = false,
}: {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <motion.button
      type="submit"
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#E07B3F] hover:bg-[#cf6f38] disabled:bg-[#C4C4C4] disabled:cursor-not-allowed text-white font-extrabold uppercase tracking-wide text-sm transition-colors duration-200 py-3.5"
    >
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {label}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </motion.button>
  );
}

// ─── Back link ────────────────────────────────────────────────────────────────
export function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#121F37] transition-colors mt-2"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back
    </button>
  );
}

// ─── Form field wrapper ───────────────────────────────────────────────────────
export function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#121F37] mb-2">
      {children}
      {required && <span className="text-[#E07B3F] ml-0.5">*</span>}
    </p>
  );
}

// ─── Confirmation card ────────────────────────────────────────────────────────
export function ConfirmationCard({
  title,
  body,
  phone,
  onScheduleAnother,
}: {
  title: string;
  body: string;
  phone: string;
  onScheduleAnother: () => void;
}) {
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
          <h3 className="text-xl font-extrabold text-[#121F37]">{title}</h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mt-1 max-w-xs mx-auto">
            {body}
          </p>
        </div>
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="text-lg font-extrabold text-[#E07B3F] hover:text-[#cf6f38] transition-colors"
        >
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