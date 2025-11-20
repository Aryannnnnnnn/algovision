"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurValues() {
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
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Our Values</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Values That{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Define Us
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Our core values shape every decision, every project, and every client relationship we build.
            </p>

            {/* Values Points */}
            <div className="space-y-4 pt-4">
              {[
                {
                  title: "Client-Centricity Above All",
                  description: "Your success is our singular metric. We don't chase awards, recognition, or vanity metrics—we chase completed scope and satisfied clients."
                },
                {
                  title: "Innovation As Standard Practice",
                  description: "We continuously develop proprietary products and services designed for different sectors because standing still means falling behind."
                },
                {
                  title: "Integrity Without Compromise",
                  description: "We operate transparently, keep our commitments, and deliver what we promise. No exceptions, no excuses."
                },
                {
                  title: "Results Over Everything",
                  description: "We're driven by outcomes, not activity. Every strategy, every channel, every decision is measured against one question: does this contribute to the committed results?"
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
          </div>

          {/* Right Side - Values Visualization */}
          <div ref={leftRef} className="relative order-2">
            {/* Main visualization container */}
            <div className="relative aspect-square max-w-3xl mx-auto">

              {/* Values network visualization - Diamond/Star Pattern */}
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="valuesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.15 }} />
                    <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0.05 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Diamond/Hexagonal pattern background */}
                <g stroke="#00b5ff" strokeWidth="1.5" fill="none" opacity="0.1">
                  {/* Outer hexagon */}
                  <polygon points="200,50 310,125 310,275 200,350 90,275 90,125" />
                  {/* Middle hexagon */}
                  <polygon points="200,100 270,150 270,250 200,300 130,250 130,150" />
                  {/* Inner diamond */}
                  <polygon points="200,150 250,200 200,250 150,200" />
                </g>

                {/* Connecting web between nodes */}
                <g stroke="#00b5ff" strokeWidth="2" opacity="0.15">
                  {/* Create star/web pattern connecting all 4 points */}
                  <line x1="200" y1="60" x2="340" y2="200" />
                  <line x1="340" y1="200" x2="200" y2="340" />
                  <line x1="200" y1="340" x2="60" y2="200" />
                  <line x1="60" y1="200" x2="200" y2="60" />
                  {/* Cross connections */}
                  <line x1="200" y1="60" x2="200" y2="340" />
                  <line x1="60" y1="200" x2="340" y2="200" />
                </g>

                {/* Orbital rings around center */}
                <g stroke="#00b5ff" strokeWidth="1" fill="none" opacity="0.08">
                  <ellipse cx="200" cy="200" rx="80" ry="50">
                    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="200" cy="200" rx="50" ry="80">
                    <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="25s" repeatCount="indefinite"/>
                  </ellipse>
                </g>

                {/* Central core - Values Hub with pulsing effect */}
                <g filter="url(#glow)">
                  <circle cx="200" cy="200" r="25" fill="#00b5ff" opacity="0.08">
                    <animate attributeName="r" values="25;30;25" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="15" fill="#00b5ff" opacity="0.2">
                    <animate attributeName="r" values="15;18;15" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="8" fill="#00b5ff" opacity="0.6" />
                </g>

                {/* Value nodes at 4 positions - larger and more prominent */}
                <g>
                  {/* Top - Client-Centricity */}
                  <circle cx="200" cy="60" r="20" fill="url(#valuesGradient)" stroke="#00b5ff" strokeWidth="3" opacity="0.5" />
                  <circle cx="200" cy="60" r="12" fill="#00b5ff" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Right - Innovation */}
                  <circle cx="340" cy="200" r="20" fill="url(#valuesGradient)" stroke="#00b5ff" strokeWidth="3" opacity="0.5" />
                  <circle cx="340" cy="200" r="12" fill="#00b5ff" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                  </circle>

                  {/* Bottom - Integrity */}
                  <circle cx="200" cy="340" r="20" fill="url(#valuesGradient)" stroke="#00b5ff" strokeWidth="3" opacity="0.5" />
                  <circle cx="200" cy="340" r="12" fill="#00b5ff" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                  </circle>

                  {/* Left - Results */}
                  <circle cx="60" cy="200" r="20" fill="url(#valuesGradient)" stroke="#00b5ff" strokeWidth="3" opacity="0.5" />
                  <circle cx="60" cy="200" r="12" fill="#00b5ff" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Energy waves flowing between nodes */}
                <g fill="#00b5ff" opacity="0.5">
                  {/* Wave 1: Center to Top */}
                  <circle r="4">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 200,200 L 200,60" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
                  </circle>

                  {/* Wave 2: Center to Right */}
                  <circle r="4">
                    <animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M 200,200 L 340,200" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="4s" begin="1s" repeatCount="indefinite" />
                  </circle>

                  {/* Wave 3: Center to Bottom */}
                  <circle r="4">
                    <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 200,200 L 200,340" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="4s" begin="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Wave 4: Center to Left */}
                  <circle r="4">
                    <animateMotion dur="4s" begin="3s" repeatCount="indefinite" path="M 200,200 L 60,200" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="4s" begin="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Circular orbit particles */}
                  <circle r="3">
                    <animateMotion dur="8s" repeatCount="indefinite" path="M 280,200 A 80,80 0 1,1 120,200 A 80,80 0 1,1 280,200" />
                  </circle>
                  <circle r="3">
                    <animateMotion dur="10s" repeatCount="indefinite" path="M 280,200 A 80,80 0 1,0 120,200 A 80,80 0 1,0 280,200" />
                  </circle>
                </g>
              </svg>

              {/* Floating value cards */}
              {/* Top - Client-Centricity */}
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Priority #1</div>
                <div className="text-sm font-bold text-[#00b5ff]">Client</div>
                <div className="text-xs text-gray-600">Success</div>
              </div>

              {/* Right - Innovation */}
              <div className="absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Continuous</div>
                <div className="text-sm font-bold text-[#00b5ff]">Innovation</div>
              </div>

              {/* Bottom - Integrity */}
              <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Zero</div>
                <div className="text-sm font-bold text-[#00b5ff]">Compromise</div>
              </div>

              {/* Left - Results */}
              <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">100%</div>
                <div className="text-sm font-bold text-[#00b5ff]">Results</div>
                <div className="text-xs text-gray-600">Focused</div>
              </div>

              {/* Center card - Core Values */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] sm:w-[50%] md:w-[45%] max-w-[180px]">
                <div className="bg-white rounded-md sm:rounded-lg shadow-2xl border border-gray-200 p-1.5 sm:p-3 md:p-4">
                  <div className="text-center space-y-0 sm:space-y-0.5 md:space-y-1">
                    <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#00b5ff]">4</div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 font-medium leading-tight">Core Values</div>
                    <div className="text-[7px] sm:text-[9px] md:text-[10px] text-gray-500 leading-tight">United</div>
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
