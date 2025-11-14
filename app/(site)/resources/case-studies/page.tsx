import CaseStudiesHero from "@/app/components/case-studies/CaseStudiesHero";
import CaseStudiesGrid from "@/app/components/case-studies/CaseStudiesGrid";
import CaseStudiesStats from "@/app/components/case-studies/CaseStudiesStats";
import IndustriesFilter from "@/app/components/case-studies/IndustriesFilter";

async function getAllCaseStudies() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/case-studies?status=published`, {
      cache: 'no-store',
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.caseStudies || [];
  } catch (error) {
    return [];
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main className="min-h-screen bg-white">
      <CaseStudiesHero />
      <CaseStudiesStats />
      <IndustriesFilter />
      <CaseStudiesGrid caseStudies={caseStudies} />
    </main>
  );
}
