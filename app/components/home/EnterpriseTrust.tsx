"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as SimpleIcons from "simple-icons";

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
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // Animate metric cards
      const metricCards = gsap.utils.toArray(".metric-card");
      metricCards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
            },
          }
        );
      });

      // Animate trust pillars
      const pillars = gsap.utils.toArray(".trust-pillar");
      pillars.forEach((pillar, index) => {
        gsap.fromTo(
          pillar as HTMLElement,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillar as HTMLElement,
              start: "top 85%",
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

  const clients = [
    { name: "Google", icon: "google", color: "#4285F4" },
    { name: "Meta", icon: "meta", color: "#0668E1" },
    { name: "Apple", icon: "apple", color: "#000000" },
    { name: "Netflix", icon: "netflix", color: "#E50914" },
    { name: "Salesforce", icon: "salesforce", color: "#00A1E0" },
    { name: "Tesla", icon: "tesla", color: "#CC0000" },
    { name: "Uber", icon: "uber", color: "#000000" },
    { name: "Spotify", icon: "spotify", color: "#1DB954" },
    { name: "Airbnb", icon: "airbnb", color: "#FF5A5F" },
    { name: "Slack", icon: "slack", color: "#4A154B" },
    { name: "YouTube", icon: "youtube", color: "#FF0000" },
    { name: "Instagram", icon: "instagram", color: "#E4405F" },
    { name: "TikTok", icon: "tiktok", color: "#000000" },
    { name: "Samsung", icon: "samsung", color: "#1428A0" },
    { name: "Intel", icon: "intel", color: "#0071C5" },
    { name: "NVIDIA", icon: "nvidia", color: "#76B900" },
  ];

  const metrics = [
    { label: "Enterprise Brands", value: "100+", trend: "+12", color: "blue" },
    { label: "Ad Spend Managed", value: "$50M+", trend: "+28%", color: "green" },
    { label: "Client Retention", value: "98%", trend: "+5%", color: "purple" },
  ];

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
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-[#00b5ff]/30 rounded-full mb-8 shadow-lg shadow-[#00b5ff]/20">
            <svg className="w-4 h-4 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-bold text-[#0095d9]">Enterprise Trust</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            Built for Enterprises
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              That Demand More.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Trusted by Fortune 500 companies and scaling enterprises worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 mb-16">
          {/* Left: Interactive Dashboard */}
          <div className="space-y-6 order-2 lg:order-1">
            {trustPillars.map((pillar, index) => (
              <div
                key={index}
                className="trust-pillar group relative bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-500 border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#00b5ff] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{pillar.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {pillar.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-full border border-blue-100/50 text-xs font-semibold text-[#00b5ff]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00b5ff]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Right: Trust Pillars */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Metrics Dashboard */}
            <div className="bg-gradient-to-br from-[#E8F4FE] via-[#F5F3FF] to-[#E8F4FE] rounded-2xl shadow-xl border border-blue-100/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Live Metrics</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-600">Real-time</span>
                </div>
              </div>

              {/* Interactive Metric Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {metrics.map((metric, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMetric(idx)}
                    className={`metric-card bg-white rounded-xl p-4 text-center transition-all duration-300 ${
                      activeMetric === idx
                        ? "ring-2 ring-[#00b5ff] shadow-lg scale-105"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="text-2xl font-bold text-[#00b5ff] mb-1">{metric.value}</div>
                    <div className="text-xs text-gray-600 font-medium mb-2">{metric.label}</div>
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-green-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {metric.trend}
                    </div>
                  </button>
                ))}
              </div>

              {/* Growth Chart */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-700">Growth Trajectory</span>
                  <span className="text-xs text-gray-500">Last 12 Months</span>
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

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Full-Width Scrolling Logos Section */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mt-20">
          <div className="text-center mb-8">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Trusted By Leading Enterprises
            </h3>
          </div>

          {/* Scrolling Logo Strip */}
          <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 py-8">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <div className="flex gap-16 animate-scroll" style={{ width: 'max-content' }}>
              {/* Render logos multiple times for seamless infinite scroll */}
              {[...Array(6)].map((_, setIndex) => (
                clients.map((client, index) => {
                  const iconData = SimpleIcons[`si${client.icon.charAt(0).toUpperCase() + client.icon.slice(1)}` as keyof typeof SimpleIcons];
                  const hasPath = iconData && typeof iconData === 'object' && 'path' in iconData;
                  return (
                    <div
                      key={`set${setIndex}-${index}`}
                      className="flex-shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      {hasPath && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-20 h-20"
                          fill={client.color}
                        >
                          <title>{client.name}</title>
                          <path d={(iconData as any).path} />
                        </svg>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-full border border-blue-100/50">
              <svg className="w-4 h-4 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-xs font-semibold text-gray-600">+92 More Fortune 500s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
