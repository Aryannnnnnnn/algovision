"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseCase {
  industry: string;
  challenge: string;
  solution: string;
  result: string;
}

interface SolutionUseCasesProps {
  useCases: UseCase[];
}

export default function SolutionUseCases({ useCases }: SolutionUseCasesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const cards = gsap.utils.toArray(".use-case-card");
      cards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Unsplash images for different industries
  const getIndustryImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80", // Tech/data
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80", // Business
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80", // Team
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80", // Analytics
    ];
    return images[index % images.length];
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
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
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-sm font-bold text-white">Success Stories</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Real-World{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Impact
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            See how businesses like yours achieve measurable results with our solutions.
          </p>
        </div>

        {/* Asymmetric Collage Grid */}
        <div className="grid grid-cols-12 gap-5 lg:gap-7 auto-rows-min">
          {useCases.map((useCase, index) => {
            // Different sizes and positions for collage effect
            const layouts = [
              { col: 'col-span-12 md:col-span-7', imgHeight: 'h-64' }, // Large
              { col: 'col-span-12 md:col-span-5', imgHeight: 'h-48' }, // Medium
              { col: 'col-span-12 md:col-span-5', imgHeight: 'h-56' }, // Medium-tall
              { col: 'col-span-12 md:col-span-7', imgHeight: 'h-52' }, // Wide
            ];
            const layout = layouts[index % layouts.length];

            return (
              <div
                key={index}
                className={`use-case-card group relative transition-all duration-500 ${layout.col}`}
              >
                <div className="relative bg-white rounded-3xl border-2 border-gray-100 hover:border-[#00b5ff]/40 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Top Section - Image */}
                  <div className={`relative overflow-hidden ${layout.imgHeight}`}>
                    <img
                      src={getIndustryImage(index)}
                      alt={useCase.industry}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50"></div>

                    {/* Industry Badge on image */}
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-xl border border-gray-100">
                        <span className="text-xs font-bold text-[#00b5ff] uppercase tracking-wider">
                          {useCase.industry}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-8 space-y-5">
                    {/* Challenge */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest">Challenge</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium line-clamp-2 pl-5">
                        {useCase.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00b5ff]"></div>
                        <h4 className="text-xs font-bold text-[#00b5ff] uppercase tracking-widest">Solution</h4>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 pl-5">
                        {useCase.solution}
                      </p>
                    </div>

                    {/* Result - Highlighted */}
                    <div className="relative mt-6">
                      <div className="relative bg-gradient-to-br from-[#00b5ff]/10 via-[#00b5ff]/5 to-transparent p-5 rounded-2xl border-2 border-[#00b5ff]/30 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b5ff] to-[#0088cc] flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-[#00b5ff] uppercase tracking-widest mb-2">
                              Impact
                            </h4>
                            <p className="text-base font-bold text-gray-900 leading-snug">
                              {useCase.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
