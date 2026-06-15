"use client";

import { motion } from "framer-motion";

export default function AboutUsSection() {
  return (
    <section id="about-us" className="w-full bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">Our Story</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Fast, fair HVAC service built for Joliet Area homeowners.
          </h2>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            We are a locally owned and operated team that puts honesty, transparency, and comfort first. From quick repairs to full system replacement, we help customers make the best choice for their home.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Local Family-Owned",
              description: "We live and work in the area, not a national call center. Every job gets personal attention.",
            },
            {
              title: "Transparent Pricing",
              description: "Clear estimates, honest recommendations, and no surprise fees so you can decide with confidence.",
            },
            {
              title: "Built for Comfort",
              description: "We focus on reliable performance, improved efficiency, and long-term solutions that keep your home comfortable.",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-[#E8EEF7] bg-[#F8F9FB] p-8 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E07B3F]">{card.title}</p>
              <p className="mt-4 text-base text-[#374151] leading-7">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
