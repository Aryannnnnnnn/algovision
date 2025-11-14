import BlogsHero from "@/app/components/blogs/BlogsHero";
import BlogsFilterWrapper from "@/app/components/blogs/BlogsFilterWrapper";

export const metadata = {
  title: "Blog - Insights & Resources | Algo Vision",
  description: "Discover expert insights, industry trends, and best practices for digital transformation, AI, marketing, and technology.",
};

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

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen bg-white">
      <BlogsHero />
      <BlogsFilterWrapper blogs={blogs} />
    </main>
  );
}
