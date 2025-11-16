"use client";

import { useEffect, useRef } from "react";
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
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Get pillar elements
      const pillars = gsap.utils.toArray<HTMLElement>(".pillar-item");
      const totalPillars = pillars.length;

      if (pillars.length === 0) return;

      // Set initial states
      pillars.forEach((pillar, index) => {
        const content = pillar.querySelector(".pillar-content");
        const image = pillar.querySelector(".pillar-image");

        if (index === 0) {
          gsap.set([content, image], { opacity: 1, x: 0, scale: 1 });
        } else {
          gsap.set(content, { opacity: 0, x: -100 });
          gsap.set(image, { opacity: 0, x: 100, scale: 0.95 });
        }
      });

      // Pin the section - each pillar gets enough time to be visible
      const scrollPerPillar = window.innerHeight * 1.5; // 1.5vh per pillar (enough time to see each)
      const totalScrollDistance = scrollPerPillar * totalPillars;

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top top",
        end: () => `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: true,
        id: "main-pin",
      });

      console.log("Setup complete. Total scroll needed:", totalScrollDistance, "px");

      // Animate each pillar
      pillars.forEach((pillar, index) => {
        const content = pillar.querySelector(".pillar-content");
        const image = pillar.querySelector(".pillar-image");

        const sectionStart = index * scrollPerPillar;
        const sectionEnd = (index + 1) * scrollPerPillar;
        const transitionDuration = scrollPerPillar * 0.2; // 20% of section for transition (faster transitions, more display time)

        console.log(`Pillar ${index}: Start=${sectionStart}px, End=${sectionEnd}px`);

        // Fade in (skip first)
        if (index > 0) {
          ScrollTrigger.create({
            trigger: contentRef.current,
            start: () => `top+=${sectionStart} top`,
            end: () => `top+=${sectionStart + transitionDuration} top`,
            scrub: 1,
            markers: true,
            id: `fade-in-${index}`,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress > 0 && progress < 1) {
                console.log(`Pillar ${index} fading IN: ${(progress * 100).toFixed(1)}%`);
              }
              gsap.set(content, {
                opacity: progress,
                x: -100 * (1 - progress),
              });
              gsap.set(image, {
                opacity: progress,
                x: 100 * (1 - progress),
                scale: 0.95 + (0.05 * progress),
              });
            },
          });
        }

        // Fade out (skip last)
        if (index < totalPillars - 1) {
          ScrollTrigger.create({
            trigger: contentRef.current,
            start: () => `top+=${sectionEnd - transitionDuration} top`,
            end: () => `top+=${sectionEnd} top`,
            scrub: 1,
            markers: true,
            id: `fade-out-${index}`,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress > 0 && progress < 1) {
                console.log(`Pillar ${index} fading OUT: ${(progress * 100).toFixed(1)}%`);
              }
              gsap.set(content, {
                opacity: 1 - progress,
                x: -100 * progress,
              });
              gsap.set(image, {
                opacity: 1 - progress,
                x: 100 * progress,
                scale: 1 - (0.05 * progress),
              });
            },
          });
        }
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
    <section ref={sectionRef} className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
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

        {/* Sticky Scroll Content */}
        <div className="relative w-full">
          <div ref={contentRef} className="relative w-full h-screen flex items-center justify-center">
            <div className="relative w-full h-[600px] max-w-[90vw] mx-auto">

              {/* All pillars stacked absolutely in same position */}
              {pillars.map((pillar) => (
                <div key={pillar.id} className="pillar-item absolute inset-0 w-full h-full">
                  <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Side - Service Title */}
                    <div className="pillar-content relative flex items-center justify-center lg:justify-end">
                      <div className="text-center lg:text-right max-w-lg px-4">
                    {/* ID Badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1e293b] text-white font-bold text-2xl mb-8 shadow-xl">
                      {pillar.id}
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                      {pillar.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#00b5ff] mb-4">
                      {pillar.tagline}
                    </p>

                    {/* Explore Link */}
                    <a
                      href={pillar.href}
                      className="inline-flex items-center gap-3 text-lg font-bold text-[#1e293b] hover:text-[#00b5ff] transition-colors duration-300 group mt-8"
                    >
                      <span>Explore Solution</span>
                      <div className="w-12 h-12 rounded-full bg-[#1e293b] group-hover:bg-[#00b5ff] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>

                    {/* Right Side - Service Image/Description */}
                    <div className="pillar-image relative h-[600px]">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        {/* Image */}
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        {/* Description Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white">
                          {/* Description */}
                          <p className="text-lg lg:text-xl leading-relaxed mb-8">
                            {pillar.description}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {pillar.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            {pillar.stats.map((stat, idx) => (
                              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                <div className="text-3xl lg:text-4xl font-bold mb-1">
                                  {stat.value}
                                </div>
                                <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA - Outside pinned section */}
        <div className="inline-block pt-20">
          <Button
            href="/solutions"
            variant="primary"
            size="md"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
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
