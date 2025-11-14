"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import RichTextEditor from "@/app/components/RichTextEditor";
import ImageUpload from "@/app/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EditCaseStudyPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    client: "",
    industry: "",
    challenge: "",
    solution: "",
    results: "",
    services: "",
    status: "draft",
    featured_image: "",
    result_percentage_1: "",
    result_percentage_1_label: "YoY eCommerce Revenue Growth",
    result_percentage_2: "",
    result_percentage_2_label: "Increase in Average Order Value (AOV)",
  });

  useEffect(() => {
    fetchCaseStudy();
  }, []);

  const fetchCaseStudy = async () => {
    try {
      const response = await fetch(`/api/case-studies/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch case study");

      const { caseStudy } = await response.json();
      setFormData({
        title: caseStudy.title,
        slug: caseStudy.slug,
        content: caseStudy.content,
        excerpt: caseStudy.excerpt,
        client: caseStudy.client,
        industry: caseStudy.industry,
        challenge: caseStudy.challenge,
        solution: caseStudy.solution,
        results: caseStudy.results,
        services: caseStudy.services || "",
        status: caseStudy.status,
        featured_image: caseStudy.featured_image || "",
        result_percentage_1: caseStudy.result_percentage_1 || "",
        result_percentage_1_label: caseStudy.result_percentage_1_label || "YoY eCommerce Revenue Growth",
        result_percentage_2: caseStudy.result_percentage_2 || "",
        result_percentage_2_label: caseStudy.result_percentage_2_label || "Increase in Average Order Value (AOV)",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to load case study");
      router.push("/algoadmin/dashboard/case-studies");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/case-studies/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update case study");
      }

      toast.success("Case study updated successfully");
      router.push("/algoadmin/dashboard/case-studies");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update case study");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/case-studies/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete case study");
      }

      toast.success("Case study deleted successfully");
      router.push("/algoadmin/dashboard/case-studies");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete case study");
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/algoadmin/dashboard/case-studies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Case Study</h1>
            <p className="text-muted-foreground mt-1">
              Update your case study details and content
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialog(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              The title and URL slug for your case study
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                URL-friendly version of the title
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
            <CardDescription>
              Upload a cover image for your case study
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={formData.featured_image}
              onChange={(url) =>
                setFormData({ ...formData, featured_image: url })
              }
              folder="case-studies"
            />
          </CardContent>
        </Card>

        {/* Services & Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Services & Key Metrics</CardTitle>
            <CardDescription>
              Services provided and result metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="services">Services *</Label>
              <Input
                id="services"
                type="text"
                value={formData.services}
                onChange={(e) =>
                  setFormData({ ...formData, services: e.target.value })
                }
                placeholder="Paid Advertising, Strategic Consulting, Data Analytics"
                required
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple services with commas
              </p>
            </div>

            <div className="space-y-4">
              <Label>Result Metrics *</Label>

              {/* Metric 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric1-label" className="text-xs">
                    Metric 1 Label
                  </Label>
                  <Input
                    id="metric1-label"
                    type="text"
                    value={formData.result_percentage_1_label}
                    onChange={(e) =>
                      setFormData({ ...formData, result_percentage_1_label: e.target.value })
                    }
                    placeholder="YoY eCommerce Revenue Growth"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metric1-value" className="text-xs">
                    Metric 1 Value
                  </Label>
                  <Input
                    id="metric1-value"
                    type="text"
                    value={formData.result_percentage_1}
                    onChange={(e) =>
                      setFormData({ ...formData, result_percentage_1: e.target.value })
                    }
                    placeholder="+22%"
                    required
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric2-label" className="text-xs">
                    Metric 2 Label
                  </Label>
                  <Input
                    id="metric2-label"
                    type="text"
                    value={formData.result_percentage_2_label}
                    onChange={(e) =>
                      setFormData({ ...formData, result_percentage_2_label: e.target.value })
                    }
                    placeholder="Increase in Average Order Value (AOV)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metric2-value" className="text-xs">
                    Metric 2 Value
                  </Label>
                  <Input
                    id="metric2-value"
                    type="text"
                    value={formData.result_percentage_2}
                    onChange={(e) =>
                      setFormData({ ...formData, result_percentage_2: e.target.value })
                    }
                    placeholder="+15%"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary *</CardTitle>
            <CardDescription>
              Brief overview of the case study
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={formData.excerpt}
              onChange={(excerpt) => setFormData({ ...formData, excerpt })}
              context="case-studies"
            />
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card>
          <CardHeader>
            <CardTitle>Challenges *</CardTitle>
            <CardDescription>
              What problems did the client face?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={formData.challenge}
              onChange={(challenge) => setFormData({ ...formData, challenge })}
              context="case-studies"
            />
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card>
          <CardHeader>
            <CardTitle>Solutions *</CardTitle>
            <CardDescription>
              How did you address these challenges?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={formData.solution}
              onChange={(solution) => setFormData({ ...formData, solution })}
              context="case-studies"
            />
          </CardContent>
        </Card>

        {/* Outcome */}
        <Card>
          <CardHeader>
            <CardTitle>Outcome *</CardTitle>
            <CardDescription>
              What were the results of the implementation?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              context="case-studies"
            />
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Results *</CardTitle>
            <CardDescription>
              Detailed metrics and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={formData.results}
              onChange={(results) => setFormData({ ...formData, results })}
              context="case-studies"
            />
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Publication status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/algoadmin/dashboard/case-studies">
              Cancel
            </Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Case Study
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{formData.title}"? This action cannot be undone and all associated images will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
