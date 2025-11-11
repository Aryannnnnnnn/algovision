"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 bg-white">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div ref={ctaRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative badge */}
        <div className="mb-8">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full shadow-lg">
            <span className="text-sm font-bold text-white">Let's Connect</span>
          </div>
        </div>

        {/* Main content */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl">
            Ready to Build Something{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Amazing?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Let's transform your vision into reality. Get in touch with our team and discover how we can help your business thrive in the digital world.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            href="/company/contact"
            variant="primary"
            size="lg"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Start Your Project
          </Button>
          <Button
            href="/services"
            variant="secondary"
            size="lg"
          >
            Explore Services
          </Button>
        </div>

        {/* Contact info cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#00b5ff] transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-[#00b5ff]/20">
              <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
            <p className="text-sm text-gray-600">Quick response within 24hrs</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#00b5ff] transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-[#00b5ff]/20">
              <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with our team now</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#00b5ff] transition-all duration-500">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-[#00b5ff]/20">
              <svg className="w-6 h-6 text-[#00b5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
            <p className="text-sm text-gray-600">Mon-Fri from 8am to 6pm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
