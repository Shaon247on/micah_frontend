"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I get a new system quote?",
    answer: "Most customers get an instant estimate in about 10 seconds. We then follow up with a custom recommendation based on your home and comfort goals.",
  },
  {
    question: "Do you repair older systems or only replace them?",
    answer: "We evaluate your system honestly. If repair or a tune-up is the best value, we recommend that first. If replacement makes more sense, we explain why.",
  },
  {
    question: "What services are included in A/C Rejuvenation?",
    answer: "A/C Rejuvenation restores worn components, cleans the system, and improves reliability so you can get more life from your current equipment.",
  },
  {
    question: "Do you offer water quality and indoor air quality services?",
    answer: "Yes. We provide both water treatment and indoor air quality solutions to help your home feel healthier and more comfortable.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

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
                key={faq.question}
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
