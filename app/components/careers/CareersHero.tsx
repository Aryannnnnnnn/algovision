"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

export default function CareersHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="max-w-5xl">
          <div ref={contentRef} className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Join Our Team</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Build the Future of{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Marketing
              </span>
              <br />
              With Us
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Join a team of innovators, strategists, and growth experts who are redefining how businesses scale. We're building AI-powered marketing solutions that drive real results.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 max-w-2xl">
              <div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                  15+
                </div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                  Remote
                </div>
                <div className="text-sm text-gray-600">Work Culture</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button
                href="#positions"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                View Open Positions
              </Button>
              <Button
                href="#culture"
                variant="secondary"
                size="lg"
              >
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
