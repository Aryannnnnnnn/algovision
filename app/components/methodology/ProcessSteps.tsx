"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSteps() {
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

  const steps = [
    {
      number: "01",
      title: "Discovery & Audit",
      description: "We dive deep into your business goals, current marketing efforts, and competitive environment. Our comprehensive audit identifies gaps, opportunities, and quick wins."
    },
    {
      number: "02",
      title: "Strategy Development",
      description: "Based on insights from discovery, we craft a customized marketing strategy aligned with your business objectives, complete with KPIs, budgets, and timelines."
    },
    {
      number: "03",
      title: "Implementation",
      description: "Our team executes the plan with precision—setting up campaigns, integrating tools, creating content, and launching initiatives across all chosen channels."
    },
    {
      number: "04",
      title: "Optimization",
      description: "We monitor performance daily, running A/B tests, adjusting bids, refining targeting, and reallocating budget to maximize ROI across every touchpoint."
    },
    {
      number: "05",
      title: "Scale & Growth",
      description: "Once we've found winning formulas, we scale successful campaigns, expand to new channels, and explore additional growth opportunities."
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
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left Side - Content */}
          <div ref={rightRef} className="order-1 space-y-4 md:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-sm font-bold text-white">5-Step Process</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              From Insight to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Impact
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              A systematic approach that turns marketing challenges into measurable growth through strategic planning and continuous optimization.
            </p>

            {/* Process Steps */}
            <div className="space-y-4 pt-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors">
                    <span className="text-sm font-bold text-[#00b5ff]">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="inline-block pt-6">
              <Button
                href="/company/contact"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Start Your Journey
              </Button>
            </div>
          </div>

          {/* Right Side - Visual Representation */}
          <div ref={leftRef} className="relative order-2">
            {/* Main visualization container */}
            <div className="relative w-full max-w-3xl mx-auto" style={{ paddingBottom: '110%' }}>

              {/* Spiral/Helix visualization with floating nodes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#00d4ff', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#0099dd', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0099dd', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <radialGradient id="pulseGradient">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0 }} />
                  </radialGradient>
                </defs>

                {/* Animated spiral path */}
                <path
                  d="M 200 40 Q 300 80 280 140 Q 260 200 200 200 Q 140 200 120 260 Q 100 320 200 350"
                  stroke="url(#spiralGradient)"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.4"
                  strokeDasharray="10,5"
                >
                  <animate attributeName="stroke-dashoffset" values="0;-15" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Energy rings around the path */}
                <g opacity="0.2">
                  <circle cx="200" cy="40" r="20" fill="none" stroke="#00b5ff" strokeWidth="2">
                    <animate attributeName="r" values="20;35;20" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="280" cy="140" r="20" fill="none" stroke="#00b5ff" strokeWidth="2">
                    <animate attributeName="r" values="20;35;20" dur="3s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="0.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="20" fill="none" stroke="#00b5ff" strokeWidth="2">
                    <animate attributeName="r" values="20;35;20" dur="3s" begin="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="120" cy="260" r="20" fill="none" stroke="#00b5ff" strokeWidth="2">
                    <animate attributeName="r" values="20;35;20" dur="3s" begin="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="350" r="20" fill="none" stroke="#00b5ff" strokeWidth="2">
                    <animate attributeName="r" values="20;35;20" dur="3s" begin="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="2.4s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Step nodes with numbers */}
                {/* Step 1 - Discovery */}
                <g filter="url(#glow)">
                  <circle cx="200" cy="40" r="35" fill="url(#nodeGradient)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">01</text>
                  <text x="200" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Discover</text>
                </g>

                {/* Step 2 - Strategy */}
                <g filter="url(#glow)">
                  <circle cx="280" cy="140" r="35" fill="url(#nodeGradient)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                  <text x="280" y="135" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">02</text>
                  <text x="280" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Strategy</text>
                </g>

                {/* Step 3 - Implementation */}
                <g filter="url(#glow)">
                  <circle cx="200" cy="200" r="35" fill="url(#nodeGradient)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="0.8s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">03</text>
                  <text x="200" y="210" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Launch</text>
                </g>

                {/* Step 4 - Optimization */}
                <g filter="url(#glow)">
                  <circle cx="120" cy="260" r="35" fill="url(#nodeGradient)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="1.2s" repeatCount="indefinite" />
                  </circle>
                  <text x="120" y="255" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">04</text>
                  <text x="120" y="270" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Optimize</text>
                </g>

                {/* Step 5 - Scale (larger, emphasized) */}
                <g filter="url(#glow)">
                  <circle cx="200" cy="350" r="45" fill="url(#nodeGradient)" opacity="1">
                    <animate attributeName="opacity" values="1;0.9;1" dur="2s" begin="1.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="350" r="50" fill="none" stroke="#00b5ff" strokeWidth="2" opacity="0.5">
                    <animate attributeName="r" values="50;60;50" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="343" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">05</text>
                  <text x="200" y="361" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Scale</text>
                </g>

                {/* Flowing particles along the path */}
                <g fill="#00b5ff">
                  {[0, 1, 2, 3].map((i) => (
                    <circle key={i} r="3" opacity="0.8">
                      <animateMotion
                        dur="8s"
                        begin={`${i * 2}s`}
                        repeatCount="indefinite"
                        path="M 200 40 Q 300 80 280 140 Q 260 200 200 200 Q 140 200 120 260 Q 100 320 200 350"
                      />
                      <animate attributeName="opacity" values="0;0.8;0.8;0.8;0" dur="8s" begin={`${i * 2}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </g>

                {/* Central glow effect */}
                <circle cx="200" cy="200" r="80" fill="url(#pulseGradient)" opacity="0.3">
                  <animate attributeName="r" values="80;100;80" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Floating metric cards */}
              {/* Top - Active (aligned with Discovery node at top - centered at 10% where node is) */}
              <div className="absolute top-[13%] md:top-[22%] lg:top-[13%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:rounded-xl shadow-md md:shadow-xl p-1.5 md:p-2.5 lg:p-3 border md:border-2 border-[#00b5ff]/30 z-10">
                <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] md:text-[10px] lg:text-xs font-bold text-gray-700">Active</span>
                </div>
              </div>

              {/* Right - Timeline (aligned with Strategy node on right - centered at 35% where node is) */}
              <div className="absolute top-[35%] md:top-[39%] lg:top-[36%] left-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-blue-50 rounded-lg md:rounded-xl shadow-md md:shadow-xl p-2 md:p-3 lg:p-4 border md:border-2 border-[#00b5ff]/30 z-10">
                <div className="text-[8px] md:text-[10px] lg:text-xs text-gray-500 mb-0.5 md:mb-0.5 lg:mb-1 font-semibold">Timeline</div>
                <div className="text-sm md:text-xl lg:text-2xl font-black text-[#00b5ff]">2-4</div>
                <div className="text-[8px] md:text-[10px] lg:text-xs text-gray-600 font-medium">Weeks</div>
              </div>

              {/* Left - Tests (aligned with Optimize node on left - centered at 65% where node is) */}
              <div className="absolute top-[65%] md:top-[61%] lg:top-[64%] left-[30%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-blue-50 rounded-lg md:rounded-xl shadow-md md:shadow-xl p-2 md:p-3 lg:p-4 border md:border-2 border-[#00b5ff]/30 z-10">
                <div className="text-[8px] md:text-[10px] lg:text-xs text-gray-500 mb-0.5 md:mb-0.5 lg:mb-1 font-semibold">Tests</div>
                <div className="text-sm md:text-xl lg:text-2xl font-black text-[#00b5ff]">50+</div>
                <div className="text-[8px] md:text-[10px] lg:text-xs text-gray-600 font-medium">/Month</div>
              </div>

              {/* Bottom Center - Scale (Emphasized) - On top of Scale node - centered at 87.5% where node is */}
              <div className="absolute top-[84.5%] md:top-[78%] lg:top-[84.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-lg md:rounded-xl shadow-lg md:shadow-2xl p-2 md:p-4 lg:p-5 border md:border-2 border-white z-10">
                <div className="text-center">
                  <div className="text-[7px] md:text-[10px] lg:text-xs text-white/80 mb-0.5 md:mb-0.5 lg:mb-1 font-bold uppercase tracking-wider">Average Result</div>
                  <div className="text-base md:text-2xl lg:text-3xl font-black text-white mb-0.5 md:mb-0.5 lg:mb-1">3x Growth</div>
                  <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-1 justify-center">
                    <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[7px] md:text-[10px] lg:text-xs text-white font-semibold">Year over Year</span>
                  </div>
                </div>
              </div>

              {/* Additional floating metric - Channels - On top of center Launch node */}
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-md md:rounded-lg shadow-sm md:shadow-lg p-1.5 md:p-2.5 lg:p-3 border border-gray-200 z-10">
                <div className="text-center">
                  <div className="text-sm md:text-lg lg:text-xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text">15+</div>
                  <div className="text-[8px] md:text-[10px] lg:text-xs text-gray-600 font-semibold">Channels</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
