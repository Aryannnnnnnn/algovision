"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const protectionMeasures = [
  {
    category: "Technical Security",
    measures: [
      {
        title: "End-to-End Encryption",
        description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
      },
      {
        title: "Zero-Trust Architecture",
        description: "Every access request is authenticated, authorized, and encrypted regardless of source.",
      },
      {
        title: "Regular Penetration Testing",
        description: "Quarterly security audits by third-party experts to identify and fix vulnerabilities.",
      },
      {
        title: "Secure Development Lifecycle",
        description: "Security reviews at every stage of development, from design to deployment.",
      },
    ],
  },
  {
    category: "Operational Security",
    measures: [
      {
        title: "24/7 Security Monitoring",
        description: "Real-time threat detection and incident response with automated alerts.",
      },
      {
        title: "Access Controls",
        description: "Role-based access with multi-factor authentication and least-privilege principles.",
      },
      {
        title: "Data Backup & Recovery",
        description: "Automated daily backups with 99.9% recovery guarantee and disaster recovery plans.",
      },
      {
        title: "Employee Training",
        description: "Mandatory security awareness training and regular phishing simulations.",
      },
    ],
  },
  {
    category: "Privacy Protection",
    measures: [
      {
        title: "Data Anonymization",
        description: "Personal identifiers are stripped from analytics and reporting data.",
      },
      {
        title: "Purpose Limitation",
        description: "Data is used only for the specific purposes you've consented to.",
      },
      {
        title: "Retention Policies",
        description: "Automated deletion of data after retention periods expire.",
      },
      {
        title: "Third-Party Audits",
        description: "Regular privacy audits to ensure compliance with international standards.",
      },
    ],
  },
];

export default function DataProtection() {
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

      const categories = gsap.utils.toArray(".protection-category");
      categories.forEach((category, index) => {
        gsap.from(category as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          delay: index * 0.08,
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

  return (
    <section id="protection" ref={sectionRef} className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
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
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-sm font-bold text-white">Data Protection</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Multi-Layered{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Security
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive protection at every layer—from infrastructure to application level. Your data is guarded by enterprise-grade security measures.
          </p>
        </div>

        {/* Protection Categories */}
        <div className="space-y-12">
          {protectionMeasures.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="protection-category"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-[#00b5ff] to-[#0099dd] rounded-full"></div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {category.category}
                </h3>
              </div>

              {/* Measures Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {category.measures.map((measure, measureIndex) => (
                  <div
                    key={measureIndex}
                    className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-[#00b5ff]/40 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Checkmark Icon */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors duration-300">
                        <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-300">
                          {measure.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {measure.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security Statement */}
        <div className="mt-16 bg-gradient-to-br from-[#00b5ff]/5 to-transparent rounded-2xl p-8 md:p-12 border-2 border-[#00b5ff]/20">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00b5ff] to-[#0099dd] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Security Incident Response
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                In the unlikely event of a security incident, we have a comprehensive response plan that includes immediate containment, investigation, remediation, and transparent communication with affected parties within 72 hours.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our dedicated security team is available 24/7 to respond to threats and protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
