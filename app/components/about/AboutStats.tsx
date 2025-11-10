"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    satisfaction: 0,
    years: 0,
    team: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.from(statItems, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            onEnter: () => {
              // Trigger number animations
              animateValue('projects', 0, 500, 1500);
              animateValue('satisfaction', 0, 98, 1500);
              animateValue('years', 0, 15, 1500);
              animateValue('team', 0, 50, 1500);
            },
          },
        });
      }
    }, statsRef);

    return () => ctx.revert();
  }, []);

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

  const stats = [
    {
      key: "projects" as const,
      number: animatedStats.projects,
      suffix: "+",
      label: "Projects Delivered",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      key: "satisfaction" as const,
      number: animatedStats.satisfaction,
      suffix: "%",
      label: "Client Satisfaction",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      key: "years" as const,
      number: animatedStats.years,
      suffix: "+",
      label: "Years Experience",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      key: "team" as const,
      number: animatedStats.team,
      suffix: "+",
      label: "Team Members",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  return (
    <section ref={statsRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item group">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-[#00b5ff] transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-md shadow-[#00b5ff]/20">
                  <div className="text-[#00b5ff]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors duration-500">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
