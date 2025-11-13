"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GrowthFAQ() {
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
      question: "What channels do you support for growth marketing?",
      answer: "We support Email, SMS, WhatsApp, LinkedIn, and Telegram. Each channel can be managed individually or as part of a coordinated multi-channel campaign with unified messaging and tracking.",
    },
    {
      question: "How do you measure campaign performance?",
      answer: "We track comprehensive metrics including ROAS, conversion rates, engagement rates, open rates, click-through rates, and multi-touch attribution. You get real-time dashboards with actionable insights.",
    },
    {
      question: "Can you integrate with our existing marketing stack?",
      answer: "Yes! We integrate seamlessly with popular CRM systems (Salesforce, HubSpot), email platforms (Mailchimp, SendGrid), analytics tools (Google Analytics, Mixpanel), and e-commerce platforms (Shopify, WooCommerce).",
    },
    {
      question: "How long does it take to launch a campaign?",
      answer: "Simple campaigns can launch in 3-5 days. Complex multi-channel campaigns with advanced automation typically take 2-3 weeks including strategy, setup, testing, and optimization.",
    },
    {
      question: "Do you handle content creation?",
      answer: "Yes, our team includes copywriters, designers, and strategists who create high-converting content tailored to each channel and audience segment. We also provide A/B testing to optimize messaging.",
    },
    {
      question: "What's your approach to compliance and data privacy?",
      answer: "We ensure full compliance with GDPR, CAN-SPAM, TCPA, and other regulations. We implement proper consent mechanisms, provide easy unsubscribe options, and maintain detailed audit trails.",
    },
    {
      question: "How do you optimize campaigns over time?",
      answer: "We use continuous A/B testing, analyze performance data, adjust targeting and segmentation, refine messaging, and optimize send times. Each campaign improves based on real user behavior and feedback.",
    },
    {
      question: "What kind of results can we expect?",
      answer: "Results vary by industry and goals, but clients typically see 3.2x ROAS, 42% email open rates, 85% engagement rates, and 2.8x conversion lift. We provide realistic projections during strategy sessions.",
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
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
            Everything you need to know about our growth marketing solutions
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
