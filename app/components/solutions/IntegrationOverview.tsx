"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function IntegrationOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const items = gsap.utils.toArray(".integration-item");
      items.forEach((item, index) => {
        gsap.fromTo(
          item as HTMLElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const integrations = [
    {
      title: "Unified Data Layer",
      description: "All solutions feed into a single data warehouse for comprehensive cross-channel analytics and attribution.",
    },
    {
      title: "Automated Workflows",
      description: "Trigger cross-solution actions: lead from LinkedIn flows to email nurture, ad performance alerts to Slack.",
    },
    {
      title: "Shared Audience Segments",
      description: "Build audiences once, deploy everywhere. CRM segments automatically sync to all ad platforms.",
    },
    {
      title: "Real-Time Optimization",
      description: "AI monitors performance across all channels and automatically redistributes budget to top performers.",
    },
    {
      title: "Single Sign-On (SSO)",
      description: "One login gives your team secure access to all platforms with role-based permissions.",
    },
    {
      title: "Unified Reporting Dashboard",
      description: "One dashboard with real-time performance across all solutions, exportable to any BI tool.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-34 items-start">
          {/* Heading - Left on desktop, top on mobile/tablet */}
          <div ref={headingRef} className="lg:sticky lg:top-24 max-w-2xl mx-auto order-1 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-sm font-bold text-white">How It Works Together</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              All Solutions. <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">One Ecosystem.</span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              Our solutions don't work in silos. They're built on a unified intelligence layer that connects every touchpoint.
            </p>

            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Data flows seamlessly between platforms, creating a self-optimizing growth engine that gets smarter over time.
            </p>

            {/* CTA Button */}
            <div className="inline-block pt-4">
              <Button
                href="/connect/book-call"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                See It In Action
              </Button>
            </div>
          </div>

          {/* Integration Items - Right on desktop, bottom on mobile/tablet */}
          <div className="space-y-6 order-2 lg:order-2">
            {integrations.map((integration, index) => (
              <div key={index} className="integration-item group">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-transparent hover:shadow-lg hover:border-[#00011f] transition-all duration-500 lg:hover:translate-x-2">
                  {/* Number badge - hidden on mobile, shown on lg */}
                  <div className="hidden lg:flex absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">0{index + 1}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Number badge visible on mobile */}
                    <div className="lg:hidden flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">0{index + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0 lg:ml-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-500">
                        {integration.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
