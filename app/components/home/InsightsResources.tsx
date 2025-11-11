"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function InsightsResources() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // Animate resource cards
      const cards = gsap.utils.toArray(".resource-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const resources = [
    {
      type: "Latest Blog",
      title: "The Future of Omnichannel Marketing",
      description: "Discover how AI-driven strategies are reshaping customer engagement across every platform.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      link: "/blog",
      badge: "5 min read",
    },
    {
      type: "Case Study",
      title: "How DataFlow Systems Achieved 340% ROI",
      description: "See how we transformed stagnant ad spend into exponential revenue growth in just 6 months.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      link: "/case-studies",
      badge: "Success Story",
    },
    {
      type: "Resource",
      title: "Enterprise Marketing Playbook 2024",
      description: "Download our comprehensive guide to scaling marketing operations for high-growth companies.",
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80",
      link: "/resources",
      badge: "Free Download",
    },
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
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Insights & Resources</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
            Intelligence You Can Use
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            Stay ahead with insights, strategies, and proven frameworks from our marketing experts.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="resource-card group block relative bg-white rounded-2xl  hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden border-2 border-gray-300 hover:border-[#1e293b] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 bg-[#1e293b] rounded-full text-xs font-bold text-white shadow-lg">
                    {resource.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-bold text-[#00b5ff] uppercase tracking-wider mb-3">
                  {resource.type}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#00b5ff] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {resource.description}
                </p>

                {/* Read More with Arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-[#00b5ff] transition-colors duration-300">Read More</span>
                  <div className="w-10 h-10 rounded-full bg-[#1e293b] group-hover:bg-[#00b5ff] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="inline-block">
          <Button
            href="/resources"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Visit Resource Center
          </Button>
        </div>
      </div>
    </section>
  );
}
