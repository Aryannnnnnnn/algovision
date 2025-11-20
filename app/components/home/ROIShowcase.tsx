"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function ROIShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedROI, setAnimatedROI] = useState(0);
  const [animatedGrowth, setAnimatedGrowth] = useState(0);
  const [animatedClients, setAnimatedClients] = useState(0);
  const [animatedPartners, setAnimatedPartners] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".roi-container", { autoAlpha: 1 });
      gsap.set(".stat-box", { autoAlpha: 1 });

      // Animate the main container immediately on mount
      gsap.fromTo(".roi-container",
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5
        }
      );

      // Animate stat boxes with stagger
      gsap.fromTo(".stat-box",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.8
        }
      );

      // Start number animations after a delay
      setTimeout(() => {
        animateValue(setAnimatedROI, 0, 30000000, 2000);
        animateValue(setAnimatedGrowth, 0, 340, 1800);
        animateValue(setAnimatedClients, 0, 136, 1500);
        animateValue(setAnimatedPartners, 0, 50, 1600);
      }, 1200);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    start: number,
    end: number,
    duration: number
  ) => {
    const startTime = Date.now();
    let frameId: number;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      setter(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  };

  const formatROI = (value: number) => {
    return `$${(value / 1000000).toFixed(0)},${String(value % 1000000)
      .padStart(6, "0")
      .slice(0, 3)},${String(value % 1000).padStart(3, "0")}`;
  };

  return (
    <section ref={sectionRef} className="relative pb-12 lg:pb-16 z-20">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Container */}
        <div className="roi-container bg-gray-50 rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Side - Total ROI */}
            <div className="stat-box bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center">
              <div className="mb-4">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Total ROI
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 mb-2">
                  {formatROI(animatedROI)}<span className="text-[#00b5ff] text-sm align-top ml-0.5">+</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  measured ROI delivered
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  href="/company/contact"
                  variant="primary"
                  size="sm"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  }
                >
                  Apply Now
                </Button>
              </div>
            </div>

            {/* Right Side - More Statistics */}
            <div className="flex flex-col justify-center">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                More Statistics
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Average Growth */}
                <div className="stat-box bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center">
                  <div className="text-2xl sm:text-3xl font-normal text-gray-900 mb-1">
                    {animatedGrowth}<span className="text-[#00b5ff] text-xl align-top">%</span><span className="text-[#00b5ff] text-sm align-top ml-0.5">+</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                    average growth for core cohorts
                  </div>
                </div>

                {/* Clients Served */}
                <div className="stat-box bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center">
                  <div className="text-2xl sm:text-3xl font-normal text-gray-900 mb-1">
                    {animatedClients}<span className="text-[#00b5ff] text-sm align-top ml-0.5">+</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                    clients across 10+ industries
                  </div>
                </div>

                {/* Partners */}
                <div className="stat-box bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center col-span-2">
                  <div className="text-2xl sm:text-3xl font-normal text-gray-900 mb-1">
                    {animatedPartners}<span className="text-[#00b5ff] text-sm align-top ml-0.5">+</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                   strategic media, AI & analytics partners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
