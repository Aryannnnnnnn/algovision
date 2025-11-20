"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        force3D: true,
        clearProps: "all",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div ref={contentRef} className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
            <span className="text-xs font-bold text-white">Ready to Scale?</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Start with a <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Strategic Audit</span>
          </h2>

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            See how far the right system can take your brand
          </p>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            A 45-minute executive review that surfaces your highest-value opportunities, uncovers profit leaks, and outlines a clean 90-day plan ready for execution
          </p>

          {/* CTA Button */}
          <div className="pt-4 inline-block">
            <Button
              href="/connect/book-call"
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              }
            >
              Initiate Assessment
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="text-sm text-gray-500">
            No pitch. No pressure. Just a clear plan you can act on immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
