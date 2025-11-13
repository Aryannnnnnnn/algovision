import AdvertisingHero from "@/app/components/solutions/advertising/AdvertisingHero";
import AdvertisingGrid from "@/app/components/solutions/advertising/AdvertisingGrid";
import AdvertisingCapabilities from "@/app/components/solutions/advertising/AdvertisingCapabilities";
import AdvertisingStats from "@/app/components/solutions/advertising/AdvertisingStats";
import AdvertisingFAQ from "@/app/components/solutions/advertising/AdvertisingFAQ";
import CTA from "@/app/components/ui/CTA";

export const metadata = {
  title: "Omnichannel Advertising | Algo Vision",
  description: "Unified advertising strategy across 15+ platforms, orchestrated by intelligent automation.",
};

export default function AdvertisingPage() {
  return (
    <main className="min-h-screen bg-white">
      <AdvertisingHero />
      <AdvertisingGrid />
      <AdvertisingCapabilities />
      <AdvertisingStats />
      <AdvertisingFAQ />
      <CTA
        title="Ready to Scale Your Advertising?"
        description="Let's discuss how our omnichannel advertising solutions can maximize your reach and ROI."
        primaryButtonText="Schedule a Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/resources/case-studies"
      />
    </main>
  );
}
