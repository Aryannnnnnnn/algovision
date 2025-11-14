"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AlertCircle } from "lucide-react";
import { sanitizeHTML } from "@/lib/utils/sanitize";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChallengesProps {
  challenge: string;
}

export default function Challenges({ challenge }: ChallengesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sanitizedChallenge = useMemo(() => sanitizeHTML(challenge), [challenge]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="challenges"
      ref={sectionRef}
      className="relative py-8 md:py-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Challenges
          </h2>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          style={{ fontSize: '17px', lineHeight: '1.9' }}
          dangerouslySetInnerHTML={{ __html: sanitizedChallenge }}
        />

        {/* Dashed separator */}
        <div className="w-full border-t-2 border-dashed border-gray-300 mt-16"></div>
      </div>
    </section>
  );
}
