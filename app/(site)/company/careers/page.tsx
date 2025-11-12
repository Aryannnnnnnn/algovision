import CareersHero from "@/app/components/careers/CareersHero";
import OpenPositions from "@/app/components/careers/OpenPositions";
import WhyJoinUs from "@/app/components/careers/WhyJoinUs";
import CareersCTA from "@/app/components/careers/CareersCTA";

export const metadata = {
  title: "Careers | Algo Vision",
  description: "Join our team of innovators, strategists, and growth experts. Build your career at Algo Vision and shape the future of marketing.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <CareersHero />
      <WhyJoinUs />
      <OpenPositions />
      <CareersCTA />
    </main>
  );
}
