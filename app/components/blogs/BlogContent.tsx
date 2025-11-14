"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { sanitizeHTML } from "@/lib/utils/sanitize";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = useMemo(() => sanitizeHTML(content), [content]);

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Animate content container
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate individual elements inside content
      const elements = contentRef.current?.querySelectorAll(
        "h1, h2, h3, p, ul, ol, blockquote, pre, img"
      );

      if (elements) {
        gsap.fromTo(
          Array.from(elements),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [content]);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-20">
      <div className="xl:max-w-[70vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Content */}
        <article
          ref={contentRef}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      <style jsx global>{`
        /* Blog Content Styles */
        .blog-content {
          color: #374151;
          font-size: 17px;
          line-height: 1.8;
        }

        /* Headings */
        .blog-content h1 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          scroll-margin-top: 100px;
        }

        .blog-content h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
          scroll-margin-top: 100px;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .blog-content h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          scroll-margin-top: 100px;
        }

        .blog-content h4 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: #4b5563;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .blog-content h5,
        .blog-content h6 {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: #6b7280;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        /* Paragraphs */
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.9;
          color: #4b5563;
        }

        .blog-content p:first-child {
          margin-top: 0;
        }

        /* Links */
        .blog-content a {
          color: #00b5ff;
          text-decoration: underline;
          text-decoration-color: rgba(0, 181, 255, 0.3);
          text-underline-offset: 3px;
          transition: all 0.2s ease;
        }

        .blog-content a:hover {
          color: #0099d9;
          text-decoration-color: rgba(0, 153, 217, 0.6);
        }

        /* Lists */
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.75rem;
        }

        .blog-content ul {
          list-style-type: disc;
        }

        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.8;
          color: #4b5563;
        }

        .blog-content li::marker {
          color: #00b5ff;
          font-weight: 600;
        }

        .blog-content ul ul,
        .blog-content ol ol,
        .blog-content ul ol,
        .blog-content ol ul {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .blog-content ul ul {
          list-style-type: circle;
        }

        .blog-content ul ul ul {
          list-style-type: square;
        }

        /* Blockquotes */
        .blog-content blockquote {
          margin: 2rem 0;
          padding: 1.5rem 1.5rem 1.5rem 2rem;
          border-left: 4px solid #00b5ff;
          background: linear-gradient(
            to right,
            rgba(0, 181, 255, 0.05),
            transparent
          );
          font-style: italic;
          color: #374151;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .blog-content blockquote p {
          margin-bottom: 0.75rem;
        }

        .blog-content blockquote p:last-child {
          margin-bottom: 0;
        }

        /* Code */
        .blog-content code {
          font-family: "Courier New", Courier, monospace;
          font-size: 0.9em;
          background-color: #f3f4f6;
          color: #be123c;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          border: 1px solid #e5e7eb;
        }

        .blog-content pre {
          margin: 2rem 0;
          padding: 1.5rem;
          background-color: #1f2937;
          color: #f3f4f6;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid #374151;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .blog-content pre code {
          background-color: transparent;
          color: #f3f4f6;
          padding: 0;
          border: none;
          font-size: 0.875rem;
          line-height: 1.7;
        }

        /* Images */
        .blog-content img {
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          display: block;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Horizontal Rule */
        .blog-content hr {
          margin: 3rem 0;
          border: none;
          border-top: 2px dashed #e5e7eb;
        }

        /* Tables */
        .blog-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          font-size: 0.95em;
        }

        .blog-content table th {
          background-color: #f9fafb;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          color: #1f2937;
        }

        .blog-content table td {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          color: #4b5563;
        }

        .blog-content table tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .blog-content table tr:hover {
          background-color: #f3f4f6;
        }

        /* Strong and Emphasis */
        .blog-content strong {
          font-weight: 700;
          color: #1f2937;
        }

        .blog-content em {
          font-style: italic;
        }

        /* Inline text styles */
        .blog-content mark {
          background-color: rgba(0, 181, 255, 0.2);
          padding: 0.1em 0.2em;
          border-radius: 0.2em;
        }

        .blog-content u {
          text-decoration: underline;
          text-decoration-color: #00b5ff;
          text-underline-offset: 3px;
        }

        .blog-content s {
          text-decoration: line-through;
          opacity: 0.7;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .blog-content {
            font-size: 16px;
          }

          .blog-content h1 {
            font-size: 2rem;
            margin-top: 2rem;
          }

          .blog-content h2 {
            font-size: 1.75rem;
            margin-top: 2rem;
          }

          .blog-content h3 {
            font-size: 1.375rem;
            margin-top: 1.5rem;
          }

          .blog-content h4 {
            font-size: 1.125rem;
          }

          .blog-content blockquote {
            padding: 1rem 1rem 1rem 1.5rem;
            margin: 1.5rem 0;
          }

          .blog-content pre {
            padding: 1rem;
            margin: 1.5rem 0;
            font-size: 0.8125rem;
          }
        }

        /* Print styles */
        @media print {
          .blog-content {
            font-size: 12pt;
            color: #000;
          }

          .blog-content a {
            color: #000;
            text-decoration: underline;
          }

          .blog-content pre {
            background-color: #f3f4f6;
            color: #000;
            border: 1px solid #000;
          }

          .blog-content pre code {
            color: #000;
          }
        }
      `}</style>
    </section>
  );
}
