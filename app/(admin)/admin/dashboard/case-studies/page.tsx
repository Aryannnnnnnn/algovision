import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import CaseStudiesClient from "./CaseStudiesClient";

export default async function CaseStudiesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  // Fetch case studies from database
  const { data: caseStudies, error } = await supabaseAdmin
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching case studies:', error);
  }

  const caseStudiesData = caseStudies || [];

  return <CaseStudiesClient initialCaseStudies={caseStudiesData} />;
}
