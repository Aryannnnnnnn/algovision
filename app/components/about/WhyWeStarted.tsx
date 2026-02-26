"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyWeStarted() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([leftRef.current, rightRef.current], { opacity: 1 });

      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate right side
      const rightChildren = rightRef.current?.children || [];
      gsap.from(rightChildren, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 xl:pb-32 bg-white overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Image with Overlay Card */}
          <div ref={leftRef} className="relative pr-8 sm:pr-12 md:pr-14 lg:pr-16 xl:pr-24">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-visible">
              {/* Unsplash image background */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlay Card - Overflowing Bottom Right - Dark Theme */}
              <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 xl:-bottom-16 -right-10 sm:-right-14 md:-right-18 lg:-right-28 xl:-right-32 w-[75%] sm:w-[70%] md:w-[75%] lg:w-[75%] xl:w-[80%]">
                <div className="bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-2xl px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-10 lg:py-16 xl:px-12 xl:py-20">
                  <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-2xl font-normal text-white leading-relaxed">
                    <span className="text-[#00b5ff] font-bold">100% completion rate</span>{" "}
                    since 2021. Zero failed projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div ref={rightRef} className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Our Story</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Why{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  We Started
                </span>
              </span>
            </h2>

            {/* Story Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                In 2021, the digital marketing and technology landscape was filled with agencies that overpromised and underdelivered. Projects failed. Timelines slipped. Budgets ballooned. Clients were left managing disappointment instead of celebrating success.
              </p>

              <p className="text-xl font-bold text-gray-900">
                We started Algo Vision to change that reality.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Our founding principle was simple: <span className="font-bold text-gray-900">Every single project we onboard will be accomplished.</span> Not most. Not the easy ones. <span className="font-bold text-gray-900">Every. Single. One.</span>
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                To achieve this, we built our entire operation around <span className="font-semibold text-gray-900">certainty</span>—not speed, not scale, not growth-at-all-costs. We invested in proprietary systems, developed rigorous frameworks, assembled elite teams, and created a methodology where failure simply isn't an option.
              </p>

              <p className="text-lg text-gray-900 font-semibold">
                The result? Four years of unbroken project completion. Long-term client relationships built on delivered promises. A reputation for being the partner enterprises turn to when success is non-negotiable.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-gradient-to-br from-[#00b5ff]/10 to-transparent rounded-xl border border-[#00b5ff]/20">
                <div className="text-3xl font-bold text-[#00b5ff] mb-1">100%</div>
                <div className="text-xs text-gray-600 font-semibold">Completion</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#00b5ff]/10 to-transparent rounded-xl border border-[#00b5ff]/20">
                <div className="text-3xl font-bold text-[#00b5ff] mb-1">4+</div>
                <div className="text-xs text-gray-600 font-semibold">Years</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#00b5ff]/10 to-transparent rounded-xl border border-[#00b5ff]/20">
                <div className="text-3xl font-bold text-[#00b5ff] mb-1">Zero</div>
                <div className="text-xs text-gray-600 font-semibold">Failures</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
