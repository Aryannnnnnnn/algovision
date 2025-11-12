"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const positions = [
  {
    title: "Senior Growth Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Lead multi-channel growth campaigns and optimize performance across paid and organic channels.",
  },
  {
    title: "AI Solutions Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and deploy AI-powered chatbots, virtual assistants, and automation solutions for clients.",
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    type: "Full-time",
    description: "Analyze campaign performance, generate insights, and create data-driven recommendations for clients.",
  },
  {
    title: "Content Strategist",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    description: "Develop content strategies, create high-performing blog posts, and manage SEO content initiatives.",
  },
  {
    title: "Account Manager",
    department: "Client Success",
    location: "Remote",
    type: "Full-time",
    description: "Manage client relationships, ensure campaign success, and identify upsell opportunities.",
  },
  {
    title: "PR Specialist",
    department: "Communications",
    location: "Remote",
    type: "Full-time",
    description: "Secure media coverage, manage press releases, and build relationships with journalists and publications.",
  },
];

export default function OpenPositions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const cards = gsap.utils.toArray(".position-card");
      cards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="positions" ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-4xl mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Open Positions</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Find your{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              perfect role
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            We're always looking for talented individuals who are passionate about marketing, technology, and driving results.
          </p>
        </div>

        {/* Positions Grid */}
        <div className="space-y-6">
          {positions.map((position, index) => (
            <div
              key={index}
              className="position-card group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#00b5ff]/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left Side - Job Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-[#00b5ff] transition-colors duration-300">
                      {position.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {position.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 bg-[#00b5ff]/10 rounded-full text-sm font-semibold text-[#00b5ff]">
                      {position.department}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                      {position.location}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                      {position.type}
                    </span>
                  </div>
                </div>

                {/* Right Side - Apply Button */}
                <div className="flex-shrink-0">
                  <Button
                    href="/company/contact"
                    variant="primary"
                    size="md"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    }
                  >
                    Apply Now
                  </Button>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#00b5ff]/10 group-hover:border-[#00b5ff]/30 transition-all duration-300 rounded-br-2xl"></div>
            </div>
          ))}
        </div>

        {/* No Position Match */}
        <div className="mt-12 text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-12 border-2 border-gray-100">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Don't see the right role?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always interested in hearing from talented people. Send us your resume and tell us how you'd like to contribute.
          </p>
          <Button
            href="/company/contact"
            variant="secondary"
            size="md"
          >
            Send General Application
          </Button>
        </div>
      </div>
    </section>
  );
}
