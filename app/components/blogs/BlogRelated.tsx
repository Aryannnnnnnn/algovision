import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
}

interface BlogRelatedProps {
  blogs: Blog[];
}

export default function BlogRelated({ blogs }: BlogRelatedProps) {

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const truncateTitle = (title: string, maxLength: number = 60) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

  const truncateExcerpt = (excerpt: string, maxLength: number = 120) => {
    const cleaned = stripHtmlTags(excerpt);
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength) + "...";
  };

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Related Blogs
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl">
            Continue exploring insights and expert perspectives on digital transformation, marketing, and technology
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/resources/blogs/${blog.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-[#00b5ff] transition-all duration-300"
            >
              {/* Featured Image */}
              {blog.featured_image ? (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={blog.featured_image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-[#00b5ff] text-white text-xs font-semibold rounded-full">
                      Blog
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/30 flex items-center justify-center">
                  <div className="text-[#00b5ff]/20 text-6xl font-bold">
                    {blog.title.charAt(0)}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-[#00b5ff] text-white text-xs font-semibold rounded-full">
                      Blog
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 bg-white">
                {/* Published Date */}
                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(blog.published_at || blog.created_at)}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00b5ff] transition-colors">
                  {truncateTitle(blog.title)}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {truncateExcerpt(blog.excerpt)}
                </p>

                {/* Read More */}
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
