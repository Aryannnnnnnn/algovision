"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BlogsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
          clearProps: "all",
          once: true,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center bg-white overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.03) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-32">
        <div className="max-w-5xl">
          <div ref={contentRef} className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Blog</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Insights &{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                Resources
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-semibold text-gray-700 leading-relaxed max-w-3xl">
              Expert perspectives on digital transformation, AI, and marketing
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Stay updated with the latest trends, best practices, and
              innovative solutions shaping the future of business technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
