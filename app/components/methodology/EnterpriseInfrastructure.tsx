"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EnterpriseInfrastructure() {
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

      const cards = gsap.utils.toArray(".infrastructure-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
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

  const infrastructure = [
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Enterprise Security",
      description: "SOC 2 Type II certified infrastructure with end-to-end encryption, SSO/SAML integration, and role-based access controls.",
      features: ["256-bit encryption", "SSO/SAML 2.0", "Multi-factor auth", "Annual penetration testing"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      title: "Compliance & Governance",
      description: "Full compliance with GDPR, CCPA, and industry-specific regulations. Comprehensive audit trails and data governance frameworks.",
      features: ["GDPR compliant", "CCPA ready", "ISO 27001", "Complete audit logs"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      ),
      title: "Scalable Architecture",
      description: "Cloud-native infrastructure built on AWS/GCP with 99.9% uptime SLA. Auto-scaling to handle enterprise data volumes.",
      features: ["99.9% uptime SLA", "Auto-scaling", "Multi-region deployment", "CDN acceleration"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
        </svg>
      ),
      title: "Enterprise Integrations",
      description: "Seamless integration with leading enterprise platforms. Pre-built connectors for CRM, CDP, data warehouses, and BI tools.",
      features: ["Salesforce", "Adobe Experience", "Snowflake", "Tableau/Power BI"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      title: "Dedicated Support",
      description: "Named account team with 24/7 enterprise support. Dedicated Slack channel, quarterly business reviews, and strategic planning sessions.",
      features: ["24/7 support", "Named account team", "Quarterly reviews", "SLA guarantees"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      title: "Data Ownership",
      description: "Your data belongs to you. Complete data portability, no vendor lock-in, and transparent data processing documentation.",
      features: ["Full data ownership", "Easy export", "No lock-in", "Transparent processing"]
    },
  ];

  const certifications = [
    { name: "SOC 2 Type II", icon: "🔒" },
    { name: "ISO 27001", icon: "🛡️" },
    { name: "GDPR", icon: "🇪🇺" },
    { name: "CCPA", icon: "📋" },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 xl:pb-32 bg-white overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Image with Overlay Card */}
          <div ref={headingRef} className="relative pr-8 sm:pr-12 md:pr-14 lg:pr-16 xl:pr-24">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-visible">
              {/* Unsplash image background */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                  alt="Enterprise security and infrastructure"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlay Card - Overflowing Bottom Right - Dark Theme */}
              <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 xl:-bottom-16 -right-10 sm:-right-14 md:-right-18 lg:-right-28 xl:-right-32 w-[75%] sm:w-[70%] md:w-[75%] lg:w-[75%] xl:w-[80%]">
                <div className="bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-2xl px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-10 lg:py-16 xl:px-12 xl:py-20">
                  <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-2xl font-normal text-white leading-relaxed">
                    <span className="text-[#00b5ff] font-bold">99.9% uptime SLA</span>{" "}
                    with enterprise-grade security and compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Enterprise Infrastructure</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Built for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Enterprise
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Enterprise-grade security, compliance, and scalability that meets the most stringent requirements.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3 pt-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="text-lg">{cert.icon}</span>
                  <span className="text-xs font-semibold text-gray-900">{cert.name}</span>
                </div>
              ))}
            </div>

            {/* Infrastructure Overview */}
            <div className="space-y-3 pt-4">
              {[
                {
                  title: "Enterprise Security",
                  description: "SOC 2 Type II certified with end-to-end encryption and SSO/SAML",
                },
                {
                  title: "Global Compliance",
                  description: "GDPR, CCPA, ISO 27001 certified across all jurisdictions",
                },
                {
                  title: "99.9% Uptime SLA",
                  description: "Auto-scaling cloud infrastructure with multi-region deployment",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
