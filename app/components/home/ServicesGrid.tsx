"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      <div className="relative max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-sm font-bold text-white uppercase tracking-wider">Our Services</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Complete Business{" "}
            <span className="bg-gradient-to-r from-[#00b5ff] via-[#0099dd] to-[#00b5ff] bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Strategic consulting, AI-powered customer service, public relations, advertising, and performance marketing—all integrated to drive your business growth.
          </p>
        </div>

        {/* Services Grid - 3 columns, 7 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 lg:grid-rows-7 gap-6 lg:h-[800px]">
          {/* Card 1: AI-powered customer service - Vertical */}
          <a href="/solutions/ai-solutions" className="service-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-center min-h-[250px] lg:col-span-2 lg:row-span-3 relative overflow-hidden cursor-pointer group">
            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              AI-Powered Customer Service
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              AI chatbots and virtual assistants that handle customer questions 24/7, improving response times and customer satisfaction.
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300">
              Explore
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Card 2: Public relations - Vertical */}
          <a href="/solutions/pr-communications" className="service-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-center min-h-[250px] lg:col-span-2 lg:row-span-3 relative overflow-hidden cursor-pointer group">
            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Public Relations & Brand Management
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Manage your public image, handle media relations, respond to crises, and improve your online visibility.
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300">
              Explore
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Card 3: Performance marketing - Tall vertical */}
          <a href="/solutions/growth-performance" className="service-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 lg:col-span-3 lg:row-span-7 flex flex-col min-h-[400px] relative cursor-pointer group">
            <div className="relative w-full h-64 lg:h-1/2">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Performance marketing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center flex-1 lg:h-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Performance Marketing & Growth
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Drive sales and leads through targeted email, SMS, WhatsApp, and social media campaigns with measurable ROI.
              </p>
              <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300">
                Explore
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>

          {/* Card 4: Multi-platform advertising - Horizontal */}
          <a href="/solutions/advertising" className="service-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 lg:col-span-4 lg:row-span-4 flex flex-col lg:flex-row min-h-[400px] relative cursor-pointer group">
            <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                alt="Multi-platform advertising"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center w-full lg:w-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Multi-Platform Advertising
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Run coordinated ad campaigns across Google, Meta, TikTok, LinkedIn, and 15+ other platforms from one central dashboard.
              </p>
              <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300">
                Explore
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
