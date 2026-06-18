"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

interface FaqSectionProps {
  faqs?: FAQ[];
}

export default function FaqSection({ faqs = [] }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  console.log("the faqs",faqs)

  // If no FAQs are provided, show a message
  if (!faqs || faqs.length === 0) {
    return (
      <section id="faq" className="w-full bg-[#F8F9FB] py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
              Answers to the questions homeowners ask most.
            </h2>
            <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
              No FAQs available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="w-full bg-[#F8F9FB] py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Answers to the questions homeowners ask most.
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            Everything from service timing to system recommendations, written in plain language so you can make the right choice for your home.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = index === openIndex;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-3xl border border-[#E8EEF7] bg-white p-5 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-base font-semibold text-[#121F37]">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                </button>
                {open && <p className="mt-4 text-sm leading-7 text-[#6B6B6B]">{faq.answer}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}