"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AISolutionsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".solution-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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

  const solutions = [
    {
      title: "Conversational AI",
      description: "Intelligent conversational AI that handles customer inquiries 24/7, reduces response times, and scales effortlessly.",
      features: ["24/7 Support", "Multi-Language", "Smart Escalation"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: "/solutions/ai/chatbot",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Intelligent Virtual Assistants (IVA)",
      description: "AI-powered virtual assistants that manage tasks, schedule appointments, and handle routine operations automatically.",
      features: ["Task Automation", "Calendar Management", "Email Processing"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: "/solutions/ai/va",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      title: "AI-Enabled Web Assistants",
      description: "Web-based virtual assistants that guide visitors, answer questions, and drive conversions on your website.",
      features: ["Lead Qualification", "Product Recommendations", "User Guidance"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      href: "/solutions/ai/web-va",
      gradient: "from-teal-500 to-green-500",
    },
    {
      title: "Applied AI & Product Engineering",
      description: "Custom AI solutions and product development tailored to your specific business needs and technical requirements.",
      features: ["Custom Development", "AI Integration", "Product Strategy"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      href: "/solutions/ai/product-engineering",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="ai-solutions" ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            AI Solutions Suite
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
            Choose from our comprehensive suite of AI-powered tools to automate your operations
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={solution.href}
              className="solution-card group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#00b5ff] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {solution.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 line-clamp-3">
                {solution.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {solution.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 group-hover:bg-blue-50 rounded-full text-xs font-semibold text-gray-700 group-hover:text-blue-600 border border-gray-200 group-hover:border-blue-200 transition-all duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Arrow */}
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Learn More
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
