"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdvertisingFAQ() {
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
      question: "What advertising platforms do you support?",
      answer: "We support 15+ major platforms including Google Ads (Search, Display, Shopping, YouTube), Meta (Facebook, Instagram), TikTok, LinkedIn, Twitter/X, Pinterest, Snapchat, Reddit, Amazon Ads, and programmatic display networks. All managed from a unified dashboard.",
    },
    {
      question: "How do you optimize campaigns across multiple platforms?",
      answer: "We use AI-powered optimization algorithms that analyze performance data in real-time, automatically adjusting bids, budgets, and targeting across platforms. Our system identifies winning strategies and reallocates budget to highest-performing channels while maintaining consistent messaging.",
    },
    {
      question: "What's the minimum ad spend required?",
      answer: "We recommend a minimum monthly ad spend of $5,000 across all platforms to see meaningful results. However, we can create custom packages starting at $2,500/month for businesses just getting started with omnichannel advertising.",
    },
    {
      question: "Do you provide creative services?",
      answer: "Yes! Our team includes professional copywriters, designers, and video producers. We create platform-specific ad creatives, conduct A/B testing, and continuously optimize based on performance. Creative services are included in all our advertising packages.",
    },
    {
      question: "How do you measure campaign success?",
      answer: "We track comprehensive metrics including impressions, clicks, CTR, conversions, CPA, ROAS, and customer lifetime value. You'll receive detailed reports with cross-platform attribution modeling showing exactly how each channel contributes to your business goals.",
    },
    {
      question: "Can you work with our existing campaigns?",
      answer: "Absolutely! We can audit your existing campaigns, optimize current setups, and integrate them into our omnichannel strategy. We'll preserve what's working while implementing improvements and expanding to additional profitable channels.",
    },
    {
      question: "How long until we see results?",
      answer: "You'll see initial results within the first 2-4 weeks as we optimize campaigns. Significant improvements typically occur within 60-90 days once our AI algorithms have enough data. Some clients see 2-3x ROAS improvements within the first quarter.",
    },
    {
      question: "What industries do you specialize in?",
      answer: "We work across all industries including e-commerce, B2B SaaS, healthcare, finance, education, real estate, and professional services. Our team has vertical-specific expertise and adapts strategies based on your industry's unique challenges and opportunities.",
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
            Everything you need to know about our advertising solutions
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
