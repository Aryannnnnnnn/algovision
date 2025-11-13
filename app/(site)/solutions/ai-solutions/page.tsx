import AISolutionsHero from "@/app/components/solutions/ai/AISolutionsHero";
import AISolutionsGrid from "@/app/components/solutions/ai/AISolutionsGrid";
import AICapabilities from "@/app/components/solutions/ai/AICapabilities";
import AIStats from "@/app/components/solutions/ai/AIStats";
import AIFAQ from "@/app/components/solutions/ai/AIFAQ";
import CTA from "@/app/components/ui/CTA";

export const metadata = {
  title: "AI Solutions | Algo Vision",
  description: "Intelligent automation that scales. Advanced AI systems that work 24/7 to automate customer interactions and drive engagement.",
};

export default function AISolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <AISolutionsHero />
      <AISolutionsGrid />
      <AICapabilities />
      <AIStats />
      <AIFAQ />
      <CTA
        title="Ready to Transform Your Business with AI?"
        description="Let's discuss how our AI solutions can automate your operations and drive growth."
        primaryButtonText="Schedule a Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/resources/case-studies"
      />
    </main>
  );
}
