import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  // Fetch stats
  const [blogsResult, caseStudiesResult] = await Promise.all([
    supabaseAdmin.from('blogs').select('views', { count: 'exact' }),
    supabaseAdmin.from('case_studies').select('views', { count: 'exact' }),
  ]);

  const blogCount = blogsResult.count || 0;
  const caseStudyCount = caseStudiesResult.count || 0;
  const totalViews = (blogsResult.data?.reduce((sum, blog) => sum + blog.views, 0) || 0) +
                     (caseStudiesResult.data?.reduce((sum, cs) => sum + cs.views, 0) || 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user.username || user.firstName || "Admin"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog Posts</h3>
          <p className="text-3xl font-bold text-[#00b5ff]">{blogCount}</p>
          <p className="text-sm text-gray-600 mt-2">Total posts</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Studies</h3>
          <p className="text-3xl font-bold text-[#00b5ff]">{caseStudyCount}</p>
          <p className="text-sm text-gray-600 mt-2">Total case studies</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-[#00b5ff]">{totalViews}</p>
          <p className="text-sm text-gray-600 mt-2">Combined views</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/dashboard/blogs/new"
            className="px-4 py-2 bg-[#00b5ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
          >
            Create New Blog Post
          </a>
          <a
            href="/admin/dashboard/case-studies/new"
            className="px-4 py-2 bg-[#00b5ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
          >
            Create New Case Study
          </a>
          <a
            href="/admin/dashboard/blogs"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All Posts
          </a>
          <a
            href="/admin/dashboard/case-studies"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All Case Studies
          </a>
        </div>
      </div>
    </div>
  );
}
