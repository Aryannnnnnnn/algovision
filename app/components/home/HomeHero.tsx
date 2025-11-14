"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

// Memoized SVG icons to prevent re-renders
const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ChevronIcon = () => (
  <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// Parallax scroll handler - Optimized with throttle and RAF
const useParallax = () => {
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      const parallaxFast = document.querySelectorAll('.parallax-fast');

      parallaxElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
      });

      parallaxFast.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
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

  // Memoize stats data to prevent unnecessary re-renders
  const statsData = useMemo(() => [
    { key: "projects", num: animatedStats.projects, suffix: "+", label: "Projects" },
    { key: "satisfaction", num: animatedStats.satisfaction, suffix: "%", label: "Satisfaction" },
    { key: "years", num: animatedStats.years, suffix: "+", label: "Years" },
  ], [animatedStats]);

  useParallax();

  useEffect(() => {
    let cleanupFunctions: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          // Start stat animations after GSAP completes
          cleanupFunctions.push(animateValue('projects', 0, 500, 1800));
          cleanupFunctions.push(animateValue('satisfaction', 0, 98, 1800));
          cleanupFunctions.push(animateValue('years', 0, 4, 1800));
        }
      });

      // Set initial states with will-change
      gsap.set(".floating-badge", {
        opacity: 0,
        scale: 0.85,
        y: 20,
        force3D: true,
        willChange: 'transform, opacity'
      });
      gsap.set(".dashboard-main", {
        opacity: 0,
        y: 30,
        force3D: true,
        willChange: 'transform, opacity'
      });

      // Quick fade-in for left content
      tl.from(leftRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        force3D: true,
        willChange: 'transform, opacity',
        onComplete: function() {
          // Remove will-change after animation completes
          gsap.set(this.targets(), { willChange: 'auto' });
        }
      })
      // Floating badge entrance
      .to(".floating-badge", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
        force3D: true,
        willChange: 'transform, opacity',
        onComplete: () => {
          gsap.set(".floating-badge", { willChange: 'auto' });
        }
      }, "-=0.2")
      // Dashboard cards fade-in
      .to(".dashboard-main", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        force3D: true,
        willChange: 'transform, opacity',
        onComplete: () => {
          gsap.set(".dashboard-main", { willChange: 'auto' });
        }
      }, "-=0.4");
    }, heroRef);

    // Animate stats numbers - Optimized with batch updates
    const animateValue = (key: keyof typeof animatedStats, start: number, end: number, duration: number) => {
      const startTime = Date.now();
      let frameId: number;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        setAnimatedStats(prev => ({ ...prev, [key]: current }));

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };
      frameId = requestAnimationFrame(animate);

      // Return cleanup function
      return () => cancelAnimationFrame(frameId);
    };

    return () => {
      ctx.revert();
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-x-hidden overflow-y-visible bg-white">

      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>


      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div ref={leftRef} className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
                <span className="text-sm font-bold text-white">Your Digital Partner</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6 tracking-tight">
                Premier marketing consultancy with complete <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">solutions delivery</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                We provide strategic marketing consultancy backed by modern solutions infrastructure: AI-powered automation, full-spectrum advertising, integrated PR and communications, and multi-channel performance marketing unified under one accountable partner.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/company/contact"
                variant="primary"
                size="md"
                icon={<ArrowIcon />}
              >
                Book a Strategy Call
              </Button>
              <Button
                href="/solutions"
                variant="secondary"
                size="md"
              >
                Explore Our Solutions
              </Button>
            </div>

            {/* Stats with subtle interaction and glow */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-200">
              {statsData.map((stat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative transition-all duration-500 ease-out group-hover:scale-105">
                    <div className="absolute inset-0 bg-[#00b5ff]/0 group-hover:bg-[#00b5ff]/10 rounded-lg blur-xl transition-all duration-500 ease-out"></div>
                    <div className="relative">
                      <div className="text-4xl font-bold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-500 ease-out mb-1 group-hover:drop-shadow-[0_0_8px_rgba(0,181,255,0.3)]">
                        {stat.num}{stat.suffix}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Floating Dashboard */}
          <div ref={rightRef} className="relative pt-0 lg:pt-12 pb-12 lg:pb-24">

            {/* Floating ROAS Badge */}
            <div className="floating-badge absolute top-4 lg:top-4 right-4 md:right-8 lg:right-12 z-30 bg-white rounded-xl md:rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,181,255,0.4)] px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-3 border border-blue-100/50 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#00b5ff] mb-0.5 md:mb-1">+48% ROAS</div>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] text-gray-500 font-medium">By managing engagement</p>
                <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
            </div>

            {/* Main Dashboard Container with Floating Effect */}
            <div className="dashboard-main relative mt-0 lg:mt-0 min-h-[600px] lg:min-h-[700px]">

              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-blue-100/30 rounded-[36px] blur-2xl"></div>

              {/* Floating Metric Cards - Outside Main Container - Tablet & Desktop */}
              <div className="hidden lg:grid absolute -left-4 xl:-left-20 top-[120px] xl:top-[140px] z-30 grid-cols-2 gap-2 xl:gap-3 w-[280px] xl:w-[380px]">

                  {/* Comments Hidden */}
                  <div className="bg-white rounded-lg lg:rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-2.5 lg:px-4 py-2.5 lg:py-4 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(239,68,68,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-2 lg:mb-3">
                      <span className="text-[9px] lg:text-xs text-gray-500 font-semibold">Comments hidden</span>
                      <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-md lg:rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm">
                        <svg className="w-2 h-2 lg:w-3 lg:h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-base lg:text-2xl font-bold text-gray-900">25,627</div>
                  </div>

                  {/* Replies Issued */}
                  <div className="bg-white rounded-lg lg:rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-2.5 lg:px-4 py-2.5 lg:py-4 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-2 lg:mb-3">
                      <span className="text-[9px] lg:text-xs text-gray-500 font-semibold">Replies issued</span>
                      <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-md lg:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                        <svg className="w-2 h-2 lg:w-3 lg:h-3 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-base lg:text-2xl font-bold text-gray-900">45,683</div>
                  </div>

                  {/* Alerts Sent */}
                  <div className="bg-white rounded-lg lg:rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-2.5 lg:px-4 py-2.5 lg:py-4 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(251,146,60,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-2 lg:mb-3">
                      <span className="text-[9px] lg:text-xs text-gray-500 font-semibold">Alerts sent</span>
                      <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-md lg:rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center shadow-sm">
                        <svg className="w-2 h-2 lg:w-3 lg:h-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-base lg:text-2xl font-bold text-gray-900">163</div>
                  </div>

                  {/* Tags Added */}
                  <div className="bg-white rounded-lg lg:rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-2.5 lg:px-4 py-2.5 lg:py-4 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-2 lg:mb-3">
                      <span className="text-[9px] lg:text-xs text-gray-500 font-semibold">Tags added</span>
                      <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-md lg:rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center shadow-sm">
                        <svg className="w-2 h-2 lg:w-3 lg:h-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-base lg:text-2xl font-bold text-gray-900">114,570</div>
                  </div>

              </div>

              {/* AI Insights - Positioned to overlap stats - Desktop only */}
              <div className="hidden lg:block absolute z-40 bg-white border border-white/60 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_-10px_rgba(0,181,255,0.3)] transition-all duration-300 lg:right-2 lg:bottom-[60px] lg:w-[280px] lg:rounded-xl lg:px-3 lg:py-3 xl:right-8 xl:bottom-[80px] xl:w-[300px] xl:rounded-2xl xl:px-5 xl:py-5 2xl:w-[420px]">
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                    <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900">AI insights</span>
                </div>
                <div className="space-y-2.5">
                  <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 rounded-xl px-4 py-3 border border-blue-100/40 shadow-inner">
                    <p className="text-xs text-gray-800 font-semibold mb-1.5">
                      What happened on my socials yesterday?
                    </p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">
                      +325% surge in positive and +158% increase in purchase intent
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50/80 to-blue-50/60 rounded-xl px-4 py-3 border border-green-100/40 shadow-inner">
                    <p className="text-xs text-gray-800 font-semibold mb-1.5">
                      Top performing content this week
                    </p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">
                      Video posts generated 2.5x more engagement than images
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-[#E8F4FE] via-[#F5F3FF] to-[#E8F4FE] rounded-2xl lg:rounded-[36px] shadow-[0_25px_70px_-20px_rgba(0,0,0,0.12)] border border-blue-100/30 backdrop-blur-sm p-4 lg:p-8 pt-4 lg:pt-8 pb-4 lg:pb-8">

                {/* Top Header - Full Width */}
                <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] px-5 py-3.5 mb-6 border border-white/60 hover:shadow-[0_12px_40px_-10px_rgba(0,181,255,0.25)] transition-shadow duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold text-gray-800">How Algo Vision supports your brand</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/70 text-gray-400 hover:text-blue-500 hover:bg-white transition-all duration-200 shadow-sm">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/70 text-gray-400 hover:text-blue-500 hover:bg-white transition-all duration-200 shadow-sm">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#00b5ff] to-[#0095d9] text-white shadow-md hover:shadow-lg transition-all duration-200">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                {/* Content Section with Stats Space and Strategy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

                  {/* Left: Empty space for floating stats - Desktop only */}
                  <div className="hidden lg:block h-[280px]" />

                  {/* Stats Grid - Mobile & Tablet only */}
                  <div className="lg:hidden grid grid-cols-2 gap-3 mb-4">
                    {/* Mobile stats cards using same code from BrandDashboard */}
                    <div className="bg-white rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-4 py-3 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(239,68,68,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] text-gray-500 font-semibold">Comments hidden</span>
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">25,627</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-4 py-3 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] text-gray-500 font-semibold">Replies issued</span>
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">45,683</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-4 py-3 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(251,146,60,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] text-gray-500 font-semibold">Alerts sent</span>
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">163</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-4 py-3 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] text-gray-500 font-semibold">Tags added</span>
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">114,570</div>
                    </div>
                  </div>

                  {/* Strategy & AI - Full width on mobile/tablet, second column on lg+ */}
                  <div className="relative space-y-4">
                    {/* Your Strategy */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-4 md:px-5 py-3 md:py-4 pb-6 md:pb-8 lg:pb-12 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.2)] transition-all duration-300 lg:min-h-[320px]">
                      <div className="flex items-center gap-2 mb-3.5">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                          <svg className="w-3.5 h-3.5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-gray-900">Your strategy</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Comment description", color: "bg-orange-400" },
                          { label: "Crisis Monitoring", color: "bg-orange-400" },
                          { label: "Community Management", color: "bg-[#00b5ff]" },
                          { label: "Insights & Tagging", color: "bg-purple-400" },
                          { label: "Sentiment Analysis", color: "bg-green-400" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 hover:bg-gray-50/70 px-2 -mx-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                              <span className="text-xs text-gray-600">{item.label}</span>
                            </div>
                            <ChevronIcon />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights - Mobile & Tablet only */}
                    <div className="lg:hidden bg-white rounded-xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] px-4 py-3 border border-white/60 hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.2)] transition-all duration-300">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold text-gray-900">AI insights</span>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 rounded-lg px-3 py-2 border border-blue-100/40 shadow-inner">
                        <p className="text-[10px] text-gray-800 font-semibold mb-1">
                          What happened on my socials yesterday?
                        </p>
                        <p className="text-[8px] text-gray-600 leading-relaxed">
                          +325% surge in positive and +158% increase in purchase intent
                        </p>
                      </div>
                    </div>
                  </div>

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
        className="hidden lg:flex absolute bottom-38 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce cursor-pointer hover:text-[#00b5ff] transition-colors group"
      >
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider group-hover:text-[#00b5ff]">Scroll</span>
        <svg className="w-5 h-5 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}
