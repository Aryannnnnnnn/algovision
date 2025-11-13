"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ResultsProps {
  results: string;
}

export default function Results({ results }: ResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="business-impact"
      ref={sectionRef}
      className="relative py-8 md:py-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Business Impact
          </h2>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_img]:w-full [&_img]:max-w-2xl [&_img]:h-auto [&_img]:mx-auto [&_img]:rounded-lg [&_img]:my-8"
          style={{ fontSize: '17px', lineHeight: '1.9' }}
          dangerouslySetInnerHTML={{ __html: results }}
        />

        {/* Dashed separator */}
        <div className="w-full border-t-2 border-dashed border-gray-300 mt-16"></div>
      </div>
    </section>
  );
}
