import Link from "next/link";
import HvacEstimateSection from "@/components/features/home/HvacEstimateSection";

export default function HvacEstimatePage() {
  return (
    <main className="bg-white">
      <section className="bg-linear-to-b from-[#E07B3F]/10 to-transparent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
            HVAC Estimate
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-tight">
            Get instant HVAC pricing on the exact system your home needs.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#6B6B6B] leading-8">
            Use our trusted estimate tool to compare real system options, financing, and install timing — all in one place.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#E07B3F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66b2f]"
            >
              Back to Home
            </Link>
            <Link
              href="/hvac-services"
              className="inline-flex items-center justify-center rounded-full border border-[#E07B3F] bg-white px-6 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#d66b2f] hover:text-[#d66b2f]"
            >
              HVAC Services
            </Link>
          </div>
        </div>
      </section>

      <HvacEstimateSection />
    </main>
  );
}
