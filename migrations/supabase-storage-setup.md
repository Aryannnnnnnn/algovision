# Supabase Storage Setup Guide

## Required Storage Bucket

To enable image uploads in the admin panel, you need to create a storage bucket in Supabase with the proper policies.

## Setup Steps

### Option 1: Automated Setup (Recommended - via SQL)

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-storage-policies.sql`
5. Click **Run** to execute the script
6. This will create the bucket and all necessary policies automatically

**This is the easiest and fastest method!**

### Option 2: Manual Setup (via Dashboard)

1. **Create the Bucket:**
   - Go to your Supabase Dashboard
   - Navigate to **Storage** in the left sidebar
   - Click **New Bucket**
   - Create a bucket with the following settings:
     - **Name**: `images`
     - **Public bucket**: ✅ Check this box (images need to be publicly accessible)
     - Click **Create bucket**

2. **Set up Policies:**
   - Navigate to **Storage > Policies**
   - Click **New Policy**

   **ONLY ONE POLICY NEEDED (Maximum Security):**

   **Policy: Public Read Access**
   - Operation: SELECT
   - Policy name: `Allow public read access to images`
   - Target roles: `public`
   - USING expression: `bucket_id = 'images'`

   **DO NOT CREATE INSERT/UPDATE/DELETE POLICIES**
   - This is intentional for maximum security
   - All write operations go through API routes with Clerk authentication
   - API routes use admin client which bypasses RLS

## Folder Structure

The application will automatically organize images into folders:

**Featured Images** (from ImageUpload component):
- `/blogs/` - Blog featured images
- `/case-studies/` - Case study featured images

**Editor Images** (from RichTextEditor):
- `/editor-images/blogs/` - Inline images uploaded in blog content
- `/editor-images/case-studies/` - Inline images uploaded in case study content
- `/editor-images/general/` - Other inline images

These folders are created automatically when images are uploaded.

## Testing

After creating the bucket and policies:
1. Go to `/algoadmin/dashboard/blogs/new` or `/algoadmin/dashboard/case-studies/new`
2. In the Featured Image section, click the upload button
3. Select an image file (max 5MB)
4. The image will be uploaded to Supabase Storage
5. The public URL will be automatically set in the form
6. Test uploading inline images in the content editor as well

## Troubleshooting

### Upload fails with "bucket not found"
- Verify the bucket name is exactly `images` (lowercase)
- Check that the bucket is created in the correct Supabase project
- Run the SQL script from `supabase-storage-policies.sql` to ensure bucket exists

### Images don't display after upload
- Ensure the bucket is set to **Public**
- Check that `next.config.ts` includes your Supabase storage domain in `remotePatterns`
- Verify the public URL is being returned correctly

### Permission errors during upload
- Make sure all 4 storage policies are set up correctly
- Verify that you're logged in as an authenticated user (admin)
- Check that the policies target the correct bucket (`bucket_id = 'images'`)
- Run: `SELECT * FROM pg_policies WHERE tablename = 'objects'` to verify policies exist

### Images don't display on the website
- Ensure the bucket is set to **Public** (critical!)
- Check browser console for CORS errors
- Verify `next.config.ts` has the correct remotePatterns configuration

## Current Configuration

The app is configured to:
- Upload to bucket: `images`
- Featured images:
  - Blog featured images: `blogs/`
  - Case study featured images: `case-studies/`
- Editor images (inline content):
  - Blog editor images: `editor-images/blogs/`
  - Case study editor images: `editor-images/case-studies/`
  - General editor images: `editor-images/general/`
- Max file size: 5MB
- Supported formats: JPG, PNG, GIF, WebP

## Security Notes

**MAXIMUM SECURITY IMPLEMENTATION:**

- **Public Read ONLY**: Anyone can view images (required for public website), but that's ALL they can do
- **No Direct Uploads**: Users CANNOT upload directly to Supabase Storage from the client
- **API-Only Writes**: All uploads/updates/deletes MUST go through API routes
- **Clerk Authentication**: API routes verify authentication with Clerk before allowing any operations
- **Admin Client**: API routes use `supabaseAdmin` (service role) which bypasses RLS
- **File Validation**: File type and size validation at API level
- **Audit Trail**: All uploads are logged through API routes

**How it works:**
1. User tries to upload an image in the admin panel
2. Request goes to `/api/upload-featured-image` or `/api/upload-image`
3. API route checks Clerk authentication (`currentUser()`)
4. If unauthorized, request is rejected
5. If authorized, API validates file and uploads using `supabaseAdmin`
6. Public URL is returned to the client

**Why this is secure:**
- No RLS policies for INSERT/UPDATE/DELETE means no direct client uploads possible
- Even if someone bypasses your UI, they cannot upload without going through API
- All uploads require valid Clerk session
- Service role key is kept secret on the server

**Automatic Storage Cleanup:**
- **Replacing Images**: When replacing a featured image, the old image is automatically deleted from storage
- **Removing Images**: When removing an image via the remove button, it's deleted from storage
- **Deleting Blogs/Case Studies**: When deleting a blog or case study, ALL associated images are automatically deleted:
  - Featured image
  - All inline images in content (blogs: content field)
  - All inline images in case study fields (excerpt, challenge, solution, content, results)
- This keeps storage usage minimal and prevents orphaned files
- Only images from your Supabase storage are deleted (external URLs like Unsplash are safe)

## Verifying Setup

Run these SQL queries in Supabase SQL Editor to verify everything is set up correctly:

```sql
-- Check if bucket exists and is public
SELECT * FROM storage.buckets WHERE id = 'images';

-- Check all policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- List all files in the bucket (after uploading some)
SELECT * FROM storage.objects WHERE bucket_id = 'images';
```
