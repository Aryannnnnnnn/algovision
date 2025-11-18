"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CaseStudiesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden"
    >
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-5xl">
          <div ref={contentRef} className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-sm font-bold text-white">
                Success Stories
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Real Results, Real{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Impact
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Discover how leading organizations across industries have transformed their businesses with our data-driven solutions and achieved measurable success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
