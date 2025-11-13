"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PRFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: "What PR services do you offer?",
      answer: "We offer comprehensive PR services including crisis management, brand monitoring, SEO 3.0, media relations, press release distribution, and reputation management. Our integrated approach ensures consistent messaging across all channels.",
    },
    {
      question: "How do you handle crisis management?",
      answer: "Our crisis management includes 24/7 monitoring, rapid response protocols, stakeholder communication plans, and damage control strategies. We detect potential issues early and respond within 2 hours to contain and resolve crises before they escalate.",
    },
    {
      question: "What is SEO 3.0?",
      answer: "SEO 3.0 is next-generation search optimization that goes beyond traditional SEO. It combines AI-powered content optimization, voice search optimization, answer engine optimization (AEO), and entity-based SEO to dominate modern search landscapes including AI assistants and voice devices.",
    },
    {
      question: "How do you measure PR success?",
      answer: "We track comprehensive metrics including media coverage, sentiment analysis, share of voice, website traffic, lead generation, brand mentions, social engagement, and ultimately ROI. Custom dashboards provide real-time visibility into campaign performance.",
    },
    {
      question: "What's your media relations process?",
      answer: "We leverage our network of 500+ journalists and influencers, craft compelling story angles, distribute targeted pitches, coordinate interviews, and manage follow-ups. Our relationships with key media outlets ensure your stories get the attention they deserve.",
    },
    {
      question: "How does brand monitoring work?",
      answer: "Our AI-powered monitoring tracks mentions across social media, news outlets, blogs, forums, and review sites. You receive real-time alerts for significant mentions, sentiment changes, or potential issues, with comprehensive analytics and competitive intelligence.",
    },
    {
      question: "Can you help with reputation management?",
      answer: "Yes! We proactively build positive reputation through strategic content, review management, and online presence optimization. For existing issues, we implement damage control strategies, push down negative content, and rebuild trust through targeted campaigns.",
    },
    {
      question: "What industries do you serve?",
      answer: "We serve technology, healthcare, finance, retail, manufacturing, and professional services. Our team has expertise across industries and adapts strategies to your specific market, audience, and regulatory environment.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Everything you need to know about our PR & communications solutions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
