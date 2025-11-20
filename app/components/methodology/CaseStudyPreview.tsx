"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const cards = gsap.utils.toArray(".case-card");
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
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const caseStudies = [
    {
      company: "Global SaaS Platform",
      industry: "Technology",
      description: "How we reduced CAC by 42% while scaling acquisition 3x through AI-powered optimization and multi-channel orchestration.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      badge: "Success Story",
      result: "42% CAC Reduction"
    },
    {
      company: "Enterprise E-commerce",
      industry: "Retail",
      description: "Achieved 180% ROAS increase with full-funnel attribution visibility.",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
      badge: "Case Study",
      result: "180% ROAS"
    },
    {
      company: "B2B Fintech",
      industry: "Financial Services",
      description: "Generated 500+ SQLs monthly with 60% close rate.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      badge: "Case Study",
      result: "500+ SQLs"
    },
    {
      company: "Healthcare Technology",
      industry: "HealthTech",
      description: "Scaled from 0 to $10M ARR in 18 months with data-driven growth.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      badge: "Case Study",
      result: "$10M ARR"
    },
    {
      company: "Manufacturing Leader",
      industry: "Manufacturing",
      description: "Digital transformation driving 250% pipeline growth.",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
      badge: "Case Study",
      result: "250% Growth"
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
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-xs font-bold text-white">Results That Speak</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
            See Our Methodology In Action
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
            Real companies. Real challenges. Real results from our proven enterprise methodology.
          </p>
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <a
              key={index}
              href="/case-studies"
              className={`case-card group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                index === 0 ? 'md:col-span-5 md:row-span-2' :
                index === 1 ? 'md:col-span-3' :
                index === 2 ? 'md:col-span-3' :
                index === 3 ? 'md:col-span-4' :
                index === 4 ? 'md:col-span-4' : ''
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={study.image}
                  alt={study.company}
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
                    {study.badge}
                  </span>
                </div>

                {/* Industry */}
                <div className="text-xs font-bold text-[#00b5ff] uppercase tracking-widest mb-3">
                  {study.industry}
                </div>

                {/* Company Name */}
                <h3 className={`font-bold text-white mb-3 leading-tight group-hover:text-[#00b5ff] transition-colors ${
                  index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                }`}>
                  {study.company}
                </h3>

                {/* Description - Only show on larger cards */}
                {index === 0 && (
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6 max-w-2xl">
                    {study.description}
                  </p>
                )}

                {/* Result Metric */}
                <div className="mb-4">
                  <div className={`font-black text-white ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {study.result}
                  </div>
                </div>

                {/* Read More Arrow */}
                <div className="flex items-center gap-2 text-white group-hover:text-[#00b5ff] transition-colors">
                  <span className="text-sm font-bold uppercase tracking-wider">View Case Study</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="inline-block">
          <Button
            href="/case-studies"
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            }
          >
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}
