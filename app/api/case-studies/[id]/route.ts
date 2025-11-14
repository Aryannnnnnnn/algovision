import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

// Case study update validation schema (all fields optional for PATCH)
const caseStudyUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  content: z.string().min(1).max(100000).optional(),
  excerpt: z.string().min(1).max(5000).optional(),
  client: z.string().min(1).max(100).optional(),
  industry: z.string().min(1).max(100).optional(),
  challenge: z.string().min(1).max(50000).optional(),
  solution: z.string().min(1).max(50000).optional(),
  results: z.string().min(1).max(50000).optional(),
  services: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
  result_percentage_1: z.string().optional(),
  result_percentage_1_label: z.string().optional(),
  result_percentage_2: z.string().optional(),
  result_percentage_2_label: z.string().optional(),
});

// GET /api/case-studies/[id] - Get a single case study
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json({ caseStudy: data });
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 });
  }
}

// PATCH /api/case-studies/[id] - Update a case study
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
    const validation = caseStudyUpdateSchema.safeParse(body);
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
      const { data: currentCaseStudy } = await supabaseAdmin
        .from('case_studies')
        .select('published_at')
        .eq('id', id)
        .single();

      if (currentCaseStudy && !currentCaseStudy.published_at) {
        updates.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabaseAdmin
      .from('case_studies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json({ caseStudy: data });
  } catch (error: any) {
    console.error('Error updating case study:', error);

    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A case study with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
  }
}

// DELETE /api/case-studies/[id] - Delete a case study
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

    // First, get the case study to extract image URLs
    const { data: caseStudy, error: fetchError } = await supabaseAdmin
      .from('case_studies')
      .select('featured_image, excerpt, challenge, solution, content, results')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete the case study from database
    const { error: deleteError } = await supabaseAdmin
      .from('case_studies')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // Delete associated images from storage
    if (caseStudy) {
      const imagesToDelete: string[] = [];

      // Extract featured image path
      if (caseStudy.featured_image && caseStudy.featured_image.includes('/storage/v1/object/public/images/')) {
        const urlParts = caseStudy.featured_image.split('/storage/v1/object/public/images/');
        if (urlParts.length === 2) {
          imagesToDelete.push(urlParts[1]);
        }
      }

      // Extract images from all HTML content fields
      const contentFields = [
        caseStudy.excerpt,
        caseStudy.challenge,
        caseStudy.solution,
        caseStudy.content,
        caseStudy.results
      ];

      const imgRegex = /<img[^>]+src="([^"]+)"/g;

      contentFields.forEach(field => {
        if (field) {
          let match;
          while ((match = imgRegex.exec(field)) !== null) {
            const imgUrl = match[1];
            if (imgUrl.includes('/storage/v1/object/public/images/')) {
              const urlParts = imgUrl.split('/storage/v1/object/public/images/');
              if (urlParts.length === 2) {
                imagesToDelete.push(urlParts[1]);
              }
            }
          }
        }
      });

      // Delete all images from storage
      if (imagesToDelete.length > 0) {
        try {
          const { error: storageError } = await supabaseAdmin.storage
            .from('images')
            .remove(imagesToDelete);

          if (storageError) {
            console.error('Error deleting images from storage:', storageError);
          } else {
            console.log(`Deleted ${imagesToDelete.length} images for case study ${id}`);
          }
        } catch (storageError) {
          // Don't fail the delete if image cleanup fails
          console.error('Error cleaning up images:', storageError);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}
