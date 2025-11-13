"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesWeServe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const industries = gsap.utils.toArray(".industry-card");
      industries.forEach((industry, index) => {
        gsap.from(industry as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: industry as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const industries = [
    {
      title: "Technology & SaaS",
      description: "Scalable growth strategies for enterprise software and cloud platforms."
    },
    {
      title: "Healthcare & Life Sciences",
      description: "Compliant, data-driven campaigns for healthcare organizations and pharmaceutical companies."
    },
    {
      title: "Financial Services",
      description: "High-stakes marketing for banks, investment firms, and fintech companies."
    },
    {
      title: "E-Commerce & Retail",
      description: "Omnichannel strategies that drive revenue and customer lifetime value."
    }
  ];

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
        <div ref={headingRef} className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Industries We{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                Serve
              </span>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="industry-card group bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#00b5ff] hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#00b5ff] transition-colors duration-300">
                {industry.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
