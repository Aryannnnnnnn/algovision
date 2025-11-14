"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { CaseStudy } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialCaseStudies: CaseStudy[];
}

export default function CaseStudiesClient({ initialCaseStudies }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [caseStudyToDelete, setCaseStudyToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = (caseStudy: CaseStudy) => {
    setCaseStudyToDelete({ id: caseStudy.id, title: caseStudy.title });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!caseStudyToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/case-studies/${caseStudyToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete case study");
      }

      toast.success("Case study deleted successfully");
      setDeleteDialogOpen(false);
      setCaseStudyToDelete(null);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete case study");
    } finally {
      setIsDeleting(false);
    }
  };

  // Get unique industries for filter
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(initialCaseStudies.map(cs => cs.industry))];
    return uniqueIndustries.sort();
  }, [initialCaseStudies]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground mt-1">
            Manage your case studies and showcase client success
          </p>
        </div>
        <Button asChild>
          <Link href="/algoadmin/dashboard/case-studies/new">
            <Plus className="w-4 h-4 mr-2" />
            New Case Study
          </Link>
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search case studies..."
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Case studies table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCaseStudies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium text-muted-foreground">
                        {searchTerm || statusFilter !== "all" || industryFilter !== "all"
                          ? "No case studies found"
                          : "No case studies yet"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {searchTerm || statusFilter !== "all" || industryFilter !== "all"
                          ? "Try adjusting your search or filters"
                          : "Create your first case study to get started"}
                      </p>
                      {!searchTerm && statusFilter === "all" && industryFilter === "all" && (
                        <Button asChild className="mt-4">
                          <Link href="/algoadmin/dashboard/case-studies/new">
                            Create New Case Study
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCaseStudies.map((caseStudy) => (
                  <TableRow key={caseStudy.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{caseStudy.title}</div>
                        <div className="text-sm text-muted-foreground">
                          /{caseStudy.slug}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{caseStudy.client}</TableCell>
                    <TableCell>{caseStudy.industry}</TableCell>
                    <TableCell>
                      {new Date(caseStudy.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={caseStudy.status === "published" ? "default" : "secondary"}
                      >
                        {caseStudy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{caseStudy.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                        >
                          <Link href={`/algoadmin/dashboard/case-studies/${caseStudy.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(caseStudy)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{caseStudyToDelete?.title}"? This action cannot be undone and all associated images will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
