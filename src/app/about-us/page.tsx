import Link from "next/link";
import AboutUsSection from "@/components/features/home/AboutUsSection";

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      <section className="bg-linear-to-b from-[#121F37]/10 to-transparent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
            About Us
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-tight">
            Local service with honest recommendations and real homeowner trust.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#6B6B6B] leading-8">
            Learn more about the people behind the service and how we deliver dependable HVAC, air quality, and water solutions across the Joliet Area.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full bg-[#E07B3F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66b2f]"
            >
              Read Our FAQ
            </Link>
            <Link
              href="/#new-system-quote"
              className="inline-flex items-center justify-center rounded-full border border-[#E07B3F] bg-white px-6 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#d66b2f] hover:text-[#d66b2f]"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <AboutUsSection />
    </main>
  );
}
