"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { PhotoGrid } from "./PhotoGrid";
import { SchedulingCard } from "./SchedulingCard";

export default function AcRejuvenationSection() {
  return (
    <section
      id="ac-rejuvenation"
      className="w-full bg-[#F7F8FA] py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left Column ─────────────────────────────────── */}
          <div className="max-w-2xl space-y-4 lg:space-y-8">
            <SectionHeader
              badge="A/C Rejuvenation"
              title="Restore your HVAC system before you replace it."
              description="Honest HVAC Services A/C Rejuvenation is a full restoration and service of the components that fail most often in Chicagoland homes — replace capacitors, contactors, and hard start kit if needed and pull and clean blower wheel, condenser, coils, and more. You can get up to 3–5 more reliable years out of your current system."
            />

            {/* <CreditCard /> */}
            <PhotoGrid />
          </div>

          {/* ── Right Column ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:sticky lg:top-8"
          >
            <SchedulingCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
