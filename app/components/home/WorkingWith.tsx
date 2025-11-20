"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkingWith() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading only
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerInner = scroller.querySelector('.scroller-inner') as HTMLElement;
    if (!scrollerInner) return;

    // Clone the logos for seamless loop
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      scrollerInner.appendChild(duplicatedItem);
    });

    // Set up GSAP animation for infinite scroll
    const totalWidth = scrollerInner.scrollWidth / 2;

    gsap.to(scrollerInner, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  // Company logos
  const logos = [
    { name: "Partner 1", src: "/trusted logos/1.png" },
    { name: "Partner 2", src: "/trusted logos/2.png" },
    { name: "Partner 3", src: "/trusted logos/3.png" },
    { name: "Partner 4", src: "/trusted logos/4.png" },
    { name: "Partner 5", src: "/trusted logos/5.png" },
    { name: "Partner 6", src: "/trusted logos/6.png" },
    { name: "Partner 7", src: "/trusted logos/7.png" },
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
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg mb-6">
            <span className="text-xs font-bold text-white">Our Clients</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Companies we{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                work with
              </span>
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Partnering with businesses across industries to drive growth and achieve their marketing goals
          </p>
        </div>

        {/* Infinite Scrolling Logos */}
        <div ref={scrollerRef} className="overflow-hidden">
          <div className="scroller-inner flex items-center gap-12 lg:gap-16">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-shrink-0 w-32 lg:w-40"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full h-16 lg:h-20 object-contain"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-gray-400 font-semibold text-sm lg:text-base text-center">
                        ${logo.name}
                      </div>
                    `;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
