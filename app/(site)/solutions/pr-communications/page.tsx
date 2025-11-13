import PRSolutionsHero from "@/app/components/solutions/pr/PRSolutionsHero";
import PRSolutionsGrid from "@/app/components/solutions/pr/PRSolutionsGrid";
import PRCapabilities from "@/app/components/solutions/pr/PRCapabilities";
import PRStats from "@/app/components/solutions/pr/PRStats";
import PRFAQ from "@/app/components/solutions/pr/PRFAQ";
import CTA from "@/app/components/ui/CTA";

export const metadata = {
  title: "PR & Communications | Algo Vision",
  description: "Reputation engineered, not managed. Strategic public relations that builds trust, manages crises, and amplifies your brand voice.",
};

export default function PRCommunicationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PRSolutionsHero />
      <PRSolutionsGrid />
      <PRCapabilities />
      <PRStats />
      <PRFAQ />
      <CTA
        title="Ready to Transform Your Brand Reputation?"
        description="Let's discuss how our PR & communications solutions can elevate your brand and manage your reputation."
        primaryButtonText="Schedule a Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/resources/case-studies"
      />
    </main>
  );
}
