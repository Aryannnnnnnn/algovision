"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
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

  const milestones = [
    {
      number: "01",
      title: "AI & Technology Solutions",
      subtitle: "The Reality",
      description: "We don't just implement AI—we architect intelligent systems that transform how enterprises interact with customers, process data, and make decisions at scale.",
      achievements: ["Conversational AI & Intelligent Virtual Assistants", "AI-Enabled Web Assistants", "Applied AI & Product Engineering"],
    },
    {
      number: "02",
      title: "Strategic Communications",
      subtitle: "The reality",
      description: "We operate where traditional PR meets algorithmic distribution, ensuring your message reaches the right audience through the right channels at the right moment.",
      achievements: ["Multi-Platform PR & Media Relations", "OTT Advertising (Netflix, Disney+, Prime Video, Hulu, Apple TV+)", "SEO 3.0 & Generative Search Optimization", "Crisis Management & Reputation Monitoring"],
    },
    {
      number: "03",
      title: "Omnichannel Advertising",
      subtitle: "The reality",
      description: "We don't spread budgets thin across channels—we architect omnichannel symphonies where every dollar, every impression, and every interaction compounds toward your objectives.",
      achievements: ["15+ Platform Expertise (Google, Meta, TikTok, LinkedIn, Reddit, Snapchat, X, Bluesky, Bing, Yahoo, Twitch, Kick, Discord, Rumble, Taboola)", "Advanced Programmatic & Retargeting", "Real-Time Optimization & Performance Tracking"],
    },
    {
      number: "04",
      title: "Growth & Performance",
      subtitle: "The reality",
      description: "We engineer growth systems, not growth hacks. Sustainable, scalable, predictable revenue generation backed by data and executed with precision.",
      achievements: ["Enterprise Email & SMS Marketing", "LinkedIn & WhatsApp Campaigns", "High-Velocity Lead Generation", "Conversion Optimization"],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-34 items-start">
          {/* Timeline - Left on desktop, bottom on mobile/tablet */}
          <div className="space-y-6 order-2 lg:order-1">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-card group">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-transparent hover:shadow-lg hover:border-[#00011f] transition-all duration-500 lg:hover:-translate-x-2">
                  {/* Step number badge - hidden on mobile, shown on lg */}
                  <div className="hidden lg:flex absolute -left-4 top-8 w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl items-center justify-center shadow-lg shadow-[#00b5ff]/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white font-bold text-sm">{milestone.number}</span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Number badge visible on mobile */}
                    <div className="lg:hidden flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00b5ff] to-[#0099dd] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{milestone.number}</span>
                    </div>

                    <div className="flex-1 min-w-0 lg:ml-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-500">
                          {milestone.title}
                        </h3>
                        
                      </div>
                      <p className="text-sm font-semibold text-[#00b5ff] mb-3">{milestone.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        {milestone.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Heading - Right on desktop, top on mobile/tablet */}
          <div className="lg:sticky lg:top-24 max-w-2xl mx-auto order-1 lg:order-2">
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full mb-6 shadow-lg">
              <span className="text-sm font-bold text-white">Our Capabilities</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Full-Spectrum{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">
                  Digital Solutions
                </span>
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              From AI-powered technology to omnichannel advertising—we deliver integrated solutions that transform how enterprises connect with their audiences and achieve measurable growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
