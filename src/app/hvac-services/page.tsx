import Link from "next/link";
import { HvacServicesSection } from "@/components/dashboard/HvacServicesSection";
import AcRejuvenationSection from "@/components/features/home/AcrejuvenationSection/AcrejuvenationSection";
import { RepairOrReplaceSection } from "@/components/dashboard/RepairOrReplaceSection";
import { RepairTuneUpSection } from "@/components/dashboard/settings/RepairTuneUpSection";

export default function HvacServicesPage() {
  return (
    <main className="bg-white">
      <section
        className="py-20"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(224,123,63,0.10), transparent)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
            HVAC Services
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-tight">
            Professional HVAC service, repair, and replacement for homes and businesses.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#6B6B6B] leading-8">
            Explore dedicated HVAC service paths for residential, commercial, and refrigeration systems — including repair, tune-up, and replacement guidance.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/other-services"
              className="inline-flex items-center justify-center rounded-full bg-[#E07B3F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66b2f]"
            >
              Other Services
            </Link>
            <Link
              href="/hvac-estimate"
              className="inline-flex items-center justify-center rounded-full border border-[#E07B3F] bg-white px-6 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#d66b2f] hover:text-[#d66b2f]"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>

      {/* <HvacServicesSection /> */}
      <AcRejuvenationSection />
      <RepairTuneUpSection/>
      <RepairOrReplaceSection />
    </main>
  );
}
