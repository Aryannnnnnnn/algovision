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
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // Animate pillar cards with explicit initial state
      const cards = gsap.utils.toArray(".pillar-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-bold text-[#0095d9]">Our Core Solutions</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            4 Core Pillars.
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              One Intelligence Layer.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            A unified ecosystem connecting AI, advertising, PR, and performance marketing through one intelligent platform.
          </p>
        </div>

        {/* Simple 2x2 Grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1 - AI Solutions */}
          <div className="pillar-card bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] border border-gray-200 p-8 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-6xl font-bold text-gray-900 opacity-[0.9]">01</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Solutions</h3>
            <p className="text-lg font-semibold text-[#00b5ff] mb-4">Intelligent automation that scales</p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Chatbots, Virtual Assistants, Web VA
            </p>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-gray-900">5+</div>
                <div className="text-xs text-gray-600">AI Systems</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-green-500">24/7</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
            </div>
          </div>

          {/* Card 2 - PR & Communications */}
          <div className="pillar-card bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] border border-gray-200 p-8 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <span className="text-6xl font-bold text-gray-900 opacity-[0.9]">02</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">PR & Communications</h3>
            <p className="text-lg font-semibold text-[#00b5ff] mb-4">Reputation engineered, not managed</p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Crisis Management, Brand Monitoring, SEO 3.0, Media Relations
            </p>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-gray-900">10+</div>
                <div className="text-xs text-gray-600">PR Tools</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-[#00b5ff]">98%</div>
                <div className="text-xs text-gray-600">Coverage</div>
              </div>
            </div>
          </div>

          {/* Card 3 - Omnichannel Advertising */}
          <div className="pillar-card bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] border border-gray-200 p-8 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
              </div>
              <span className="text-6xl font-bold text-gray-900 opacity-[0.9]">03</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Omnichannel Advertising</h3>
            <p className="text-lg font-semibold text-[#00b5ff] mb-4">Every channel, one brain</p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              15 platforms from Google to Bluesky
            </p>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-gray-900">15+</div>
                <div className="text-xs text-gray-600">Platforms</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-[#00b5ff]">95%</div>
                <div className="text-xs text-gray-600">Reach</div>
              </div>
            </div>
          </div>

          {/* Card 4 - Growth & Performance */}
          <div className="pillar-card bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] border border-gray-200 p-8 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-6xl font-bold text-gray-900 opacity-[0.9]">04</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth & Performance</h3>
            <p className="text-lg font-semibold text-[#00b5ff] mb-4">Compounding growth across touchpoints</p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Email, SMS, WhatsApp, LinkedIn, Telegram
            </p>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-gray-900">3.2x</div>
                <div className="text-xs text-gray-600">ROAS</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-xl px-4 py-3 border border-blue-100/50">
                <div className="text-lg font-bold text-[#00b5ff]">5+</div>
                <div className="text-xs text-gray-600">Channels</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="inline-block pt-6">
          <Button
            href="/services"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            View All Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
