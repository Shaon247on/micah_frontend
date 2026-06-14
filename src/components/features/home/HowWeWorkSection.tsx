"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function HowWeWorkSection() {
  const serviceCategories = [
    {
      title: "Residential HVAC Services",
      subtitle: "Keeping your home comfortable through every season.",
      description: "Whether your system needs repairs, replacement, or efficiency improvements, we work to provide practical solutions tailored to your home and budget.",
      services: [
        "Air conditioning repair & replacement",
        "Furnace repair & installation",
        "Heat pump systems",
        "Mini-split systems",
        "Seasonal maintenance",
        "HVAC diagnostics",
        "Thermostat upgrades",
        "Airflow & comfort solutions",
        "Ductwork modifications",
        "Indoor air quality upgrades",
      ],
    },
    {
      title: "Light Commercial HVAC Services",
      subtitle: "Dependable service for small businesses and commercial properties.",
      description: "We understand the importance of minimizing downtime and keeping your business operating comfortably year-round.",
      services: [
        "Rooftop unit service & replacement",
        "Commercial furnace service",
        "Split-system repair & diagnostics",
        "Preventive maintenance",
        "Thermostat & control upgrades",
        "Airflow troubleshooting",
        "Equipment replacement planning",
        "Emergency service",
      ],
      locations: [
        "Offices",
        "Retail spaces",
        "Restaurants",
        "Small warehouses",
        "Multi-tenant spaces",
        "Light commercial buildings",
      ],
    },
    {
      title: "Light Refrigeration Services",
      subtitle: "Commercial refrigeration systems play a critical role in protecting products, operations, and day-to-day business reliability.",
      description: "We work with restaurants, small businesses, and commercial properties to help keep refrigeration systems operating efficiently and reliably.",
      services: [
        "Walk-in cooler service & repair",
        "Walk-in freezer diagnostics",
        "Reach-in cooler repair",
        "Refrigeration maintenance",
        "Temperature troubleshooting",
        "Condenser & evaporator service",
        "Refrigeration component replacement",
        "Emergency refrigeration service",
      ],
    },
  ];

  const approach = [
    "Practical solutions",
    "Clear communication",
    "Reliable workmanship",
    "Proper system application",
    "Long-term performance",
  ];

  return (
    <section id="how-we-work" className="w-full bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">How We Work</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121F37] leading-tight">
            Reliable heating, cooling, ventilation, and refrigeration solutions
          </h1>
          <p className="mt-4 text-lg text-[#6B6B6B] leading-8">
            We provide professional HVAC and refrigeration services focused on dependable workmanship, honest recommendations, and long-term system performance.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-20">
          {serviceCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl border border-[#E8EEF7] bg-[#F8F9FB] p-8 md:p-10"
            >
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121F37]">{category.title}</h2>
                <p className="mt-2 text-base font-semibold text-[#E07B3F]">{category.subtitle}</p>
              </div>

              <p className="text-base leading-7 text-[#6B6B6B] mb-8">{category.description}</p>

              {category.locations && (
                <div className="mb-8 pb-8 border-b border-[#E8EEF7]">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#121F37] mb-4">We Service</p>
                  <div className="flex flex-wrap gap-3">
                    {category.locations.map((location) => (
                      <span key={location} className="inline-flex items-center rounded-full bg-white border border-[#E8EEF7] px-4 py-2 text-sm font-medium text-[#374151]">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#121F37] mb-4">
                  {category.locations ? "Services Include" : "Services Include"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.services.map((service) => (
                    <div key={service} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#E07B3F] shrink-0 mt-0.5" />
                      <span className="text-sm leading-6 text-[#374151]">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-[#FFF4EC] border border-[#E07B3F]/20 p-8 md:p-10"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121F37]">Honest Recommendations. Quality Work.</h3>
            <p className="mt-4 text-base leading-7 text-[#6B6B6B] mb-8">
              We believe homeowners and businesses deserve straightforward service without unnecessary pressure or upselling.
            </p>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#E07B3F] mb-6">Our Approach Focuses On</p>
            <div className="space-y-3">
              {approach.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#E07B3F]" />
                  <span className="text-base font-semibold text-[#374151]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 rounded-3xl bg-(--primary) p-8 md:p-10 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Schedule Service</h3>
          <p className="mt-3 text-base leading-7 text-[#B1B7C0] mb-8 max-w-2xl mx-auto">
            Need HVAC or refrigeration service, maintenance, or a replacement estimate? Contact our team today to schedule service for your home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-[#E07B3F] px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[#DE7142]"
              aria-disabled="true"
            >
              Phone Number
            </a>
            <a
              href="#new-system-quote"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white/20"
            >
              Get Quote Online
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
