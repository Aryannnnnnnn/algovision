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
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Animate resource cards
      const cards = gsap.utils.toArray(".resource-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 90%",
              once: true,
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
    {
      type: "Webinar",
      title: "Mastering Multi-Platform Attribution",
      description: "Join our experts to learn advanced techniques for tracking customer journeys across channels.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      link: "/webinars",
      badge: "Live Session",
    },
    {
      type: "White Paper",
      title: "AI in Marketing: 2024 Trends",
      description: "Explore cutting-edge AI applications transforming the marketing landscape.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      link: "/resources",
      badge: "Research",
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
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-sm font-bold text-white">Insights & Resources</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
            Intelligence You Can Use
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            Stay ahead with insights, strategies, and proven frameworks from our marketing experts.
          </p>
        </div>

        {/* Collage Grid - Version 2.0 */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-12">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className={`resource-card group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                index === 0 ? 'md:col-span-5 md:row-span-2' :
                index === 1 ? 'md:col-span-3' :
                index === 2 ? 'md:col-span-3' :
                index === 3 ? 'md:col-span-4' :
                index === 4 ? 'md:col-span-4' :
                index === 5 ? 'md:col-span-8' : ''
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
              </div>

              {/* Content Overlay */}
              <div className={`relative h-full flex flex-col justify-end p-6 ${
                index === 0 ? 'md:p-10 min-h-[400px]' : 'min-h-[280px]'
              }`}>
                {/* Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-3 py-1 bg-[#00b5ff] rounded-full text-[10px] font-bold text-white shadow-lg">
                    {resource.badge}
                  </span>
                </div>

                {/* Type */}
                <div className="text-xs font-bold text-[#00b5ff] uppercase tracking-widest mb-3">
                  {resource.type}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-white mb-3 leading-tight group-hover:text-[#00b5ff] transition-colors ${
                  index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                }`}>
                  {resource.title}
                </h3>

                {/* Description - Only show on larger cards */}
                {(index === 0 || index === 5) && (
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6 max-w-2xl">
                    {resource.description}
                  </p>
                )}

                {/* Read More Arrow */}
                <div className="flex items-center gap-2 text-white group-hover:text-[#00b5ff] transition-colors">
                  <span className="text-sm font-bold uppercase tracking-wider">Explore</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
