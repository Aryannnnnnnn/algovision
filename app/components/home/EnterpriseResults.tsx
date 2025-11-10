"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 0,
    industry: "Healthcare Technology",
    company: "MediCore Solutions",
    challenge: "Legacy marketing unable to scale with rapid product expansion",
    results: [
      { value: 425, label: "% ROI Increase", suffix: "%" },
      { value: 2.1, label: "M Revenue Growth", suffix: "M", prefix: "$" },
      { value: 36, label: "hrs Launch Time", suffix: "hrs" },
    ],
  },
  {
    id: 1,
    industry: "Financial Services",
    company: "Quantum Capital",
    challenge: "Brand reputation crisis following regulatory scrutiny",
    results: [
      { value: 280, label: "% Positive Sentiment", suffix: "%" },
      { value: 94, label: "% Media Coverage", suffix: "%" },
      { value: 18, label: "hrs Response Time", suffix: "hrs" },
    ],
  },
  {
    id: 2,
    industry: "Enterprise SaaS",
    company: "DataFlow Systems",
    challenge: "Stagnant growth with $800K monthly ad spend",
    results: [
      { value: 340, label: "% ROI Improvement", suffix: "%" },
      { value: 4.2, label: "M Monthly Revenue", suffix: "M", prefix: "$" },
      { value: 52, label: "% Cost Reduction", suffix: "%" },
    ],
  },
];

export default function EnterpriseResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);

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

  // Animate stat values when case changes
  useEffect(() => {
    const currentResults = caseStudies[activeCase].results;

    currentResults.forEach((result, index) => {
      const startTime = Date.now();
      const duration = 1500;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = result.value * easeOutQuart;

        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = current;
          return newValues;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  }, [activeCase]);

  const currentCase = caseStudies[activeCase];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-white overflow-hidden">
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
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">

          {/* Left Side - Text Content */}
          <div ref={rightRef} className="order-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-[#00b5ff]/30 rounded-full shadow-lg shadow-[#00b5ff]/20">
              <svg className="w-4 h-4 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-bold text-[#0095d9]">Proven Performance</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Enterprise Results,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Engineered
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Real outcomes from organizations that demand measurable performance and enterprise-grade execution.
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-1">312%</div>
                <div className="text-xs text-gray-600 font-medium">Avg ROI</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="text-3xl font-bold text-[#00b5ff] mb-1">$3M+</div>
                <div className="text-xs text-gray-600 font-medium">Ad Spend</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-1">48hrs</div>
                <div className="text-xs text-gray-600 font-medium">Launch</div>
              </div>
            </div>

            {/* Featured Case Studies Section */}
            <div className="pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Featured Case Studies</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Previous case"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveCase((prev) => (prev + 1) % caseStudies.length)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Next case"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Case Study Card */}
              <div className="bg-gradient-to-br from-[#E8F4FE]/80 via-[#F5F3FF]/80 to-[#E8F4FE]/80 rounded-2xl border border-blue-100/50 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{currentCase.industry}</div>
                    <div className="text-lg font-bold text-gray-900">{currentCase.company}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Challenge</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{currentCase.challenge}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {currentCase.results.map((result, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <div className="text-2xl font-bold text-[#00b5ff] mb-1">
                          {result.prefix}{Math.round(animatedValues[idx])}{result.suffix}
                        </div>
                        <div className="text-[10px] text-gray-600 font-medium leading-tight">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-1.5 mt-5">
                  {caseStudies.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCase(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeCase === idx ? "w-6 bg-[#00b5ff]" : "w-1.5 bg-gray-400"
                      }`}
                      aria-label={`Go to case ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="inline-block pt-6">
              <Button
                href="/case-studies"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                View All Case Studies
              </Button>
            </div>
          </div>

          {/* Right Side - SVG Visualization */}
          <div ref={leftRef} className="relative order-2">
            <div className="relative aspect-square w-full max-w-3xl lg:mx-0 pr-8 sm:pr-12 lg:pr-0">

              {/* Background SVG visualization */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.15 }} />
                    <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0.05 }} />
                  </linearGradient>
                  <radialGradient id="centerGlow">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0 }} />
                  </radialGradient>
                </defs>

                {/* Center glow */}
                <circle cx="200" cy="200" r="120" fill="url(#centerGlow)" />

                {/* Connecting lines */}
                <g stroke="#00b5ff" strokeWidth="1" opacity="0.15">
                  <line x1="200" y1="200" x2="200" y2="80" />
                  <line x1="200" y1="200" x2="360" y2="200" className="lg:hidden" />
                  <line x1="200" y1="200" x2="320" y2="200" className="hidden lg:block" />
                  <line x1="200" y1="200" x2="200" y2="320" />
                </g>

                {/* Stat nodes with pulsing effect */}
                <g>
                  {/* Top node */}
                  <circle cx="200" cy="80" r="20" fill="url(#statGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.5" />
                  <circle cx="200" cy="80" r="12" fill="#00b5ff" opacity="0.8">
                    <animate attributeName="r" values="12;15;12" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Right node - mobile version at 360 (even longer) */}
                  <circle cx="360" cy="200" r="20" fill="url(#statGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.5" className="lg:hidden" />
                  <circle cx="360" cy="200" r="12" fill="#00b5ff" opacity="0.8" className="lg:hidden">
                    <animate attributeName="r" values="12;15;12" dur="3s" begin="1s" repeatCount="indefinite" />
                  </circle>

                  {/* Right node - desktop version at 320 */}
                  <circle cx="320" cy="200" r="20" fill="url(#statGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.5" className="hidden lg:block" />
                  <circle cx="320" cy="200" r="12" fill="#00b5ff" opacity="0.8" className="hidden lg:block">
                    <animate attributeName="r" values="12;15;12" dur="3s" begin="1s" repeatCount="indefinite" />
                  </circle>

                  {/* Bottom node */}
                  <circle cx="200" cy="320" r="20" fill="url(#statGradient)" stroke="#00b5ff" strokeWidth="2" opacity="0.5" />
                  <circle cx="200" cy="320" r="12" fill="#00b5ff" opacity="0.8">
                    <animate attributeName="r" values="12;15;12" dur="3s" begin="2s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Data flow particles */}
                <g fill="#00b5ff" opacity="0.4">
                  <circle cx="200" cy="140" r="3">
                    <animate attributeName="cy" values="200;80;200" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="260" cy="200" r="3">
                    <animate attributeName="cx" values="200;320;200" dur="4s" begin="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="4s" begin="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="260" r="3">
                    <animate attributeName="cy" values="200;320;200" dur="4s" begin="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="4s" begin="3s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>

              {/* Floating stat cards */}
              {/* Top stat */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-2 lg:p-3 border border-gray-200 min-w-[100px] lg:min-w-[120px]">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-[#00b5ff] mb-0.5">
                    {currentCase.results[0].prefix}{Math.round(animatedValues[0])}{currentCase.results[0].suffix}
                  </div>
                  <div className="text-[10px] lg:text-[11px] text-gray-600 font-medium leading-tight">{currentCase.results[0].label}</div>
                </div>
              </div>

              {/* Right stat */}
              <div className="absolute top-[50%] left-[90%] lg:left-[80%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-2 lg:p-3 border border-gray-200 min-w-[100px] lg:min-w-[120px]">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-[#00b5ff] mb-0.5">
                    {currentCase.results[1].prefix}{animatedValues[1].toFixed(currentCase.results[1].value < 10 ? 1 : 0)}{currentCase.results[1].suffix}
                  </div>
                  <div className="text-[10px] lg:text-[11px] text-gray-600 font-medium leading-tight">{currentCase.results[1].label}</div>
                </div>
              </div>

              {/* Bottom stat */}
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-2 lg:p-3 border border-gray-200 min-w-[100px] lg:min-w-[120px]">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-[#00b5ff] mb-0.5">
                    {currentCase.results[2].prefix}{Math.round(animatedValues[2])}{currentCase.results[2].suffix}
                  </div>
                  <div className="text-[10px] lg:text-[11px] text-gray-600 font-medium leading-tight">{currentCase.results[2].label}</div>
                </div>
              </div>

              {/* Center company badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] lg:w-[40%] max-w-[180px]">
                <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-2.5 lg:p-3">
                  <div className="text-center">
                    <div className="text-[10px] lg:text-[11px] text-gray-500 mb-1">{currentCase.industry}</div>
                    <div className="text-xs lg:text-sm font-bold text-gray-900 leading-tight">{currentCase.company}</div>
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
