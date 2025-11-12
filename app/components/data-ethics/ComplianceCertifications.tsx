"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function ComplianceCertifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
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

      // Animate certifications
      const certs = certificationsRef.current?.children;
      if (certs) {
        gsap.from(certs, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      title: "GDPR Compliant",
      subtitle: "European data protection excellence",
      description: "Full compliance with EU's comprehensive data protection law, ensuring privacy rights for all European citizens. Regular audits and privacy impact assessments for every feature.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "SOC 2 Type II Certified",
      subtitle: "Enterprise security validated",
      description: "Independent audit verifying our security, availability, processing integrity, confidentiality, and privacy controls. Annual third-party assessments ensure continuous compliance.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "ISO 27001 Certified",
      subtitle: "Global security standards",
      description: "International standard for information security management systems. Systematic approach to managing sensitive company information, ensuring data security through people, processes, and technology.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-4xl mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Compliance & Certifications</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Certified <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">excellence</span> in data protection
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Our certifications demonstrate our commitment to the highest standards of data protection, privacy, and security.
          </p>

          <p className="text-lg text-gray-500 leading-relaxed">
            Independently audited and verified by leading security firms to ensure your data is protected with enterprise-grade controls.
          </p>
        </div>

        {/* Three Certifications - Horizontal Layout */}
        <div ref={certificationsRef} className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {certifications.map((cert, index) => (
            <div key={index} className="space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 text-[#00b5ff]">
                {cert.icon}
              </div>

              {/* Content below icon */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-[#00b5ff]">
                  → {cert.subtitle}
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Compliance Info */}
        <div className="rounded-3xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Additional Certifications
              </h3>
              <div className="space-y-3">
                {[
                  { name: "CCPA Compliant", desc: "California Consumer Privacy Act adherence" },
                  { name: "HIPAA Compliant", desc: "Protected health information security" },
                  { name: "Privacy Shield", desc: "EU-U.S. data transfer framework" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Compliance Commitments
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Annual Audits", desc: "Third-party security assessments" },
                  { name: "Privacy Impact Assessments", desc: "For all new data processing features" },
                  { name: "Dedicated DPO", desc: "Data Protection Officer oversight" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact DPO */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              Want to see our certification documents or compliance reports? Contact our Data Protection Officer for detailed information.
            </p>
            <a
              href="mailto:dpo@algovision.com"
              className="inline-flex items-center gap-2 text-[#00b5ff] font-semibold hover:text-[#0099dd] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>dpo@algovision.com</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="inline-block">
          <Button
            href="#transparency"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Our Transparency Commitment
          </Button>
        </div>
      </div>
    </section>
  );
}
