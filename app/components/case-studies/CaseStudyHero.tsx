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
      className="relative bg-white overflow-hidden"
    >
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div ref={contentRef} className="space-y-6">
            {/* Industry Badge */}
            <div className="inline-flex">
              <span className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full">
                {caseStudy.industry.toUpperCase()} BRAND
              </span>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <a href="/" className="hover:underline">Home</a>
              <span>/</span>
              <a href="/resources/case-studies" className="hover:underline">Case studies</a>
              <span>/</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {caseStudy.title}
            </h1>

            {/* Divider Line */}
            <div className="w-full h-px bg-gray-900"></div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(caseStudy.published_at)}</span>
            </div>

            {/* Results Box - 3D Cuboid */}
            <div className="relative" style={{ perspective: '1500px' }}>
              <div
                className="bg-white rounded-2xl p-6 relative border-2 border-blue-600"
                style={{
                  transform: 'rotateX(8deg) rotateY(-2deg)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '12px 12px 0px #6366f1, 0 25px 50px -12px rgba(99, 102, 241, 0.5)',
                }}
              >
                <div className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-md mb-4">
                  Results
                </div>
                <div className="flex flex-wrap justify-between gap-8">
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {metric1Value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {metric1Label}
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {metric2Value}
                    </div>
                    <div className="text-sm text-gray-600">
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
              <h3 className="text-lg font-bold text-blue-600">Services</h3>
              <div className="flex flex-wrap gap-3">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      index === 0
                        ? "bg-gray-900 text-white"
                        : "border border-gray-900 text-gray-900 bg-white"
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image with C-shaped border */}
          <div className="relative lg:mt-20 flex justify-center lg:justify-end">
            {caseStudy.featured_image && (
              <div className="relative max-w-2xl w-full">
                {/* C-shaped border - wrapping tightly around image */}
                <div
                  className="absolute -left-6 top-8 -bottom-8 w-[calc(100%-2rem)]"
                  style={{
                    borderLeft: '2px solid #6366f1',
                    borderTop: '2px solid #6366f1',
                    borderBottom: '2px solid #6366f1',
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '3rem',
                    borderBottomLeftRadius: '2rem',
                    borderBottomRightRadius: '3rem',
                  }}
                ></div>

                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden z-10 aspect-square">
                  <img
                    src={caseStudy.featured_image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
