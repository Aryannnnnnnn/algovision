"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroContentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
      });

      // Animate content sections
      const sections = sectionsRef.current?.querySelectorAll(".privacy-section") || [];
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
    }, heroRef);

    return () => ctx.revert();
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
              <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-sm font-bold text-white">Privacy Policy</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Your Privacy.{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Our Priority.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                This Privacy Policy explains how Algo Vision collects, uses, and protects your personal information. We are committed to transparency and compliance with GDPR, CCPA, and other privacy regulations.
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 pt-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold text-gray-900">Last Updated:</span> November 12, 2025
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Effective Date:</span> November 12, 2025
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                <Button
                  href="/company/contact"
                  variant="primary"
                  size="lg"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  Contact Us
                </Button>
                <Button
                  href="#information-collection"
                  variant="secondary"
                  size="lg"
                >
                  Read Policy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
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

        <div ref={sectionsRef} className="relative xl:max-w-[90vw] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">

            {/* Information We Collect */}
            <div id="information-collection" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                1. Information We Collect
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We collect information that you provide directly to us, as well as information automatically collected when you use our services.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">1.1 Information You Provide</h3>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Account Information:</strong> Name, email address, phone number, company name, and job title when you create an account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Payment Information:</strong> Credit card details, billing address, and payment history (processed securely through third-party payment processors)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Communications:</strong> Information you provide when you contact us, participate in surveys, or engage with our customer support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Business Data:</strong> Data you upload, analyze, or process through our platform</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">1.2 Automatically Collected Information</h3>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Usage Data:</strong> Information about how you interact with our services, including features used, pages viewed, and time spent</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance your experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div id="information-use" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                2. How We Use Your Information
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We use the information we collect for the following purposes:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Service Delivery</h4>
                        <p className="text-sm">Provide, maintain, and improve our services</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Account Management</h4>
                        <p className="text-sm">Create and manage your account and subscriptions</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Communications</h4>
                        <p className="text-sm">Send you service updates, security alerts, and support messages</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Personalization</h4>
                        <p className="text-sm">Customize your experience and provide relevant content</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Analytics</h4>
                        <p className="text-sm">Analyze usage patterns to improve our platform</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Security</h4>
                        <p className="text-sm">Detect, prevent, and address fraud, security issues, and technical problems</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Legal Compliance</h4>
                        <p className="text-sm">Comply with legal obligations and enforce our terms</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Marketing</h4>
                        <p className="text-sm">Send promotional content (with your consent, where required)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sharing and Disclosure */}
            <div id="data-sharing" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                3. Data Sharing and Disclosure
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#00b5ff] pl-6 py-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Service Providers</h3>
                    <p>We engage trusted third-party service providers to perform functions on our behalf, such as hosting, data analysis, payment processing, and customer service. These providers have access to your information only to perform specific tasks and are obligated to maintain confidentiality.</p>
                  </div>

                  <div className="border-l-4 border-[#00b5ff] pl-6 py-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Business Transfers</h3>
                    <p>In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change and inform you of choices you may have.</p>
                  </div>

                  <div className="border-l-4 border-[#00b5ff] pl-6 py-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Legal Requirements</h3>
                    <p>We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of Algo Vision, our users, or the public.</p>
                  </div>

                  <div className="border-l-4 border-[#00b5ff] pl-6 py-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">With Your Consent</h3>
                    <p>We may share your information with third parties when you explicitly consent to such sharing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div id="data-security" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                4. Data Security
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We implement industry-standard security measures to protect your personal information:
                </p>

                <div className="bg-gray-50 rounded-xl p-6 md:p-8 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Encryption:</strong> Data in transit is protected using TLS 1.3 encryption. Data at rest is encrypted using AES-256 encryption</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Access Controls:</strong> Role-based access controls and multi-factor authentication to limit access to personal data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Security Monitoring:</strong> 24/7 monitoring for suspicious activity and potential security threats</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Regular Audits:</strong> Regular security assessments, penetration testing, and third-party audits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Incident Response:</strong> Comprehensive incident response plan to address any security breaches promptly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Employee Training:</strong> Regular security training for all employees handling personal data</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-6 md:p-8">
                  <p className="text-white">
                    <strong className="text-[#00b5ff]">Important:</strong> While we implement robust security measures, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information to the best of our ability.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div id="your-rights" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                5. Your Rights
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">GDPR Rights (European Union)</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">1</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Access</h4>
                          <p className="text-sm">Request a copy of the personal information we hold about you</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">2</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Rectification</h4>
                          <p className="text-sm">Request correction of inaccurate or incomplete personal information</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">3</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Erasure</h4>
                          <p className="text-sm">Request deletion of your personal information (right to be forgotten)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">4</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Restrict Processing</h4>
                          <p className="text-sm">Request limitation on how we use your personal information</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">5</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Data Portability</h4>
                          <p className="text-sm">Request a machine-readable copy of your data to transfer to another service</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">6</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Object</h4>
                          <p className="text-sm">Object to processing based on legitimate interests or for direct marketing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">7</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Withdraw Consent</h4>
                          <p className="text-sm">Withdraw consent at any time where processing is based on consent</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">CCPA Rights (California)</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">1</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Know</h4>
                          <p className="text-sm">Request disclosure of the categories and specific pieces of personal information we collect</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">2</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Delete</h4>
                          <p className="text-sm">Request deletion of personal information we have collected</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">3</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Opt-Out</h4>
                          <p className="text-sm">Opt-out of the sale of personal information (Note: We do not sell personal information)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                          <span className="text-sm font-bold text-[#00b5ff]">4</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Non-Discrimination</h4>
                          <p className="text-sm">Exercise your privacy rights without discrimination</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">How to Exercise Your Rights</h4>
                    <p className="mb-4">To exercise any of these rights, please contact us at <a href="mailto:privacy@algovision.com" className="text-[#00b5ff] hover:underline font-semibold">privacy@algovision.com</a>. We will respond to your request within the timeframe required by applicable law (typically 30 days for GDPR requests and 45 days for CCPA requests).</p>
                    <p className="text-sm">We may need to verify your identity before processing your request. You may also designate an authorized agent to make requests on your behalf.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div id="data-retention" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                6. Data Retention
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Account Data</h4>
                      <p className="text-sm">Retained for the duration of your account plus 90 days after account closure</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Transaction Records</h4>
                      <p className="text-sm">Retained for 7 years to comply with financial regulations</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Usage Logs</h4>
                      <p className="text-sm">Retained for 12 months for security and analytics purposes</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Marketing Data</h4>
                      <p className="text-sm">Retained until you opt-out or withdraw consent</p>
                    </div>
                  </div>

                  <p>
                    When we no longer need your personal information, we will securely delete or anonymize it in accordance with our data retention and deletion procedures.
                  </p>
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div id="international-transfers" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                7. International Transfers
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
                </p>

                <div className="bg-[#1e293b] rounded-xl p-6 md:p-8 space-y-4 text-white">
                  <h4 className="text-xl font-bold text-[#00b5ff]">Our Commitment to International Data Protection</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span>We use <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission for transfers outside the EEA</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span>We ensure all international transfers comply with applicable data protection laws</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span>We conduct <strong>Transfer Impact Assessments</strong> to ensure adequate protection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span>All third-party processors are contractually bound to provide equivalent data protection</span>
                    </li>
                  </ul>
                </div>

                <p>
                  By using our services, you consent to the transfer of your information to the United States and other countries where we operate. If you are located in the EEA, UK, or Switzerland, we provide appropriate safeguards for these transfers.
                </p>
              </div>
            </div>

            {/* Updates to Privacy Policy */}
            <div id="policy-updates" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                8. Updates to This Privacy Policy
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 md:p-8 space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">How We Notify You of Changes</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Material Changes:</strong> We will notify you via email and display a prominent notice on our website at least 30 days before the changes take effect</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Minor Changes:</strong> We will update the "Last Updated" date at the top of this policy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00b5ff] mt-1.5">•</span>
                      <span><strong>Continued Use:</strong> Your continued use of our services after changes take effect constitutes acceptance of the updated policy</span>
                    </li>
                  </ul>
                </div>

                <p>
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div id="contact" className="privacy-section space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                9. Contact Information
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>

                <div className="bg-gradient-to-br from-[#00b5ff]/5 to-[#00d4ff]/5 rounded-xl p-8 md:p-10 border-2 border-[#00b5ff]/20">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Email</h5>
                      <a href="mailto:privacy@algovision.com" className="text-[#00b5ff] hover:underline text-lg font-semibold">
                        privacy@algovision.com
                      </a>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Data Protection Officer</h5>
                      <a href="mailto:dpo@algovision.com" className="text-[#00b5ff] hover:underline text-lg font-semibold">
                        dpo@algovision.com
                      </a>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Mailing Address</h5>
                      <p className="text-gray-900">
                        Algo Vision, Inc.<br />
                        Privacy Department<br />
                        1234 Innovation Drive<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Response Time</h5>
                      <p className="text-gray-900">
                        We aim to respond to all privacy inquiries within 48 hours during business days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-6 md:p-8">
                  <p className="text-white">
                    <strong className="text-[#00b5ff]">EU Representatives:</strong> If you are located in the European Union and wish to exercise your rights or raise concerns, you may also contact our EU representative at <a href="mailto:eu-representative@algovision.com" className="text-[#00b5ff] hover:underline font-semibold">eu-representative@algovision.com</a> or lodge a complaint with your local data protection authority.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="privacy-section bg-gray-50 rounded-2xl p-8 md:p-10 space-y-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                Additional Information
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Children's Privacy</h3>
                  <p>Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately, and we will take steps to delete such information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Third-Party Links</h3>
                  <p>Our services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies and Tracking</h3>
                  <p>For detailed information about how we use cookies and similar tracking technologies, please refer to our Cookie Policy. You can control cookies through your browser settings and opt-out of certain tracking through our preference center.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Do Not Track Signals</h3>
                  <p>Some browsers include a "Do Not Track" (DNT) feature. Our services currently do not respond to DNT signals, as there is no industry standard for how to interpret these signals. We will update this policy if we adopt a DNT standard in the future.</p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center pt-8 pb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Questions About Your Privacy?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                We're here to help. Contact our privacy team for any questions or concerns about how we handle your data.
              </p>
              <Button
                href="/company/contact"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Contact Privacy Team
              </Button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
