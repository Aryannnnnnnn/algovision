import MethodologyHero from "@/app/components/methodology/MethodologyHero";
import OurApproach from "@/app/components/methodology/OurApproach";
import ProcessSteps from "@/app/components/methodology/ProcessSteps";
import GovernanceCompliance from "@/app/components/methodology/GovernanceCompliance";
import IntegrationCapabilities from "@/app/components/methodology/IntegrationCapabilities";
import CaseStudyPreview from "@/app/components/methodology/CaseStudyPreview";
import WhatSetsUsApart from "@/app/components/methodology/WhatSetsUsApart";
import DefineSuccess from "@/app/components/methodology/DefineSuccess";
import TechnologyTeams from "@/app/components/methodology/TechnologyTeams";
import AlgoVisionGuarantee from "@/app/components/methodology/AlgoVisionGuarantee";
import ReadyForCertainty from "@/app/components/methodology/ReadyForCertainty";
import IndustriesWeServe from "@/app/components/about/IndustriesWeServe";

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-white">
      <MethodologyHero />
      <OurApproach />
      <GovernanceCompliance />
      <WhatSetsUsApart />
      <DefineSuccess />
      <ProcessSteps />
      <TechnologyTeams />
      <IndustriesWeServe />
      <AlgoVisionGuarantee />
      <IntegrationCapabilities />
      <CaseStudyPreview />
      <ReadyForCertainty />
    </main>
  );
}
