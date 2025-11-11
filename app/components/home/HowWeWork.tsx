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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-34 items-start">
          {/* Steps - Left on desktop, bottom on mobile/tablet */}
          <div className="space-y-6 order-2 lg:order-1">
            {phases.map((phase, index) => (
              <div key={index} className="methodology-card group">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-transparent hover:shadow-lg hover:border-[#00011f] transition-all duration-500 lg:hover:-translate-x-2">
                  {/* Step number badge - hidden on mobile, shown on lg */}
                  <div className="hidden lg:block absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl flex items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">{phase.number}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 lg:ml-6">
                    {/* Number badge visible on mobile */}
                    <div className="lg:hidden flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{phase.number}</span>
                    </div>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#00b5ff]/20 group-hover:scale-110 transition-transform duration-500">
                      <div className="text-[#00b5ff]">
                        {phase.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-500">
                          {phase.title}
                        </h3>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">{phase.timeline}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#00b5ff] mb-3">{phase.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {phase.description}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Connector line */}
                  {/* {index < phases.length - 1 && (
                    <div className="absolute left-2 bottom-0 w-0.5 h-6 bg-gradient-to-b from-[#00b5ff]/30 to-transparent translate-y-6"></div>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Heading - Right on desktop, top on mobile/tablet */}
          <div className="lg:sticky lg:top-24 max-w-2xl mx-auto order-1 lg:order-2">
            <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-sm font-bold text-white">Our Methodology</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The AlgoVision <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Methodology</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              A proven approach that transforms fragmented marketing into a unified intelligence system. Four phases, one unified system.
            </p>

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
        </div>
      </div>
    </section>
  );
}
