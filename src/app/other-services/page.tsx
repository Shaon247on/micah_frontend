import Link from "next/link";
import OtherServicesSection from "@/components/features/home/OtherServicesSection";
import { WaterQualitySection } from "@/components/dashboard/otherServices/WaterQuality/WaterQualitySection";
import { IndoorAirQualitySection } from "@/components/dashboard/otherServices/indoorAirQuality/IndoorAirQualitySection";
// import { IndoorAirQualitySection } from "@/components/dashboard/IndoorAirQualitySection";

export default function OtherServicesPage() {
  return (
    <main className="bg-white">
      <section className="bg-linear-to-b from-[#121F37]/10 to-transparent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
            Other Services
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-tight">
            Water quality and indoor air comfort solutions for healthier homes.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#6B6B6B] leading-8">
            Learn how our water treatment and indoor air quality services help your home stay cleaner, safer, and more comfortable every day.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/hvac-services"
              className="inline-flex items-center justify-center rounded-full bg-[#E07B3F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66b2f]"
            >
              HVAC Services
            </Link>
            <Link
              href="/hvac-estimate"
              className="inline-flex items-center justify-center rounded-full border border-[#E07B3F] bg-white px-6 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#d66b2f] hover:text-[#d66b2f]"
            >
              Send a quote
            </Link>
          </div>
        </div>
      </section>

      <OtherServicesSection />
      <WaterQualitySection />
      {/* <IndoorAirQualitySection /> */}
      <IndoorAirQualitySection/>
    </main>
  );
}
