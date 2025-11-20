"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

export default function AISolutionsHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(".hero-stats",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(".hero-buttons",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 lg:py-36 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <svg className="w-4 h-4 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-bold text-white">AI Solutions</span>
          </div>

          {/* Title */}
          <h1 className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Intelligent Automation{" "}
            <span className="bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              That Scales
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10">
            Advanced AI systems that work 24/7 to automate customer interactions, drive engagement, and scale your business operations without additional headcount.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="hero-stats">
              <div className="text-3xl sm:text-4xl font-bold text-[#00b5ff] mb-1">5+</div>
              <div className="text-sm text-gray-600">AI Systems</div>
            </div>
            <div className="hero-stats">
              <div className="text-3xl sm:text-4xl font-bold text-[#00b5ff] mb-1">24/7</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="hero-stats">
              <div className="text-3xl sm:text-4xl font-bold text-[#00b5ff] mb-1">90%</div>
              <div className="text-sm text-gray-600">Automation Rate</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              }
            >
              Schedule a Demo
            </Button>
            <Button
              href="#ai-solutions"
              variant="secondary"
              size="lg"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
