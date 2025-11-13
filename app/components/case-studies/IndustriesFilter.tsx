"use client";

import { useState } from "react";

export default function IndustriesFilter() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = [
    "All",
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Education",
    "Other",
  ];

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            Filter by Industry:
          </span>
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedIndustry === industry
                  ? "bg-[#00b5ff] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
