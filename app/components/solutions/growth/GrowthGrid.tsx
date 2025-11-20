"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function GrowthGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".solution-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
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

  const solutions = [
    {
      title: "Search Engine Blogs",
      description: "SEO-optimized content marketing that ranks high in search results, drives organic traffic, and establishes your brand as an industry authority.",
      features: ["SEO Optimization", "Content Strategy", "Organic Traffic Growth"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      href: "/solutions/growth/search-engine-blogs",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "WhatsApp Campaigns",
      description: "Direct messaging at scale that reaches customers on their preferred platform with personalized, automated campaigns and rich media content.",
      features: ["Mass Messaging", "Automation", "Rich Media"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: "/solutions/growth/whatsapp-campaigns",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "LinkedIn Outreach",
      description: "Professional networking campaigns that connect you with decision-makers, build valuable relationships, and generate high-quality B2B leads.",
      features: ["Connection Automation", "Lead Generation", "Personalized Messaging"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      href: "/solutions/growth/linkedin-outreach",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "SMS Marketing",
      description: "Text message campaigns that deliver instant, high-impact communications with exceptional open rates and immediate customer engagement.",
      features: ["Instant Delivery", "High Open Rates", "2-Way Messaging"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      href: "/solutions/growth/sms-marketing",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Telegram Ads",
      description: "Messaging platform advertising that reaches engaged audiences through sponsored messages, channel promotions, and bot interactions.",
      features: ["Sponsored Messages", "Channel Promotion", "Bot Integration"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      href: "/solutions/growth/telegram-ads",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Email Marketing",
      description: "Targeted email campaigns that nurture leads, drive conversions, and build lasting customer relationships through personalized, data-driven messaging.",
      features: ["Automation", "Segmentation", "A/B Testing"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      href: "/solutions/growth/email-marketing",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "InMail Marketing",
      description: "LinkedIn direct messaging that bypasses connection requirements to reach prospects directly with personalized, professional outreach campaigns.",
      features: ["Direct Access", "Professional Outreach", "High Response Rates"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
        </svg>
      ),
      href: "/solutions/growth/inmail-marketing",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section id="growth-solutions" ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Growth Solutions Suite
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
            Choose from our comprehensive suite of growth marketing tools to scale your business
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={solution.href}
              className="solution-card group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#00b5ff] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {solution.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 line-clamp-3">
                {solution.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {solution.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 group-hover:bg-blue-50 rounded-full text-xs font-semibold text-gray-700 group-hover:text-blue-600 border border-gray-200 group-hover:border-blue-200 transition-all duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Arrow */}
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Learn More
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
