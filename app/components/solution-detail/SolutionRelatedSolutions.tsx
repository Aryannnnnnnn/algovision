"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface RelatedSolution {
  title: string;
  description: string;
  category: string;
  slug: string;
  benefits: string[];
}

interface SolutionRelatedSolutionsProps {
  solutions: RelatedSolution[];
  heading?: string;
  subheading?: string;
}

export default function SolutionRelatedSolutions({
  solutions,
  heading = "Related Solutions",
  subheading = "Enhance your results with these complementary solutions"
}: SolutionRelatedSolutionsProps) {
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

      const cards = gsap.utils.toArray(".related-solution-card");
      cards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          delay: index * 0.08,
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

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #00b5ff 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-xs font-bold text-white">You May Also Like</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            {heading}
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            {subheading}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={`/solutions/${solution.category}/${solution.slug}`}
              className="related-solution-card group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#00b5ff]/50 hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00b5ff]/0 to-[#00b5ff]/0 group-hover:from-[#00b5ff]/5 group-hover:to-transparent rounded-2xl transition-all duration-300 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Category badge */}
                <div className="inline-flex items-center px-3 py-1 bg-[#00b5ff]/10 rounded-full mb-4 self-start">
                  <span className="text-xs font-bold text-[#00b5ff] uppercase tracking-wider">
                    {solution.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#00b5ff] transition-colors duration-300">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-6 flex-1">
                  {solution.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#00b5ff] group-hover:text-[#0088cc] transition-colors">
                    Learn More
                  </span>
                  <svg className="w-4 h-4 text-[#00b5ff] group-hover:text-[#0088cc] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00b5ff]/10 group-hover:border-[#00b5ff]/30 transition-all duration-300 rounded-br-2xl"></div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 inline-block">
          <Button
            href="/solutions"
            variant="primary"
            size="lg"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            }
          >
            View All Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
