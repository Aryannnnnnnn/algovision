"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Building2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  client: string;
  industry: string;
  featured_image?: string;
}

interface RelatedCaseStudiesProps {
  currentSlug: string;
  industry: string;
}

export default function RelatedCaseStudies({
  currentSlug,
  industry,
}: RelatedCaseStudiesProps) {
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchRelatedStudies();
  }, [currentSlug, industry]);

  useEffect(() => {
    if (relatedStudies.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(gridRef.current?.children || [], {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [relatedStudies]);

  const fetchRelatedStudies = async () => {
    try {
      const response = await fetch(
        `/api/case-studies?status=published&industry=${industry}`
      );
      const data = await response.json();
      const filtered = (data.caseStudies || [])
        .filter((study: CaseStudy) => study.slug !== currentSlug)
        .slice(0, 3);
      setRelatedStudies(filtered);
    } catch (error) {
      console.error("Failed to fetch related case studies:", error);
    }
  };

  if (relatedStudies.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Related Case Studies
          </h2>
          <p className="text-gray-600 text-lg">
            Explore more success stories from the {industry} industry
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {relatedStudies.map((caseStudy) => (
            <Link
              key={caseStudy.id}
              href={`/resources/case-studies/${caseStudy.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Featured Image */}
              {caseStudy.featured_image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caseStudy.featured_image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Building2 className="w-3 h-3" />
                  <span>{caseStudy.client}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00b5ff] transition-colors line-clamp-2">
                  {caseStudy.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {caseStudy.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[#00b5ff] font-medium text-sm">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
