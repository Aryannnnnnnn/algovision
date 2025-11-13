"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PRStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".stat-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: "98%",
      label: "Media Coverage",
      description: "Average media coverage rate for campaigns",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "< 2hr",
      label: "Crisis Response",
      description: "Average crisis detection and response time",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "24/7",
      label: "Monitoring",
      description: "Always-on brand and reputation tracking",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "500+",
      label: "Media Contacts",
      description: "Journalists and influencers in our network",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "10+",
      label: "PR Tools",
      description: "Integrated PR and communications platforms",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "250%",
      label: "ROI Average",
      description: "Average return on PR investment",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Performance Metrics
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
            Real results from PR campaigns across industries
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative">
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
