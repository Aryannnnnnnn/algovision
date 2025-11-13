'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/app/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function DataTransformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([leftRef.current, rightRef.current], { opacity: 1 });

      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      // Animate right side
      const rightChildren = rightRef.current?.children || [];
      gsap.from(rightChildren, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        ></div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -left-40 top-20 w-80 h-80 bg-[#00b5ff]/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 bottom-20 w-80 h-80 bg-[#00b5ff]/5 rounded-full blur-3xl"></div>

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left Side - Visual/Icon */}
          <div ref={leftRef} className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              {/* Main Image/Visual */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#00b5ff]/5 to-transparent">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Data transformation"
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                  decoding="async"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00b5ff]/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating stat card - top right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-2xl p-6 border border-[#00b5ff]/20 animate-float">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#00b5ff] mb-1">∞</div>
                  <div className="text-xs text-gray-600 font-semibold">Possibilities</div>
                </div>
              </div>

              {/* Floating stat card - bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-[#1e293b] rounded-xl shadow-2xl p-6 border border-[#00b5ff]/20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00b5ff] mb-1">Any Source</div>
                  <div className="text-xs text-gray-400 font-semibold">Any Format</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div ref={rightRef} className="order-1 lg:order-2 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-sm font-bold text-white">Infinite Possibilities</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              What Data Would You Choose To{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Transform Your Business?
                </span>
              </span>
            </h2>

            {/* Content */}
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                If you don't have it, who else might? How do you start to collaborate with those individuals to create something really amazing?
              </p>

              <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                Because if you can dream it, we can help you achieve it.
              </p>

              <p className="text-xl text-gray-600 leading-relaxed">
                The sky is truly the limit here.
              </p>

              <div className="bg-gradient-to-br from-[#00b5ff]/10 to-transparent border-l-4 border-[#00b5ff] rounded-r-xl p-6">
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  But unlike others who say this as marketing speak, we have the methodology, systems, and track record to actually deliver on it.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="inline-block pt-4">
              <Button
                href="/connect/book-call"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Start Your Transformation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
