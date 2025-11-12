import DataEthicsHero from "@/app/components/data-ethics/DataEthicsHero";
import CorePrinciples from "@/app/components/data-ethics/CorePrinciples";
import DataProtection from "@/app/components/data-ethics/DataProtection";
import ComplianceCertifications from "@/app/components/data-ethics/ComplianceCertifications";
import TransparencyCommitment from "@/app/components/data-ethics/TransparencyCommitment";
import DataEthicsFAQ from "@/app/components/data-ethics/DataEthicsFAQ";

export const metadata = {
  title: "Data Ethics & Privacy | Algo Vision",
  description: "Learn about our commitment to data ethics, privacy, and security. We prioritize transparency and compliance in all our data practices.",
};

export default function DataEthicsPage() {
  return (
    <main className="min-h-screen bg-white">
      <DataEthicsHero />
      <CorePrinciples />
      <DataProtection />
      <ComplianceCertifications />
      <TransparencyCommitment />
      <DataEthicsFAQ />
    </main>
  );
}
