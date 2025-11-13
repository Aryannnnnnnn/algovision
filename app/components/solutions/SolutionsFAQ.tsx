"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SolutionsFAQProps {
  serviceName?: string;
}

export default function SolutionsFAQ({ serviceName = "Our Solutions" }: SolutionsFAQProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const faqs = gsap.utils.toArray(".faq-item");
      faqs.forEach((faq, index) => {
        gsap.from(faq as HTMLElement, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faq as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: "Can I start with just a few solutions and add more later?",
      answer: "Absolutely. Most clients start with 3-5 core solutions and expand over 6-12 months. Our modular architecture makes it seamless to add new channels as your team's capacity and budget grow."
    },
    {
      question: "How long does implementation take?",
      answer: "Initial setup ranges from 2-8 weeks depending on complexity. Starter packages typically launch in 2-3 weeks, while Enterprise implementations with custom integrations may take 6-8 weeks. We provide a detailed timeline during onboarding."
    },
    {
      question: "Do you require long-term contracts?",
      answer: "We offer flexible terms. Month-to-month for Startup tier, quarterly for Growth, and annual for Enterprise (with monthly payment options). No lock-in periods—though 98% of clients stay beyond their initial term."
    },
    {
      question: "What if a specific platform isn't listed in your solutions?",
      answer: "We regularly add new platforms based on client demand. If you need integration with an emerging platform, our team can typically build custom connectors within 4-6 weeks. Enterprise clients get priority for custom integrations."
    },
    {
      question: "How do you handle data privacy and compliance?",
      answer: "All solutions are SOC 2 Type II certified with GDPR and CCPA compliance built-in. We offer data residency options, custom DPAs, and full audit trails. Enterprise clients receive dedicated compliance support and quarterly security reviews."
    },
    {
      question: "Can I use my existing tools and platforms?",
      answer: "Yes. We integrate with 200+ existing tools including your CRM, analytics platforms, and BI tools. Our solutions complement your existing stack rather than replacing it—creating a unified layer on top of your current infrastructure."
    },
    {
      question: "What level of support is included?",
      answer: "All tiers include a dedicated account manager and email support. Growth tier adds weekly strategy calls and priority response. Enterprise receives 24/7 support, dedicated Slack channel, and quarterly executive business reviews."
    },
    {
      question: "How do you measure success?",
      answer: "We define custom KPIs during onboarding based on your business goals. Standard metrics include ROAS, CAC, LTV, conversion rates, and pipeline velocity. You'll receive real-time dashboards plus monthly performance reports with actionable recommendations."
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">

          {/* Left Side - Content */}
          <div ref={headingRef} className="lg:sticky lg:top-24">
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
              <span className="text-sm font-bold text-white">FAQ</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Learn More About{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  {serviceName}
                </span>
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Common questions about our solutions, implementation, and support.
            </p>

            {/* Bottom CTA */}
            <div className="pt-4">
              <p className="text-gray-600 mb-4">
                Still have questions?
              </p>
              <a
                href="/connect/book-call"
                className="inline-flex items-center gap-2 text-[#00b5ff] font-semibold hover:underline"
              >
                <span>Schedule a call with our team</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#00b5ff]/50 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="text-lg font-bold text-gray-900 pr-8 group-hover:text-[#00b5ff] transition-colors duration-300">
                  {faq.question}
                </span>
                <svg
                  className={`flex-shrink-0 w-6 h-6 text-[#00b5ff] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>

        </div>
      </div>
    </section>
  );
}
