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
      image: "/images/blog-feature.jpg",
      link: "/blog",
      badge: "5 min read",
    },
    {
      type: "Case Study",
      title: "How DataFlow Systems Achieved 340% ROI",
      description: "See how we transformed stagnant ad spend into exponential revenue growth in just 6 months.",
      image: "/images/case-study.jpg",
      link: "/case-studies",
      badge: "Success Story",
    },
    {
      type: "Resource",
      title: "Enterprise Marketing Playbook 2024",
      description: "Download our comprehensive guide to scaling marketing operations for high-growth companies.",
      image: "/images/resource.jpg",
      link: "/resources",
      badge: "Free Download",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-white overflow-hidden">
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
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-[#00b5ff]/30 rounded-full mb-8 shadow-lg shadow-[#00b5ff]/20">
            <svg className="w-4 h-4 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            <span className="text-sm font-bold text-[#0095d9]">Insights & Resources</span>
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
            <div
              key={index}
              className="resource-card group relative bg-white rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_45px_-12px_rgba(0,181,255,0.3)] transition-all duration-500 overflow-hidden border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#E8F4FE] to-[#F5F3FF] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-10">{resource.type === "Latest Blog" ? "📝" : resource.type === "Case Study" ? "📊" : "📚"}</div>
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#00b5ff]/30 rounded-full text-xs font-bold text-[#0095d9]">
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
                <a
                  href={resource.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#00b5ff] hover:gap-3 transition-all duration-300"
                >
                  <span>Read More</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
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
