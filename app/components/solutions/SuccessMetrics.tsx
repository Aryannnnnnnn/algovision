"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function SuccessMetrics() {
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

  const metrics = [
    {
      value: "3.2x",
      label: "Average ROI",
      description: "Clients achieve 3.2x higher return on investment compared to industry benchmarks through our data-driven optimization."
    },
    {
      value: "180%",
      label: "Revenue Growth",
      description: "Year-over-year revenue increase from integrated multi-channel strategies and AI-powered campaign management."
    },
    {
      value: "42%",
      label: "CAC Reduction",
      description: "Lower customer acquisition costs within 6 months through intelligent budget allocation and audience targeting."
    }
  ];

  const dataPoints = [
    {
      value: "3.2x",
      label: "Average ROI",
      sublabel: "Industry benchmark"
    },
    {
      value: "180%",
      label: "Revenue Growth",
      sublabel: "Year-over-year"
    },
    {
      value: "500+",
      label: "Qualified Leads",
      sublabel: "Monthly average"
    },
    {
      value: "42%",
      label: "CAC Reduction",
      sublabel: "Within 6 months"
    },
    {
      value: "99.2%",
      label: "Client Retention",
      sublabel: "12-month period"
    },
    {
      value: "15+",
      label: "Platforms Integrated",
      sublabel: "Per client average"
    }
  ];

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
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-sm font-bold text-white">Proven Results</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The Numbers{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Speak for Themselves
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Real performance metrics from clients using our solutions across industries. Our data-driven approach delivers measurable, repeatable results.
            </p>

            {/* Metrics Points */}
            <div className="space-y-4 pt-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors">
                    <span className="text-sm font-bold text-[#00b5ff]">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{metric.label}</h3>
                    <p className="text-gray-600 leading-relaxed">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="inline-block pt-6">
              <Button
                href="/resources/case-studies"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                View Case Studies
              </Button>
            </div>
          </div>

          {/* Right Side - Stats Visualization */}
          <div ref={leftRef} className="relative order-2">
            {/* Main visualization container */}
            <div className="relative aspect-square max-w-3xl mx-auto">

              {/* Professional sleek visualization */}
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#00b5ff', stopOpacity: 0.2 }} />
                  </linearGradient>
                  <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00b5ff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0088cc', stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>

                {/* Subtle background grid pattern */}
                <g stroke="#00b5ff" strokeWidth="0.5" opacity="0.03">
                  <circle cx="200" cy="200" r="60" fill="none" />
                  <circle cx="200" cy="200" r="100" fill="none" />
                  <circle cx="200" cy="200" r="140" fill="none" />
                  <circle cx="200" cy="200" r="180" fill="none" />
                </g>

                {/* Main orbital ring */}
                <circle cx="200" cy="200" r="140" fill="none" stroke="#00b5ff" strokeWidth="2" opacity="0.15" />

                {/* Rotating accent rings */}
                <g opacity="0.2">
                  <circle cx="200" cy="200" r="100" fill="none" stroke="#00b5ff" strokeWidth="1.5" strokeDasharray="10,10">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 200 200"
                      to="360 200 200"
                      dur="60s"
                      repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="140" fill="none" stroke="#00b5ff" strokeWidth="1" strokeDasharray="8,8">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="360 200 200"
                      to="0 200 200"
                      dur="80s"
                      repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Center hub */}
                <g>
                  <circle cx="200" cy="200" r="35" fill="#00b5ff" opacity="0.05" />
                  <circle cx="200" cy="200" r="25" fill="#00b5ff" opacity="0.1" />
                  <circle cx="200" cy="200" r="15" fill="url(#nodeGradient)" opacity="0.9" />
                  <circle cx="200" cy="200" r="8" fill="#00b5ff" opacity="1" />
                </g>

                {/* 6 Data nodes positioned around center */}
                <g>
                  {/* Node 1 - Top */}
                  <g>
                    <circle cx="200" cy="60" r="22" fill="#00b5ff" opacity="0.08" />
                    <circle cx="200" cy="60" r="14" fill="url(#nodeGradient)" opacity="0.95" />
                    <circle cx="200" cy="60" r="6" fill="#00b5ff" />
                    <line x1="200" y1="200" x2="200" y2="82" stroke="#00b5ff" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
                    </line>
                  </g>

                  {/* Node 2 - Top Right */}
                  <g>
                    <circle cx="285" cy="115" r="22" fill="#00b5ff" opacity="0.08" />
                    <circle cx="285" cy="115" r="14" fill="url(#nodeGradient)" opacity="0.95" />
                    <circle cx="285" cy="115" r="6" fill="#00b5ff" />
                    <line x1="200" y1="200" x2="270" y2="130" stroke="#00b5ff" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" begin="0.3s" repeatCount="indefinite" />
                    </line>
                  </g>

                  {/* Node 3 - Bottom Right */}
                  <g>
                    <circle cx="285" cy="285" r="22" fill="#00b5ff" opacity="0.08" />
                    <circle cx="285" cy="285" r="14" fill="url(#nodeGradient)" opacity="0.95" />
                    <circle cx="285" cy="285" r="6" fill="#00b5ff" />
                    <line x1="200" y1="200" x2="270" y2="270" stroke="#00b5ff" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" begin="0.6s" repeatCount="indefinite" />
                    </line>
                  </g>

                  {/* Node 4 - Bottom */}
                  <g>
                    <circle cx="200" cy="340" r="22" fill="#00b5ff" opacity="0.08" />
                    <circle cx="200" cy="340" r="14" fill="url(#nodeGradient)" opacity="0.95" />
                    <circle cx="200" cy="340" r="6" fill="#00b5ff" />
                    <line x1="200" y1="200" x2="200" y2="318" stroke="#00b5ff" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" begin="0.9s" repeatCount="indefinite" />
                    </line>
                  </g>

                  {/* Node 5 - Bottom Left */}
                  <g>
                    <circle cx="115" cy="285" r="22" fill="#00b5ff" opacity="0.08" />
                    <circle cx="115" cy="285" r="14" fill="url(#nodeGradient)" opacity="0.95" />
                    <circle cx="115" cy="285" r="6" fill="#00b5ff" />
                    <line x1="200" y1="200" x2="130" y2="270" stroke="#00b5ff" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" begin="1.2s" repeatCount="indefinite" />
                    </line>
                  </g>

                  {/* Node 6 - Top Left */}
                  <g>
                    <circle cx="115" cy="115" r="22" fill="#00b5ff" opacity="0.08" />
                    <circle cx="115" cy="115" r="14" fill="url(#nodeGradient)" opacity="0.95" />
                    <circle cx="115" cy="115" r="6" fill="#00b5ff" />
                    <line x1="200" y1="200" x2="130" y2="130" stroke="#00b5ff" strokeWidth="1.5" opacity="0.2" strokeDasharray="4,4">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" begin="1.5s" repeatCount="indefinite" />
                    </line>
                  </g>
                </g>

                {/* Subtle data flow indicators */}
                <g fill="#00b5ff" opacity="0.4">
                  <circle cx="200" cy="200" r="3">
                    <animate attributeName="cx" values="200;200;200" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;130;60" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="3">
                    <animate attributeName="cx" values="200;242;285" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;158;115" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="3">
                    <animate attributeName="cx" values="200;242;285" dur="3s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;242;285" dur="3s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="1s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="3">
                    <animate attributeName="cx" values="200;200;200" dur="3s" begin="1.5s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;270;340" dur="3s" begin="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="3">
                    <animate attributeName="cx" values="200;158;115" dur="3s" begin="2s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;242;285" dur="3s" begin="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="3">
                    <animate attributeName="cx" values="200;158;115" dur="3s" begin="2.5s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="200;158;115" dur="3s" begin="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="2.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>

              {/* Floating stat cards - 6 data points aligned with nodes */}
              {/* Top - Node at cy="60" which is 15% from top */}
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">{dataPoints[0].label}</div>
                <div className="text-xl font-bold text-[#00b5ff]">{dataPoints[0].value}</div>
                <div className="text-xs text-gray-600">{dataPoints[0].sublabel}</div>
              </div>

              {/* Top Right - Node at cx="285" cy="115" which is 28.75% from left and 28.75% from top */}
              <div className="absolute top-[28.75%] left-[71.25%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{dataPoints[1].value} {dataPoints[1].label}</div>
                    <div className="text-[10px] text-gray-500">{dataPoints[1].sublabel}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Right - Node at cx="285" cy="285" which is 71.25% from left and 71.25% from top */}
              <div className="absolute top-[71.25%] left-[71.25%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">{dataPoints[2].label}</div>
                <div className="text-xl font-bold text-[#00b5ff]">{dataPoints[2].value}</div>
                <div className="text-xs text-gray-600">{dataPoints[2].sublabel}</div>
              </div>

              {/* Bottom - Node at cy="340" which is 85% from top */}
              <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">{dataPoints[3].label}</div>
                <div className="text-xl font-bold text-[#00b5ff]">{dataPoints[3].value}</div>
                <div className="text-xs text-gray-600">{dataPoints[3].sublabel}</div>
              </div>

              {/* Bottom Left - Node at cx="115" cy="285" which is 28.75% from left and 71.25% from top */}
              <div className="absolute top-[71.25%] left-[28.75%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">{dataPoints[4].label}</div>
                <div className="text-xl font-bold text-[#00b5ff]">{dataPoints[4].value}</div>
                <div className="text-xs text-gray-600">{dataPoints[4].sublabel}</div>
              </div>

              {/* Top Left - Node at cx="115" cy="115" which is 28.75% from left and 28.75% from top */}
              <div className="absolute top-[28.75%] left-[28.75%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">{dataPoints[5].label}</div>
                <div className="text-xl font-bold text-[#00b5ff]">{dataPoints[5].value}</div>
                <div className="text-xs text-gray-600">{dataPoints[5].sublabel}</div>
              </div>

              {/* Center stat card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] sm:w-[50%] md:w-[45%] max-w-[180px]">
                <div className="bg-white rounded-md sm:rounded-lg shadow-2xl border border-gray-200 p-1.5 sm:p-3 md:p-4">
                  <div className="text-center space-y-0 sm:space-y-0.5 md:space-y-1">
                    <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#00b5ff]">100+</div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 font-medium leading-tight">Clients Trust Us</div>
                    <div className="text-[7px] sm:text-[9px] md:text-[10px] text-gray-500 leading-tight">6 Industries</div>
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
