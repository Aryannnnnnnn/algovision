"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
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
            force3D: true,
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const platforms = [
    { name: "Google Ads", icon: "google", logo: "https://img.icons8.com/color/96/google-logo.png" },
    { name: "YouTube", icon: "youtube", logo: "https://img.icons8.com/color/96/youtube-play.png" },
    { name: "Meta", icon: "meta", logo: "https://img.icons8.com/color/96/meta.png" },
    { name: "Instagram", icon: "instagram", logo: "https://img.icons8.com/color/96/instagram-new.png" },
    { name: "Reddit", icon: "reddit", logo: "https://img.icons8.com/color/96/reddit.png" },
    { name: "TikTok", icon: "tiktok", logo: "https://img.icons8.com/color/96/tiktok--v1.png" },
    { name: "Snapchat", icon: "snapchat", logo: "https://img.icons8.com/color/96/snapchat.png" },
    { name: "LinkedIn", icon: "linkedin", logo: "https://img.icons8.com/color/96/linkedin.png" },
    { name: "X", icon: "x", logo: "https://img.icons8.com/color/96/twitterx.png" },
    { name: "Twitter", icon: "twitter", logo: "https://img.icons8.com/color/96/twitter--v1.png" },
    { name: "Bing", icon: "microsoftbing", logo: "https://img.icons8.com/color/96/bing.png" },
    { name: "Yahoo", icon: "yahoo", logo: "https://img.icons8.com/color/96/yahoo.png" },
    { name: "Twitch", icon: "twitch", logo: "https://img.icons8.com/color/96/twitch--v1.png" },
    { name: "Spotify", icon: "spotify", logo: "https://img.icons8.com/color/96/spotify.png" },
    { name: "Discord", icon: "discord", logo: "https://img.icons8.com/color/96/discord-logo.png" },
    { name: "Slack", icon: "slack", logo: "https://img.icons8.com/color/96/slack-new.png" },
    { name: "WhatsApp", icon: "whatsapp", logo: "https://img.icons8.com/color/96/whatsapp.png" },
    { name: "Telegram", icon: "telegram", logo: "https://img.icons8.com/color/96/telegram-app.png" },
    { name: "Email", icon: "gmail", logo: "https://img.icons8.com/color/96/gmail-new.png" },
    { name: "SMS", icon: "messenger", logo: "https://img.icons8.com/color/96/facebook-messenger.png" },
    { name: "Pinterest", icon: "pinterest", logo: "https://img.icons8.com/color/96/pinterest--v1.png" },
  ];

  // Split platforms into 3 rows (7, 7, 7)
  const row1 = platforms.slice(0, 7);
  const row2 = platforms.slice(7, 14);
  const row3 = platforms.slice(14, 21); // Now includes Pinterest as the 7th item

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

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Marketing Platforms</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            A service built on platform intelligence
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              and seamless execution
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            Our operations layer connects directly to your existing marketing and data infrastructure.
          </p>
        </div>
      </div>

      {/* 3-Row Zigzag Infinite Sliding Platform Logos */}
      <div className="relative mb-16 w-[95vw] mx-auto">
        <div className="relative overflow-hidden py-8 space-y-6">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Row 1 */}
          <div className="flex gap-20 animate-scroll" style={{ width: 'max-content' }}>
            {[...Array(4)].map((_, setIndex) => (
              row1.map((platform, index) => (
                <div
                  key={`row1-${setIndex}-${index}`}
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-110"
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))
            ))}
          </div>

          {/* Row 2 - Offset position for zigzag */}
          <div className="flex gap-20 animate-scroll" style={{ width: 'max-content', marginLeft: '46px' }}>
            {[...Array(4)].map((_, setIndex) => (
              row2.map((platform, index) => (
                <div
                  key={`row2-${setIndex}-${index}`}
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-110"
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))
            ))}
          </div>

          {/* Row 3 - Offset position for zigzag */}
          <div className="flex gap-20 animate-scroll" style={{ width: 'max-content', marginLeft: '0px' }}>
            {[...Array(4)].map((_, setIndex) => (
              row3.map((platform, index) => (
                <div
                  key={`row3-${setIndex}-${index}`}
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-110"
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 80s linear infinite;
          }
        `}</style>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Bottom Stats Banner */}
        <div className="relative bg-gradient-to-br from-[#0a1628] to-[#1e293b] rounded-3xl p-8 sm:p-12 mb-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00b5ff] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00b5ff] rounded-full blur-3xl"></div>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {/* Stat 1 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">21+</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Connected Platforms</div>
              <div className="text-sm text-gray-400">All major marketing tools</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">1</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Single Dashboard</div>
              <div className="text-sm text-gray-400">Control everything in one place</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Data Synced</div>
              <div className="text-sm text-gray-400">Real-time updates across all tools</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="inline-block">
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
            See All Integrations
          </Button>
        </div>
      </div>
    </section>
  );
}
