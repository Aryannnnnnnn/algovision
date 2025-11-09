"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurApproach() {
  const approachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = approachRef.current?.querySelectorAll(".approach-step");
      if (steps) {
        gsap.from(steps, {
          opacity: 0,
          x: -30,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: approachRef.current,
            start: "top 80%",
          },
        });
      }
    }, approachRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Discover & Strategize",
      description: "We begin by understanding your business goals, challenges, and target audience. Through in-depth research and analysis, we craft a strategic roadmap tailored to your unique needs.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Design & Prototype",
      description: "Our creative team transforms ideas into stunning visual designs and interactive prototypes. We ensure every element aligns with your brand identity and user expectations.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Develop & Innovate",
      description: "Using cutting-edge technologies and best practices, we build robust, scalable solutions. Our agile development process ensures flexibility and continuous improvement.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Test & Refine",
      description: "Quality is paramount. We conduct rigorous testing across devices and scenarios, gathering feedback and refining every detail to ensure flawless performance.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      number: "05",
      title: "Launch & Optimize",
      description: "We ensure a smooth launch and monitor performance closely. Post-launch, we provide ongoing optimization and support to maximize your ROI and adapt to evolving needs.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-orange-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Heading */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-orange-200/70 rounded-full mb-6 shadow-sm">
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
              </svg>
              <span className="text-sm font-bold text-orange-700">Our Process</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">Approach</span>
                <span className="absolute bottom-2 left-0 w-0 h-3 bg-orange-400/30 -rotate-1 animate-underline-expand"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A proven methodology that combines strategic thinking, creative excellence, and technical expertise to deliver exceptional results
            </p>
          </div>

          {/* Right - Steps */}
          <div ref={approachRef} className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="approach-step group">
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-500 hover:-translate-x-2">
                  {/* Step number badge */}
                  <div className="absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>

                  <div className="flex items-start gap-4 ml-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200/30 group-hover:scale-110 transition-transform duration-500">
                      <div className="text-orange-600">
                        {step.icon}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-500">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-2 bottom-0 w-0.5 h-6 bg-gradient-to-b from-orange-300 to-transparent translate-y-6"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
