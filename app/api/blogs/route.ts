import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

// Blog validation schema
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().min(1, 'Content is required').max(100000, 'Content is too long'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt must be less than 500 characters'),
  category: z.enum(['AI & Technology', 'Marketing', 'Business Growth', 'Case Studies', 'Industry Insights']).optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured_image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

// GET /api/blogs - Get all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Check if requesting draft content - require authentication
    const user = await currentUser();
    const isRequestingDrafts = !status || status === 'all' || status === 'draft';

    if (isRequestingDrafts && !user) {
      // Unauthenticated users can only see published blogs
      const { data, error } = await supabaseAdmin
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json({ blogs: data });
    }

    // Authenticated users can see all blogs based on status filter
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

    // Validate input with Zod
    const validation = blogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const { title, slug, content, excerpt, status, featured_image, category } = validation.data;

    const blogData = {
      title,
      slug,
      content,
      excerpt,
      author: user.username || user.firstName || 'Admin',
      author_id: user.id,
      status: status || 'draft',
      featured_image,
      category: category || 'Marketing',
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
