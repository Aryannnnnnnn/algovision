import TermsHero from "@/app/components/terms/TermsHero";
import TermsContent from "@/app/components/terms/TermsContent";

export const metadata = {
  title: "Terms of Service | Algo Vision",
  description: "Review Algo Vision's terms of service, including user responsibilities, payment terms, intellectual property rights, and service usage guidelines.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <TermsHero />
      <TermsContent />
    </main>
  );
}
