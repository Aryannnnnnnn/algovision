import BookCallHero from "@/app/components/book-call/BookCallHero";
import CalendarBooking from "@/app/components/book-call/CalendarBooking";
import WhatToExpect from "@/app/components/book-call/WhatToExpect";
import BookCallTestimonials from "@/app/components/book-call/BookCallTestimonials";

export const metadata = {
  title: "Book a Strategy Call | Algo Vision",
  description: "Schedule a free 30-minute strategy call with our experts. Discover how data-driven marketing can transform your business.",
};

export default function BookCallPage() {
  return (
    <main className="min-h-screen bg-white">
      <BookCallHero />
      <CalendarBooking />
      <WhatToExpect />
      <BookCallTestimonials />
    </main>
  );
}
