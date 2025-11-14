import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

// Blog update validation schema (all fields optional for PATCH)
const blogUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  content: z.string().min(1).max(100000).optional(),
  excerpt: z.string().min(1).max(500).optional(),
  category: z.enum(['AI & Technology', 'Marketing', 'Business Growth', 'Case Studies', 'Industry Insights']).optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
});

// GET /api/blogs/[id] - Get a single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog: data });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PATCH /api/blogs/[id] - Update a blog
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Validate input with Zod
    const validation = blogUpdateSchema.safeParse(body);
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

    const updates: any = { ...validation.data };

    // If publishing for the first time, set published_at
    if (updates.status === 'published') {
      const { data: currentBlog } = await supabaseAdmin
        .from('blogs')
        .select('published_at')
        .eq('id', id)
        .single();

      if (currentBlog && !currentBlog.published_at) {
        updates.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog: data });
  } catch (error: any) {
    console.error('Error updating blog:', error);

    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // First, get the blog to extract image URLs
    const { data: blog, error: fetchError } = await supabaseAdmin
      .from('blogs')
      .select('featured_image, content')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete the blog from database
    const { error: deleteError } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // Delete associated images from storage
    if (blog) {
      const imagesToDelete: string[] = [];

      // Extract featured image path
      if (blog.featured_image && blog.featured_image.includes('/storage/v1/object/public/images/')) {
        const urlParts = blog.featured_image.split('/storage/v1/object/public/images/');
        if (urlParts.length === 2) {
          imagesToDelete.push(urlParts[1]);
        }
      }

      // Extract images from content (HTML)
      if (blog.content) {
        // Match all img src attributes that are Supabase storage URLs
        const imgRegex = /<img[^>]+src="([^"]+)"/g;
        let match;
        while ((match = imgRegex.exec(blog.content)) !== null) {
          const imgUrl = match[1];
          if (imgUrl.includes('/storage/v1/object/public/images/')) {
            const urlParts = imgUrl.split('/storage/v1/object/public/images/');
            if (urlParts.length === 2) {
              imagesToDelete.push(urlParts[1]);
            }
          }
        }
      }

      // Delete all images from storage
      if (imagesToDelete.length > 0) {
        try {
          const { error: storageError } = await supabaseAdmin.storage
            .from('images')
            .remove(imagesToDelete);

          if (storageError) {
            console.error('Error deleting images from storage:', storageError);
          } else {
            console.log(`Deleted ${imagesToDelete.length} images for blog ${id}`);
          }
        } catch (storageError) {
          // Don't fail the delete if image cleanup fails
          console.error('Error cleaning up images:', storageError);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
