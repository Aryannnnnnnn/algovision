"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  description: string;
}

interface SolutionHowItWorksProps {
  steps: Step[];
}

export default function SolutionHowItWorks({ steps }: SolutionHowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const items = gsap.utils.toArray(".step-item");
      items.forEach((item, index) => {
        gsap.fromTo(
          item as HTMLElement,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            delay: index * 0.08,
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

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Heading - Left side, sticky */}
          <div ref={headingRef} className="lg:sticky lg:top-24 max-w-2xl mx-auto order-1 lg:order-1">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-xs font-bold text-white">How It Works</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Simple Process.{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                Powerful Results.
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              Our streamlined approach ensures you get up and running quickly without compromising on quality.
            </p>

            <p className="text-lg text-gray-500 leading-relaxed">
              From strategy to execution, we handle every detail so you can focus on what matters most.
            </p>
          </div>

          {/* Steps - Right side */}
          <div className="space-y-6 order-2 lg:order-2">
            {steps.map((step, index) => (
              <div key={index} className="step-item group">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-[#00b5ff]/30 transition-all duration-300 lg:hover:translate-x-2">
                  {/* Number badge - hidden on mobile, shown on lg */}
                  <div className="hidden lg:flex absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">0{index + 1}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Number badge visible on mobile */}
                    <div className="lg:hidden flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">0{index + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0 lg:ml-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
