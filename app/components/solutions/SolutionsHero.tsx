"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

export default function SolutionsHero() {
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
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
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

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div ref={headingRef} className="max-w-4xl">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Our Solutions</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Comprehensive Growth Solutions
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            From AI-powered automation to omnichannel advertising, we offer the complete toolkit for modern enterprise growth.
          </p>

          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            45+ services across 4 core pillars designed to accelerate your digital transformation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              href="/connect/book-call"
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Book a Consultation
            </Button>
            <Button
              href="/resources/case-studies"
              variant="secondary"
              size="lg"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
