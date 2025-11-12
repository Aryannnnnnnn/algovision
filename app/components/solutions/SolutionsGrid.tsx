"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { navbarData } from "@/app/constants/navbar-data";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray(".category-section");
      categories.forEach((category) => {
        gsap.from(category as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categoryDescriptions = [
    "Intelligent automation and conversational AI solutions",
    "Strategic communications and brand amplification",
    "Cross-platform advertising at scale",
    "Data-driven performance marketing channels"
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
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
        <div className="space-y-20">
          {navbarData.solutions.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="category-section">
              {/* Category Header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-[#00b5ff] rounded-full"></div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                    {category.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 ml-5">
                  {categoryDescriptions[categoryIndex]}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.links.map((service, serviceIndex) => (
                  <Link
                    key={serviceIndex}
                    href={service.href}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#00b5ff]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/5 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#00b5ff]/20 group-hover:to-[#00b5ff]/10 transition-all duration-300">
                      <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[#00b5ff] text-sm font-semibold">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00b5ff]/0 to-[#00b5ff]/0 group-hover:from-[#00b5ff]/5 group-hover:to-transparent rounded-2xl transition-all duration-300 pointer-events-none"></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
