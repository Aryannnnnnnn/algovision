import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';

// GET /api/case-studies - Get all case studies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const industry = searchParams.get('industry');

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
    } = body;

    // Validate required fields
    if (!title || !slug || !content || !excerpt || !client || !industry || !challenge || !solution || !results) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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
