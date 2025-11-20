"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The strategy call was incredibly valuable. Within 30 minutes, they identified issues we'd been struggling with for months and provided a clear path forward.",
    author: "Sarah Chen",
    role: "CMO at TechVenture",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    quote: "No fluff, just actionable insights. They analyzed our campaigns and showed us exactly where we were losing money. Implemented their recommendations and saw 40% ROI improvement.",
    author: "Michael Rodriguez",
    role: "Founder, E-commerce Brand",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    quote: "Best 30 minutes I've spent on marketing strategy. They didn't try to sell us anything—just gave us a roadmap we could execute on our own. We ended up working with them anyway!",
    author: "Emily Thompson",
    role: "VP Marketing, SaaS Startup",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

export default function BookCallTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const cards = gsap.utils.toArray(".testimonial-card");
      cards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #00b5ff 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-xs font-bold text-white">What People Say</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Don't just take our{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              word for it
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Hear from marketing leaders who've booked a strategy call with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#00b5ff]/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#00b5ff]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-[#00b5ff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#00b5ff]/10 group-hover:border-[#00b5ff]/30 transition-all duration-300 rounded-br-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
