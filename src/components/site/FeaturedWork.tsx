import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioProjectsQuery } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { CmsImage } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ProjectCard({
  project,
}: {
  project: {
    id: string;
    slug: string;
    name: string;
    platform: string;
    industry: string;
    short_description: string;
    desktop_image: string | null;
    hero_image: string | null;
  };
}) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      className="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card"
    >
      <CmsImage
        path={project.desktop_image ?? project.hero_image}
        alt={`${project.name} website preview`}
      />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
          {[project.platform, project.industry].filter(Boolean).join(" · ")}
        </p>
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.short_description}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-gold">
          View case study <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function FeaturedProjects() {
  const { data: all } = useSuspenseQuery(portfolioProjectsQuery());
  const featured = all.filter((p) => p.featured);
  const projects = (featured.length >= 4 ? featured : all).slice(0, 6);

  return (
    <section className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Websites I've"
          highlight="improved"
          description="Real projects across Shopify, Wix, WooCommerce and WordPress — with the problem, what I did and what changed."
        />

        {projects.length ? (
          <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.id} delay={i * 70} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <EmptyState label="Projects will appear here once added in the dashboard." />
        )}

        <div className="mt-10 text-center">
          <Button asChild variant="goldOutline" size="lg">
            <Link to="/portfolio">
              See the full portfolio <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-gold/25 bg-surface/60 p-12 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
