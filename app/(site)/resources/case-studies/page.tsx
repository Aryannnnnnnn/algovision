import CaseStudiesHero from "@/app/components/case-studies/CaseStudiesHero";
import CaseStudiesGrid from "@/app/components/case-studies/CaseStudiesGrid";
import CaseStudiesStats from "@/app/components/case-studies/CaseStudiesStats";
import IndustriesFilter from "@/app/components/case-studies/IndustriesFilter";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <CaseStudiesHero />
      <CaseStudiesStats />
      <IndustriesFilter />
      <CaseStudiesGrid />
    </main>
  );
}
