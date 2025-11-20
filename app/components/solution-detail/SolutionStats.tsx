"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface SolutionStatsProps {
  stats: Stat[];
  heading?: string;
  subheading?: string;
}

export default function SolutionStats({
  stats,
  heading = "Proven Results",
  subheading = "Real metrics from businesses using this solution"
}: SolutionStatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.from(rightRef.current, {
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
      const rightChildren = leftRef.current?.children || [];
      gsap.from(rightChildren, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate positions for stats
  const getStatPositions = () => {
    if (stats.length === 4) {
      return [
        { top: '15%', left: '50%', cx: 200, cy: 60 },
        { top: '25%', left: '75%', cx: 299, cy: 101 },
        { top: '85%', left: '50%', cx: 200, cy: 340 },
        { top: '50%', left: '15%', cx: 60, cy: 200 },
      ];
    } else if (stats.length === 3) {
      return [
        { top: '25%', left: '75%', cx: 299, cy: 101 },
        { top: '85%', left: '50%', cx: 200, cy: 340 },
        { top: '50%', left: '15%', cx: 60, cy: 200 },
      ];
    } else if (stats.length === 2) {
      return [
        { top: '25%', left: '75%', cx: 299, cy: 101 },
        { top: '50%', left: '15%', cx: 60, cy: 200 },
      ];
    }
    return [{ top: '50%', left: '50%', cx: 200, cy: 200 }];
  };

  const positions = getStatPositions();

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
              <span className="text-xs font-bold text-white">Performance Metrics</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  {heading}
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {subheading}
            </p>

            {/* Stats List */}
            <div className="space-y-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors">
                    <span className="text-sm font-bold text-[#00b5ff]">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{stat.label}</h3>
                    <p className="text-gray-600 leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicator */}
            <div className="pt-2">
              <p className="text-gray-500 text-sm">
                * Results may vary based on implementation and business context
              </p>
            </div>
          </div>

          {/* Right Side - Clean Grid Visualization */}
          <div ref={leftRef} className="relative order-2">
            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">{stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border-2 border-gray-100 hover:border-[#00b5ff] hover:shadow-2xl transition-all duration-500"
                >
                  {/* Number badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-[#00b5ff] to-[#0088cc] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">0{idx + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <div className="text-5xl font-black text-[#00b5ff] group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 leading-tight">
                      {stat.label}
                    </div>

                    {/* Minimal progress bar */}
                    <div className="pt-2">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00b5ff] to-[#0088cc] rounded-full transition-all duration-1000"
                          style={{ width: `${85 + idx * 3}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
