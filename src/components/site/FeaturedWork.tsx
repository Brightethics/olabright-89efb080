import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { shopifyProjectsQuery, videoProjectsQuery } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { CmsImage } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FeaturedShopify() {
  const { data: all } = useSuspenseQuery(shopifyProjectsQuery());
  const featured = all.filter((p) => p.featured);
  const projects = (featured.length ? featured : all).slice(0, 3);

  return (
    <section className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Shopify Work"
          title="Featured Shopify"
          highlight="projects"
          description="Stores rebuilt, audited and optimized for measurable commercial outcomes."
        />

        {projects.length ? (
          <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.id} delay={i * 70} className="h-full">
                <Link
                  to="/shopify-portfolio/$slug"
                  params={{ slug: project.slug }}
                  className="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface/60"
                >
                  <CmsImage path={project.hero_image} alt={`${project.name} store preview`} />
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
                      {project.industry || "eCommerce"}
                    </p>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.short_description}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-gold">
                      View project <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <EmptyState label="Shopify projects will appear here once added in the dashboard." />
        )}

        <div className="mt-10 text-center">
          <Button asChild variant="goldOutline" size="lg">
            <Link to="/shopify-portfolio">
              See all Shopify work <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeaturedVideos() {
  const { data: all } = useSuspenseQuery(videoProjectsQuery());
  const featured = all.filter((p) => p.featured);
  const projects = (featured.length ? featured : all).slice(0, 3);

  return (
    <section
      className="relative border-t border-border/60 py-20 sm:py-28"
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="AI Video"
          title="Featured AI video"
          highlight="projects"
          description="Commercials, UGC and TikTok ads produced with AI at brand-safe quality."
        />

        {projects.length ? (
          <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.id} delay={i * 70} className="h-full">
                <Link
                  to="/video-portfolio/$slug"
                  params={{ slug: project.slug }}
                  className="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface/60"
                >
                  <div className="relative">
                    <CmsImage
                      path={project.thumbnail_url}
                      alt={`${project.name} video thumbnail`}
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
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-gold">
                      Watch project <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <EmptyState label="Video projects will appear here once added in the dashboard." />
        )}

        <div className="mt-10 text-center">
          <Button asChild variant="goldOutline" size="lg">
            <Link to="/video-portfolio">
              See all video work <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-gold/25 bg-surface/40 p-12 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
