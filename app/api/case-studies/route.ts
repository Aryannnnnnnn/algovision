import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

// Case study validation schema
const caseStudySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1).max(100000),
  excerpt: z.string().min(1).max(5000),
  client: z.string().min(1).max(100),
  industry: z.string().min(1).max(100),
  challenge: z.string().min(1).max(50000),
  solution: z.string().min(1).max(50000),
  results: z.string().min(1).max(50000),
  services: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
  result_percentage_1: z.string().optional(),
  result_percentage_1_label: z.string().optional(),
  result_percentage_2: z.string().optional(),
  result_percentage_2_label: z.string().optional(),
});

// GET /api/case-studies - Get all case studies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const industry = searchParams.get('industry');

    // Check if requesting draft content - require authentication
    const user = await currentUser();
    const isRequestingDrafts = !status || status === 'all' || status === 'draft';

    if (isRequestingDrafts && !user) {
      // Unauthenticated users can only see published case studies
      let query = supabaseAdmin
        .from('case_studies')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (industry && industry !== 'all') {
        query = query.eq('industry', industry);
      }

      const { data, error } = await query;
      if (error) throw error;
      return NextResponse.json({ caseStudies: data });
    }

    // Authenticated users can see all case studies based on filters
    let query = supabaseAdmin.from('case_studies').select('*').order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (industry && industry !== 'all') {
      query = query.eq('industry', industry);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ caseStudies: data });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
  }
}

// POST /api/case-studies - Create a new case study
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input with Zod
    const validation = caseStudySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      content,
      excerpt,
      client,
      industry,
      challenge,
      solution,
      results,
      services,
      status,
      featured_image,
      result_percentage_1,
      result_percentage_1_label,
      result_percentage_2,
      result_percentage_2_label,
    } = validation.data;

    const caseStudyData = {
      title,
      slug,
      content,
      excerpt,
      client,
      industry,
      challenge,
      solution,
      results,
      services: services || '',
      status: status || 'draft',
      featured_image,
      result_percentage_1: result_percentage_1 || '',
      result_percentage_1_label: result_percentage_1_label || '',
      result_percentage_2: result_percentage_2 || '',
      result_percentage_2_label: result_percentage_2_label || '',
      views: 0,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };

    const { data, error } = await supabaseAdmin
      .from('case_studies')
      .insert(caseStudyData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ caseStudy: data }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating case study:', error);

    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A case study with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
  }
}
