"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function PainToSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        clearProps: "all",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-4xl mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Why We're Different</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Brands waste millions on <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">disconnected campaigns</span>.
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            We orchestrate everything into one integrated strategy that actually works.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {/* The Problem */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-4 left-8 px-4 py-1.5 bg-gray-900 text-white text-sm font-bold rounded-full">
              Traditional Agencies
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Fragmented campaigns</strong> — Google Ads here, social media there, PR somewhere else
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Channels work in silos</strong> — each burning budget without amplifying the others
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Wasted budgets</strong> — no coordination means missed opportunities
                </p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="relative bg-gradient-to-br from-blue-50 to-white border-2 border-[#00b5ff] rounded-3xl p-8 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="absolute -top-4 left-8 px-4 py-1.5 bg-gradient-to-r from-[#00b5ff] to-[#0095d9] text-white text-sm font-bold rounded-full shadow-lg">
              AlgoVision Approach
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#00b5ff] rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Orchestrated campaigns</strong> — all channels work as one integrated strategy
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#00b5ff] rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Channels amplify each other</strong> — when PR creates buzz, ads capitalize on it instantly
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#00b5ff] rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">3-5x better ROI</strong> — every dollar works harder because every channel reinforces the others
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="inline-block">
          <Button
            href="/connect/book-call"
            variant="primary"
            size="md"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            }
          >
            See How We Orchestrate
          </Button>
        </div>
      </div>
    </section>
  );
}
