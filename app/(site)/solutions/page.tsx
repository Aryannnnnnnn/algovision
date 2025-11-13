import SolutionsHero from "@/app/components/solutions/SolutionsHero";
import SolutionsGrid from "@/app/components/solutions/SolutionsGrid";
import IndustrySpecific from "@/app/components/solutions/IndustrySpecific";
// import SolutionComparison from "@/app/components/solutions/SolutionComparison";
import SuccessMetrics from "@/app/components/solutions/SuccessMetrics";
import IntegrationOverview from "@/app/components/solutions/IntegrationOverview";
import SolutionsFAQ from "@/app/components/solutions/SolutionsFAQ";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsHero />
      <SolutionsGrid />
      <IndustrySpecific />
      <SuccessMetrics />
      <IntegrationOverview />
      {/* <SolutionComparison /> */}
      <SolutionsFAQ />
    </main>
  );
}
