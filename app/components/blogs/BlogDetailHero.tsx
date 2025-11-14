"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailHeroProps {
  blog: {
    title: string;
    excerpt: string;
    author: string;
    published_at?: string;
    created_at: string;
    featured_image?: string;
    content: string;
  };
}

const BlogDetailHero = ({ blog }: BlogDetailHeroProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate breadcrumb
      gsap.fromTo(
        ".hero-breadcrumb",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Animate meta info
      gsap.fromTo(
        ".hero-meta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay: 0.1,
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Animate title
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          delay: 0.2,
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Animate image
      gsap.fromTo(
        ".hero-image",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          delay: 0.3,
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const wordCount = textContent.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-12">
      <div className="mx-auto xl:max-w-[70vw] max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="hero-breadcrumb mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#00b5ff] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/resources/blogs" className="hover:text-[#00b5ff] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium line-clamp-1">{blog.title}</span>
        </nav>

        {/* Meta Information */}
        <div className="hero-meta mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00b5ff]/10 text-[#00b5ff] font-medium">
            Technology
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-900">{blog.author}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(blog.published_at || blog.created_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {calculateReadingTime(blog.content)}
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title mb-8 text-4xl font-bold text-[#1e293b] md:text-5xl lg:text-6xl leading-tight">
          {blog.title}
        </h1>

        {/* Featured Image */}
        {blog.featured_image && (
          <div className="hero-image relative mb-8 h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-[600px]">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetailHero;
