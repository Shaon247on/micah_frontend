import { HvacServicesSection } from "@/components/dashboard/HvacServicesSection";
import { IndoorAirQualitySection } from "@/components/dashboard/IndoorAirQualitySection";
import { RepairOrReplaceSection } from "@/components/dashboard/RepairOrReplaceSection";
import { WaterQualitySection } from "@/components/dashboard/WaterQualitySection";
import { HeroBottom, HeroSection, InteractiveTool } from "@/components/features/home";
import AcRejuvenationSection from "@/components/features/home/AcrejuvenationSection/AcrejuvenationSection";
import AboutUsSection from "@/components/features/home/AboutUsSection";
import FaqSection from "@/components/features/home/FaqSection";
import HowWeWorkSection from "@/components/features/home/HowWeWorkSection";
import HvacEstimateSection from "@/components/features/home/HvacEstimateSection";
import OtherServicesSection from "@/components/features/home/OtherServicesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HeroBottom />
      <InteractiveTool />
      <HvacEstimateSection />
      <AcRejuvenationSection />
      <HvacServicesSection />
      <OtherServicesSection />
      <RepairOrReplaceSection />
      <WaterQualitySection />
      <IndoorAirQualitySection />
      <HowWeWorkSection />
      <AboutUsSection />
      <FaqSection />
    </main>
  );
}
