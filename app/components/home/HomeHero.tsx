"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

// Parallax scroll handler
const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      const parallaxFast = document.querySelectorAll('.parallax-fast');

      parallaxElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = `translateY(${scrolled * 0.15}px)`;
      });

      parallaxFast.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = `translateY(${scrolled * 0.3}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    satisfaction: 0,
    years: 0,
  });

  useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Quick fade-in for left content
      tl.from(leftRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
      })
      // Quick fade-in for right cards
      .from(rightRef.current?.querySelector(".grid")?.children || [], {
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.06,
      }, "-=0.3")
      // Floating badge entrance
      .from(".floating-badge", {
        opacity: 0,
        scale: 0,
        rotation: -45,
        duration: 0.5,
        ease: "back.out(1.5)",
      }, "-=0.2");
    }, heroRef);

    // Animate stats numbers
    const animateValue = (key: keyof typeof animatedStats, start: number, end: number, duration: number) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        setAnimatedStats(prev => ({ ...prev, [key]: current }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Start animations after a short delay to match GSAP timeline
    setTimeout(() => {
      animateValue('projects', 0, 500, 1800);
      animateValue('satisfaction', 0, 98, 1800);
      animateValue('years', 0, 15, 1800);
    }, 600);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-white">

      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      {/* Subtle ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-orange-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 -right-40 w-[450px] h-[450px] bg-orange-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-orange-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div ref={leftRef} className="space-y-8">
            <div>
              <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-orange-600 rounded-full shadow-lg shadow-orange-600/30 group overflow-hidden mb-6 animate-breathing">
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                {/* Icon - Handshake/Partnership */}
                <div className="relative">
                  <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>

                {/* Text */}
                <span className="relative text-sm font-bold text-white tracking-wide drop-shadow-md">
                  Your Digital Partner
                </span>

                {/* Right arrow icon */}
                <div className="relative">
                  <svg className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6 tracking-tight">
                We Build Digital Products That People <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">Love</span>
                  <span className="absolute bottom-2 left-0 w-0 h-3 bg-orange-400/30 -rotate-1 animate-underline-expand"></span>
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Combining AI innovation, creative excellence, and strategic marketing to build digital experiences that captivate and convert.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/company/contact"
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Get Started
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="md"
              >
                View Services
              </Button>
            </div>

            {/* Stats with subtle interaction and glow */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-200">
              {[
                { key: "projects", num: animatedStats.projects, suffix: "+", label: "Projects" },
                { key: "satisfaction", num: animatedStats.satisfaction, suffix: "%", label: "Satisfaction" },
                { key: "years", num: animatedStats.years, suffix: "+", label: "Years" },
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative transition-all duration-500 ease-out group-hover:scale-105">
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-lg blur-xl transition-all duration-500 ease-out"></div>
                    <div className="relative">
                      <div className="text-4xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-500 ease-out mb-1 group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.3)]">
                        {stat.num}{stat.suffix}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div ref={rightRef} className="relative">
            <div className="grid grid-cols-2 gap-4">

              {/* AI Solutions - Hero Card */}
              <div className="col-span-2 group cursor-pointer">
                <div className="relative bg-gradient-to-br from-[#f97316] to-[#ea580c] p-8 rounded-2xl text-white shadow-md hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold bg-white text-orange-600 px-3 py-1 rounded-full">Featured</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI & Automation</h3>
                  <p className="text-white/90">Intelligent solutions that scale with your business</p>
                </div>
              </div>

              {/* Creative Card */}
              <div className="group cursor-pointer">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:border-orange-400 transition-all duration-500 ease-out h-full shadow-sm hover:shadow-md hover:-translate-y-1">
                  <div className="w-12 h-12 bg-orange-50/70 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors duration-500 ease-out">
                    <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">Creative</h3>
                  <p className="text-sm text-gray-600">Engaging content</p>
                </div>
              </div>

              {/* Marketing Card */}
              <div className="group cursor-pointer">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:border-orange-400 transition-all duration-500 ease-out h-full shadow-sm hover:shadow-md hover:-translate-y-1">
                  <div className="w-12 h-12 bg-orange-50/70 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors duration-500 ease-out">
                    <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">Marketing</h3>
                  <p className="text-sm text-gray-600">Data-driven growth</p>
                </div>
              </div>

            </div>

            {/* Floating Badge with glassmorphism */}
            <div className="absolute -top-4 -right-4 hidden lg:block floating-badge">
              <div className="relative group/badge cursor-default">
                <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white px-6 py-2.5 rounded-full shadow-lg shadow-orange-600/30 font-bold text-sm rotate-6 group-hover/badge:rotate-0 transition-all duration-700 ease-out group-hover/badge:scale-105 backdrop-blur-sm">
                  Trusted by 500+
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 64, // Scroll to next section (minus navbar height)
            behavior: 'smooth'
          });
        }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce cursor-pointer hover:text-orange-600 transition-colors group"
      >
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider group-hover:text-orange-600">Scroll</span>
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}
