import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication with Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    // Extract the file path from the URL
    // URL format: https://{project}.supabase.co/storage/v1/object/public/images/{filePath}
    const urlParts = imageUrl.split('/storage/v1/object/public/images/');

    if (urlParts.length !== 2) {
      return NextResponse.json({ error: 'Invalid image URL format' }, { status: 400 });
    }

    const filePath = urlParts[1];

    // Safety check: ensure it's not trying to delete something outside our bucket
    if (!filePath || filePath.startsWith('http') || filePath.includes('..')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Delete from Supabase Storage using admin client
    const { error } = await supabaseAdmin.storage
      .from('images')
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete image from storage' },
        { status: 500 }
      );
    }

    console.log(`Successfully deleted image: ${filePath}`);
    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
