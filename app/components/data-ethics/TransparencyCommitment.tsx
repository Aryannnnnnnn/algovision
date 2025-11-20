"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const transparencyPractices = [
  {
    title: "Data Collection Notice",
    description: "Clear, upfront information about what data we collect and why—before you provide it.",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Privacy Dashboard",
    description: "Access your data, see how it's used, update preferences, and request deletion—all in one place.",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Regular Transparency Reports",
    description: "Published reports on data requests, security incidents, and compliance activities.",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Breach Notification",
    description: "Immediate notification within 72 hours if a data breach affects your information.",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];

const userRights = [
  "Right to Access - View all your data we hold",
  "Right to Rectification - Correct inaccurate information",
  "Right to Erasure - Delete your data ('right to be forgotten')",
  "Right to Portability - Export your data in machine-readable format",
  "Right to Object - Opt out of certain data processing activities",
  "Right to Restrict Processing - Temporarily halt data processing",
];

export default function TransparencyCommitment() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const practiceCards = gsap.utils.toArray(".practice-card");
      practiceCards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });

      const rightsItems = gsap.utils.toArray(".rights-item");
      rightsItems.forEach((item, index) => {
        gsap.from(item as HTMLElement, {
          opacity: 0,
          x: -20,
          duration: 0.3,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="transparency" ref={sectionRef} className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #00b5ff 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-xs font-bold text-white">Transparency</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            No{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Hidden Practices
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Transparency isn't just a buzzword—it's how we operate. You deserve to know exactly what happens with your data.
          </p>
        </div>

        {/* Transparency Practices */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {transparencyPractices.map((practice, index) => (
            <div
              key={index}
              className="practice-card group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#00b5ff]/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 text-[#00b5ff]">
                  {practice.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#00b5ff] transition-colors duration-300">
                {practice.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {practice.description}
              </p>
            </div>
          ))}
        </div>

        {/* Your Rights Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Your Rights List */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Your Privacy Rights
            </h3>
            <div className="space-y-4">
              {userRights.map((right, index) => (
                <div
                  key={index}
                  className="rights-item flex items-start gap-4 group"
                >
                  {/* Checkmark */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 leading-relaxed pt-1">
                    {right}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Exercise Your Rights CTA */}
          <div className="bg-gradient-to-br from-[#00b5ff]/5 to-transparent rounded-2xl p-8 md:p-10 border-2 border-[#00b5ff]/20">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00b5ff] to-[#0099dd] flex items-center justify-center shadow-xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Exercise Your Rights
              </h4>
              <p className="text-gray-700 leading-relaxed mb-6">
                Access your privacy dashboard to manage your data, update preferences, or submit a data request. We'll respond within 30 days.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                href="/privacy-dashboard"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                Privacy Dashboard
              </Button>
              <p className="text-sm text-gray-600">
                Or email us at{" "}
                <a href="mailto:privacy@algovision.com" className="text-[#00b5ff] font-semibold hover:underline">
                  privacy@algovision.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
