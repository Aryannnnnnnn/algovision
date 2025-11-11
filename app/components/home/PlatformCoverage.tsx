"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function PlatformCoverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "advertising" | "communication">("all");

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

      // Animate category cards
      const cards = gsap.utils.toArray(".category-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const platformCategories = {
    advertising: {
      title: "Advertising Platforms",
      description: "Omnichannel ad management across all major networks",
      platforms: [
        { name: "Google Ads", color: "bg-blue-500" },
        { name: "Meta Ads", color: "bg-blue-600" },
        { name: "LinkedIn", color: "bg-blue-700" },
        { name: "Twitter/X", color: "bg-gray-900" },
        { name: "TikTok", color: "bg-gray-900" },
        { name: "Pinterest", color: "bg-red-600" },
        { name: "Snapchat", color: "bg-yellow-400" },
        { name: "YouTube", color: "bg-red-600" },
        { name: "Bluesky", color: "bg-blue-400" },
        { name: "Reddit", color: "bg-orange-600" },
      ],
      stat: "10+",
      statLabel: "Networks",
    },
    communication: {
      title: "Communication Channels",
      description: "Direct customer engagement across messaging platforms",
      platforms: [
        { name: "Email", color: "bg-gray-700" },
        { name: "SMS", color: "bg-green-600" },
        { name: "WhatsApp", color: "bg-green-500" },
        { name: "Telegram", color: "bg-blue-500" },
        { name: "Slack", color: "bg-purple-600" },
        { name: "MS Teams", color: "bg-blue-600" },
      ],
      stat: "6+",
      statLabel: "Channels",
    },
  };

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
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Platform Coverage</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            Every Channel That Matters.
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              One Command Center.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            From Google to Bluesky, email to WhatsApp—we're platform-agnostic and results-obsessed.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Advertising Platforms Card */}
          <div className="category-card group relative bg-white rounded-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-[#1e293b]">
            {/* Header */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#00b5ff] flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#00b5ff]">{platformCategories.advertising.stat}</div>
                  <div className="text-sm text-gray-600">{platformCategories.advertising.statLabel}</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{platformCategories.advertising.title}</h3>
              <p className="text-gray-600">{platformCategories.advertising.description}</p>
            </div>

            {/* Platform Pills */}
            <div className="p-8">
              <div className="flex flex-wrap gap-3">
                {platformCategories.advertising.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-full border border-blue-100/50 transition-all duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                    <span className="text-sm font-semibold text-gray-700">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Communication Channels Card */}
          <div className="category-card group relative bg-white rounded-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-[#1e293b]">
            {/* Header */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#00b5ff] flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#00b5ff]">{platformCategories.communication.stat}</div>
                  <div className="text-sm text-gray-600">{platformCategories.communication.statLabel}</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{platformCategories.communication.title}</h3>
              <p className="text-gray-600">{platformCategories.communication.description}</p>
            </div>

            {/* Platform Pills */}
            <div className="p-8">
              <div className="flex flex-wrap gap-3">
                {platformCategories.communication.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#E8F4FE]/60 to-[#F5F3FF]/60 rounded-full border border-blue-100/50 transition-all duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                    <span className="text-sm font-semibold text-gray-700">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Banner */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#00b5ff] mb-2">15+</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Total Platforms</div>
              <div className="text-xs text-gray-600">Unified integration</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00b5ff] mb-2">1</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Command Center</div>
              <div className="text-xs text-gray-600">Single dashboard control</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00b5ff] mb-2">100%</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Platform Agnostic</div>
              <div className="text-xs text-gray-600">Results-obsessed approach</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="inline-block">
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
