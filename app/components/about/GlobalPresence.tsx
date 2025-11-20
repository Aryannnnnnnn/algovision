"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/app/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

// Office locations data
const officeLocations = [
  { name: "New York", label: "New York", team: "120+", lat: 40.7128, lng: -74.0060 },
  { name: "Edinburgh", label: "Edinburgh", team: "80+", lat: 55.9533, lng: -3.1883 },
  { name: "Dubai", label: "Dubai", team: "60+", lat: 25.2048, lng: 55.2708 },
];

// Globe component with AlgoVision office locations
function Globe3D() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#1e3a5f",
    showAtmosphere: true,
    atmosphereColor: "#00b5ff",
    atmosphereAltitude: 0.15,
    emissive: "#0d1f3a",
    emissiveIntensity: 0.2,
    shininess: 0.9,
    polygonColor: "rgba(0,181,255,0.8)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 40, lng: 10 }, // Center view to show all offices during rotation
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

  // AlgoVision office connections
  const officeConnections = [
    {
      order: 1,
      startLat: 40.7128, // New York
      startLng: -74.0060,
      endLat: 55.9533, // Edinburgh
      endLng: -3.1883,
      arcAlt: 0.3,
      color: colors[0],
    },
    {
      order: 2,
      startLat: 55.9533, // Edinburgh
      startLng: -3.1883,
      endLat: 25.2048, // Dubai
      endLng: 55.2708,
      arcAlt: 0.4,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 40.7128, // New York
      startLng: -74.0060,
      endLat: 25.2048, // Dubai
      endLng: 55.2708,
      arcAlt: 0.5,
      color: colors[2],
    },
  ];

  return (
    <div className="w-full h-full">
      <World data={officeConnections} globeConfig={globeConfig} offices={officeLocations} />
    </div>
  );
}

export default function GlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate right side
      const rightChildren = rightRef.current?.children || [];
      gsap.from(rightChildren, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="relative xl:max-w-[95vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center w-full">

          {/* Left Side - Content */}
          <div ref={rightRef} className="order-1 lg:order-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Global Presence</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Global Presence,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Local Expertise
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              With operations spanning multiple continents and partnerships with the world's leading technology platforms, AlgoVision combines global scale with the attention and customization of a boutique consultancy.
            </p>

            {/* Strategic Partnerships */}
            <div className="pt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Partnerships</h3>
              <div className="space-y-4">
              {[
                {
                  title: "Google Premier Partner",
                  description: "Elite partnership providing advanced access to Google's marketing and cloud technologies."
                },
                {
                  title: "Meta Business Partner",
                  description: "Strategic collaboration with Meta for cutting-edge social media and advertising solutions."
                },
                {
                  title: "Microsoft Elite Partner",
                  description: "Top-tier partnership delivering enterprise solutions powered by Microsoft's ecosystem."
                },
                {
                  title: "Exclusive OTT Platform Access",
                  description: "Direct partnerships with Netflix, Disney+, Prime Video, Hulu, and Apple TV+ for premium content delivery."
                },
                {
                  title: "650+ Integrated Platform Partners",
                  description: "Extensive network of technology partners enabling seamless integrations across your entire tech stack."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00b5ff]/10 flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors">
                    <span className="text-sm font-bold text-[#00b5ff]">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Right Side - Map Visualization */}
          <div ref={leftRef} className="relative order-2 lg:order-2 w-full flex items-center justify-center -mx-4 sm:mx-0">
            {/* Main visualization container */}
            <div className="relative aspect-square w-full max-w-[450px] sm:max-w-[500px] lg:max-w-3xl min-h-[450px] sm:min-h-[500px]">

              {/* Interactive 3D Globe with rotating stat cards */}
              <Globe3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
