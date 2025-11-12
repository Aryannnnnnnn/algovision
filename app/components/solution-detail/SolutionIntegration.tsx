"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Integration {
  name: string;
  category: string;
  logo?: string;
}

interface SolutionIntegrationProps {
  integrations: Integration[];
  heading?: string;
  subheading?: string;
}

export default function SolutionIntegration({
  integrations,
  heading = "Seamless Integration",
  subheading = "Works perfectly with the tools you already use"
}: SolutionIntegrationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Logo mapping for common integrations
  const logoMap: Record<string, string> = {
    "Salesforce": "https://img.icons8.com/color/96/salesforce.png",
    "HubSpot": "https://cdn.worldvectorlogo.com/logos/hubspot.svg",
    "Zendesk": "https://img.icons8.com/color/96/zendesk.png",
    "Intercom": "https://img.icons8.com/color/96/intercom.png",
    "Help Scout": "https://cdn.worldvectorlogo.com/logos/help-scout.svg",
    "Shopify": "https://img.icons8.com/color/96/shopify.png",
    "WooCommerce": "https://img.icons8.com/color/96/woocommerce.png",
    "Magento": "https://img.icons8.com/color/96/magento.png",
    "Slack": "https://img.icons8.com/color/96/slack-new.png",
    "Microsoft Teams": "https://img.icons8.com/color/96/microsoft-teams.png",
    "WhatsApp": "https://img.icons8.com/color/96/whatsapp.png",
    "Facebook Messenger": "https://img.icons8.com/color/96/facebook-messenger.png",
    "Telegram": "https://img.icons8.com/color/96/telegram-app.png",
    "Google Analytics": "https://img.icons8.com/color/96/google-analytics.png",
    "Google Ads": "https://img.icons8.com/color/96/google-logo.png",
    "Facebook": "https://img.icons8.com/color/96/facebook.png",
    "Instagram": "https://img.icons8.com/color/96/instagram-new.png",
    "LinkedIn": "https://img.icons8.com/color/96/linkedin.png",
    "Twitter": "https://img.icons8.com/color/96/twitter.png",
    "Mailchimp": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mailchimp.svg",
    "Zapier": "https://img.icons8.com/color/96/zapier.png",
    "Stripe": "https://img.icons8.com/color/96/stripe.png",
    "PayPal": "https://img.icons8.com/color/96/paypal.png",
    "Square": "https://cdn.worldvectorlogo.com/logos/square-5.svg",
    "Twilio": "https://cdn.worldvectorlogo.com/logos/twilio.svg",
    "SendGrid": "https://cdn.worldvectorlogo.com/logos/sendgrid-1.svg",
    "Gmail": "https://img.icons8.com/color/96/gmail-new.png",
    "Outlook": "https://img.icons8.com/color/96/ms-outlook.png",
    "Jira": "https://img.icons8.com/color/96/jira.png",
    "Trello": "https://img.icons8.com/color/96/trello.png",
    "Asana": "https://cdn.worldvectorlogo.com/logos/asana-logo.svg",
    "Monday.com": "https://img.icons8.com/color/96/monday.png",
    "Notion": "https://img.icons8.com/color/96/notion.png",
    "Dropbox": "https://img.icons8.com/color/96/dropbox.png",
    "Google Drive": "https://img.icons8.com/color/96/google-drive.png",
    "OneDrive": "https://img.icons8.com/color/96/microsoft-onedrive-2019.png",
    "Drip": "https://img.icons8.com/color/96/water.png",
    "Hotjar": "https://img.icons8.com/color/96/cursor.png",
    "Apple Podcasts": "https://www.vectorlogo.zone/logos/apple_appstore/apple_appstore-icon.svg",
    "Facebook Pixel": "https://img.icons8.com/color/96/facebook.png",
    "Google Search Console": "https://img.icons8.com/color/96/google-logo.png",
    "Google Workspace": "https://img.icons8.com/color/96/google-logo.png",
    "Hulu": "https://img.icons8.com/color/96/hulu.png",
    "Klaviyo": "https://img.icons8.com/color/96/email.png",
    "Marketo": "https://www.vectorlogo.zone/logos/marketo/marketo-icon.svg",
    "Microsoft 365": "https://img.icons8.com/color/96/microsoft.png",
    "Moz": "https://img.icons8.com/color/96/seo.png",
    "Pardot": "https://img.icons8.com/color/96/salesforce.png",
    "Reddit": "https://img.icons8.com/color/96/reddit.png",
    "Roku": "https://img.icons8.com/color/96/roku.png",
    "Screaming Frog": "https://img.icons8.com/color/96/spider.png",
    "SEMrush": "https://img.icons8.com/color/96/search.png",
    "Spotify": "https://img.icons8.com/color/96/spotify.png",
    "Squarespace": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/squarespace.svg",
    "TikTok": "https://img.icons8.com/color/96/tiktok.png",
    "WordPress": "https://img.icons8.com/color/96/wordpress.png",
    "YouTube": "https://img.icons8.com/color/96/youtube-play.png",
    "Pipedrive": "https://cdn.worldvectorlogo.com/logos/pipedrive.svg",
    "Microsoft Dynamics": "https://img.icons8.com/color/96/microsoft.png",
    "Zoom": "https://img.icons8.com/color/96/zoom.png",
    "Microsoft Ads": "https://img.icons8.com/color/96/microsoft.png",
    "Bluesky": "https://img.icons8.com/color/96/twitter.png",
    "Discord": "https://img.icons8.com/color/96/discord-logo.png",
    "Twitch": "https://img.icons8.com/color/96/twitch.png",
    "Kick": "https://img.icons8.com/color/96/play-button-circled.png",
    "Rumble": "https://img.icons8.com/color/96/video.png",
    "Snapchat": "https://img.icons8.com/color/96/snapchat.png",
    "Yahoo": "https://img.icons8.com/color/96/yahoo.png",
    "X": "https://img.icons8.com/color/96/twitter.png",
    "Attentive": "https://img.icons8.com/color/96/sms.png",
    "Google Alerts": "https://img.icons8.com/color/96/google-alerts.png",
    "Majestic": "https://img.icons8.com/color/96/crown.png",
    "Yoast SEO": "https://img.icons8.com/color/96/search.png",
    "Adobe InDesign": "https://img.icons8.com/color/96/adobe-indesign.png",
    "Airtable": "https://img.icons8.com/color/96/airtable.png",
    "Canva": "https://img.icons8.com/color/96/canva.png",
    "Amazon Associates": "https://img.icons8.com/color/96/amazon.png",
    "Amazon Prime Video": "https://img.icons8.com/color/96/amazon-prime-video.png",
    "Google Podcasts": "https://img.icons8.com/color/96/google-podcasts.png",
  };

  // Add logos to integrations
  const integrationsWithLogos = integrations.map(integration => ({
    ...integration,
    logo: integration.logo || logoMap[integration.name]
  }));

  // Split integrations into 3 rows with 4 logos each (4x4x4 layout)
  const row1 = integrationsWithLogos.slice(0, 4);
  const row2 = integrationsWithLogos.slice(4, 8);
  const row3 = integrationsWithLogos.slice(8, 12);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
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
            <span className="text-sm font-bold text-white">Integrations</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            {heading}
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              One Platform.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            {subheading}
          </p>
        </div>

        {/* 3-Row Zigzag Infinite Sliding Integration Logos */}
        <div className="relative mb-16">
          <div className="relative overflow-hidden py-8 space-y-6">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Row 1 */}
            <div className="flex gap-20 animate-scroll" style={{ width: 'max-content' }}>
              {[...Array(6)].map((_, setIndex) => (
                row1.map((integration, index) => (
                  <div
                    key={`row1-${setIndex}-${index}`}
                    className="flex-shrink-0 w-16 h-16 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                  >
                    {integration.logo ? (
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-[#00b5ff]">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ))}
            </div>

            {/* Row 2 - Offset position for zigzag */}
            <div className="flex gap-20 animate-scroll" style={{ width: 'max-content', marginLeft: '100px' }}>
              {[...Array(6)].map((_, setIndex) => (
                row2.map((integration, index) => (
                  <div
                    key={`row2-${setIndex}-${index}`}
                    className="flex-shrink-0 w-16 h-16 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                  >
                    {integration.logo ? (
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-[#00b5ff]">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ))}
            </div>

            {/* Row 3 - Offset position for zigzag */}
            <div className="flex gap-20 animate-scroll" style={{ width: 'max-content', marginLeft: '50px' }}>
              {[...Array(6)].map((_, setIndex) => (
                row3.map((integration, index) => (
                  <div
                    key={`row3-${setIndex}-${index}`}
                    className="flex-shrink-0 w-16 h-16 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                  >
                    {integration.logo ? (
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-[#00b5ff]">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                    )}
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
              <div className="text-5xl font-bold text-white mb-2">{integrationsWithLogos.length}+</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Integrations</div>
              <div className="text-sm text-gray-400">Connected & integrated</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">1</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Platform</div>
              <div className="text-sm text-gray-400">Unified solution</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Seamless</div>
              <div className="text-sm text-gray-400">Plug & play ready</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
