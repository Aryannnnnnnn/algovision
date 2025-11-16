"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calendar } from "lucide-react";

interface CaseStudyHeroProps {
  caseStudy: {
    title: string;
    client: string;
    industry: string;
    services?: string;
    results: string;
    featured_image?: string;
    published_at?: string;
    result_percentage_1?: string;
    result_percentage_1_label?: string;
    result_percentage_2?: string;
    result_percentage_2_label?: string;
  };
}

export default function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "August 21, 2025";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Parse services from comma-separated string
  const services = caseStudy.services
    ? caseStudy.services.split(",").map((s) => s.trim())
    : [];

  // Get metrics from dedicated fields
  const metric1Value = caseStudy.result_percentage_1 || "+22%";
  const metric1Label = caseStudy.result_percentage_1_label || "YoY eCommerce Revenue Growth";
  const metric2Value = caseStudy.result_percentage_2 || "+15%";
  const metric2Label = caseStudy.result_percentage_2_label || "Increase in Average Order Value (AOV)";

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div ref={contentRef} className="space-y-6">
            {/* Industry Badge */}
            <div className="inline-flex">
              <span className="px-4 py-2 bg-[#1e293b] text-white text-sm font-bold rounded-full shadow-lg">
                {caseStudy.industry.toUpperCase()} BRAND
              </span>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-[#00b5ff] transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/resources/case-studies" className="hover:text-[#00b5ff] transition-colors">Case studies</a>
              <span className="text-gray-400">/</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
              {caseStudy.title}
            </h1>

            {/* Divider Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-[#00b5ff] to-[#0095d9] rounded-full"></div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full w-fit border border-gray-200">
              <Calendar className="w-4 h-4 text-[#00b5ff]" />
              <span className="font-medium">{formatDate(caseStudy.published_at)}</span>
            </div>

            {/* Results Box - Modern Glassmorphism */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 relative border border-gray-200 shadow-2xl shadow-blue-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00b5ff] via-blue-400 to-indigo-500 rounded-t-3xl"></div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1e293b] text-white text-xs font-bold rounded-full mb-6 shadow-md">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>RESULTS</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-5xl font-black bg-gradient-to-br from-[#00b5ff] to-[#0095d9] bg-clip-text text-transparent">
                      {metric1Value}
                    </div>
                    <div className="text-sm text-gray-700 font-medium leading-tight">
                      {metric1Label}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-black bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      {metric2Value}
                    </div>
                    <div className="text-sm text-gray-700 font-medium leading-tight">
                      {metric2Label}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashed Line */}
            <div className="w-full border-t-2 border-dashed border-gray-300 my-8"></div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#00b5ff] to-[#0095d9] rounded-full"></span>
                Services
              </h3>
              <div className="flex flex-wrap gap-3">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      index === 0
                        ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
                        : "border-2 border-gray-900 text-gray-900 bg-white"
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image with Modern Border */}
          <div className="relative lg:mt-20 flex justify-center lg:justify-end">
            {caseStudy.featured_image && (
              <div className="relative max-w-2xl w-full">
                {/* Decorative gradient border elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00b5ff] via-blue-400 to-indigo-500 rounded-3xl opacity-20 blur-2xl"></div>

                {/* Accent border */}
                <div className="absolute -left-4 top-4 -bottom-4 right-8 border-4 border-[#00b5ff] rounded-3xl"></div>

                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden z-10 aspect-square">
                  <img
                    src={caseStudy.featured_image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
