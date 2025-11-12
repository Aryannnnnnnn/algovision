"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function GovernanceCompliance() {
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

      const items = gsap.utils.toArray(".governance-item");
      items.forEach((item, index) => {
        gsap.fromTo(
          item as HTMLElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const governanceAreas = [
    {
      title: "Data Governance Framework",
      description: "Comprehensive policies and procedures governing data collection, storage, processing, and deletion throughout the entire lifecycle.",
      items: [
        "Data classification & cataloging",
        "Access control policies",
        "Data retention schedules",
        "Privacy impact assessments",
        "Data lineage tracking",
        "Automated compliance monitoring"
      ]
    },
    {
      title: "Regulatory Compliance",
      description: "Full adherence to global data protection and privacy regulations across all jurisdictions where we operate.",
      items: [
        "GDPR (EU General Data Protection)",
        "CCPA (California Consumer Privacy)",
        "HIPAA (Healthcare data)",
        "SOX (Financial reporting)",
        "PCI DSS (Payment card data)",
        "Regional compliance (LGPD, PDPA, etc.)"
      ]
    },
    {
      title: "Security Certifications",
      description: "Industry-recognized certifications demonstrating our commitment to security best practices and continuous improvement.",
      items: [
        "SOC 2 Type II (Annual audits)",
        "ISO 27001 (Information security)",
        "ISO 27701 (Privacy management)",
        "NIST Cybersecurity Framework",
        "CSA STAR Certification",
        "FedRAMP (For government clients)"
      ]
    },
    {
      title: "Audit & Reporting",
      description: "Comprehensive audit trails and reporting capabilities to demonstrate compliance and support internal/external audits.",
      items: [
        "Real-time activity monitoring",
        "Immutable audit logs",
        "Compliance dashboards",
        "Automated reporting",
        "Third-party audit support",
        "Incident response documentation"
      ]
    }
  ];

  const complianceFeatures = [
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Data Privacy by Design",
      description: "Privacy controls built into every layer of our platform from day one."
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      ),
      title: "Encryption Everywhere",
      description: "End-to-end encryption for data at rest, in transit, and in use."
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Continuous Monitoring",
      description: "24/7 security operations center monitoring for threats and anomalies."
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      title: "Vendor Risk Management",
      description: "Rigorous third-party security assessments and ongoing monitoring."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-34 items-start">
          {/* Governance Areas - Left on desktop, bottom on mobile/tablet */}
          <div className="space-y-6 order-2 lg:order-1">
            {governanceAreas.map((area, index) => (
              <div key={index} className="governance-item group">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-transparent hover:shadow-lg hover:border-[#00011f] transition-all duration-500 lg:hover:-translate-x-2">
                  {/* Number badge - hidden on mobile, shown on lg */}
                  <div className="hidden lg:flex absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">0{index + 1}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Number badge visible on mobile */}
                    <div className="lg:hidden flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">0{index + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0 lg:ml-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-500">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {area.description}
                      </p>

                      {/* Items */}
                      <div className="space-y-2">
                        {area.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Heading - Right on desktop, top on mobile/tablet */}
          <div className="lg:sticky lg:top-24 max-w-2xl mx-auto order-1 lg:order-2">
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-sm font-bold text-white">Governance & Compliance</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Compliance at Scale. <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Trust at Every Layer.</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Our comprehensive governance framework ensures your data is protected, compliant, and auditable at all times.
            </p>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-[#0a1628] to-[#1e293b] rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-bold text-lg">Certified & Audited</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Annual third-party security audits with results available to enterprise clients under NDA.
              </p>
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
                Request Compliance Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
