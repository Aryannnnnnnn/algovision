"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CorePillarsNew() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pillarsContainer = containerRef.current;
    if (!pillarsContainer) return;

    const pillars = gsap.utils.toArray<HTMLElement>(".pillar-slide");

    // Set initial states
    pillars.forEach((pillar, i) => {
      if (i === 0) {
        gsap.set(pillar, { opacity: 1, zIndex: 1 });
      } else {
        gsap.set(pillar, { opacity: 0, zIndex: 0 });
      }
    });

    // Create timeline - content swaps in place with more scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pillarsContainer,
        start: "top top",
        end: "+=400%", // Longer scroll distance - more time per card
        scrub: 1, // Smoother scroll feel
        pin: true,
        anticipatePin: 1,
        markers: false,
      },
    });

    // Instant swap - no transitions
    pillars.forEach((pillar, i) => {
      if (i === 0) {
        // First pillar - visible then instant hide
        tl.to(pillar, { opacity: 1, duration: 2 }, 0);
        tl.to(pillar, { opacity: 0, duration: 0, zIndex: 0 }, 2);
      } else {
        const startPos = 2 * i;

        // Instant show
        tl.to(pillar, { opacity: 1, zIndex: 1, duration: 0 }, startPos);

        // Hold visible
        tl.to(pillar, { opacity: 1, duration: 2 }, startPos);

        // Instant hide (except last)
        if (i < pillars.length - 1) {
          tl.to(pillar, { opacity: 0, zIndex: 0, duration: 0 }, startPos + 2);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
      href: "/solutions/ai-solutions",
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
      href: "/solutions/pr-communications",
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
      href: "/solutions/advertising",
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
      href: "/solutions/growth-performance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden pb-0">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] border border-gray-100 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] border border-gray-100 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] border border-gray-100 rounded-full"></div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/30 via-white to-white opacity-50"></div>

      {/* Sticky Container with Header and Pillars */}
      <div className="relative">
        <div ref={containerRef} className="relative min-h-[600px]">
          {/* Header Section - Sticky */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm pt-20 sm:pt-24 lg:pt-32 pb-12">
            <div className="relative max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
                  <span className="text-sm font-bold text-[#00b5ff] uppercase tracking-wider">Our Core Solutions</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3">
                  4 Core Pillars
                </h2>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-[#00b5ff] via-[#0099dd] to-[#00b5ff] bg-clip-text text-transparent">
                    One Intelligence Layer
                  </span>
                </h3>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  A unified ecosystem connecting AI, advertising, PR, and performance marketing through one intelligent platform.
                </p>
              </div>
            </div>
          </div>

          {/* Pillars Container */}
          <div className="relative pt-12 pb-0" style={{ minHeight: '650px' }}>
          {pillars.map((pillar, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === pillars.length - 1;

            return (
              <div
                key={pillar.id}
                className="pillar-slide absolute top-0 left-0 right-0 w-full"
                style={{ minHeight: '6500px' }}
              >
                <div className="w-full max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Content - Always on left */}
                    <div className="space-y-3">
                    {/* Category tag with animation */}
                    <div className="inline-block">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-100 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                        <span className="text-xs font-bold text-[#00b5ff] uppercase tracking-widest">SOLUTION</span>
                      </div>
                    </div>

                      {/* Title */}
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                        {pillar.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-600">
                        {pillar.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {pillar.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-blue-50 text-[#00b5ff] rounded-full text-sm font-medium border border-blue-100"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        {pillar.stats.map((stat, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 border border-blue-100">
                            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text text-transparent mb-1">
                              {stat.value}
                            </div>
                            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        <a
                          href={pillar.href}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e293b] hover:bg-[#00b5ff] text-white rounded-full font-semibold text-sm transition-all duration-300 group shadow-md hover:shadow-lg hover:shadow-[#00b5ff]/50"
                        >
                          <span>Explore Solution</span>
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Image - Always on right */}
                    <div className="relative flex items-center justify-center">
                      {/* Rotating platform effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[450px] h-[450px] rounded-full border border-[#00b5ff]/20"></div>
                      </div>

                      {/* Main image container */}
                      <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-[#00b5ff]/20"
                        />
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00b5ff]/20 to-transparent rounded-2xl"></div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom CTA - Only show on last pillar */}
                  {isLast && (
                    <div className="mt-20">
                      <div className="flex justify-start">
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
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
