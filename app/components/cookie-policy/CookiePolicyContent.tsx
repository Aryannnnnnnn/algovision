"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CookiePolicyContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    const heroCtx = gsap.context(() => {
      gsap.from(heroContentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
      });
    }, heroRef);

    // Content section animations
    const contentCtx = gsap.context(() => {
      const sections = contentRef.current?.querySelectorAll(".content-section") || [];
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      });
    }, contentSectionRef);

    return () => {
      heroCtx.revert();
      contentCtx.revert();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center justify-center bg-white overflow-hidden"
      >
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

        <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
          <div className="max-w-5xl">
            <div ref={heroContentRef} className="space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Cookie Policy</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Understanding{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Your Choices.
                </span>
                <br />
                Respecting Your Privacy.
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                This Cookie Policy explains how Algo Vision uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and deliver personalized content. We believe in complete transparency about the data we collect and how it's used.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                <Button
                  href="#cookie-types"
                  variant="primary"
                  size="lg"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  }
                >
                  View Cookie Types
                </Button>
                <Button
                  href="/company/data-ethics"
                  variant="secondary"
                  size="lg"
                >
                  Data Ethics
                </Button>
              </div>

              {/* Last Updated */}
              <div className="pt-6">
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Last Updated:</span> January 15, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentSectionRef} className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
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

        <div ref={contentRef} className="relative xl:max-w-[90vw] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">

          {/* What Are Cookies */}
          <div className="content-section space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">What Are Cookies</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Understanding Cookies and{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Similar Technologies
              </span>
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. They help us remember your preferences, understand how you use our site, and provide you with a better, more personalized experience.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                In addition to cookies, we may use similar technologies such as web beacons, pixels, and local storage. These technologies serve similar purposes to cookies and are subject to the same controls described in this policy.
              </p>

              <div className="bg-blue-50 border-l-4 border-[#00b5ff] p-6 rounded-r-lg mt-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-900">Important:</span> Most cookies we use are designed to improve your experience. You have full control over which cookies you accept, and you can change your preferences at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies */}
          <div id="cookie-types" className="content-section space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Cookie Categories</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Types of Cookies{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                We Use
              </span>
            </h2>

            <div className="space-y-8">
              {/* Necessary Cookies */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 hover:border-[#00b5ff]/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#00b5ff]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">Necessary Cookies</h3>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Required</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, services you have requested cannot be provided.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700"><span className="font-bold">Examples:</span></p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-[#00b5ff] mt-1">•</span>
                          <span>Session management and authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00b5ff] mt-1">•</span>
                          <span>Security and fraud prevention</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00b5ff] mt-1">•</span>
                          <span>Load balancing and site performance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00b5ff] mt-1">•</span>
                          <span>Cookie consent preferences</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 italic">These cookies cannot be disabled as they are required for the site to work.</p>
                  </div>
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 hover:border-[#00b5ff]/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">Performance Cookies</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Optional</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages. All information is aggregated and anonymous. We use this data to improve how our website works.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700"><span className="font-bold">Examples:</span></p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Google Analytics (anonymized IP addresses)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Page load time and performance metrics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Error tracking and diagnostics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>User journey and navigation patterns</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 hover:border-[#00b5ff]/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">Functional Cookies</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Optional</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, more personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700"><span className="font-bold">Examples:</span></p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>Language and region preferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>Video player settings and preferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>Form auto-fill data (non-sensitive)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>User interface customization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Targeting Cookies */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 hover:border-[#00b5ff]/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">Targeting Cookies</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Optional</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of marketing campaigns. They remember that you have visited our website and may be shared with advertising partners.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700"><span className="font-bold">Examples:</span></p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>LinkedIn Insight Tag for B2B marketing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>Google Ads conversion tracking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>Retargeting and remarketing pixels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>Social media advertising and analytics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Control Cookies */}
          <div className="content-section space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Your Control</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Managing Your{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Cookie Preferences
              </span>
            </h2>

            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                You have several options to control and manage cookies:
              </p>

              <div className="space-y-6">
                {/* Browser Settings */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Browser Settings
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. Generally, you can find these settings in the "options" or "preferences" menu of your browser.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-700">Popular browser guides:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00b5ff] mt-1">•</span>
                        <span><span className="font-semibold">Chrome:</span> Settings → Privacy and security → Cookies and other site data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00b5ff] mt-1">•</span>
                        <span><span className="font-semibold">Firefox:</span> Settings → Privacy & Security → Cookies and Site Data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00b5ff] mt-1">•</span>
                        <span><span className="font-semibold">Safari:</span> Preferences → Privacy → Manage Website Data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00b5ff] mt-1">•</span>
                        <span><span className="font-semibold">Edge:</span> Settings → Privacy, search, and services → Cookies and site permissions</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Cookie Consent Tool */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Our Cookie Consent Tool
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    When you first visit our website, you'll see a cookie banner that allows you to customize your preferences. You can accept all cookies, reject optional cookies, or customize which categories you'd like to allow.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.
                  </p>
                </div>

                {/* Opt-Out Links */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Third-Party Opt-Outs
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    For targeting and advertising cookies, you can also opt out directly through third-party platforms:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00b5ff] mt-1">•</span>
                      <span><span className="font-semibold">Google Ads Settings:</span> Manage personalized advertising preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00b5ff] mt-1">•</span>
                      <span><span className="font-semibold">Network Advertising Initiative:</span> Opt out of interest-based advertising</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00b5ff] mt-1">•</span>
                      <span><span className="font-semibold">Digital Advertising Alliance:</span> Control targeted advertising across devices</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-900">Please note:</span> Blocking or deleting cookies may impact your experience on our website. Some features and services may not function properly if you disable necessary cookies.
                </p>
              </div>
            </div>
          </div>

          {/* Updates to Cookie Policy */}
          <div className="content-section space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Policy Updates</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Updates to This{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                Cookie Policy
              </span>
            </h2>

            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this policy.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                For significant changes, we may provide additional notice, such as:
              </p>

              <ul className="space-y-3 ml-6">
                <li className="text-lg text-gray-600 leading-relaxed flex items-start gap-3">
                  <span className="text-[#00b5ff] mt-2 flex-shrink-0">•</span>
                  <span>Displaying a prominent notice on our website</span>
                </li>
                <li className="text-lg text-gray-600 leading-relaxed flex items-start gap-3">
                  <span className="text-[#00b5ff] mt-2 flex-shrink-0">•</span>
                  <span>Sending you an email notification (if you have an account with us)</span>
                </li>
                <li className="text-lg text-gray-600 leading-relaxed flex items-start gap-3">
                  <span className="text-[#00b5ff] mt-2 flex-shrink-0">•</span>
                  <span>Requesting your consent again for certain cookie categories</span>
                </li>
              </ul>

              <p className="text-lg text-gray-600 leading-relaxed">
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and similar technologies.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="content-section bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Questions About Our Cookie Policy?
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                If you have any questions about this Cookie Policy or our use of cookies, please don't hesitate to reach out. We're here to help you understand how we protect your privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/company/contact"
                  variant="primary"
                  size="lg"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Contact Us
                </Button>
                <Button
                  href="/company/data-ethics"
                  variant="secondary"
                  size="lg"
                >
                  View Data Ethics
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
