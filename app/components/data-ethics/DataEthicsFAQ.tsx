"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What personal data do you collect?",
    answer: "We collect only data necessary to provide our services: contact information (name, email, phone), company details, usage analytics, and marketing preferences. We never collect sensitive data like financial information, health records, or government IDs without explicit consent and clear necessity.",
  },
  {
    question: "How do you use my data?",
    answer: "Your data is used solely for: providing and improving our services, communicating with you about your account, sending marketing materials (with your consent), and complying with legal obligations. We never sell your personal data to third parties.",
  },
  {
    question: "Who has access to my data?",
    answer: "Access is strictly limited to: authorized Algo Vision employees who need it to perform their jobs, approved third-party service providers under strict confidentiality agreements, and legal authorities when required by law. All access is logged and audited.",
  },
  {
    question: "How long do you keep my data?",
    answer: "We retain data only as long as necessary: active account data for the duration of your relationship with us, marketing data until you unsubscribe, and analytics data for 24 months. After these periods, data is automatically deleted or anonymized.",
  },
  {
    question: "Can I delete my data?",
    answer: "Absolutely. You can request complete deletion of your data at any time through your privacy dashboard or by contacting privacy@algovision.com. We'll process your request within 30 days, though we may retain certain data if required by law.",
  },
  {
    question: "How do you secure my data?",
    answer: "We employ multiple layers of security: end-to-end encryption (TLS 1.3 in transit, AES-256 at rest), zero-trust network architecture, regular penetration testing, 24/7 security monitoring, and strict access controls with multi-factor authentication.",
  },
  {
    question: "Do you use cookies and tracking?",
    answer: "Yes, we use essential cookies for site functionality and analytics cookies to improve user experience (with your consent). You can manage cookie preferences in your account settings. We don't use cookies for cross-site tracking or selling data to advertisers.",
  },
  {
    question: "Are you GDPR compliant?",
    answer: "Yes, we're fully GDPR compliant and extend these protections to all users globally, not just EU citizens. This includes: lawful processing bases, data protection by design, breach notifications, and respecting all user rights under GDPR.",
  },
  {
    question: "What happens in a data breach?",
    answer: "We have a comprehensive incident response plan: immediate containment and investigation, notification to affected users within 72 hours, notification to relevant authorities as required, transparent communication about the breach scope and remediation steps, and measures to prevent future incidents.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. You have the right to data portability. You can export all your data in machine-readable formats (JSON, CSV) directly from your privacy dashboard. This includes your profile information, activity history, and preferences.",
  },
  {
    question: "How do you handle children's data?",
    answer: "Our services are not directed at children under 16. We don't knowingly collect data from children. If we discover we've collected such data, we'll delete it immediately. Parents or guardians can contact us at privacy@algovision.com if they believe their child's data was collected.",
  },
  {
    question: "What are my rights under CCPA?",
    answer: "California residents have additional rights: right to know what data we collect and how it's used, right to delete personal information, right to opt-out of data sales (though we don't sell data), and right to non-discrimination for exercising these rights. Contact us at privacy@algovision.com to exercise these rights.",
  },
];

export default function DataEthicsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const faqItems = gsap.utils.toArray(".faq-item");
      faqItems.forEach((item, index) => {
        gsap.from(item as HTMLElement, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          delay: index * 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-xs font-bold text-white">Frequently Asked Questions</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Got{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our data practices, your privacy rights, and how we protect your information.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#00b5ff]/30 transition-all duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-bold text-gray-900 flex-1">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-[#00b5ff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl">
              Our privacy team is here to help. Reach out with any questions about our data practices or your privacy rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:privacy@algovision.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00b5ff] text-white font-semibold rounded-xl hover:bg-[#0099dd] transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Privacy Team
              </a>
              <a
                href="/company/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#00b5ff]/40 hover:shadow-lg transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
