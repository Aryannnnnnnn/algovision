"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Us",
    subtitle: "General inquiries",
    details: [
      { label: "General", value: "hello@algovision.com" },
      { label: "Support", value: "support@algovision.com" },
      { label: "Sales", value: "sales@algovision.com" },
    ],
  },
  {
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Call Us",
    subtitle: "Mon-Fri 9am-6pm EST",
    details: [
      { label: "US & Canada", value: "+1 (555) 123-4567" },
      { label: "UK & Europe", value: "+44 20 1234 5678" },
      { label: "Asia Pacific", value: "+65 1234 5678" },
    ],
  },
  {
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Live Chat",
    subtitle: "24/7 instant support",
    details: [
      { label: "Average response", value: "Under 2 minutes" },
      { label: "Availability", value: "24/7/365" },
      { label: "Languages", value: "15+ languages" },
    ],
  },
];

export default function ContactInfo() {
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

      const cards = gsap.utils.toArray(".contact-method-card");
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
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-20">
          <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full mb-8 shadow-lg">
            <span className="text-xs font-bold text-white">Contact Methods</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            How can we{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              help you?
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Choose the best way to reach us. We're available 24/7 to support your success.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="contact-method-card space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 text-[#00b5ff]">
                {method.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {method.title}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-[#00b5ff]">
                  → {method.subtitle}
                </p>

                {/* Details */}
                <div className="space-y-2 pt-2">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-gray-500">{detail.label}:</span>
                      <span className="text-sm text-gray-900 font-medium text-right">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
