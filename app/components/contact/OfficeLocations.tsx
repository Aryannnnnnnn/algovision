"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    city: "San Francisco",
    country: "United States",
    address: "123 Market Street, Suite 500",
    postal: "San Francisco, CA 94103",
    phone: "+1 (555) 123-4567",
    email: "sf@algovision.com",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "45 Finsbury Square",
    postal: "London EC2A 1PX",
    phone: "+44 20 1234 5678",
    email: "london@algovision.com",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    city: "Singapore",
    country: "Asia Pacific",
    address: "1 Raffles Place, #40-01",
    postal: "Singapore 048616",
    phone: "+65 1234 5678",
    email: "singapore@algovision.com",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
  },
];

export default function OfficeLocations() {
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

      const cards = gsap.utils.toArray(".office-card");
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
    <section ref={sectionRef} className="relative py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
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
          <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
            <span className="text-sm font-bold text-white">Our Offices</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Visit us{" "}
            <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            We have offices across three continents to serve you better. Stop by for a coffee and chat about your goals.
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className="office-card group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#00b5ff]/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Office Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={office.image}
                  alt={`${office.city} office`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* City Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-lg">
                    <span className="text-sm font-bold text-[#00b5ff]">{office.city}</span>
                  </div>
                </div>
              </div>

              {/* Office Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {office.city}
                  </h3>
                  <p className="text-sm text-gray-500 font-semibold">
                    {office.country}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#00b5ff] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-gray-900 font-medium">{office.address}</p>
                      <p className="text-gray-600">{office.postal}</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-gray-900 hover:text-[#00b5ff] transition-colors"
                  >
                    <svg className="w-5 h-5 text-[#00b5ff] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span className="font-medium">{office.phone}</span>
                  </a>

                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-gray-900 hover:text-[#00b5ff] transition-colors"
                  >
                    <svg className="w-5 h-5 text-[#00b5ff] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{office.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
