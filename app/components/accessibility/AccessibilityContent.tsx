"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AccessibilityContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);

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

      // Content sections animation
      const sections = contentSectionRef.current?.querySelectorAll(".content-block") || [];
      gsap.from(sections, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: contentSectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden">
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
                <span className="text-xs font-bold text-white">Accessibility Statement</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Technology for{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Everyone
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                At Algo Vision, we believe that digital accessibility is essential. We are committed to ensuring that our platform is usable by everyone, regardless of ability or technology used.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                <Button
                  href="/company/contact"
                  variant="primary"
                  size="lg"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  }
                >
                  Report Accessibility Issue
                </Button>
                <Button
                  href="#commitment"
                  variant="secondary"
                  size="lg"
                >
                  Our Commitment
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 max-w-2xl">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                    WCAG
                  </div>
                  <div className="text-sm text-gray-600">2.1 AA</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Inclusive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
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

        <div ref={contentSectionRef} className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-16">

            {/* Our Commitment */}
            <div id="commitment" className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Our Commitment</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Accessible by{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Design
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Algo Vision is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.
                </p>
                <p>
                  We believe that technology should be inclusive, and we strive to design and develop our platform with accessibility at the forefront. Our commitment extends to all aspects of our digital presence, from our website to our algorithmic visualization tools.
                </p>
              </div>
            </div>

            {/* WCAG Compliance */}
            <div className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Standards Compliance</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                WCAG 2.1 Level{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  AA Conformance
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Our platform aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
                </p>
                <p>
                  WCAG 2.1 Level AA conformance means that our website meets all Level A and Level AA success criteria, covering a wide range of recommendations for making web content more accessible. Following these guidelines makes content accessible to a wider range of people with disabilities, including:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2.5"></span>
                    <span>Blindness and low vision</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2.5"></span>
                    <span>Deafness and hearing loss</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2.5"></span>
                    <span>Limited movement and dexterity challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2.5"></span>
                    <span>Speech disabilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2.5"></span>
                    <span>Cognitive and learning disabilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2.5"></span>
                    <span>Combinations of these disabilities</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Features</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Built-in{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Accessibility
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Algo Vision incorporates the following accessibility features:
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Keyboard Navigation",
                    description: "Full keyboard navigation support with visible focus indicators for all interactive elements.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    ),
                  },
                  {
                    title: "Screen Reader Support",
                    description: "Semantic HTML and ARIA labels ensure compatibility with screen readers like JAWS, NVDA, and VoiceOver.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Color Contrast",
                    description: "All text and interactive elements meet WCAG AA contrast ratios for readability.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    ),
                  },
                  {
                    title: "Resizable Text",
                    description: "Text can be resized up to 200% without loss of content or functionality.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    ),
                  },
                  {
                    title: "Alternative Text",
                    description: "Descriptive alt text for all images and visual content, including algorithm visualizations.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Clear Navigation",
                    description: "Consistent navigation structure with skip links and clear heading hierarchy.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    ),
                  },
                  {
                    title: "Form Accessibility",
                    description: "All form inputs have clear labels, instructions, and error messages that are announced to screen readers.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Motion Control",
                    description: "Respect for user preferences, including reduced motion settings for animations.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center text-[#00b5ff]">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Known Limitations */}
            <div className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Transparency</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Known{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Limitations
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  While we strive for full accessibility, we acknowledge that some areas of our platform may not yet meet all WCAG 2.1 AA standards:
                </p>
                <div className="space-y-3 bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-amber-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-amber-900">Complex Algorithm Visualizations</p>
                      <p className="text-sm text-amber-800 mt-1">Some interactive algorithm visualizations may have limited screen reader support. We are actively working to provide text-based alternatives and enhanced descriptions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-amber-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-amber-900">Third-Party Embedded Content</p>
                      <p className="text-sm text-amber-800 mt-1">Some embedded content from third-party providers may not fully meet accessibility standards. We are working with our partners to address these issues.</p>
                    </div>
                  </div>
                </div>
                <p>
                  We are committed to addressing these limitations and regularly audit our platform for accessibility improvements.
                </p>
              </div>
            </div>

            {/* Feedback and Contact */}
            <div className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Get in Touch</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We Value Your{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Feedback
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  We welcome your feedback on the accessibility of Algo Vision. If you encounter any accessibility barriers or have suggestions for improvement, please let us know:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:accessibility@algovision.com" className="text-[#00b5ff] hover:text-[#0099dd] transition-colors">
                        accessibility@algovision.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a href="tel:+1-800-ALGO-VIS" className="text-[#00b5ff] hover:text-[#0099dd] transition-colors">
                        +1 (800) ALGO-VIS
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Contact Form</p>
                      <a href="/company/contact" className="text-[#00b5ff] hover:text-[#0099dd] transition-colors">
                        Submit a feedback form
                      </a>
                    </div>
                  </div>
                </div>
                <p>
                  We aim to respond to accessibility feedback within 2-3 business days and will work with you to provide an accessible alternative where possible.
                </p>
              </div>
            </div>

            {/* Third-party Content */}
            <div className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Important Information</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Third-Party{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Content
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Algo Vision may contain links to third-party websites or integrate third-party services. We are not responsible for the accessibility of content or services provided by third parties. However, we strive to partner with organizations that share our commitment to accessibility.
                </p>
                <p>
                  If you encounter accessibility issues with third-party content on our platform, please contact us, and we will work with our partners to address the concern.
                </p>
              </div>
            </div>

            {/* Ongoing Improvements */}
            <div className="content-block space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
                <span className="text-xs font-bold text-white">Continuous Progress</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Ongoing{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Improvements
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Accessibility is an ongoing effort, not a one-time achievement. Our commitment includes:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Regular accessibility audits by third-party experts and automated testing tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Continuous training for our development team on accessibility best practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Integration of accessibility testing into our development and QA processes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>User testing with people with disabilities to gather real-world feedback</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Regular updates to this accessibility statement to reflect our progress</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#00b5ff]/5 border border-[#00b5ff]/20 rounded-xl p-6 mt-6">
                <p className="text-base text-gray-700">
                  <strong className="text-gray-900">Last Updated:</strong> November 2025
                </p>
                <p className="text-base text-gray-700 mt-2">
                  <strong className="text-gray-900">Next Review:</strong> February 2026
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="content-block pt-8 pb-4">
              <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 md:p-12 text-center">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Questions About Accessibility?
                </h3>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our team is here to help. Contact us to discuss your accessibility needs or report any issues you encounter.
                </p>
                <Button
                  href="/company/contact"
                  variant="primary"
                  size="lg"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  }
                >
                  Contact Our Accessibility Team
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
