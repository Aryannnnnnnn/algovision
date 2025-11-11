import AboutHero from "@/app/components/about/AboutHero";
import OurStory from "@/app/components/about/OurStory";
import CoreValues from "@/app/components/about/CoreValues";
import Timeline from "@/app/components/about/Timeline";
import GlobalPresence from "@/app/components/about/GlobalPresence";
import CultureLife from "@/app/components/about/CultureLife";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <OurStory />
      <CoreValues />
      <Timeline />
      <GlobalPresence />
      <CultureLife />
    </main>
  );
}
