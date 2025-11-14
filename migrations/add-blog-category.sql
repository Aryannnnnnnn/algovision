-- Add category column to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS category TEXT;

-- Set default category for existing blogs
UPDATE blogs SET category = 'Marketing' WHERE category IS NULL;

-- Update existing blogs based on content (optional - you can skip this and manually update)
UPDATE blogs
SET category = 'AI & Technology'
WHERE (LOWER(title) LIKE '%ai%' OR LOWER(title) LIKE '%artificial intelligence%' OR LOWER(title) LIKE '%technology%')
AND category = 'Marketing';

UPDATE blogs
SET category = 'Business Growth'
WHERE (LOWER(title) LIKE '%business%' OR LOWER(title) LIKE '%growth%' OR LOWER(title) LIKE '%strategy%')
AND category = 'Marketing';

UPDATE blogs
SET category = 'Industry Insights'
WHERE (LOWER(title) LIKE '%industry%' OR LOWER(title) LIKE '%trends%' OR LOWER(title) LIKE '%insights%')
AND category = 'Marketing';
