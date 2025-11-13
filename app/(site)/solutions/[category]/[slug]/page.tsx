import { notFound } from "next/navigation";
import { getSolutionData, getAllSolutionPaths } from "@/app/constants/solution-data";
import SolutionHero from "@/app/components/solution-detail/SolutionHero";
import SolutionFeatures from "@/app/components/solution-detail/SolutionFeatures";
import SolutionHowItWorks from "@/app/components/solution-detail/SolutionHowItWorks";
// import SolutionUseCases from "@/app/components/solution-detail/SolutionUseCases";
// import SolutionStats from "@/app/components/solution-detail/SolutionStats";
import SolutionIntegration from "@/app/components/solution-detail/SolutionIntegration";
import SolutionFAQ from "@/app/components/solution-detail/SolutionFAQ";
import SolutionRelatedSolutions from "@/app/components/solution-detail/SolutionRelatedSolutions";

interface SolutionPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllSolutionPaths();
  return paths.map((path) => ({
    category: path.category,
    slug: path.slug,
  }));
}

export async function generateMetadata({ params }: SolutionPageProps) {
  const { category, slug } = params;
  const solution = getSolutionData(category, slug);

  if (!solution) {
    return {
      title: "Solution Not Found",
    };
  }

  return {
    title: `${solution.title} | Algo Vision Solutions`,
    description: solution.description,
  };
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const { category, slug } = params;
  const solution = getSolutionData(category, slug);

  if (!solution) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <SolutionHero
        category={solution.category}
        title={solution.title}
        description={solution.description}
        benefits={solution.benefits}
      />

      <SolutionFeatures features={solution.features} />

      <SolutionHowItWorks steps={solution.howItWorks} />

      {/* {solution.useCases && solution.useCases.length > 0 && (
        <SolutionUseCases useCases={solution.useCases} />
      )} */}

      {/* {solution.stats && solution.stats.length > 0 && (
        <SolutionStats stats={solution.stats} />
      )} */}

      {solution.integrations && solution.integrations.length > 0 && (
        <SolutionIntegration integrations={solution.integrations} />
      )}

      <SolutionFAQ faqs={solution.faqs} serviceName={solution.title} />

      {solution.relatedSolutions && solution.relatedSolutions.length > 0 && (
        <SolutionRelatedSolutions solutions={solution.relatedSolutions} />
      )}
    </main>
  );
}
