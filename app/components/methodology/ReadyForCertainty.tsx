"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyForCertainty() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
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
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
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

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-gray-200">
          <div ref={contentRef} className="space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Ready to Experience{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Certainty?
                </span>
              </span>
            </h2>

            <div className="space-y-4 text-gray-600 text-lg leading-relaxed max-w-4xl">
              <p>
                Enterprises partner with AlgoVision because they value precision executed at speed, depth of insight, and a standard of delivery where every commitment is fulfilled.
              </p>
              <p className="font-semibold text-gray-900">
                We don't chase volume—we guarantee outcomes.
              </p>
              <p>
                Our process leaves no room for assumptions—only parameters, precision, and performance.
              </p>
              <p>
                That's the difference between trying to deliver and being certain of delivery.
              </p>
              <p className="font-semibold text-gray-900">
                When we commit, outcomes follow.
              </p>
              <p className="text-xl font-bold text-gray-900">
                That's not ambition. It's our baseline.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                Let's begin with a Discovery Consultation to determine the strategic fit, success parameters, and the most direct path to measurable results.
              </p>
              <Button
                href="/connect/book-call"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                Initiate Discovery Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
