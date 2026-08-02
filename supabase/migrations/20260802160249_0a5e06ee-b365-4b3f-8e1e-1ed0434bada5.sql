ALTER TABLE public.shopify_projects
  ADD COLUMN IF NOT EXISTS platform text NOT NULL DEFAULT 'Shopify',
  ADD COLUMN IF NOT EXISTS audit_findings text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS business_impact text NOT NULL DEFAULT '';

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS country text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS service_purchased text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS budget_range text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS review_date date NOT NULL DEFAULT CURRENT_DATE;

INSERT INTO public.testimonials (name, role, company, quote, rating, country, service_purchased, budget_range, review_date, approved, featured, sort_order) VALUES
('Daniel Whitfield', 'Founder', 'Northbound Supply', 'Ola rebuilt our product pages and the difference showed within two weeks. Add-to-cart rate went up noticeably and the store finally loads fast on mobile. Clear communication the whole way through.', 5, 'United Kingdom', 'Conversion Rate Optimization', '$1000+', '2025-11-14', true, true, 1),
('Amara Okonkwo', 'Ecommerce Manager', 'Lumen Skin', 'The audit was ridiculously detailed. Forty-one findings, all prioritised by revenue impact, and he walked me through every one on a call. Best money I have spent on the store this year.', 5, 'Nigeria', 'Website Audit', '$200-$500', '2025-10-02', true, true, 2),
('Marcus Reed', 'Owner', 'Reed Fitness Gear', 'Redesigned our WooCommerce site end to end. Checkout drop-off fell and the site looks like a proper brand now. Would hire again without thinking about it.', 5, 'United States', 'Website Redesign', '$1000+', '2025-09-21', true, true, 3),
('Sofia Marchetti', 'Marketing Lead', 'Casa Verde', 'Great work on the landing page and the Klaviyo flows. Response times were slower during one busy week, but the quality of the work made up for it.', 4, 'Italy', 'Landing Page Optimization', '$500-$1000', '2025-08-30', true, false, 4),
('Chris Boateng', 'Founder', 'Kente Modern', 'Solid technical SEO work. Core Web Vitals went green and organic traffic is trending up. I would have liked a short video explaining the changes, but the written report was thorough.', 4, 'Ghana', 'Technical SEO', '$200-$500', '2025-08-11', true, false, 5),
('Elena Vasquez', 'Co-founder', 'Bright Bloom Co.', 'Ola knows Shopify inside out. He found issues our previous developer had missed for a year. Sales are up and I finally understand my own analytics.', 5, 'Spain', 'Conversion Rate Optimization', '$500-$1000', '2025-07-19', true, true, 6),
('James Turner', 'Director', 'Turner Interiors', 'Good Wix redesign. Clean, fast, much better on phones. The scope only included two revision rounds which felt tight for us, but he was fair about it and we got there.', 3, 'Australia', 'Website Design', '$500-$1000', '2025-06-28', true, false, 7),
('Priya Nair', 'Owner', 'Saffron Table', 'The UX review changed how I think about my menu pages. Bounce rate dropped and enquiries doubled in the following month. Very practical recommendations, no fluff.', 5, 'India', 'UX Optimization', '$200-$500', '2025-06-05', true, true, 8),
('Tobi Adeyemi', 'Growth Lead', 'Zuri Wear', 'Klaviyo flows he built now bring in a steady chunk of monthly revenue that we were simply leaving on the table before. Straightforward, professional, delivered on time.', 5, 'Nigeria', 'Klaviyo Email Marketing', '$500-$1000', '2025-05-16', true, false, 9),
('Hannah Kruger', 'Founder', 'Fern & Fable', 'Started with a small audit for $150 and it paid for itself immediately. Ended up hiring him for the full redesign. Honest advice, no upselling.', 5, 'South Africa', 'Website Audit', '$100-$200', '2025-04-22', true, false, 10);