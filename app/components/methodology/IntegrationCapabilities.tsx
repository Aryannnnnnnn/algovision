"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function IntegrationCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = gsap.utils.toArray(".integration-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: "back.out(1.2)",
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
    { name: "Salesforce", logo: "https://img.icons8.com/color/96/salesforce.png" },
    { name: "Google Analytics", logo: "https://img.icons8.com/color/96/google-analytics.png" },
    { name: "Adobe", logo: "https://img.icons8.com/color/96/adobe-creative-cloud.png" },
    { name: "Microsoft", logo: "https://img.icons8.com/color/96/microsoft.png" },
    { name: "SAP", logo: "https://img.icons8.com/color/96/sap.png" },
    { name: "Tableau", logo: "https://img.icons8.com/color/96/tableau-software.png" },
    { name: "Slack", logo: "https://img.icons8.com/color/96/slack-new.png" },
    { name: "Oracle", logo: "https://img.icons8.com/color/96/oracle-logo.png" },
    { name: "AWS", logo: "https://img.icons8.com/color/96/amazon-web-services.png" },
    { name: "Google Cloud", logo: "https://img.icons8.com/color/96/google-cloud.png" },
    { name: "Azure", logo: "https://img.icons8.com/color/96/azure-1.png" },
    { name: "Zendesk", logo: "https://img.icons8.com/color/96/zendesk.png" },
    { name: "Shopify", logo: "https://img.icons8.com/color/96/shopify.png" },
    { name: "WordPress", logo: "https://img.icons8.com/color/96/wordpress.png" },
    { name: "Dropbox", logo: "https://img.icons8.com/color/96/dropbox.png" },
    { name: "Stripe", logo: "https://img.icons8.com/color/96/stripe.png" },
    { name: "PayPal", logo: "https://img.icons8.com/color/96/paypal.png" },
    { name: "Trello", logo: "https://img.icons8.com/color/96/trello.png" },
    { name: "Jira", logo: "https://img.icons8.com/color/96/jira.png" },
    { name: "GitHub", logo: "https://img.icons8.com/color/96/github.png" },
    { name: "GitLab", logo: "https://img.icons8.com/color/96/gitlab.png" },
  ];

  // Split platforms into 3 rows (7, 7, 7)
  const row1 = platforms.slice(0, 7);
  const row2 = platforms.slice(7, 14);
  const row3 = platforms.slice(14, 21);

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
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Integration Capabilities</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            Every Integration That Matters.
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              One Unified System.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            From Salesforce to Snowflake, HubSpot to AWS—seamlessly integrate with your entire enterprise tech stack.
          </p>
        </div>

        {/* 3-Row Zigzag Infinite Sliding Platform Logos */}
        <div className="relative mb-16">
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
              <div className="text-5xl font-bold text-white mb-2">200+</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Integrations</div>
              <div className="text-sm text-gray-400">Pre-built connectors</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">Real-Time</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Data Sync</div>
              <div className="text-sm text-gray-400">Bi-directional updates</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">API Coverage</div>
              <div className="text-sm text-gray-400">Custom integrations</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="inline-block">
          <Button
            href="/company/contact"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Request Integration Details
          </Button>
        </div>
      </div>
    </section>
  );
}
