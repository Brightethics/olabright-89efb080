CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Shopify projects
CREATE TABLE public.shopify_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  industry text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  results text NOT NULL DEFAULT '',
  hero_image text,
  gallery_images text[] NOT NULL DEFAULT '{}',
  before_image text,
  after_image text,
  meta_title text,
  meta_description text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shopify_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shopify_projects TO authenticated;
GRANT ALL ON public.shopify_projects TO service_role;
ALTER TABLE public.shopify_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published shopify projects" ON public.shopify_projects
FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins can view all shopify projects" ON public.shopify_projects
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage shopify projects" ON public.shopify_projects
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER shopify_projects_updated BEFORE UPDATE ON public.shopify_projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Video projects
CREATE TABLE public.video_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'AI UGC Videos',
  description text NOT NULL DEFAULT '',
  results text NOT NULL DEFAULT '',
  thumbnail_url text,
  video_url text,
  additional_media text[] NOT NULL DEFAULT '{}',
  meta_title text,
  meta_description text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.video_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.video_projects TO authenticated;
GRANT ALL ON public.video_projects TO service_role;
ALTER TABLE public.video_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published video projects" ON public.video_projects
FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins can view all video projects" ON public.video_projects
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage video projects" ON public.video_projects
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER video_projects_updated BEFORE UPDATE ON public.video_projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  quote text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  photo_url text,
  featured boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view testimonials" ON public.testimonials
FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage testimonials" ON public.testimonials
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER testimonials_updated BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Site content (key/value)
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site content" ON public.site_content
FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage site content" ON public.site_content
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Contact submissions
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  website text,
  project_type text,
  budget text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT, INSERT, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read submissions" ON public.contact_submissions
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete submissions" ON public.contact_submissions
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_content (key, value) VALUES
('hero', '{"headline":"Optimize. Convert. Scale.","subheadline":"Helping eCommerce brands increase sales through Shopify Conversion Optimization and High-Performing AI Video Content.","image_url":null,"badges":["Shopify Specialist","Conversion Optimization Expert","AI Video Creator"]}'::jsonb),
('stats', '{"projects_completed":"120+","clients_served":"60+","years_experience":"5+","revenue_generated":"$4.2M+"}'::jsonb),
('about', '{"title":"Meet Ola Bright","image_url":null,"story":"I am Ola Bright — a Shopify Conversion Optimization Specialist and AI Video Creator. For the last five years I have helped eCommerce founders turn underperforming stores into predictable revenue engines.","journey":"I started in Shopify theme development, moved into conversion research, and now combine both with AI-generated video content that stops the scroll and sells.","why_hire":"Clients hire me because I focus on one number: revenue per visitor. Every design, test and video is tied to a commercial outcome.","expertise":"Shopify design and redesign, CRO research and testing, store audits, speed and product page optimization, Klaviyo email, TikTok ads, AI UGC and product commercials."}'::jsonb),
('cta', '{"title":"Let''s Grow Your Brand","subtitle":"Tell me about your store and I will come back with the three biggest conversion opportunities I can see — free, no obligation."}'::jsonb);