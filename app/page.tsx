import HomeHero from "./components/home/HomeHero";
import WhyAlgoVision from "./components/home/WhyAlgoVision";
import TransformSection from "./components/home/TransformSection";
import CorePillars from "./components/home/CorePillars";
import EnterpriseResults from "./components/home/EnterpriseResults";
import HowWeWork from "./components/home/HowWeWork";
import PlatformCoverage from "./components/home/PlatformCoverage";
import EnterpriseTrust from "./components/home/EnterpriseTrust";
import InsightsResources from "./components/home/InsightsResources";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero />
      <WhyAlgoVision />
      <TransformSection />
      <CorePillars />
      <EnterpriseResults />
      <HowWeWork />
      <PlatformCoverage />
      <EnterpriseTrust />
      <InsightsResources />
    </div>
  );
}
