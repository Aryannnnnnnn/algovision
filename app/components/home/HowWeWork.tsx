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

  const phases = [
    {
      number: "01",
      title: "Business Assessment & Strategy",
      subtitle: "Understanding Your Goals",
      description: "We analyze your business objectives, market position, and growth opportunities to develop a comprehensive strategic plan.",
      deliverables: ["Business Analysis", "Market Research", "Strategic Roadmap"],
      timeline: "2-3 weeks",
    },
    {
      number: "02",
      title: "Marketing Plan Development",
      subtitle: "Building Your Execution Plan",
      description: "Create a customized marketing plan with specific campaigns, channels, and tactics designed for your target audience and budget.",
      deliverables: ["Marketing Strategy", "Channel Selection", "Campaign Plan"],
      timeline: "1-2 weeks",
    },
    {
      number: "03",
      title: "Launch and Integration",
      subtitle: "Getting Everything Running",
      description: "Set up and connect all your marketing tools, launch campaigns, and train your team on the new system.",
      deliverables: ["System Setup", "Campaign Launch", "Team Training"],
      timeline: "48 hours",
    },
    {
      number: "04",
      title: "Ongoing Optimization & Consulting",
      subtitle: "Continuous Improvement",
      description: "Monitor performance, provide strategic guidance, and adjust both strategy and execution based on real results to maximize your ROI.",
      deliverables: ["Monthly Reports", "Strategic Consulting", "Performance Optimization"],
      timeline: "Ongoing",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-34 items-start">
          {/* Steps - Left on desktop, bottom on mobile/tablet */}
          <div className="space-y-6 order-2 lg:order-2">
            {phases.map((phase, index) => (
              <div key={index} className="methodology-card group">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-transparent hover:shadow-lg hover:border-[#00011f] transition-all duration-500 lg:hover:-translate-x-2">
                  {/* Step number badge - hidden on mobile, shown on lg */}
                  <div className="hidden lg:flex absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">{phase.number}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Number badge visible on mobile */}
                    <div className="lg:hidden flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{phase.number}</span>
                    </div>

                    <div className="flex-1 min-w-0 lg:ml-6">
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
          <div className="lg:sticky lg:top-24 max-w-2xl mx-auto order-1 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-sm font-bold text-white">Our Process</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How We <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Work Together</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              A straightforward four-step process that takes you from assessment to ongoing growth. No complexity, just results.
            </p>

            <div className="inline-block">
              <Button
                href="/company/methodology"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                Learn More About Our Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
