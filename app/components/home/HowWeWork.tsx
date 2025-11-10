"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = gsap.utils.toArray(".methodology-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const phases = [
    {
      number: "01",
      title: "Intelligence Audit",
      subtitle: "Discovery & Analysis",
      description: "Deep analysis of your current ecosystem—channels, data, workflows, and competitive landscape.",
      deliverables: ["Data Audit Report", "Competitive Analysis", "System Architecture Map"],
      timeline: "2-3 weeks",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Strategic Architecture",
      subtitle: "Design & Planning",
      description: "Design a custom AI-powered growth engine tailored to your KPIs and business model.",
      deliverables: ["Strategy Blueprint", "Tech Stack Selection", "Implementation Roadmap"],
      timeline: "1-2 weeks",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Intelligent Deployment",
      subtitle: "Launch & Integrate",
      description: "Rapid integration across platforms with automated systems, smart workflows, and real-time optimization.",
      deliverables: ["Live System Deployment", "Integration Testing", "Team Training"],
      timeline: "48 hours",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Continuous Evolution",
      subtitle: "Optimize & Scale",
      description: "Ongoing AI-driven optimization, A/B testing, and performance scaling based on live data feedback.",
      deliverables: ["Performance Reports", "Monthly Optimization", "Quarterly Strategy Review"],
      timeline: "Ongoing",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00b5ff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b5ff]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header - Left Aligned */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-[#00b5ff]/30 rounded-full mb-8 shadow-lg shadow-[#00b5ff]/20">
            <svg className="w-4 h-4 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-bold text-[#0095d9]">Our Methodology</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            The AlgoVision Methodology.
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Four phases, one unified system.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-12">
            A proven approach that transforms fragmented marketing into a unified intelligence system
          </p>

          {/* Timeline Progress Bar */}
          <div className="max-w-4xl mb-16">
            <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-[#00b5ff] w-full"></div>
            </div>
            <div className="flex justify-between mt-4">
              {phases.map((phase) => (
                <div key={phase.number} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#00b5ff] flex items-center justify-center text-white font-bold text-sm shadow-lg mb-2">
                    {phase.number}
                  </div>
                  <span className="text-xs text-gray-500 hidden sm:block">{phase.timeline}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology Cards - Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {phases.map((phase, index) => (
            <div
              key={phase.number}
              className="methodology-card group relative bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-500 overflow-hidden border border-gray-200"
            >
              {/* Card Header */}
              <div className="relative bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 p-8 border-b border-gray-200">
                {/* Phase Number - Top Right */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-xl bg-[#00b5ff] flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{phase.number}</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center text-[#00b5ff] shadow-md border border-[#00b5ff]/20 mb-4">
                  {phase.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-sm font-semibold text-[#00b5ff] mb-3">{phase.subtitle}</p>
                <p className="text-base text-gray-600 leading-relaxed">{phase.description}</p>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Deliverables */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Key Deliverables</h4>
                  <ul className="space-y-2">
                    {phase.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-[#00b5ff] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-full px-4 py-2 border border-blue-100/50">
                  <svg className="w-4 h-4 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#00b5ff]">{phase.timeline}</span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00b5ff]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="inline-block">
          <Button
            href="/company/methodology"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Explore Our Methodology
          </Button>
        </div>
      </div>
    </section>
  );
}
