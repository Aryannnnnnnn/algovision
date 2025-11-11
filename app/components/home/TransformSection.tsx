"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function TransformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">

          {/* Left Side - Content */}
          <div ref={rightRef} className="order-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-sm font-bold text-white">Our Methodology</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Data-driven{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  methodology
                </span>
              </span>
              {" "}that delivers results
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Our approach combines artificial intelligence, predictive analytics, and human expertise to create a unified growth engine that adapts in real-time.
            </p>

            {/* Methodology Points */}
            <div className="space-y-4 pt-4">
              {[
                {
                  title: "Unified Intelligence Layer",
                  description: "Connect every data source into a single, self-optimizing system that learns and improves continuously."
                },
                {
                  title: "Real-Time Orchestration",
                  description: "Synchronize campaigns across 15+ platforms with automated optimization based on live performance data."
                },
                {
                  title: "Enterprise-Grade Execution",
                  description: "Deploy with the infrastructure and security standards trusted by Fortune 500 companies."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors">
                    <span className="text-sm font-bold text-[#00b5ff]">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="inline-block pt-6">
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

          {/* Right Side - Abstract Data Visualization */}
          <div ref={leftRef} className="relative order-2">
            {/* Main visualization container */}
            <div className="relative aspect-square max-w-3xl mx-auto">

              {/* Corporate network visualization */}
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.15 }} />
                    <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0.05 }} />
                  </linearGradient>
                </defs>

                {/* Large circles - data ecosystem layers */}
                <g stroke="#00b5ff" strokeWidth="2" fill="none" opacity="0.15">
                  <circle cx="200" cy="200" r="60" />
                  <circle cx="200" cy="200" r="100" />
                  <circle cx="200" cy="200" r="140" />
                </g>

                {/* Connecting framework lines */}
                <g stroke="#00b5ff" strokeWidth="1" opacity="0.12">
                  <line x1="200" y1="60" x2="200" y2="340" />
                  <line x1="60" y1="200" x2="340" y2="200" />
                  <line x1="90" y1="90" x2="310" y2="310" />
                  <line x1="310" y1="90" x2="90" y2="310" />
                </g>

                {/* Central hub */}
                <g>
                  <circle cx="200" cy="200" r="20" fill="#00b5ff" opacity="0.1" />
                  <circle cx="200" cy="200" r="12" fill="#00b5ff" opacity="0.3">
                    <animate attributeName="r" values="12;15;12" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="6" fill="#00b5ff" opacity="0.8" />
                </g>

                {/* Data connection points at card locations */}
                <g>
                  {/* Top - AI Active */}
                  <circle cx="200" cy="60" r="16" fill="url(#circleGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.4" />
                  <circle cx="200" cy="60" r="10" fill="#00b5ff" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Right - Channels */}
                  <circle cx="299" cy="101" r="16" fill="url(#circleGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.4" />
                  <circle cx="299" cy="101" r="10" fill="#00b5ff" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" begin="0.75s" repeatCount="indefinite" />
                  </circle>

                  {/* Bottom - Growth Rate */}
                  <circle cx="200" cy="340" r="16" fill="url(#circleGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.4" />
                  <circle cx="200" cy="340" r="10" fill="#00b5ff" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" begin="1.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Left - Solutions */}
                  <circle cx="60" cy="200" r="16" fill="url(#circleGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.4" />
                  <circle cx="60" cy="200" r="10" fill="#00b5ff" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" begin="2.25s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Connection lines from center to nodes */}
                <g stroke="#00b5ff" strokeWidth="1.5" opacity="0.2">
                  <line x1="200" y1="200" x2="200" y2="60" />
                  <line x1="200" y1="200" x2="299" y2="101" />
                  <line x1="200" y1="200" x2="200" y2="340" />
                  <line x1="200" y1="200" x2="60" y2="200" />
                </g>

                {/* Subtle data flow indicators */}
                <g fill="#00b5ff" opacity="0.4">
                  <circle cx="200" cy="140" r="3">
                    <animate attributeName="cy" values="200;60;200" dur="5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="5s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="250" cy="150" r="3">
                    <animate attributeName="cx" values="200;299;200" dur="5s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;101;200" dur="5s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="5s" begin="1s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="200" cy="260" r="3">
                    <animate attributeName="cy" values="200;340;200" dur="5s" begin="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="5s" begin="2s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="130" cy="200" r="3">
                    <animate attributeName="cx" values="200;60;200" dur="5s" begin="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="5s" begin="3s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>

              {/* Floating data cards positioned on dots */}
              {/* Top node - AI Active (200, 60) */}
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-700">AI Active</span>
                </div>
              </div>

              {/* Right node - Channels (299, 101) */}
              <div className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Real-time</div>
                <div className="text-xl font-bold text-[#00b5ff]">15+</div>
                <div className="text-xs text-gray-600">Channels</div>
              </div>

              {/* Bottom node - Growth Rate (200, 340) */}
              <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Growth Rate</div>
                <div className="text-xl font-bold text-[#00b5ff]">3.2x</div>
                <div className="text-xs text-gray-600">Faster</div>
              </div>

              {/* Left node - Solutions (60, 200) */}
              <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Unified</div>
                <div className="text-xl font-bold text-[#00b5ff]">25+</div>
                <div className="text-xs text-gray-600">Solutions</div>
              </div>

              {/* Stat Overlay Card - Center of Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] sm:w-[50%] md:w-[45%] max-w-[180px]">
                <div className="bg-white rounded-md sm:rounded-lg shadow-2xl border border-gray-200 p-1.5 sm:p-3 md:p-4">
                  <div className="text-center space-y-0 sm:space-y-0.5 md:space-y-1">
                    <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#00b5ff]">3.2x</div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 font-medium leading-tight">Faster Growth</div>
                    <div className="text-[7px] sm:text-[9px] md:text-[10px] text-gray-500 leading-tight">vs Agencies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
