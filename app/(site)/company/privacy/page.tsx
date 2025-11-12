import PrivacyContent from "@/app/components/privacy/PrivacyContent";

export const metadata = {
  title: "Privacy Policy | Algo Vision",
  description: "Algo Vision's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with GDPR and CCPA regulations.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PrivacyContent />
    </main>
  );
}
