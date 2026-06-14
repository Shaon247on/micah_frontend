import Link from "next/link";
import HowWeWorkSection from "@/components/features/home/HowWeWorkSection";

export default function HowWeWorkPage() {
  return (
    <main className="bg-white">
      <section className="bg-linear-to-b from-[#E07B3F]/10 to-transparent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
            How We Work
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-tight">
            A transparent process to keep your home comfortable and your project on track.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#6B6B6B] leading-8">
            We combine honest recommendations, efficient scheduling, and practical solutions so you can trust every step from estimate to finished work.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center rounded-full bg-[#E07B3F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66b2f]"
            >
              About Our Team
            </Link>
            <Link
              href="/#new-system-quote"
              className="inline-flex items-center justify-center rounded-full border border-[#E07B3F] bg-white px-6 py-3 text-sm font-semibold text-[#121F37] transition hover:border-[#d66b2f] hover:text-[#d66b2f]"
            >
              Start a Request
            </Link>
          </div>
        </div>
      </section>

      <HowWeWorkSection />
    </main>
  );
}
