import { Metadata } from 'next';
import Link from 'next/link';
import AboutUsSection from '@/components/features/home/AboutUsSection';
import { getAboutUsStory } from '@/actions/aboutUs.actions';

export const metadata: Metadata = {
  title: 'About Us | HVAC Service',
  description: 'Learn about our HVAC company',
};

export default async function AboutUsPage() {
  // Fetch about us data from the action
  const aboutResult = await getAboutUsStory();
  const aboutData = aboutResult.data;

  // Use data from API or fallback to defaults
  const title = aboutData?.title || 'About Us';
  const subtitle = aboutData?.subtitle || 'Local service with honest recommendations and real homeowner trust.';
  const storyTitle = aboutData?.storyTitle || 'Our Story';
  const storySubtitle = aboutData?.storySubtitle || 'Fast, fair HVAC service built for Joliet Area homeowners.';
  const cards = aboutData?.cards && aboutData.cards.length > 0 
    ? aboutData.cards 
    : [
        {
          cardTitle: 'Local Family-Owned',
          cardSubtitle: 'We live and work in the area, not a national call center. Every job gets personal attention.'
        },
        {
          cardTitle: 'Transparent Pricing',
          cardSubtitle: 'Clear estimates, honest recommendations, and no surprise fees so you can decide with confidence.'
        },
        {
          cardTitle: 'Built for Comfort',
          cardSubtitle: 'We focus on reliable performance, improved efficiency, and long-term solutions that keep your home comfortable.'
        }
      ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-[#121F37]/10 to-transparent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
           About Us
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121F37] leading-tight">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#6B6B6B] leading-8">
            {subtitle}
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

      {/* About Us Section */}
      <AboutUsSection 
        storyTitle={storyTitle}
        storySubtitle={storySubtitle}
        cards={cards}
      />
    </main>
  );
}