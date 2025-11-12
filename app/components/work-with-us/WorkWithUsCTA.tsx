"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function WorkWithUsCTA() {
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
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div ref={contentRef} className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
            <span className="text-sm font-bold text-white">Ready to Get Started?</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Let's build your{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00d4ff] to-[#00b5ff] bg-clip-text text-transparent">
              growth engine
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Join 100+ brands that trust Algo Vision to drive their digital growth. Whether you're ready to start immediately or want to explore your options, we're here to help.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                30min
              </div>
              <div className="text-sm text-gray-600">Free Strategy Call</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                24hr
              </div>
              <div className="text-sm text-gray-600">Initial Response</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                7-14d
              </div>
              <div className="text-sm text-gray-600">Time to Launch</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-[#00b5ff] to-[#0099dd] bg-clip-text mb-1">
                0
              </div>
              <div className="text-sm text-gray-600">Setup Fees</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <Button
              href="/connect/book-call"
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Book a Strategy Call
            </Button>
            <Button
              href="/company/contact"
              variant="secondary"
              size="lg"
            >
              Contact Sales Team
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Dedicated project manager</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Transparent reporting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
