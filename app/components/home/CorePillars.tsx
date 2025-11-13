"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CorePillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Animate pillar cards
      const cards = gsap.utils.toArray(".pillar-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      id: "01",
      title: "AI Solutions",
      tagline: "Intelligent automation that scales",
      description: "Advanced AI systems that work 24/7 to automate customer interactions and drive engagement.",
      features: ["Chatbots", "Virtual Assistants", "Web VA"],
      stats: [
        { value: "5+", label: "AI Systems" },
        { value: "24/7", label: "Active" },
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: "/solutions/ai-solutions",
      gradient: "from-blue-500/10 to-cyan-500/10",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    },
    {
      id: "02",
      title: "PR & Communications",
      tagline: "Reputation engineered, not managed",
      description: "Strategic public relations that builds trust, manages crises, and amplifies your brand voice.",
      features: ["Crisis Management", "Brand Monitoring", "SEO 3.0", "Media Relations"],
      stats: [
        { value: "10+", label: "PR Tools" },
        { value: "98%", label: "Coverage" },
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      href: "/solutions/pr-communications",
      gradient: "from-purple-500/10 to-pink-500/10",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    },
    {
      id: "03",
      title: "Omnichannel Advertising",
      tagline: "Every channel, one brain",
      description: "Unified advertising strategy across 15+ platforms, orchestrated by intelligent automation.",
      features: ["Google Ads", "Meta", "TikTok", "LinkedIn", "15+ Platforms"],
      stats: [
        { value: "15+", label: "Platforms" },
        { value: "95%", label: "Reach" },
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      ),
      href: "/solutions/advertising",
      gradient: "from-orange-500/10 to-red-500/10",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    },
    {
      id: "04",
      title: "Growth & Performance",
      tagline: "Compounding growth across touchpoints",
      description: "Multi-channel growth marketing that drives measurable results across every customer touchpoint.",
      features: ["Email", "SMS", "WhatsApp", "LinkedIn", "Telegram"],
      stats: [
        { value: "3.2x", label: "ROAS" },
        { value: "5+", label: "Channels" },
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      href: "/solutions/growth-performance",
      gradient: "from-green-500/10 to-emerald-500/10",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00b5ff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div> */}

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      <div className="relative max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headingRef} className="mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Our Core Solutions</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-4">
            4 Core Pillars
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-[#00b5ff] via-[#0099dd] to-[#00b5ff] bg-clip-text text-transparent">
              One Intelligence Layer
            </span>
          </h3>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl">
            A unified ecosystem connecting AI, advertising, PR, and performance marketing through one intelligent platform.
          </p>
        </div>

        {/* Pillars Grid */}
        <div ref={contentRef} className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {pillars.map((pillar, index) => (
              <a
                key={pillar.id}
                href={pillar.href}
                className="pillar-card group relative bg-blue-50/30 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-36 sm:h-40 xl:h-40 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-4 sm:p-5 xl:p-6 bg-blue-50 flex-1 flex flex-col">

                {/* Title & Tagline */}
                <h3 className="text-lg sm:text-xl xl:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#00b5ff] transition-colors duration-300 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm xl:text-xs font-semibold text-[#00b5ff] mb-2 sm:mb-3">
                  {pillar.tagline}
                </p>
                <p className="text-xs sm:text-sm xl:text-xs text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  {pillar.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                  {pillar.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-100 group-hover:bg-white rounded-full text-[9px] sm:text-[10px] font-semibold text-gray-700 border border-gray-200 group-hover:border-[#00b5ff]/30 transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100 group-hover:border-[#00b5ff]/20 transition-colors duration-300 mb-3 sm:mb-4">
                  {pillar.stats.map((stat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-2 sm:p-3 xl:p-2 border border-gray-200 group-hover:border-[#00b5ff]/30 group-hover:shadow-md transition-all duration-300">
                      <div className="text-lg sm:text-xl xl:text-base font-bold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300 mb-0.5 leading-tight">
                        {stat.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] xl:text-[8px] font-semibold text-gray-600 uppercase tracking-wider leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 group-hover:border-[#00b5ff]/20 transition-colors duration-300 mt-auto">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-700 group-hover:text-[#00b5ff] transition-colors duration-300 uppercase tracking-wide">
                    Explore Solution
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e293b] group-hover:bg-[#00b5ff] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="inline-block pt-8">
          <Button
            href="/solutions"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Explore All Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
