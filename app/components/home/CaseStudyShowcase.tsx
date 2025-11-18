"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const caseStudies = [
    {
      client: "Organic Supplements Brand",
      industry: "E-commerce",
      challenge: "Skepticism in the market, information overload for customers, low engagement, and high cart abandonment rates despite offering high-quality organic supplements",
      title: "How We Scaled Leads & Maximized ROAS with Meta Ads",
      description: "An organic supplements brand sought to improve its online sales through Meta ads. Despite offering high-quality organic supplements, the brand faced difficulty in converting website traffic into paying customers. The existing ad strategy lacked precision in audience targeting, resulting in wasted ad spend and low engagement.",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80",
      results: [
        { value: "$21.8M", label: "Conversion Value" },
        { value: "7.08X", label: "ROAS" },
        { value: "7.4%", label: "Conversion Rate" },
        { value: "58K+", label: "New Leads" },
      ],
      solutions: [
        "Ad creatives focused on trust with scientific backing and customer success stories",
        "Detailed audience segmentation based on interests, demographics, and past behavior",
        "Retargeting strategy for cart abandoners, website visitors, and video viewers",
        "15% off incentive for first-time buyers integrated with email and SMS campaigns",
      ],
      link: "/case-studies/organic-supplements-meta-ads",
    },
    {
      client: "SaaS Tech Platform",
      industry: "Technology",
      challenge: "High customer acquisition costs, long sales cycles, and difficulty demonstrating ROI to potential clients in a competitive market",
      title: "Driving B2B Leads Through Strategic Content Marketing",
      description: "A growing SaaS platform needed to reduce acquisition costs and shorten their sales cycle. Through targeted content marketing and LinkedIn advertising, we repositioned their brand and attracted high-quality enterprise leads.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      results: [
        { value: "340%", label: "Lead Increase" },
        { value: "62%", label: "Cost Reduction" },
        { value: "45 Days", label: "Faster Sales Cycle" },
        { value: "180+", label: "Enterprise Leads" },
      ],
      solutions: [
        "Developed thought leadership content targeting C-level executives",
        "LinkedIn ad campaigns with precise targeting by job title and company size",
        "Created interactive ROI calculators and product comparison tools",
        "Implemented automated nurture sequences for lead qualification",
      ],
      link: "/case-studies/saas-b2b-leads",
    },
    {
      client: "Fashion Retail Brand",
      industry: "E-commerce",
      challenge: "Seasonal sales fluctuations, low repeat purchase rates, and struggling to compete with fast-fashion giants on paid advertising platforms",
      title: "Building Brand Loyalty with Influencer & Email Marketing",
      description: "A mid-sized fashion brand wanted to build a loyal customer base and reduce dependency on paid ads. We implemented an influencer partnership strategy combined with sophisticated email automation to drive repeat purchases.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      results: [
        { value: "520%", label: "Email Revenue Growth" },
        { value: "4.2X", label: "Customer LTV" },
        { value: "38%", label: "Repeat Purchase Rate" },
        { value: "95K+", label: "New Subscribers" },
      ],
      solutions: [
        "Micro-influencer partnerships with authentic brand alignment",
        "Segmented email campaigns based on purchase behavior and preferences",
        "VIP loyalty program with exclusive early access and rewards",
        "User-generated content campaigns to build social proof",
      ],
      link: "/case-studies/fashion-brand-loyalty",
    },
  ];

  const caseStudy = caseStudies[currentIndex];

  const nextCase = () => {
    // Fade out animation
    gsap.to([".case-stats", ".case-content", ".case-image"], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
      },
    });
  };

  const prevCase = () => {
    // Fade out animation
    gsap.to([".case-stats", ".case-content", ".case-image"], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visible state
      gsap.set([".case-stats", ".case-content", ".case-image"], { opacity: 1 });

      // Animate stats
      const stats = gsap.utils.toArray(".stat-item");
      gsap.fromTo(
        stats,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.2)",
          delay: 0.2,
        }
      );

      // Animate content sections
      gsap.fromTo(
        ".case-content",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Animate image
      gsap.fromTo(
        ".case-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [currentIndex]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#00011f] overflow-hidden">
      <div className="relative max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-sm font-bold text-white">Client Success Story</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevCase}
                className="w-12 h-12 rounded-full bg-white text-gray-900 hover:bg-[#00b5ff] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-[#00b5ff]/50 hover:scale-110 active:scale-95"
                aria-label="Previous case study"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="px-4 py-2 bg-gray-800/80 rounded-full border border-gray-700">
                <span className="text-sm font-bold text-white">{currentIndex + 1}</span>
                <span className="text-sm text-gray-400 mx-1.5">/</span>
                <span className="text-sm text-gray-400">{caseStudies.length}</span>
              </div>

              <button
                onClick={nextCase}
                className="w-12 h-12 rounded-full bg-white text-gray-900 hover:bg-[#00b5ff] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-[#00b5ff]/50 hover:scale-110 active:scale-95"
                aria-label="Next case study"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Real Results, Real{" "}
            <span className="bg-gradient-to-r from-[#00b5ff] via-[#0099dd] to-[#00b5ff] bg-clip-text text-transparent">
              Impact
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl">
            See how we help businesses transform their marketing performance and achieve measurable growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="case-stats grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 lg:mb-16">
          {caseStudy.results.map((result, index) => (
            <div
              key={index}
              className="stat-item p-4 sm:p-6 rounded-2xl transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                {result.value}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {result.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Left Column - Content */}
          <div className="case-content space-y-4 lg:space-y-6 order-2 lg:order-2">
            {/* Client Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-2 bg-[#00b5ff]/10 rounded-full border border-[#00b5ff]/30">
                <span className="text-sm font-bold text-[#00b5ff]">{caseStudy.client}</span>
              </div>
              <div className="px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30">
                <span className="text-sm font-bold text-purple-400">{caseStudy.industry}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              {caseStudy.title}
            </h3>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed">
              {caseStudy.description}
            </p>

            {/* Challenge */}
            <div className="bg-[#00b5ff]/15 border-l-4 border-[#00b5ff] p-6 rounded-r-lg">
              <h4 className="text-sm font-bold text-[#00b5ff] uppercase tracking-wider mb-2">
                The Challenge
              </h4>
              <p className="text-white font-semibold">{caseStudy.challenge}</p>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Our Solution</h4>
              <ul className="space-y-3">
                {caseStudy.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#00b5ff] rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 leading-relaxed">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                href={caseStudy.link}
                variant="accent"
                size="md"
                className="w-auto inline-flex"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                Read Case Study
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="case-image relative order-1 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square max-w-md mx-auto lg:max-w-none">
              <img
                src={caseStudy.image}
                alt={caseStudy.client}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl transform rotate-3">
              <div className="text-xs sm:text-sm font-bold">Success Story</div>
            </div>

            {/* Decorative elements */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-2xl"></div>
            <div className="hidden lg:block absolute -top-6 -right-6 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-2xl"></div>
          </div>
        </div>

        {/* Bottom CTA - View All Case Studies */}
        <div className="pt-8 border-t border-gray-800">
          <div className="inline-block">
            <Button
              href="/resources/case-studies"
              variant="accent"
              size="md"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              }
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
