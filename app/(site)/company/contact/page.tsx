import ContactHero from "@/app/components/contact/ContactHero";
import ContactForm from "@/app/components/contact/ContactForm";
import ContactInfo from "@/app/components/contact/ContactInfo";
import OfficeLocations from "@/app/components/contact/OfficeLocations";

export const metadata = {
  title: "Contact Us | Algo Vision",
  description: "Get in touch with our team. We're here to answer your questions and help you transform your marketing strategy.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <OfficeLocations />
    </main>
  );
}
