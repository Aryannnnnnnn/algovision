import CookiePolicyContent from "@/app/components/cookie-policy/CookiePolicyContent";

export const metadata = {
  title: "Cookie Policy | Algo Vision",
  description: "Learn about how Algo Vision uses cookies to improve your browsing experience and provide personalized content.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <CookiePolicyContent />
    </main>
  );
}
