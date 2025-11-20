"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set(headingRef.current?.children || [], { opacity: 1, y: 0 });
      gsap.set(cardsRef.current?.children || [], { opacity: 1, y: 0 });

      // Animate heading
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Animate cards
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const philosophies = [
    {
      number: "01",
      title: "Everything Is Achievable",
      description:
        "We believe that with the right combination of strategy, technology, and execution discipline, any business objective can be accomplished. This isn't optimism—it's a methodology proven across hundreds of successful engagements.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Speed Is The New Currency",
      description:
        "Markets move fast. Opportunities expire. We operate with velocity without sacrificing attention to detail—executing in real-time while maintaining the systematic rigor that ensures quality.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Attention To Detail Defines Excellence",
      description:
        "The difference between good and exceptional lives in the details. Our parameter framework ensures nothing is overlooked, no commitment is forgotten, and every deliverable meets specification.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Selective Engagement Ensures Success",
      description:
        "We maintain our 100% completion rate by being selective about what we onboard. If we can't guarantee success, we don't proceed. When we say yes, it's a real commitment.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="mb-16 max-w-4xl">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-xs font-bold text-white">Our Philosophy</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Principles That{" "}
            <span className="bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
              Drive Everything
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            These aren't aspirational statements—they're operational principles that guide every decision, every project, and every client engagement.
          </p>
        </div>

        {/* Philosophy Cards - 2x2 Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {philosophies.map((philosophy, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#00b5ff]/10 to-transparent border border-[#00b5ff]/20 rounded-2xl p-8 lg:p-10"
            >
              {/* Icon */}
              <div className="w-12 h-12 text-[#00b5ff] mb-6">
                {philosophy.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {philosophy.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {philosophy.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
