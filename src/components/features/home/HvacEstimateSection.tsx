"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { HvacQuoteDialog } from "@/components/features/elements/HvacQuoteDialog";

const steps = [
  { id: "01", text: "Enter your home address" },
  { id: "02", text: "Get real pricing on 3 system tires" },
  { id: "03", text: "Choose your system and schedule install online" },
];

interface HvacEstimateSectionProps {
  sectionId?: string;
}

export default function HvacEstimateSection({ sectionId = "new-system-quote" }: HvacEstimateSectionProps) {
  const [address, setAddress] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleLookup() {
    if (address.trim().length < 5) return;
    setDialogOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleLookup();
  }

  return (
    <>
      <section id={sectionId} className="w-full bg-[#E8EEF7] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="mb-5 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#DE7B42] md:text-base">
                New HVAC System Estimate
              </span>

              <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-[#121F37] sm:text-4xl lg:text-5xl">
                Real HVAC pricing. <br /> No sales call required.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-9 text-[#6B6B6B] md:text-xl">
                Simply enter your home address and get instant pricing on three
                HVAC systems that match your needs- with financing options and
                the ability to schedule your HVAC install online. No waiting, no
                pressure.
              </p>

              <div className="mt-10 space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-xl font-extrabold text-[#DE7B42]">
                      {step.id}
                    </span>
                    <p className="text-lg text-[#6B6B6B]">{step.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(18,31,55,0.08)]">
                {/* Browser Chrome */}
                <div className="bg-(--primary) px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3.5 w-3.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-3.5 w-3.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-3.5 w-3.5 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 rounded-lg bg-(--primary-light) px-4 py-3 text-sm text-[#8E98AA] sm:text-base">
                      honesthvacusa.com
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 md:p-10">
                  <h3 className="text-2xl font-extrabold text-[#121F37] sm:text-3xl">
                    Get your instant HVAC quote
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[#6B6B6B]">
                    Enter your address to see real pricing for your home.
                  </p>

                  <div className="mt-8">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Start typing your address..."
                      className="h-16 w-full rounded-2xl border border-[#D7DCE5] bg-white px-5 text-base text-[#121F37] outline-none transition-all placeholder:text-[#9AA3B2] focus:border-[#DE7B42] focus:ring-4 focus:ring-[#DE7B42]/10"
                    />
                  </div>

                  <button
                    onClick={handleLookup}
                    className="mt-5 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#DE7B42] px-6 text-base font-extrabold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#cf6f38] active:scale-[0.99]"
                  >
                    Look Up My Home Info
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-[#6B6B6B]">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>Results in 10 seconds</span>
                    </div>
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-[#C4C4C4] sm:block" />
                    <span>No sales call required</span>
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-[#C4C4C4] sm:block" />
                    <span>Your info is secure</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HVAC Quote Dialog */}
      <HvacQuoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialAddress={address}
      />
    </>
  );
}