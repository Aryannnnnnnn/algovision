import HomeHero from "./components/home/HomeHero";
import ROIShowcase from "./components/home/ROIShowcase";
import WhyAlgoVision from "./components/home/WhyAlgoVision";
import TransformSection from "./components/home/TransformSection";
// import EnterpriseResults from "./components/home/EnterpriseResults";
// import HowWeWork from "./components/home/HowWeWork";
// import PlatformCoverage from "./components/home/PlatformCoverage";
// import EnterpriseTrust from "./components/home/EnterpriseTrust";
import MethodologyOverview from "./components/home/MethodologyOverview";
import InsightsResources from "./components/home/InsightsResources";
import WorkingWith from "./components/home/WorkingWith";
import ServicesGrid from "./components/home/ServicesGrid";
import CaseStudyShowcase from "./components/home/CaseStudyShowcase";
import PainToSolution from "./components/home/PainToSolution";
import FinalCTA from "./components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero />
      <WorkingWith />
      <ROIShowcase />
      <MethodologyOverview />
      <PainToSolution />
      <WhyAlgoVision />
      <ServicesGrid />
      <CaseStudyShowcase />
      <TransformSection />
      {/* <EnterpriseResults /> */}
      {/* <HowWeWork /> */}
      {/* <PlatformCoverage /> */}
      {/* <EnterpriseTrust /> */}
      <InsightsResources />
      <FinalCTA />
    </div>
  );
}
