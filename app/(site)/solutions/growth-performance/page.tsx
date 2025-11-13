import GrowthHero from "@/app/components/solutions/growth/GrowthHero";
import GrowthGrid from "@/app/components/solutions/growth/GrowthGrid";
import GrowthCapabilities from "@/app/components/solutions/growth/GrowthCapabilities";
import GrowthStats from "@/app/components/solutions/growth/GrowthStats";
import GrowthFAQ from "@/app/components/solutions/growth/GrowthFAQ";
import CTA from "@/app/components/ui/CTA";

export const metadata = {
  title: "Growth & Performance | Algo Vision",
  description: "Multi-channel growth marketing that drives measurable results across every customer touchpoint.",
};

export default function GrowthPerformancePage() {
  return (
    <main className="min-h-screen bg-white">
      <GrowthHero />
      <GrowthGrid />
      <GrowthCapabilities />
      <GrowthStats />
      <GrowthFAQ />
      <CTA
        title="Ready to Scale Your Growth?"
        description="Let's discuss how our multi-channel growth strategies can drive measurable results for your business."
        primaryButtonText="Schedule a Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/resources/case-studies"
      />
    </main>
  );
}
