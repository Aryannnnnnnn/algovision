"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Heading */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-orange-200/70 rounded-full mb-8 shadow-lg shadow-orange-200/30">
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-bold text-orange-700">About AlgoVision</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6 tracking-tight">
              Building Digital Excellence{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">Together</span>
                <span className="absolute bottom-2 left-0 w-0 h-3 bg-orange-400/30 -rotate-1 animate-underline-expand"></span>
              </span>
            </h1>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <p className="text-xl text-gray-600 leading-relaxed">
              We're a passionate team of innovators, creators, and strategists dedicated to transforming businesses through cutting-edge digital solutions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 15 years of experience and 500+ successful projects, we combine AI innovation, creative excellence, and strategic marketing to help businesses thrive in the digital age. Our mission is simple: empower your brand with technology that drives real, measurable results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                Get in Touch
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="md"
              >
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
