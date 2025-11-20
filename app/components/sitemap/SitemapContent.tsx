"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface SitemapLink {
  name: string;
  href: string;
  description?: string;
}

interface SitemapCategory {
  title: string;
  links: SitemapLink[];
}

export default function SitemapContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
      });

      // Set initial state for cards to ensure visibility
      const cards = cardsRef.current?.children || [];
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 1, y: 0 });

        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sitemapData: SitemapCategory[] = [
    {
      title: "Home",
      links: [
        { name: "Homepage", href: "/", description: "Welcome to Algo Vision" },
      ],
    },
    {
      title: "AI Solutions",
      links: [
        { name: "AI Chatbot", href: "/solutions/ai/chatbot", description: "Intelligent conversational AI for customer support" },
        { name: "Virtual Assistant (VA)", href: "/solutions/ai/va", description: "Virtual assistants to streamline operations" },
        { name: "Web VA", href: "/solutions/ai/web-va", description: "Web-based virtual assistant solutions" },
      ],
    },
    {
      title: "PR & Communications",
      links: [
        { name: "Magazines", href: "/solutions/pr/magazines", description: "Editorial coverage in top publications" },
        { name: "Online Media", href: "/solutions/pr/online-media", description: "Digital PR and media placements" },
        { name: "OTT Platform Ads", href: "/solutions/pr/ott-platform-ads", description: "Advertising on streaming platforms" },
        { name: "Podcast & Influencer Collaborations", href: "/solutions/pr/podcast-influencer", description: "Strategic partnerships with creators" },
        { name: "TikTok Affiliates", href: "/solutions/pr/tiktok-affiliates", description: "Affiliate marketing on TikTok" },
        { name: "SEO 3.0", href: "/solutions/pr/seo-3", description: "Next-gen search optimization strategies" },
        { name: "Crisis Management", href: "/solutions/pr/crisis-management", description: "Protect and restore brand reputation" },
        { name: "Brand Reputation Monitoring", href: "/solutions/pr/brand-reputation", description: "Track and manage online perception" },
      ],
    },
    {
      title: "Omnichannel Advertising",
      links: [
        { name: "Google Ads / AdSense / YouTube", href: "/solutions/ads/google", description: "Reach customers across Google's ecosystem" },
        { name: "Meta Ads", href: "/solutions/ads/meta", description: "Facebook & Instagram advertising" },
        { name: "Taboola Ads", href: "/solutions/ads/taboola", description: "Native advertising on premium sites" },
        { name: "Reddit Ads", href: "/solutions/ads/reddit", description: "Community-driven advertising" },
        { name: "TikTok Ads", href: "/solutions/ads/tiktok", description: "Viral short-form video ads" },
        { name: "Snapchat Ads", href: "/solutions/ads/snapchat", description: "Engage younger demographics" },
        { name: "LinkedIn Ads", href: "/solutions/ads/linkedin", description: "B2B professional targeting" },
        { name: "X Ads", href: "/solutions/ads/x", description: "Real-time conversation advertising" },
        { name: "Bluesky Ads", href: "/solutions/ads/bluesky", description: "Emerging social platform ads" },
        { name: "Bing Ads", href: "/solutions/ads/bing", description: "Microsoft search advertising" },
        { name: "Yahoo Ads", href: "/solutions/ads/yahoo", description: "Yahoo search network campaigns" },
        { name: "Twitch Ads", href: "/solutions/ads/twitch", description: "Gaming & streaming audience" },
        { name: "Kick Ads", href: "/solutions/ads/kick", description: "Alternative streaming platform ads" },
        { name: "Discord Ads", href: "/solutions/ads/discord", description: "Community server advertising" },
        { name: "Rumble Ads", href: "/solutions/ads/rumble", description: "Video platform advertising" },
      ],
    },
    {
      title: "Growth & Performance Marketing",
      links: [
        { name: "Search Engine Blogs", href: "/solutions/growth/search-engine-blogs", description: "SEO-optimized content marketing" },
        { name: "WhatsApp Campaigns", href: "/solutions/growth/whatsapp-campaigns", description: "Direct messaging at scale" },
        { name: "LinkedIn Outreach", href: "/solutions/growth/linkedin-outreach", description: "Professional networking campaigns" },
        { name: "SMS Marketing", href: "/solutions/growth/sms-marketing", description: "Text message campaigns" },
        { name: "Telegram Ads", href: "/solutions/growth/telegram-ads", description: "Messaging platform advertising" },
        { name: "Email Marketing", href: "/solutions/growth/email-marketing", description: "Targeted email campaigns" },
        { name: "InMail Marketing", href: "/solutions/growth/inmail-marketing", description: "LinkedIn direct messaging" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/company/about", description: "Learn about our story, mission, and values" },
        { name: "Our Methodology", href: "/company/methodology", description: "Discover our proven approach to success" },
        { name: "Data Ethics & Privacy", href: "/company/data-ethics", description: "Our commitment to data protection" },
        { name: "Careers", href: "/company/careers", description: "Join our team of innovative professionals" },
        { name: "Contact", href: "/company/contact", description: "Get in touch with our team" },
        { name: "Sitemap", href: "/company/sitemap", description: "Navigate our entire website" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Work With Us", href: "/connect/work-with-us", description: "Start your digital transformation journey" },
        { name: "Book a Call", href: "/connect/book-call", description: "Schedule a free strategy consultation" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blogs", href: "/resources/blogs", description: "Industry insights and expert articles" },
        { name: "Case Studies", href: "/resources/case-studies", description: "Real success stories from our clients" },
        { name: "E-Books & Guides", href: "/resources/ebooks-guides", description: "Downloadable resources and guides" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Cookie Policy", href: "/legal/cookie-policy", description: "How we use cookies" },
        { name: "Terms of Service", href: "/legal/terms", description: "Terms and conditions" },
        { name: "Privacy Policy", href: "/legal/privacy", description: "How we protect your data" },
        { name: "Accessibility Statement", href: "/legal/accessibility", description: "Our commitment to accessibility" },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="max-w-5xl">
          <div ref={contentRef} className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Site Navigation</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Explore{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Algo Vision
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Discover all our solutions, resources, and company information in one place. Navigate through our complete site structure to find exactly what you need.
            </p>
          </div>
        </div>
      </div>

      {/* Modern Card Grid with Tabs */}
      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 md:pb-32">
        {/* Category Navigation Pills */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {sitemapData.map((category, idx) => (
            <button
              key={idx}
              onClick={() => {
                const element = document.getElementById(`category-${idx}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-[#00b5ff] hover:bg-[#00b5ff]/5 transition-all duration-200 font-semibold text-gray-700 hover:text-[#00b5ff] shadow-sm hover:shadow-md"
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div ref={cardsRef} className="space-y-16">
          {sitemapData.map((category, idx) => (
            <div
              key={idx}
              id={`category-${idx}`}
              className="sitemap-category scroll-mt-8"
            >
              {/* Category Title with Accent */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00b5ff] to-[#0095d9] rounded-2xl shadow-lg mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-white">
                    {category.title}
                  </h2>
                  <span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                    {category.links.length}
                  </span>
                </div>
              </div>

              {/* Links in Masonry-style Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.links.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    href={link.href}
                    className="sitemap-link group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#00b5ff] p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00b5ff]/0 to-[#0095d9]/0 group-hover:from-[#00b5ff]/5 group-hover:to-[#0095d9]/5 transition-all duration-300"></div>

                    {/* Number badge */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-[#00b5ff]/10 group-hover:bg-[#00b5ff] flex items-center justify-center transition-all duration-300">
                      <span className="text-xs font-black text-[#00b5ff] group-hover:text-white">
                        {linkIdx + 1}
                      </span>
                    </div>

                    <div className="relative">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b5ff]/10 to-[#0095d9]/10 group-hover:from-[#00b5ff] group-hover:to-[#0095d9] flex items-center justify-center mb-4 transition-all duration-300">
                        <svg
                          className="w-5 h-5 text-[#00b5ff] group-hover:text-white transition-colors duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 group-hover:text-[#00b5ff] transition-colors mb-2 leading-tight">
                        {link.name}
                      </h3>

                      {/* Description */}
                      {link.description && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {link.description}
                        </p>
                      )}

                      {/* Arrow indicator */}
                      <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#00b5ff] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>Visit page</span>
                        <svg
                          className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#00b5ff] to-[#0095d9] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">Site Overview</h3>
            <p className="text-blue-100">Complete navigation structure at a glance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">
                {sitemapData.length}
              </div>
              <div className="text-sm text-blue-100 font-semibold uppercase tracking-wider">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">
                {sitemapData.reduce((acc, cat) => acc + cat.links.length, 0)}
              </div>
              <div className="text-sm text-blue-100 font-semibold uppercase tracking-wider">Total Pages</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">
                32
              </div>
              <div className="text-sm text-blue-100 font-semibold uppercase tracking-wider">Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">
                100%
              </div>
              <div className="text-sm text-blue-100 font-semibold uppercase tracking-wider">Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
