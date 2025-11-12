import AccessibilityContent from "@/app/components/accessibility/AccessibilityContent";

export const metadata = {
  title: "Accessibility Statement | Algo Vision",
  description: "Learn about Algo Vision's commitment to digital accessibility and our efforts to ensure our platform is usable by everyone, regardless of ability.",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <AccessibilityContent />
    </main>
  );
}
