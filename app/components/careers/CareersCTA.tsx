"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CareersCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
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
        <div ref={contentRef} className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
            <span className="text-xs font-bold text-white">Ready to Join?</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Start your{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
              journey with us
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Whether you're a seasoned professional or just starting your career, we're committed to helping you grow and succeed. Apply today and become part of our mission to revolutionize marketing.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                Fast
              </div>
              <div className="text-sm text-gray-600">Hiring Process</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                48hr
              </div>
              <div className="text-sm text-gray-600">Initial Response</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                2-3
              </div>
              <div className="text-sm text-gray-600">Interview Rounds</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                1-2wk
              </div>
              <div className="text-sm text-gray-600">Time to Offer</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <Button
              href="#positions"
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              }
            >
              View Open Positions
            </Button>
            <Button
              href="/company/contact"
              variant="secondary"
              size="lg"
            >
              Contact HR Team
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Equal opportunity employer</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Diversity focused</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Remote-first culture</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Visa sponsorship available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
