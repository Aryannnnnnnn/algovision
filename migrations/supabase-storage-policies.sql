-- =====================================================
-- Supabase Storage Policies for 'images' Bucket
-- =====================================================
-- This file contains all the storage policies needed for
-- the images bucket to work with blogs and case studies
-- =====================================================

-- First, ensure the bucket exists (if not already created via UI)
-- Note: You can also create this via Supabase Dashboard UI
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- =====================================================
-- DROP EXISTING POLICIES (Clean slate)
-- =====================================================

DROP POLICY IF EXISTS "Allow public read access to images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload to images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete to images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update their images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete their images" ON storage.objects;
DROP POLICY IF EXISTS "Allow service role full access to images" ON storage.objects;

-- =====================================================
-- SECURITY MODEL
-- =====================================================
-- This setup uses MAXIMUM SECURITY:
-- - Public can ONLY READ images (for website display)
-- - ALL uploads/updates/deletes go through API routes with Clerk auth
-- - API routes use supabaseAdmin client (service role) which bypasses RLS
-- - No direct client uploads are allowed
-- =====================================================

-- =====================================================
-- POLICY 1: Public Read Access ONLY
-- =====================================================
-- Allow anyone to view/download images from the bucket
-- This is required for images to be displayed on the public website
-- This is the ONLY policy needed - all writes go through admin client

CREATE POLICY "Allow public read access to images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- =====================================================
-- NO INSERT/UPDATE/DELETE POLICIES
-- =====================================================
-- We intentionally DO NOT create INSERT, UPDATE, or DELETE policies
-- All write operations MUST go through API routes that:
-- 1. Verify Clerk authentication
-- 2. Use supabaseAdmin client (service_role key)
-- 3. Bypass RLS completely
--
-- This ensures maximum security:
-- - No one can upload directly to storage
-- - All uploads are authenticated via Clerk
-- - All uploads are logged via API routes
-- =====================================================

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these queries to verify the policies are set up correctly

-- Check if bucket exists and is public
-- SELECT * FROM storage.buckets WHERE id = 'images';

-- Check all policies on the images bucket
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%images%';

-- =====================================================
-- FOLDER STRUCTURE (Auto-created on upload)
-- =====================================================
-- The following folders will be created automatically:
--
-- Featured Images:
--   - blogs/                        (Blog featured images)
--   - case-studies/                 (Case study featured images)
--
-- Editor Images (Inline content):
--   - editor-images/blogs/          (Blog content images)
--   - editor-images/case-studies/   (Case study content images)
--   - editor-images/general/        (General content images)
--
-- =====================================================

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Public read access allows images to be viewed by anyone on the website
-- 2. Only authenticated admin users (verified via Clerk) can upload/modify/delete
-- 3. All write operations go through API routes (/api/upload-featured-image, /api/upload-image)
-- 4. The bucket must be set to 'public' for images to work with Next.js Image component
-- 5. This is MAXIMUM SECURITY - no direct client uploads are possible
-- 6. supabaseAdmin (service_role) bypasses RLS, so API routes can write to storage
-- =====================================================

-- =====================================================
-- API ROUTES THAT HANDLE STORAGE OPERATIONS
-- =====================================================
-- /api/upload-featured-image - Upload featured images (blogs, case studies)
--   - Checks Clerk authentication (currentUser)
--   - Validates file type and size
--   - Uses supabaseAdmin.storage (bypasses RLS)
--   - Automatically deletes old image when replacing
--   - Returns public URL
--
-- /api/upload-image - Upload editor inline images
--   - Checks Clerk authentication (currentUser)
--   - Validates file type and size
--   - Uses supabaseAdmin.storage (bypasses RLS)
--   - Returns public URL
--
-- /api/delete-image - Delete images from storage
--   - Checks Clerk authentication (currentUser)
--   - Validates image URL format
--   - Uses supabaseAdmin.storage (bypasses RLS)
--   - Called when user removes image from form
-- =====================================================
