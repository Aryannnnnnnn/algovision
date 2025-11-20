"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = storyRef.current?.children || [];
      gsap.from(children, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={storyRef} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            {/* Decorative element - positioned behind */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:-bottom-8 sm:-right-8 sm:w-40 sm:h-40 lg:-bottom-10 lg:-right-10 lg:w-48 lg:h-48 bg-[#00b5ff] rounded-2xl -z-10"></div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Our Story"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-xs font-bold text-white">Our Journey</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Story
                </span>
              </span>
              {' '}Behind Algo Vision
            </h2>

            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
               Founded in 2021, AlgoVision emerged from a singular conviction: <span className="font-semibold text-gray-900">every project in the digital and technological sector deserves to be executed with precision, completed without exception, and delivered with absolute certainty.</span>
              </p>
              <p>
               Headquartered globally with operations spanning multiple continents, AlgoVision serves the world's most demanding leading enterprises, investment firms, healthcare organizations, and e-commerce giants. Our fully integrated methodology combines proprietary CRM systems, AI-powered solutions, and omnichannel expertise to deliver outcomes that transform businesses and redefine what's possible in digital marketing.
              </p>
              <p>
                What sets us apart is simple: <span className="font-semibold text-gray-900"> we don't onboard projects we can't guarantee.</span> Our selective approach, backed by a parameter-driven framework, has resulted in a 100% project completion rate since inception—a benchmark unmatched in the industry.
              </p>
            </div>

            {/* Stats highlights */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">110+</div>
                <div className="text-sm text-gray-600 font-medium">Team Members</div>
              </div>
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">98%</div>
                <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">4+</div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">15+</div>
                <div className="text-sm text-gray-600 font-medium">Industries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
