"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import type { CaseStudy } from "@/lib/supabase/types";

interface Props {
  initialCaseStudies: CaseStudy[];
}

export default function CaseStudiesClient({ initialCaseStudies }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const filteredCaseStudies = useMemo(() => {
    return initialCaseStudies.filter((caseStudy) => {
      const matchesSearch =
        caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.slug.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || caseStudy.status === statusFilter;

      const matchesIndustry =
        industryFilter === "all" || caseStudy.industry === industryFilter;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [initialCaseStudies, searchTerm, statusFilter, industryFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete case study");

      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-gray-600 mt-2">
            Manage your case studies and showcase client success stories
          </p>
        </div>
        <Link
          href="/admin/dashboard/case-studies/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#00b5ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Case Study
        </Link>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search case studies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b5ff] focus:border-transparent"
          >
            <option value="all">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Case studies table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCaseStudies.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">
                        {searchTerm || statusFilter !== "all" || industryFilter !== "all"
                          ? "No case studies found"
                          : "No case studies yet"}
                      </p>
                      <p className="text-sm">
                        {searchTerm || statusFilter !== "all" || industryFilter !== "all"
                          ? "Try adjusting your search or filters"
                          : "Create your first case study to showcase your work"}
                      </p>
                      {!searchTerm && statusFilter === "all" && industryFilter === "all" && (
                        <Link
                          href="/admin/dashboard/case-studies/new"
                          className="mt-4 px-4 py-2 bg-[#00b5ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
                        >
                          Create New Case Study
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCaseStudies.map((caseStudy) => (
                  <tr key={caseStudy.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {caseStudy.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{caseStudy.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {caseStudy.client}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {caseStudy.industry}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(caseStudy.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseStudy.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {caseStudy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {caseStudy.views}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/case-studies/${caseStudy.id}/edit`}
                          className="text-[#00b5ff] hover:text-[#0099dd] p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(caseStudy.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
