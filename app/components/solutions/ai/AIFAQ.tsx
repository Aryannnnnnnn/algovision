"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AIFAQ() {
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
      question: "What types of AI solutions do you offer?",
      answer: "We offer a comprehensive suite of AI solutions including chatbots, virtual assistants, web VA, voice assistants, email assistants, and custom AI systems tailored to your specific business needs.",
    },
    {
      question: "How long does it take to implement an AI solution?",
      answer: "Implementation time varies based on complexity. Simple chatbots can be deployed in 1-2 weeks, while enterprise solutions with custom integrations typically take 4-6 weeks. We provide a detailed timeline during the discovery phase.",
    },
    {
      question: "Can AI integrate with our existing systems?",
      answer: "Yes! Our AI solutions integrate seamlessly with popular CRM systems (Salesforce, HubSpot), helpdesk platforms (Zendesk, Intercom), knowledge bases, and custom APIs. We ensure smooth data flow across your tech stack.",
    },
    {
      question: "How do you ensure AI accuracy and quality?",
      answer: "We train AI on your specific data, implement continuous learning mechanisms, conduct thorough testing, and provide ongoing optimization. Our AI systems improve over time based on real interactions and feedback.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide comprehensive support including initial training, technical documentation, ongoing monitoring, regular optimization updates, and dedicated support team. Enterprise clients get 24/7 support and a dedicated account manager.",
    },
    {
      question: "How do you handle data privacy and security?",
      answer: "We implement bank-level encryption, are GDPR compliant, SOC 2 certified, and follow industry best practices for data security. All customer data is encrypted at rest and in transit, with regular security audits.",
    },
    {
      question: "What's the ROI of implementing AI?",
      answer: "Clients typically see 60-80% reduction in support costs, 90% automation rate, 24/7 availability, and improved customer satisfaction. ROI varies by use case, but most see positive returns within 3-6 months.",
    },
    {
      question: "Can AI work in multiple languages?",
      answer: "Yes, our AI supports 50+ languages with automatic translation and language detection. Customers can interact in their preferred language, and the AI responds accordingly.",
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
            Everything you need to know about our AI solutions
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
