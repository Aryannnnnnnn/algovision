"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CorePrinciples() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate right side
      const rightChildren = rightRef.current?.children || [];
      gsap.from(rightChildren, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="principles" ref={sectionRef} className="relative py-12 xl:pb-32 bg-white overflow-hidden">
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

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Image with Overlay Card */}
          <div ref={leftRef} className="relative pr-8 sm:pr-12 md:pr-14 lg:pr-16 xl:pr-24">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-visible">
              {/* Unsplash image background - Privacy/Security themed */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80"
                  alt="Data security and privacy"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlay Card - Overflowing Bottom Right - Dark Theme */}
              <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 xl:-bottom-16 -right-10 sm:-right-14 md:-right-18 lg:-right-28 xl:-right-32 w-[75%] sm:w-[70%] md:w-[75%] lg:w-[75%] xl:w-[80%]">
                <div className="bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-2xl px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-10 lg:py-16 xl:px-12 xl:py-20">
                  <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-2xl font-normal text-white leading-relaxed">
                    <span className="text-[#00b5ff] font-bold">100% transparent</span>{" "}
                    data practices with{" "}
                    <span className="text-[#00b5ff] font-bold">zero compromises</span>{" "}
                    on privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div ref={rightRef} className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Core Principles</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Built on{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Trust
                </span>
              </span>
            </h2>

            {/* Principles Overview */}
            <div className="space-y-4">
              <p className="text-xl text-gray-600 leading-relaxed">
                Our data ethics principles guide every decision we make. These aren't just policies—they're our promise to you.
              </p>

              <div className="space-y-3 pt-4">
                {[
                  {
                    title: "Data Minimization",
                    description: "Collect only what's necessary. Every data point has a purpose.",
                  },
                  {
                    title: "Transparency First",
                    description: "Clear communication about data collection and usage. No hidden practices.",
                  },
                  {
                    title: "Security by Design",
                    description: "End-to-end encryption and continuous monitoring built into every system.",
                  },
                  {
                    title: "User Control",
                    description: "Your data, your rules. Access, export, or delete anytime.",
                  },
                  {
                    title: "Compliance Excellence",
                    description: "GDPR, CCPA, SOC 2 compliant—exceeding regulations, not just meeting them.",
                  },
                  {
                    title: "Ethical AI",
                    description: "AI trained on ethically sourced data, audited for bias, respecting privacy.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="inline-block pt-2">
              <Button
                href="#protection"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                See How We Protect Your Data
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
