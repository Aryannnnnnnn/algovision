import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import Link from "next/link";
import { FileText, FolderOpen, Eye, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/algoadmin/sign-in");
  }

  // Fetch comprehensive stats
  const [blogsResult, caseStudiesResult, recentBlogs, recentCaseStudies] = await Promise.all([
    supabaseAdmin.from('blogs').select('id, views, status', { count: 'exact' }),
    supabaseAdmin.from('case_studies').select('id, views, status', { count: 'exact' }),
    supabaseAdmin.from('blogs').select('id, title, slug, status, created_at, updated_at').order('updated_at', { ascending: false }).limit(5),
    supabaseAdmin.from('case_studies').select('id, title, slug, status, created_at, updated_at').order('updated_at', { ascending: false }).limit(5),
  ]);

  // Calculate stats
  const totalBlogs = blogsResult.count || 0;
  const publishedBlogs = blogsResult.data?.filter(b => b.status === 'published').length || 0;
  const draftBlogs = blogsResult.data?.filter(b => b.status === 'draft').length || 0;

  const totalCaseStudies = caseStudiesResult.count || 0;
  const publishedCaseStudies = caseStudiesResult.data?.filter(cs => cs.status === 'published').length || 0;
  const draftCaseStudies = caseStudiesResult.data?.filter(cs => cs.status === 'draft').length || 0;

  const totalViews = (blogsResult.data?.reduce((sum, blog) => sum + blog.views, 0) || 0) +
                     (caseStudiesResult.data?.reduce((sum, cs) => sum + cs.views, 0) || 0);

  const totalPublished = publishedBlogs + publishedCaseStudies;
  const totalDrafts = draftBlogs + draftCaseStudies;
  const totalContent = totalBlogs + totalCaseStudies;

  // Calculate average views per content
  const avgViews = totalContent > 0 ? Math.round(totalViews / totalContent) : 0;

  // Combine and sort recent activity
  const recentActivity = [
    ...(recentBlogs.data || []).map(item => ({ ...item, type: 'blog' as const })),
    ...(recentCaseStudies.data || []).map(item => ({ ...item, type: 'case-study' as const }))
  ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);

  const stats = [
    {
      title: "Total Content",
      value: totalContent,
      description: `${publishedBlogs + publishedCaseStudies} published, ${totalDrafts} drafts`,
      icon: FileText,
      trend: `${totalPublished} published`,
    },
    {
      title: "Blog Posts",
      value: totalBlogs,
      description: `${publishedBlogs} published, ${draftBlogs} drafts`,
      icon: FileText,
      trend: `${publishedBlogs} live`,
    },
    {
      title: "Case Studies",
      value: totalCaseStudies,
      description: `${publishedCaseStudies} published, ${draftCaseStudies} drafts`,
      icon: FolderOpen,
      trend: `${publishedCaseStudies} live`,
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      description: `${avgViews} avg per content`,
      icon: Eye,
      trend: `${avgViews} average`,
    },
  ];

  // Format time ago
  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return then.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user.username || user.firstName || "Admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground">Blog Posts</h3>
              <div className="flex flex-col gap-2">
                <Button asChild variant="default">
                  <Link href="/algoadmin/dashboard/blogs/new">
                    Create New Blog Post
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/algoadmin/dashboard/blogs">
                    View All Posts
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground">Case Studies</h3>
              <div className="flex flex-col gap-2">
                <Button asChild variant="default">
                  <Link href="/algoadmin/dashboard/case-studies/new">
                    Create New Case Study
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/algoadmin/dashboard/case-studies">
                    View All Case Studies
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest content updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((item) => {
                const isNew = new Date(item.created_at).getTime() === new Date(item.updated_at).getTime();
                const icon = item.type === 'blog' ? FileText : FolderOpen;
                const Icon = icon;
                const editUrl = item.type === 'blog'
                  ? `/algoadmin/dashboard/blogs/${item.id}/edit`
                  : `/algoadmin/dashboard/case-studies/${item.id}/edit`;

                return (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={editUrl}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="mt-0.5">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <Badge
                          variant={item.status === 'published' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.type === 'blog' ? 'Blog' : 'Case Study'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {isNew ? 'Created' : 'Updated'} {formatTimeAgo(item.updated_at)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          /{item.slug}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-4 text-sm py-8 text-center justify-center">
              <div>
                <p className="font-medium text-muted-foreground">No recent activity</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Start creating content to see updates here
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
