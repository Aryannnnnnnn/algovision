"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "@/app/components/RichTextEditor";

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    challenge: "",
    solution: "",
    results: "",
    services: "",
    status: "draft",
    client: "N/A",
    industry: "Other",
    content: "",
    featured_image: "",
    result_percentage_1: "",
    result_percentage_1_label: "YoY eCommerce Revenue Growth",
    result_percentage_2: "",
    result_percentage_2_label: "Increase in Average Order Value (AOV)",
  });

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/case-studies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create case study");
      }

      router.push("/admin/dashboard/case-studies");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/case-studies"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Case Study</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
              placeholder="Enter case study title..."
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
              placeholder="case-study-url"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: /resources/case-studies/{formData.slug || "your-case-study-slug"}
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL *
            </label>
            <input
              type="url"
              value={formData.featured_image}
              onChange={(e) =>
                setFormData({ ...formData, featured_image: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services *
            </label>
            <input
              type="text"
              value={formData.services}
              onChange={(e) =>
                setFormData({ ...formData, services: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
              placeholder="Paid Advertising, Strategic Consulting, Data Analytics"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple services with commas
            </p>
          </div>

          {/* Result Percentages */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Result Percentages *
            </label>

            {/* Result 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Metric 1 Label
                </label>
                <input
                  type="text"
                  value={formData.result_percentage_1_label}
                  onChange={(e) =>
                    setFormData({ ...formData, result_percentage_1_label: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
                  placeholder="YoY eCommerce Revenue Growth"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Metric 1 Value
                </label>
                <input
                  type="text"
                  value={formData.result_percentage_1}
                  onChange={(e) =>
                    setFormData({ ...formData, result_percentage_1: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
                  placeholder="+22%"
                  required
                />
              </div>
            </div>

            {/* Result 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Metric 2 Label
                </label>
                <input
                  type="text"
                  value={formData.result_percentage_2_label}
                  onChange={(e) =>
                    setFormData({ ...formData, result_percentage_2_label: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
                  placeholder="Increase in Average Order Value (AOV)"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Metric 2 Value
                </label>
                <input
                  type="text"
                  value={formData.result_percentage_2}
                  onChange={(e) =>
                    setFormData({ ...formData, result_percentage_2: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
                  placeholder="+15%"
                  required
                />
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Executive Summary *
            </label>
            <RichTextEditor
              content={formData.excerpt}
              onChange={(excerpt) => setFormData({ ...formData, excerpt })}
            />
          </div>

          {/* Challenges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Challenges *
            </label>
            <RichTextEditor
              content={formData.challenge}
              onChange={(challenge) => setFormData({ ...formData, challenge })}
            />
          </div>

          {/* Solutions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solutions *
            </label>
            <RichTextEditor
              content={formData.solution}
              onChange={(solution) => setFormData({ ...formData, solution })}
            />
          </div>

          {/* Outcome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outcome *
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>

          {/* Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Results *
            </label>
            <RichTextEditor
              content={formData.results}
              onChange={(results) => setFormData({ ...formData, results })}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/dashboard/case-studies"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-[#00b5ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Case Study"}
          </button>
        </div>
      </form>
    </div>
  );
}
