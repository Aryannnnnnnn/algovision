"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface SolutionPricingProps {
  tiers: PricingTier[];
}

export default function SolutionPricing({ tiers }: SolutionPricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = gsap.utils.toArray(".pricing-card");
      cards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
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
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-xs font-bold text-white">Pricing</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Simple,{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Choose the plan that fits your needs. All plans include our core features and dedicated support.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className={`grid ${tiers.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-8 max-w-7xl mx-auto`}>
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card relative bg-white rounded-3xl p-8 ${
                tier.popular
                  ? "border-2 border-[#00b5ff] shadow-2xl scale-105"
                  : "border border-gray-200 shadow-xl"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 bg-[#00b5ff] text-white text-sm font-bold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-black text-gray-900">{tier.price}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tier.description}
              </p>

              {/* CTA Button */}
              <div className="mb-8">
                <Button
                  href="/connect/book-call"
                  variant={tier.popular ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  }
                >
                  {tier.cta}
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  What's Included
                </div>
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00b5ff]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom solution? <a href="/connect/book-call" className="text-[#00b5ff] font-semibold hover:underline">Contact our sales team</a> for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
