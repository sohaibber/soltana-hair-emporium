
-- First, let's check if RLS is properly configured and add missing policies
-- Enable RLS on reviews table (if not already enabled)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can insert their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;

-- Policy to allow everyone to read reviews (for displaying product reviews)
CREATE POLICY "Anyone can read reviews" ON public.reviews
FOR SELECT USING (true);

-- Policy to allow authenticated users to insert their own reviews
CREATE POLICY "Users can insert their own reviews" ON public.reviews
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own reviews
CREATE POLICY "Users can update their own reviews" ON public.reviews
FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews" ON public.reviews
FOR DELETE USING (auth.uid() = user_id);
