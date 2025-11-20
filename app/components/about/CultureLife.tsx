"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CultureLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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

      const images = gsap.utils.toArray(".culture-image");
      images.forEach((image, index) => {
        gsap.fromTo(
          image as HTMLElement,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: "back.out(1.2)",
            force3D: true,
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const metrics = [
    { value: "4.8/5", label: "Employee Satisfaction", color: "from-blue-500 to-cyan-500" },
    { value: "2.5Y", label: "Avg Tenure", color: "from-purple-500 to-pink-500" },
    { value: "45%", label: "Women in Tech", color: "from-green-500 to-emerald-500" },
    { value: "85%", label: "Promotion Rate", color: "from-orange-500 to-red-500" },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
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

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header - Left Aligned */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-xs font-bold text-white">Culture & Life</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
            Where Talent Thrives.
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              Great People, Great Products.
            </span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            We've built a culture that celebrates innovation, collaboration, and personal growth.
          </p>
        </div>

        {/* Culture Metrics - Side by Side */}
        <div className="mb-16 bg-gradient-to-br from-[#0a1628] to-[#1e293b] rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl lg:text-6xl font-black text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm lg:text-base text-gray-300 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div ref={galleryRef} className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: "01",
                title: "Innovation First",
                subtitle: "Pushing boundaries daily",
                description: "We embrace new ideas and experiment fearlessly. Creative problem-solving drives everything we do."
              },
              {
                number: "02",
                title: "Collaboration",
                subtitle: "Together we're stronger",
                description: "Brilliant minds working together create magic. We foster open communication and cross-functional teamwork."
              },
              {
                number: "03",
                title: "Continuous Growth",
                subtitle: "Never stop learning",
                description: "Development, mentorship, and expanding skills are core to your career journey with us."
              },
              {
                number: "04",
                title: "Customer Obsession",
                subtitle: "Your success is ours",
                description: "We're committed to delivering exceptional value and building lasting partnerships that drive real results."
              },
              {
                number: "05",
                title: "Transparency",
                subtitle: "Honesty builds trust",
                description: "Open dialogue and integrity guide our decisions. We communicate clearly and act with authenticity."
              },
              {
                number: "06",
                title: "Diversity & Inclusion",
                subtitle: "Different voices, shared vision",
                description: "We celebrate diversity and create an environment where every perspective makes us stronger."
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="culture-image space-y-6"
              >
                {/* Number badge - Icon equivalent */}
                <div className="w-16 h-16 flex items-center justify-center bg-[#00b5ff]/10">
                  <span className="text-3xl font-black text-[#00b5ff]">
                    {item.number}
                  </span>
                </div>

                {/* Content below icon */}
                <div className="space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-[#00b5ff]">
                    → {item.subtitle}
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
