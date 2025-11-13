import AboutHero from "@/app/components/about/AboutHero";
import OurStory from "@/app/components/about/OurStory";
import CoreValues from "@/app/components/about/CoreValues";
import Timeline from "@/app/components/about/Timeline";
import GlobalPresence from "@/app/components/about/GlobalPresence";
import OurPhilosophy from "@/app/components/about/OurPhilosophy";
import OurValues from "@/app/components/about/OurValues";
import IndustriesWeServe from "@/app/components/about/IndustriesWeServe";
import WhyWeStarted from "@/app/components/about/WhyWeStarted";
import WorkingWithEnterprises from "@/app/components/about/WorkingWithEnterprises";
import DataTransformation from "@/app/components/about/DataTransformation";
import OurCommitments from "@/app/components/about/OurCommitments";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <OurStory />
      <OurPhilosophy />
      <OurValues />
      <CoreValues />
      <Timeline />
      <GlobalPresence />
      <IndustriesWeServe />
      <WhyWeStarted />
      <WorkingWithEnterprises />
      <OurCommitments />
      <DataTransformation />
    </main>
  );
}
