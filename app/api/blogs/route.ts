import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';

// GET /api/blogs - Get all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin.from('blogs').select('*').order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ blogs: data });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/blogs - Create a new blog
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, status, featured_image } = body;

    // Validate required fields
    if (!title || !slug || !content || !excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blogData = {
      title,
      slug,
      content,
      excerpt,
      author: user.username || user.firstName || 'Admin',
      author_id: user.id,
      status: status || 'draft',
      featured_image,
      views: 0,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert(blogData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ blog: data }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);

    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
