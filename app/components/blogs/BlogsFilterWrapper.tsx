"use client";

import { useState } from "react";
import BlogCategories from "./BlogCategories";
import BlogsGrid from "./BlogsGrid";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
  category?: string;
}

interface BlogsFilterWrapperProps {
  blogs: Blog[];
}

export default function BlogsFilterWrapper({ blogs }: BlogsFilterWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === "All"
    ? blogs
    : blogs.filter(blog => (blog.category || "Marketing") === selectedCategory);

  return (
    <>
      <BlogCategories onCategoryChange={setSelectedCategory} />
      <BlogsGrid blogs={filteredBlogs} />
    </>
  );
}
