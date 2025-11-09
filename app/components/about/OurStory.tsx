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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={storyRef} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 shadow-2xl shadow-orange-200/40 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-orange-600/20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            {/* Decorative element - Responsive sizing */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:-bottom-4 sm:-right-4 sm:w-24 sm:h-24 lg:-bottom-5 lg:-right-5 lg:w-28 lg:h-28 bg-orange-600 rounded-2xl -z-10"></div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-orange-50/80 backdrop-blur-md border border-orange-200/70 rounded-full mb-6 shadow-sm">
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-bold text-orange-700">Our Journey</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">Story</span>
                <span className="absolute bottom-2 left-0 w-0 h-3 bg-orange-400/30 -rotate-1 animate-underline-expand"></span>
              </span> Behind AlgoVision
            </h2>

            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded with a vision to revolutionize the digital landscape, AlgoVision has grown from a small startup to a trusted partner for businesses worldwide. Our journey began with a simple belief: <span className="font-semibold text-gray-900">technology should empower, not complicate.</span>
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
              <div className="bg-orange-50/50 border border-orange-200/50 rounded-xl p-5">
                <div className="text-4xl font-bold text-orange-600 mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
              </div>
              <div className="bg-orange-50/50 border border-orange-200/50 rounded-xl p-5">
                <div className="text-4xl font-bold text-orange-600 mb-1">98%</div>
                <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="bg-orange-50/50 border border-orange-200/50 rounded-xl p-5">
                <div className="text-4xl font-bold text-orange-600 mb-1">15+</div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="bg-orange-50/50 border border-orange-200/50 rounded-xl p-5">
                <div className="text-4xl font-bold text-orange-600 mb-1">50+</div>
                <div className="text-sm text-gray-600 font-medium">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
