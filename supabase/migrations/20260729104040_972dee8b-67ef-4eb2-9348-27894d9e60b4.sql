ALTER TABLE public.shopify_projects
  ADD COLUMN IF NOT EXISTS mobile_image text,
  ADD COLUMN IF NOT EXISTS desktop_image text,
  ADD COLUMN IF NOT EXISTS screen_recording text;

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;

UPDATE public.testimonials SET approved = true;

DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
CREATE POLICY "Public can view approved testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "Anyone can submit a testimonial"
  ON public.testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (approved = false);

GRANT INSERT ON public.testimonials TO anon;
GRANT SELECT, INSERT ON public.testimonials TO authenticated;