import { HvacServicesSection } from "@/components/dashboard/HvacServicesSection";
import { IndoorAirQualitySection } from "@/components/dashboard/IndoorAirQualitySection";
import { RepairOrReplaceSection } from "@/components/dashboard/RepairOrReplaceSection";
import { WaterQualitySection } from "@/components/dashboard/otherServices/WaterQuality/WaterQualitySection";
import {
  HeroBottom,
  HeroSection,
  InteractiveTool,
} from "@/components/features/home";
import AcRejuvenationSection from "@/components/features/home/AcrejuvenationSection/AcrejuvenationSection";
import FaqSection from "@/components/features/home/FaqSection";
import HowWeWorkSection from "@/components/features/home/HowWeWorkSection";
import HvacEstimateSection from "@/components/features/home/HvacEstimateSection";
import OtherServicesSection from "@/components/features/home/OtherServicesSection";
import { getFAQs } from "@/actions/faq.actions";
import { getAboutUsStory } from "@/actions/aboutUs.actions";
import AboutUsSection from "@/components/features/home/AboutUsSection";
export default async function Home() {
  const aboutResult = await getAboutUsStory();
  const result = await getFAQs({
    limit: 5,
    isActive: true,
  });

  // Get FAQs from response or use empty array
  const faqs = result.data?.faqs || [];

  const aboutData = aboutResult.data;
  const storyTitle = aboutData?.storyTitle || "Our Story";
  const storySubtitle =
    aboutData?.storySubtitle ||
    "Fast, fair HVAC service built for Joliet Area homeowners.";
  const cards =
    aboutData?.cards && aboutData.cards.length > 0
      ? aboutData.cards
      : [
          {
            cardTitle: "Local Family-Owned",
            cardSubtitle:
              "We live and work in the area, not a national call center. Every job gets personal attention.",
          },
          {
            cardTitle: "Transparent Pricing",
            cardSubtitle:
              "Clear estimates, honest recommendations, and no surprise fees so you can decide with confidence.",
          },
          {
            cardTitle: "Built for Comfort",
            cardSubtitle:
              "We focus on reliable performance, improved efficiency, and long-term solutions that keep your home comfortable.",
          },
        ];
  return (
    <main>
      <HeroSection />
      <HeroBottom />
      <InteractiveTool />
      {/* <HvacEstimateSection /> */}
      <AcRejuvenationSection />
      <HvacServicesSection />
      <OtherServicesSection />
      <RepairOrReplaceSection />
      <WaterQualitySection />
      <IndoorAirQualitySection />
      {/* <HowWeWorkSection /> */}
      <AboutUsSection
        storyTitle={storyTitle}
        storySubtitle={storySubtitle}
        cards={cards}
      />
      <FaqSection faqs={faqs} />
    </main>
  );
}
