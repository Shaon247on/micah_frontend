import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
// ─── Step Dots ────────────────────────────────────────────────────────────────
export function StepDots({ total, current }: { total: number; current: number }) {
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
export function PillToggle({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
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
export function OptionCard({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
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
