import WorkWithUsHero from "@/app/components/work-with-us/WorkWithUsHero";
import ServiceSelection from "@/app/components/work-with-us/ServiceSelection";
import OnboardingProcess from "@/app/components/work-with-us/OnboardingProcess";
import WorkWithUsCTA from "@/app/components/work-with-us/WorkWithUsCTA";

export const metadata = {
  title: "Work With Us | Algo Vision",
  description: "Start your digital transformation journey. Partner with Algo Vision to unlock data-driven growth and scale your business.",
};

export default function WorkWithUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <WorkWithUsHero />
      <ServiceSelection />
      <OnboardingProcess />
      <WorkWithUsCTA />
    </main>
  );
}
