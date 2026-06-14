"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Wind, Home, ShieldCheck } from "lucide-react";

const cards = [
  {
    title: "Water Quality",
    description: "Protect your homes water supply instead of plumbing.",
    href: "#water-quality",
    icon: Droplets,
  },
  {
    title: "Indoor Air Quality",
    description: "Control humidity, clean the air, and eliminate stale smells so your home feels fresher year-round.",
    href: "#indoor-air-quality",
    icon: Wind,
  },
];

export default function OtherServicesSection() {
  return (
    <section id="other-services" className="w-full bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">Other Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Water quality and indoor air comfort, all in one place.
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            Our other services are designed to improve the entire home environment, not just your HVAC equipment.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-[#E8EEF7] bg-[#F8F9FB] p-8"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-sm">
                  <Icon className="h-6 w-6 text-[#E07B3F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#121F37]">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#6B6B6B]">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#E07B3F] transition hover:text-[#E07B3F]/90"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
