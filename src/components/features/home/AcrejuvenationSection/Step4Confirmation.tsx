"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Phone, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Step4ConfirmationProps {
  onScheduleAnother: () => void;
}

export function Step4Confirmation({ onScheduleAnother }: Step4ConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-2 text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4, type: "spring", stiffness: 200 }}
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="text-xl font-extrabold text-[#121F37] sm:text-2xl"
      >
        You&apos;re tentatively scheduled –
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.35 }}
        className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#6B6B6B]"
      >
        Our team will contact you shortly to confirm your appointment.
        Questions? Give us a call anytime.
      </motion.p>

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.35 }}
        href="#"
        className="mt-4 inline-flex items-center gap-2 text-xl font-extrabold text-[#DE7B42] transition-opacity hover:opacity-80"
        aria-disabled="true"
      >
        <Phone className="h-5 w-5" />
        Phone Number
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44, duration: 0.35 }}
        className="mt-8"
      >
        <Separator className="mb-6" />
        <p className="mb-4 text-sm text-[#6B6B6B]">
          Need to schedule another appointment?
        </p>
        <Button
          variant="outline"
          onClick={onScheduleAnother}
          className="h-12 w-full gap-2 rounded-xl border-2 border-[#DE7B42] text-[13px] font-extrabold uppercase tracking-wide text-[#DE7B42] transition-all duration-200 hover:bg-[#DE7B42] hover:text-white"
        >
          <PlusCircle className="h-4 w-4" />
          Schedule Another Rejuvenation
        </Button>
      </motion.div>
    </motion.div>
  );
}