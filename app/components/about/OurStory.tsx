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
              <span className="text-sm font-bold text-white">Our Journey</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Story</span> Behind Algo Vision
            </h2>

            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded with a vision to revolutionize the digital landscape, Algo Vision has grown from a small startup to a trusted partner for businesses worldwide. Our journey began with a simple belief: <span className="font-semibold text-gray-900">technology should empower, not complicate.</span>
              </p>
              <p>
                Over the years, we've helped hundreds of companies transform their digital presence, streamline their operations, and achieve remarkable growth. Our secret? A relentless focus on innovation, a deep understanding of our clients' needs, and a team that's passionate about what they do.
              </p>
              <p>
                Today, we continue to push boundaries, explore new technologies, and deliver solutions that make a real difference. Because for us, success isn't just about completing projects—it's about <span className="font-semibold text-gray-900">building lasting partnerships</span> and creating value that endures.
              </p>
            </div>

            {/* Stats highlights */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
              </div>
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">98%</div>
                <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">15+</div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl p-5">
                <div className="text-4xl font-bold text-[#00b5ff] mb-1">50+</div>
                <div className="text-sm text-gray-600 font-medium">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
