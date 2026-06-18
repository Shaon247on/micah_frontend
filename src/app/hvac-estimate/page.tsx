"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Wallet,
  PhoneCall,
  ClipboardCheck,
  Wrench,
} from "lucide-react";
import { HvacQuoteDialog } from "@/components/features/hvac-estimate/HvacQuoteDialog";

export default function HvacEstimatePage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#E07B3F]/10 via-[#E07B3F]/5 to-transparent py-24 sm:py-28">
        {/* Decorative background blobs */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#E07B3F]/10 blur-3xl" />
        <div className="absolute top-40 -left-20 h-64 w-64 rounded-full bg-[#121F37]/5 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-[1.1] tracking-tight">
              Get instant HVAC pricing on the exact system your home needs.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-[#6B6B6B] leading-8">
              Use our trusted estimate tool to compare real system options,
              financing, and install timing — all in one place.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => setDialogOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E07B3F] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E07B3F]/25 transition hover:bg-[#d66b2f] hover:shadow-xl hover:shadow-[#E07B3F]/30"
              >
                Start Your Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <Link
                href="/hvac-services"
                className="inline-flex items-center justify-center rounded-full border border-[#121F37]/15 bg-white px-7 py-3.5 text-sm font-semibold text-[#121F37] transition hover:border-[#121F37]/30 hover:bg-[#121F37]/5"
              >
                HVAC Services
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-semibold text-[#6B6B6B] transition hover:text-[#121F37]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#121F37] py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "15 min", label: "Avg. estimate time" },
              { value: "0%", label: "Hidden fees" },
              { value: "5★", label: "Avg. install rating" },
              { value: "24/7", label: "Support availability" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hvac Quote Dialog */}
      <HvacQuoteDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Feature cards */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
              Why homeowners choose us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#121F37] tracking-tight">
              Pricing you can trust, from start to finish.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Real Prices",
                desc: "No hidden fees or surprises. Get the real price upfront, before any technician shows up.",
              },
              {
                icon: CheckCircle2,
                title: "Trusted Installers",
                desc: "All installs completed by licensed, experienced professionals who stand behind their work.",
              },
              {
                icon: Wallet,
                title: "Flexible Financing",
                desc: "Options to fit your budget with monthly payment plans approved in minutes.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-[#E8EEF7] bg-white p-8 transition hover:-translate-y-1 hover:border-[#E07B3F]/30 hover:shadow-xl hover:shadow-[#121F37]/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E07B3F]/10 text-[#E07B3F] transition group-hover:bg-[#E07B3F] group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-base font-bold text-[#121F37]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B6B6B] leading-6">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#E8EEF7] bg-[#F8F9FB] py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
              How it works
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#121F37] tracking-tight">
              Three steps to your new system.
            </h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                icon: PhoneCall,
                step: "01",
                title: "Tell us about your home",
                desc: "Answer a few quick questions about your space and current system.",
              },
              {
                icon: ClipboardCheck,
                step: "02",
                title: "Get your instant estimate",
                desc: "Compare real pricing across system options and financing plans side by side.",
              },
              {
                icon: Wrench,
                step: "03",
                title: "Schedule your install",
                desc: "Pick a time that works for you. A licensed installer handles the rest.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#E07B3F] shadow-sm ring-1 ring-[#E8EEF7]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-4xl font-extrabold text-[#121F37]/10">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-[#121F37]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B6B6B] leading-6">
                  {item.desc}
                </p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%-1rem)] w-[calc(100%-2rem)] border-t border-dashed border-[#121F37]/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#121F37] px-8 py-14 sm:px-16 sm:py-16">
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#E07B3F]/20 blur-3xl" />
            <div className="relative max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to see your real price?
              </h2>
              <p className="mt-4 text-base text-white/70 leading-7">
                It takes less than 15 minutes, and there&apos;s no obligation to
                book.
              </p>
              <button
                onClick={() => setDialogOpen(true)}
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#E07B3F] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E07B3F]/20 transition hover:bg-[#d66b2f]"
              >
                Start Your Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
