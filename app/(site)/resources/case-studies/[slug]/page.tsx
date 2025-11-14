import { notFound } from "next/navigation";
import CaseStudyHero from "@/app/components/case-studies/CaseStudyHero";
import ExecutiveSummary from "@/app/components/case-studies/ExecutiveSummary";
import Challenges from "@/app/components/case-studies/Challenges";
import Solutions from "@/app/components/case-studies/Solutions";
import Outcome from "@/app/components/case-studies/Outcome";
import Results from "@/app/components/case-studies/Results";
import TableOfContents from "@/app/components/case-studies/TableOfContents";
import CaseStudiesCarousel from "@/app/components/case-studies/CaseStudiesCarousel";
import ViewTracker from "@/app/components/ViewTracker";

async function getCaseStudy(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/case-studies`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    const caseStudies = data.caseStudies || [];
    return caseStudies.find((cs: any) => cs.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy || caseStudy.status !== 'published') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <ViewTracker type="case-study" id={caseStudy.id} />
      <CaseStudyHero caseStudy={caseStudy} />

      {/* Content Container with Table of Contents */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Table of Contents - Sticky to Left */}
            <aside className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-24">
              <TableOfContents />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ExecutiveSummary excerpt={caseStudy.excerpt} />
                <Challenges challenge={caseStudy.challenge} />
                <Solutions solution={caseStudy.solution} />
                <Outcome content={caseStudy.content} />
                <Results results={caseStudy.results} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CaseStudiesCarousel currentSlug={slug} />
    </main>
  );
}
