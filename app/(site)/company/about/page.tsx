import AboutHero from "@/app/components/about/AboutHero";
import OurStory from "@/app/components/about/OurStory";
import WhyAlgoVision from "@/app/components/about/WhyAlgoVision";
import OurApproach from "@/app/components/about/OurApproach";
import OurValues from "@/app/components/about/OurValues";
import AboutCTA from "@/app/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <OurStory />
      <WhyAlgoVision />
      <OurApproach />
      <OurValues />
      <AboutCTA />
    </main>
  );
}
