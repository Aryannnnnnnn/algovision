import { Metadata } from "next";
import SitemapContent from "@/app/components/sitemap/SitemapContent";

export const metadata: Metadata = {
  title: "Sitemap | Algo Vision - Navigate Our Website",
  description: "Explore Algo Vision's complete site structure. Find all our AI solutions, PR & communications services, advertising platforms, company information, and resources in one organized view.",
  keywords: ["sitemap", "site navigation", "Algo Vision", "AI solutions", "marketing services", "digital transformation"],
  openGraph: {
    title: "Sitemap | Algo Vision",
    description: "Navigate Algo Vision's complete website structure and discover all our solutions and resources.",
    type: "website",
  },
};

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white">
      <SitemapContent />
    </main>
  );
}
