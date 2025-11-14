import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// POST /api/case-studies/[id]/view - Increment case study views
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment the views counter
    const { data, error } = await supabaseAdmin.rpc('increment_case_study_views', {
      case_study_id: id
    });

    if (error) {
      // If the function doesn't exist, fall back to manual increment
      const { data: caseStudy, error: fetchError } = await supabaseAdmin
        .from('case_studies')
        .select('views')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabaseAdmin
        .from('case_studies')
        .update({ views: (caseStudy?.views || 0) + 1 })
        .eq('id', id);

      if (updateError) throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing case study views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
