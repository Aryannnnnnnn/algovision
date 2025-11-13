"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const pillars = gsap.utils.toArray(".approach-pillar");
      pillars.forEach((pillar, index) => {
        gsap.fromTo(
          pillar as HTMLElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillar as HTMLElement,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      title: "Client-Centric by Design",
      description: "Your success defines our success. We don't measure ourselves by awards or vanity metrics—we measure ourselves by scope completion and client satisfaction."
    },
    {
      title: "Results Over Everything",
      description: "We operate on data, not assumptions. Every strategy is backed by our parameter framework—a systematic approach that turns desired results from aspirational to inevitable."
    },
    {
      title: "Precision at Speed",
      description: "We believe speed is the new currency—but never at the expense of precision. Our execution model blends rapid deployment with meticulous attention to detail, ensuring momentum without compromise."
    },
    {
      title: "Selective Engagement",
      description: "We only onboard projects where success can be guaranteed. If we identify risks that compromise certainty, we optimize the approach or transparently decline. When we say yes, it's a real commitment."
    },
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

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Our Philosophy</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            What Defines{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                Our Approach
              </span>
            </span>
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <div key={index} className="approach-pillar space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
