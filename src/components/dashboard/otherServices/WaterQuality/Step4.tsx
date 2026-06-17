"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
export default function Step4({
  onScheduleAnother,
  phone,
}: {
  onScheduleAnother: () => void;
  phone: string;
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
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          className="h-14 w-14 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center"
        >
          <CheckCircle2 className="h-7 w-7 text-[#22c55e]" />
        </motion.div>
        <div>
          <h3 className="text-xl font-extrabold text-[#121F37]">
            You&apos;re tentatively scheduled!
          </h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mt-1 max-w-xs mx-auto">
            Our team will contact you shortly to confirm your appointment.
            Questions? Give us a call anytime.
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
