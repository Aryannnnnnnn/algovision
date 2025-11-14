import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication with Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';
    const oldImageUrl = formData.get('oldImageUrl') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from('images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload image to storage' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(filePath);

    // Delete old image if it exists and is from our storage
    if (oldImageUrl) {
      try {
        // Extract the file path from the URL
        // URL format: https://{project}.supabase.co/storage/v1/object/public/images/{filePath}
        const urlParts = oldImageUrl.split('/storage/v1/object/public/images/');
        if (urlParts.length === 2) {
          const oldFilePath = urlParts[1];

          // Only delete if it's from the same bucket (safety check)
          if (oldFilePath && !oldFilePath.startsWith('http')) {
            await supabaseAdmin.storage
              .from('images')
              .remove([oldFilePath]);
            console.log(`Deleted old image: ${oldFilePath}`);
          }
        }
      } catch (deleteError) {
        // Don't fail the upload if deletion fails
        console.error('Error deleting old image:', deleteError);
      }
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading featured image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
