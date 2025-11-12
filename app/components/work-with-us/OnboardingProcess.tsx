"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function OnboardingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.3,
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
        duration: 0.3,
        stagger: 0.08,
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
      title: "Discovery Call",
      description: "We start with a free 30-minute call to understand your business goals, current challenges, and growth objectives."
    },
    {
      number: "02",
      title: "Strategy Development",
      description: "Our team creates a custom growth strategy tailored to your business, including channel recommendations and budget allocation."
    },
    {
      number: "03",
      title: "Onboarding & Setup",
      description: "We set up all necessary tools, integrations, and tracking systems. Get access to your dedicated project manager and team."
    },
    {
      number: "04",
      title: "Campaign Launch",
      description: "We launch your campaigns across selected channels with optimized creative, targeting, and budget distribution."
    },
    {
      number: "05",
      title: "Optimization & Scale",
      description: "Continuous monitoring, A/B testing, and data-driven optimization to maximize ROI and scale what works."
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
              From Discovery to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Growth
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              A systematic approach that turns your business challenges into measurable growth through strategic planning and continuous optimization.
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
                href="/connect/book-call"
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

                {/* Step 3 - Setup */}
                <g filter="url(#glow)">
                  <circle cx="200" cy="200" r="35" fill="url(#nodeGradient)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="0.8s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">03</text>
                  <text x="200" y="210" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Setup</text>
                </g>

                {/* Step 4 - Launch */}
                <g filter="url(#glow)">
                  <circle cx="120" cy="260" r="35" fill="url(#nodeGradient)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="1.2s" repeatCount="indefinite" />
                  </circle>
                  <text x="120" y="255" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">04</text>
                  <text x="120" y="270" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Launch</text>
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

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
