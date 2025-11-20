"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { navbarData } from "@/app/constants/navbar-data";

gsap.registerPlugin(ScrollTrigger);

// Fixed mapping of solution names to SVG file names
const solutionIconMap: Record<string, string> = {
  "Conversational AI": "Frame 2",
  "Intelligent Virtual Assistants (IVA)": "Frame 4",
  "AI-Enabled Web Assistants": "Frame 5",
  "Applied AI & Product Engineering": "Frame 6",
  "Magazines": "Frame 7",
  "Online Media": "Frame 8",
  "OTT Platform Ads": "Frame 9",
  "Podcast and Influencer Collaborations": "Frame 11",
  "TikTok Affiliates": "Frame 12",
  "SEO 3.0 (Generative Search)": "Frame 13",
  "Crisis Management": "Frame 14",
  "Brand Reputation Monitoring": "Frame 15",
  "Google Ads / Google Ad Sense / YouTube Ads": "Frame 16",
  "Meta Ads": "Frame 17",
  "Taboola Ads": "Frame 18",
  "Reddit Ads": "Frame 19",
  "TikTok Ads": "Frame 20",
  "Snapchat Ads": "Frame 21",
  "LinkedIn Ads": "Frame 22",
  "X Ads": "Frame 23",
  "Bluesky": "Frame 24",
  "Bing Ads": "Frame 25",
  "Yahoo Ads": "Frame 26",
  "Twitch Ads": "Frame 28",
  "Kick Ads": "Frame 29",
  "Discord Ads": "Frame 30",
  "Rumble Ads": "Frame 31",
  "Search Engine Blogs": "Frame 32",
  "WhatsApp Campaigns": "Frame 33",
  "LinkedIn Outreach": "Frame 34",
  "SMS Marketing": "Frame 35",
  "Telegram Ads": "Frame 36",
  "Email Marketing": "Frame 11",
  "InMail Marketing": "Frame 12",
};

export default function SolutionsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray(".category-section");
      categories.forEach((category) => {
        gsap.from(category as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categoryDescriptions = [
    "Intelligent automation and conversational AI solutions",
    "Strategic communications and brand amplification",
    "Cross-platform advertising at scale",
    "Data-driven performance marketing channels"
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

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-20">
          {navbarData.solutions.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="category-section">
              {/* Category Header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-[#00b5ff] rounded-full"></div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                    {category.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 ml-5">
                  {categoryDescriptions[categoryIndex]}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.links.map((service, serviceIndex) => (
                  <Link
                    key={serviceIndex}
                    href={service.href}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#00b5ff]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                      <img
                        src={`/NavbarSVGS/${solutionIconMap[service.name]}.svg`}
                        alt={service.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[#00b5ff] text-sm font-semibold">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00b5ff]/0 to-[#00b5ff]/0 group-hover:from-[#00b5ff]/5 group-hover:to-transparent rounded-2xl transition-all duration-300 pointer-events-none"></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
