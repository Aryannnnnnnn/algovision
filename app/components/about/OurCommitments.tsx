"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurCommitments() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });

      // Animate vertical line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 70%",
        },
      });

      // Animate commitment cards
      const cards = gsap.utils.toArray(".commitment-card");
      cards.forEach((card) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          x: -30,
          duration: 0.3,
          stagger: 0.08,
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

  const commitments = [
    {
      number: "01",
      title: "To Our Clients",
      description:
        "Every project completed. Every commitment fulfilled. Every parameter achieved.",
    },
    {
      number: "02",
      title: "To Innovation",
      description:
        "Continuous investment in proprietary technologies and methodologies that push the industry forward.",
    },
    {
      number: "03",
      title: "To Excellence",
      description:
        "We don't aspire to be good or even great—we hustle to be the absolute best in all we do. We hire exceptional people, challenge them to accomplish exceptional things, and win exceptional results for our clients.",
    },
    {
      number: "04",
      title: "To The Future",
      description:
        "We're building AlgoVision not for what digital marketing is today, but for what it will become tomorrow—and we're ensuring our clients are positioned to lead that future.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00b5ff 1px, transparent 1px), linear-gradient(90deg, #00b5ff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-xs font-bold text-white">
              Our Commitments
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Commitments We{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Honor
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            These aren't aspirational values posted on a wall—they're the
            non-negotiable principles that guide every decision, every project,
            and every relationship at AlgoVision.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] hidden md:block"
            style={{ height: "calc(100% - 120px)" }}
          />

          {/* Commitments */}
          <div className="space-y-8 md:space-y-12">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                className="commitment-card relative flex items-start gap-6 group"
              >
                {/* Number Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-full flex items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span className="text-white font-bold">
                      {commitment.number}
                    </span>
                  </div>

                  {/* Connecting Dot */}
                  {index < commitments.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-12 w-2 h-2 bg-[#00b5ff] rounded-full -translate-x-1/2 mt-4" />
                  )}
                </div>

                {/* Card Content */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-[#00b5ff]/30 transition-all duration-300 group-hover:translate-x-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#00b5ff] transition-colors duration-300">
                    {commitment.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {commitment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
