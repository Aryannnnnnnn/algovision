import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// POST /api/blogs/[id]/view - Increment blog views
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment the views counter
    const { data, error } = await supabaseAdmin.rpc('increment_blog_views', {
      blog_id: id
    });

    if (error) {
      // If the function doesn't exist, fall back to manual increment
      const { data: blog, error: fetchError } = await supabaseAdmin
        .from('blogs')
        .select('views')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabaseAdmin
        .from('blogs')
        .update({ views: (blog?.views || 0) + 1 })
        .eq('id', id);

      if (updateError) throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing blog views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
