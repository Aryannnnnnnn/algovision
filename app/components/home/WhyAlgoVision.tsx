"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function WhyAlgoVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // Animate pillars
      const pillars = pillarsRef.current?.children;
      if (pillars) {
        gsap.from(pillars, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      number: "01",
      title: "Unified Intelligence Foundation",
      subtitle: "Own your growth trajectory",
      description: "Consolidate 25+ fragmented solutions into one self-optimizing ecosystem. Connect AI, advertising, PR, and performance marketing through a single intelligence layer that learns from every interaction.",
      visual: "solutions",
    },
    {
      number: "02",
      title: "Cross-Channel Orchestration",
      subtitle: "Execute with precision",
      description: "Activate across 15+ advertising platforms, 8 communication channels, and PR networks—all synchronized in real-time. Your entire system responds as one, whether managing routine optimization or navigating unexpected challenges.",
      visual: "channels",
    },
    {
      number: "03",
      title: "Enterprise-Grade Scale",
      subtitle: "Deliver results that matter",
      description: "Deploy campaigns across Google, Meta, TikTok, Bluesky, LinkedIn, and emerging platforms through the industry's most comprehensive growth network. Achieve 3.2x industry-average growth with infrastructure built for Fortune 500 demands.",
      visual: "growth",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-[#00b5ff]/30 rounded-full mb-8 shadow-lg shadow-[#00b5ff]/20">
            <svg className="w-4 h-4 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-bold text-[#0095d9]">Why Enterprise Leaders Choose Us</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Why do <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">enterprise leaders</span> choose AlgoVision?
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Trusted by global innovators and enterprise leaders shaping the next era of marketing intelligence.
          </p>

          <p className="text-lg text-gray-500 leading-relaxed">
            100+ brands trust AlgoVision to unify their marketing intelligence—from Fortune 500s to category-defining disruptors.
          </p>
        </div>

        {/* Three Pillars */}
        <div ref={pillarsRef} className="space-y-16 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Content Side */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                {/* Number & Title */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="text-[50px] sm:text-[60px] lg:text-[70px] font-bold text-gray-900 leading-none opacity-30">
                    {pillar.number}
                  </div>
                  <div className="flex-1 pt-1 sm:pt-2">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-base sm:text-lg font-semibold text-[#00b5ff]">
                      → {pillar.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pl-16 sm:pl-20 lg:pl-24">
                  {pillar.description}
                </p>
              </div>

              {/* Visual Element - Dashboard Style */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-[#E8F4FE] via-[#F5F3FF] to-[#E8F4FE] rounded-xl sm:rounded-2xl shadow-xl border border-blue-100/30 p-4 sm:p-6">

                  {pillar.visual === "solutions" && (
                    <div className="space-y-3 sm:space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-bold text-gray-700">Unified Solutions</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="bg-white rounded-lg px-3 py-2 sm:py-3 shadow-sm">
                          <div className="text-[10px] sm:text-xs text-gray-500 mb-1">AI Systems</div>
                          <div className="text-base sm:text-lg font-bold text-[#00b5ff]">8</div>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 sm:py-3 shadow-sm">
                          <div className="text-[10px] sm:text-xs text-gray-500 mb-1">Ad Platforms</div>
                          <div className="text-base sm:text-lg font-bold text-[#00b5ff]">12</div>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 sm:py-3 shadow-sm">
                          <div className="text-[10px] sm:text-xs text-gray-500 mb-1">PR Tools</div>
                          <div className="text-base sm:text-lg font-bold text-[#00b5ff]">5</div>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 sm:py-3 shadow-sm">
                          <div className="text-[10px] sm:text-xs text-gray-500 mb-1">Total</div>
                          <div className="text-base sm:text-lg font-bold text-green-500">25+</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {pillar.visual === "channels" && (
                    <div className="space-y-3 sm:space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-bold text-gray-700">Active Channels</span>
                        <span className="text-xs sm:text-sm font-semibold text-[#00b5ff]">Real-time</span>
                      </div>

                      {/* Channel bars */}
                      <div className="space-y-2.5 sm:space-y-3">
                        {[
                          { name: "Google Ads", value: 95 },
                          { name: "Meta", value: 88 },
                          { name: "LinkedIn", value: 82 },
                          { name: "TikTok", value: 76 },
                          { name: "PR Networks", value: 91 },
                        ].map((channel, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                              <span className="text-gray-600">{channel.name}</span>
                              <span className="text-[#00b5ff] font-semibold">{channel.value}%</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-1.5 sm:h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#00b5ff] to-[#0095d9] rounded-full transition-all duration-500"
                                style={{ width: `${channel.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pillar.visual === "growth" && (
                    <div className="space-y-3 sm:space-y-4">
                      {/* Stock Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-gray-700 mb-1">ROAS Performance</div>
                          <div className="flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">+248%</span>
                            <span className="text-[10px] sm:text-xs font-semibold text-green-500 flex items-center gap-0.5 sm:gap-1">
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                              +3.2x
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] sm:text-[10px] text-gray-500">Last 6 Months</div>
                          <div className="text-[10px] sm:text-xs font-semibold text-[#00b5ff]">Trending Up</div>
                        </div>
                      </div>

                      {/* Stock Chart */}
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                        <svg className="w-full h-32 sm:h-40" viewBox="0 0 400 140" preserveAspectRatio="none">
                          {/* Gradient Definition */}
                          <defs>
                            <linearGradient id="stockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 0.2 }} />
                              <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0 }} />
                            </linearGradient>
                          </defs>

                          {/* Grid lines */}
                          {[0, 1, 2, 3, 4].map((i) => (
                            <line
                              key={i}
                              x1="0"
                              y1={10 + i * 25}
                              x2="400"
                              y2={10 + i * 25}
                              stroke="#f3f4f6"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Area fill */}
                          <path
                            d="M 0,110 L 57,90 L 114,95 L 171,75 L 228,55 L 285,40 L 342,25 L 400,10 L 400,130 L 0,130 Z"
                            fill="url(#stockGradient)"
                          />

                          {/* Main line */}
                          <path
                            d="M 0,110 L 57,90 L 114,95 L 171,75 L 228,55 L 285,40 L 342,25 L 400,10"
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Data points */}
                          {[
                            { x: 0, y: 110 },
                            { x: 57, y: 90 },
                            { x: 114, y: 95 },
                            { x: 171, y: 75 },
                            { x: 228, y: 55 },
                            { x: 285, y: 40 },
                            { x: 342, y: 25 },
                            { x: 400, y: 10 },
                          ].map((point, idx) => (
                            <circle
                              key={idx}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#22c55e"
                              stroke="white"
                              strokeWidth="2"
                            />
                          ))}

                          {/* Time labels */}
                          <text x="0" y="138" fontSize="10" fill="#9ca3af" textAnchor="start">Jan</text>
                          <text x="200" y="138" fontSize="10" fill="#9ca3af" textAnchor="middle">Apr</text>
                          <text x="400" y="138" fontSize="10" fill="#9ca3af" textAnchor="end">Jun</text>
                        </svg>
                      </div>

                      {/* Bottom Metrics */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <div className="bg-white rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm text-center">
                          <div className="text-[9px] sm:text-[10px] text-gray-500 mb-0.5">Volume</div>
                          <div className="text-xs sm:text-sm font-bold text-gray-900">2.4M</div>
                        </div>
                        <div className="bg-white rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm text-center">
                          <div className="text-[9px] sm:text-[10px] text-gray-500 mb-0.5">High</div>
                          <div className="text-xs sm:text-sm font-bold text-green-500">+320%</div>
                        </div>
                        <div className="bg-white rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm text-center">
                          <div className="text-[9px] sm:text-[10px] text-gray-500 mb-0.5">Avg</div>
                          <div className="text-xs sm:text-sm font-bold text-[#00b5ff]">+248%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="inline-block">
          <Button
            href="/company/methodology"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Explore Our Methodology
          </Button>
        </div>
      </div>
    </section>
  );
}
