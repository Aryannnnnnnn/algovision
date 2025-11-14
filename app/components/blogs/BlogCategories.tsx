"use client";

import { useState } from "react";

interface BlogCategoriesProps {
  onCategoryChange?: (category: string) => void;
}

export default function BlogCategories({ onCategoryChange }: BlogCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "AI & Technology",
    "Marketing",
    "Business Growth",
    "Case Studies",
    "Industry Insights",
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        {/* Mobile: Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:hidden scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                flex-shrink-0 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-[#00b5ff] text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#00b5ff] hover:text-[#00b5ff]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-[#00b5ff] text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#00b5ff] hover:text-[#00b5ff] hover:shadow-md"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
