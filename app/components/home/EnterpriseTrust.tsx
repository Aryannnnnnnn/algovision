"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EnterpriseTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 75%",
        },
      });

      // Animate metric cards
      const metricCards = gsap.utils.toArray(".metric-card");
      metricCards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.06,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 80%",
            },
          }
        );
      });

      // Animate trust pillars
      const pillars = gsap.utils.toArray(".trust-pillar");
      pillars.forEach((pillar, index) => {
        gsap.fromTo(
          pillar as HTMLElement,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillar as HTMLElement,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const trustPillars = [
    {
      title: "Data Ethics First",
      description: "SOC 2, GDPR compliant, transparent reporting",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      badges: ["SOC 2 Type II", "GDPR", "ISO 27001"],
    },
    {
      title: "Dedicated Intelligence Teams",
      description: "Strategic partners, not order-takers",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      badges: ["5-8 Team Members", "<2hr Response", "24/7 Support"],
    },
    {
      title: "Proven at Scale",
      description: "100+ brands, $50M+ managed, Fortune 500 trusted",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      badges: ["100+ Brands", "$50M+ Managed", "Fortune 500"],
    },
  ];
  const metrics = [
    { label: "Enterprise Brands", value: "100+", trend: "+12", color: "blue" },
    { label: "Ad Spend Managed", value: "$50M+", trend: "+28%", color: "green" },
    { label: "Client Retention", value: "98%", trend: "+5%", color: "purple" },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-[#0a1628] overflow-hidden">

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Enterprise Trust</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 tracking-tight">
            Built for Enterprises
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              That Demand More.
            </span>
          </h3>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Trusted by Fortune 500 companies and scaling enterprises worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 mb-16">
          {/* Left: Interactive Dashboard */}
          <div className="space-y-6 order-2 lg:order-1">
            {trustPillars.map((pillar, index) => (
              <div
                key={index}
                className="trust-pillar group relative  hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#00b5ff] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{pillar.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {pillar.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 bg-[#00b5ff]/20 rounded-full border border-[#00b5ff]/30 text-xs font-semibold text-[#00b5ff]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Trust Pillars */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Metrics Dashboard */}
            <div className="relative bg-gradient-to-br from-[#0a1628] to-[#1e293b] rounded-2xl shadow-xl p-6 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00b5ff] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00b5ff] rounded-full blur-3xl"></div>
              </div>

              <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Live Metrics</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-300">Real-time</span>
                </div>
              </div>

              {/* Interactive Metric Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                {metrics.map((metric, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMetric(idx)}
                    className={`metric-card bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 lg:p-4 text-center transition-all duration-300 border border-white/10 ${
                      activeMetric === idx
                        ? "ring-2 ring-[#00b5ff] shadow-lg scale-105 bg-white/20"
                        : "hover:bg-white/15"
                    }`}
                  >
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00b5ff] mb-1 break-words">{metric.value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-300 font-medium mb-1 sm:mb-2 leading-tight">{metric.label}</div>
                    <div className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold text-green-400">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="whitespace-nowrap">{metric.trend}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Growth Chart */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-200">Growth Trajectory</span>
                  <span className="text-xs text-gray-400">Last 12 Months</span>
                </div>

                <svg className="w-full h-32" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={10 + i * 30}
                      x2="400"
                      y2={10 + i * 30}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Area fill */}
                  <path
                    d="M 0,90 L 50,80 L 100,75 L 150,65 L 200,50 L 250,45 L 300,30 L 350,20 L 400,10 L 400,110 L 0,110 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Main line */}
                  <path
                    d="M 0,90 L 50,80 L 100,75 L 150,65 L 200,50 L 250,45 L 300,30 L 350,20 L 400,10"
                    fill="none"
                    stroke="#00b5ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {[
                    { x: 0, y: 90 },
                    { x: 50, y: 80 },
                    { x: 100, y: 75 },
                    { x: 150, y: 65 },
                    { x: 200, y: 50 },
                    { x: 250, y: 45 },
                    { x: 300, y: 30 },
                    { x: 350, y: 20 },
                    { x: 400, y: 10 },
                  ].map((point, idx) => (
                    <circle
                      key={idx}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#00b5ff"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
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
