"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>("");

  const sections = [
    { id: "starting-point", label: "Starting point" },
    { id: "challenges", label: "Challenges" },
    { id: "solution", label: "Solution" },
    { id: "outcome", label: "Outcome" },
    { id: "business-impact", label: "Business Impact" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-blue-600" />
        <h3 className="font-display text-sm font-semibold text-gray-900">
          Table of contents
        </h3>
      </div>

      <nav>
        <ol className="space-y-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`text-left w-full text-sm transition-colors duration-200 ${
                  activeSection === section.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {index + 1}. {section.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
