import { notFound } from "next/navigation";
import BlogDetailHero from "@/app/components/blogs/BlogDetailHero";
import BlogContent from "@/app/components/blogs/BlogContent";
import BlogRelated from "@/app/components/blogs/BlogRelated";
import ViewTracker from "@/app/components/ViewTracker";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs?status=published`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    const blogs = data.blogs || [];
    return blogs.find((blog: any) => blog.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

async function getAllBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs?status=published`, {
      cache: 'no-store',
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

export const dynamicParams = true; // Allow dynamic params for new blogs

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Algo Vision Blog`,
    description: blog.excerpt || blog.title,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog || blog.status !== 'published') {
    notFound();
  }

  // Fetch all blogs for related section
  const allBlogs = await getAllBlogs();
  const relatedBlogs = allBlogs
    .filter((b: any) => b.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <ViewTracker type="blog" id={blog.id} />
      <BlogDetailHero blog={blog} />
      <BlogContent content={blog.content} />
      <BlogRelated blogs={relatedBlogs} />
    </main>
  );
}
