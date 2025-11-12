"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionComparison() {
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

      const tiers = gsap.utils.toArray(".tier-card");
      tiers.forEach((tier, index) => {
        gsap.from(tier as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tier as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tiers = [
    {
      name: "Startup",
      price: "Custom",
      description: "Perfect for growing startups ready to scale their digital presence",
      features: [
        "Up to 5 advertising platforms",
        "2 AI solutions included",
        "Basic PR & communications",
        "Email & SMS marketing",
        "Monthly performance reports",
        "Dedicated account manager"
      ],
      cta: "Start Growing",
      popular: false
    },
    {
      name: "Growth",
      price: "Custom",
      description: "Designed for scaling companies with established product-market fit",
      features: [
        "Up to 12 advertising platforms",
        "Full AI automation suite",
        "Advanced PR & media placements",
        "Multi-channel growth marketing",
        "Weekly optimization calls",
        "Priority support",
        "Quarterly strategy reviews",
        "Custom integrations"
      ],
      cta: "Accelerate Growth",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Comprehensive solution for enterprise-scale operations",
      features: [
        "All 45+ solutions available",
        "White-glove implementation",
        "Crisis management included",
        "24/7 dedicated support team",
        "Custom framework development",
        "Executive strategy sessions",
        "Full compliance & governance",
        "Unlimited integrations",
        "SOC 2 Type II certified infrastructure"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-4xl mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Pricing Tiers</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Choose Your <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Growth Plan</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Flexible packages designed to scale with your business from startup to enterprise.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`tier-card relative bg-white rounded-3xl p-8 ${
                tier.popular
                  ? 'border-2 border-[#00b5ff] shadow-2xl scale-105'
                  : 'border border-gray-200 shadow-xl'
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
            All plans include onboarding, training, and ongoing optimization. <a href="/connect/book-call" className="text-[#00b5ff] font-semibold hover:underline">Schedule a call</a> to discuss custom enterprise packages.
          </p>
        </div>
      </div>
    </section>
  );
}
