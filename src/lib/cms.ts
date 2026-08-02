import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

/** Portfolio projects are stored in the `shopify_projects` table (kept for data continuity). */
export type PortfolioProject = Tables<"shopify_projects">;
export type Testimonial = Tables<"testimonials">;

export type HeroContent = {
  headline: string;
  subheadline: string;
  image_url: string | null;
  badges: string[];
};
export type StatsContent = {
  projects_completed: string;
  clients_served: string;
  years_experience: string;
  revenue_generated: string;
};
export type AboutContent = {
  title: string;
  image_url: string | null;
  story: string;
  journey: string;
  why_hire: string;
  expertise: string;
};
export type CtaContent = { title: string; subtitle: string };

export const DEFAULT_HERO: HeroContent = {
  headline: "Optimize. Convert. Scale.",
  subheadline:
    "I'm Ola Bright, a website conversion and growth specialist. I help brands turn the traffic they already have into sales — on Shopify, Wix, WooCommerce and WordPress.",
  image_url: null,
  badges: ["Conversion Specialist", "Shopify Expert", "Website Audits", "Technical SEO"],
};
export const DEFAULT_STATS: StatsContent = {
  projects_completed: "120+",
  clients_served: "60+",
  years_experience: "5+",
  revenue_generated: "$4.2M+",
};
export const DEFAULT_ABOUT: AboutContent = {
  title: "About Ola Bright",
  image_url: null,
  story: "",
  journey: "",
  why_hire: "",
  expertise: "",
};
export const DEFAULT_CTA: CtaContent = {
  title: "Let's Grow Your Brand",
  subtitle:
    "Send me your website link and I'll tell you the three biggest things costing you sales — free.",
};

/** Turns a storage path (or absolute URL) into a browser-usable media URL. */
export function mediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `/api/public/media/${path.replace(/^\/+/, "")}`;
}

export type SiteContentMap = Record<string, Record<string, unknown>>;

async function fetchSiteContent(): Promise<SiteContentMap> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const map: SiteContentMap = {};
  for (const row of data ?? []) {
    map[row.key] = (row.value ?? {}) as Record<string, unknown>;
  }
  return map;
}

export const siteContentQuery = queryOptions({
  queryKey: ["site_content"],
  queryFn: fetchSiteContent,
  staleTime: 60_000,
});

export function pickContent<T>(map: SiteContentMap | undefined, key: string, fallback: T): T {
  const value = map?.[key];
  if (!value) return fallback;
  return { ...fallback, ...(value as object) } as T;
}

export const portfolioProjectsQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["shopify_projects", opts?.featured ?? false],
    queryFn: async () => {
      let query = supabase
        .from("shopify_projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (opts?.featured) query = query.eq("featured", true);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as PortfolioProject[];
    },
    staleTime: 60_000,
  });

export const portfolioProjectQuery = (slug: string) =>
  queryOptions({
    queryKey: ["shopify_project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shopify_projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as PortfolioProject | null;
    },
    staleTime: 60_000,
  });

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Testimonial[];
  },
  staleTime: 60_000,
});

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatReviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
