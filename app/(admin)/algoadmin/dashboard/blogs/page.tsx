import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import BlogsClient from "./BlogsClient";

export default async function BlogsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  // Fetch blogs from database
  const { data: blogs, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  }

  const blogsData = blogs || [];

  return <BlogsClient initialBlogs={blogsData} />;
}
