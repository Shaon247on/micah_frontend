"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#DE7B42] md:text-sm">
        {badge}
      </span>

      <h2 className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-[#121F37] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-5 max-w-xl text-base leading-[1.85] text-[#6B6B6B] md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}