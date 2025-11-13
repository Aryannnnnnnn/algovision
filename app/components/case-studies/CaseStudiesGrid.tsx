"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Building2, Tag } from "lucide-react";

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

export default function CaseStudiesGrid() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch("/api/case-studies?status=published");
      const data = await response.json();
      setCaseStudies(data.caseStudies || []);
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">Loading case studies...</div>
        </div>
      </section>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">No case studies available yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((caseStudy) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{caseStudy.client}</span>
                  </div>
                  <div className="w-px h-3 bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{caseStudy.industry}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00b5ff] transition-colors">
                  {caseStudy.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {caseStudy.excerpt.replace(/<[^>]*>/g, '')}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-[#00b5ff] font-medium text-sm">
                  <span>Read Case Study</span>
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
