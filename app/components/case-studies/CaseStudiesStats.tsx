"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Award, Users, TrendingUp, Target } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudiesStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Clients Served",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
    },
    {
      icon: Award,
      value: "50+",
      label: "Industries",
    },
    {
      icon: Target,
      value: "$2B+",
      label: "Value Generated",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00b5ff]/10 mb-4">
                  <Icon className="w-8 h-8 text-[#00b5ff]" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
