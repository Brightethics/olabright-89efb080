import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { CmsImage } from "@/components/site/Media";
import { EmptyState } from "@/components/site/FeaturedWork";
import { cn } from "@/lib/utils";
import { VIDEO_CATEGORIES } from "@/lib/site-data";
import { videoProjectsQuery } from "@/lib/cms";

const TITLE = "AI Video Portfolio — Ola Bright Digital";
const DESCRIPTION =
  "AI UGC videos, product commercials, TikTok ads and AI product demonstrations produced for eCommerce brands.";

export const Route = createFileRoute("/video-portfolio/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(videoProjectsQuery()),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/video-portfolio" }],
  }),
  component: VideoPortfolio,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found.</div>,
});

function VideoPortfolio() {
  const { data: projects } = useSuspenseQuery(videoProjectsQuery());
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", ...VIDEO_CATEGORIES];
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <SiteLayout>
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="AI Video Portfolio"
            title="Creative that"
            highlight="sells"
            description={DESCRIPTION}
          />

          <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={80}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={cn(
                  "min-h-11 rounded-full border px-5 text-sm font-medium transition-all duration-300",
                  filter === category
                    ? "border-transparent bg-gold-gradient text-primary-foreground shadow-[var(--shadow-gold)]"
                    : "border-border/70 bg-surface/50 text-muted-foreground hover:border-gold/40 hover:text-gold",
                )}
              >
                {category}
              </button>
            ))}
          </Reveal>

          {visible.length ? (
            <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, i) => (
                <Reveal as="li" key={project.id} delay={i * 60} className="h-full">
                  <Link
                    to="/video-portfolio/$slug"
                    params={{ slug: project.slug }}
                    className="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface/60"
                  >
                    <div className="relative">
                      <CmsImage
                        path={project.thumbnail_url}
                        alt={`${project.name} thumbnail`}
                        ratio="aspect-video"
                      />
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid size-14 place-items-center rounded-full bg-background/70 text-gold backdrop-blur-sm">
                          <Play className="size-6" />
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
                        {project.category}
                      </p>
                      <h2 className="text-lg font-semibold">{project.name}</h2>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState label="No video projects published in this category yet." />
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
