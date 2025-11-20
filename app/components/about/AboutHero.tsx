"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="max-w-5xl">
          {/* Content */}
          <div ref={contentRef} className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">About Algo Vision</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Algo Vision Aspires To Make Certainty The New Standard In{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Digital Transformation
              </span>
            </h1>

            {/* Description
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Since 2010, we've been pioneering the future of marketing technology—helping enterprise brands unify
              their data, optimize their campaigns, and drive measurable results at scale.
            </p> */}

            {/* CTA Buttons
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button
                href="/company/contact"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                Get Started
              </Button>
              <Button
                href="/solutions"
                variant="secondary"
                size="lg"
              >
                Explore Solutions
              </Button>
            </div>

            Trust Badge
            <div className="flex items-center gap-3 pt-2 md:pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-purple-500"
                  ></div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">500+ enterprises</span> trust Algo Vision
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
