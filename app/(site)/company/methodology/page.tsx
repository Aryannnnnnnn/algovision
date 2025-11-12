import MethodologyHero from "@/app/components/methodology/MethodologyHero";
import OurApproach from "@/app/components/methodology/OurApproach";
import ProcessSteps from "@/app/components/methodology/ProcessSteps";
import Framework from "@/app/components/methodology/Framework";
import EnterpriseInfrastructure from "@/app/components/methodology/EnterpriseInfrastructure";
import GovernanceCompliance from "@/app/components/methodology/GovernanceCompliance";
import IntegrationCapabilities from "@/app/components/methodology/IntegrationCapabilities";
import CaseStudyPreview from "@/app/components/methodology/CaseStudyPreview";

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-white">
      <MethodologyHero />
      <OurApproach />
      <ProcessSteps />
      <Framework />
      <EnterpriseInfrastructure />
      <GovernanceCompliance />
      <IntegrationCapabilities />
      <CaseStudyPreview />
    </main>
  );
}
