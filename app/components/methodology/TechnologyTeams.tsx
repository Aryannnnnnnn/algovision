"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyTeams() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const cards = gsap.utils.toArray(".tech-card");
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
        <div ref={headingRef} className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Technology &{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                Teams
              </span>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="tech-card bg-gradient-to-br from-[#0a1628] to-[#1e293b] rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Our CRM Ecosystem
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Custom-built systems integrate data from every channel, providing real-time visibility and ensuring alignment across every parameter.
            </p>
          </div>

          <div className="tech-card bg-gradient-to-br from-[#0a1628] to-[#1e293b] rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Your Dedicated Team
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Strategic leads, channel specialists, data analysts, and project coordinators who own your project from discovery through completion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
