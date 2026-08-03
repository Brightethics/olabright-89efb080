import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioProjectsQuery, type PortfolioProject } from "@/lib/cms";
import { CmsImage } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const BLOCKS = [
  { key: "challenge", label: "Challenge" },
  { key: "audit_findings", label: "Findings" },
  { key: "solution", label: "Solution" },
  { key: "business_impact", label: "Impact" },
] as const;

function fallback(project: PortfolioProject, key: (typeof BLOCKS)[number]["key"]) {
  const value = project[key];
  if (value) return value;
  if (key === "solution") return project.results || "";
  return "";
}

export function CaseStudyPreview() {
  const { data: all } = useSuspenseQuery(portfolioProjectsQuery());
  const featured = all.filter((p) => p.featured);
  const projects = (featured.length ? featured : all).slice(0, 3);

  if (!projects.length) return null;

  return (
    <section className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="Real website"
          highlight="improvements"
          description="What was broken, what I found, what I changed and what it did to the business."
        />

        <div className="mt-14 grid gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 70}>
              <article className="grid gap-8 rounded-3xl border border-border/70 bg-card p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-hidden rounded-2xl border border-border/70">
                  <CmsImage
                    path={project.desktop_image ?? project.hero_image}
                    alt={`${project.name} website`}
                  />
                </div>

                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
                    {[project.platform, project.industry].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{project.name}</h3>

                  <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                    {BLOCKS.map((block) => {
                      const body = fallback(project, block.key);
                      if (!body) return null;
                      return (
                        <div key={block.key} className="border-l border-gold/25 pl-4">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold/90">
                            {block.label}
                          </dt>
                          <dd className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                            {body}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>

                  <Link
                    to="/portfolio/$slug"
                    params={{ slug: project.slug }}
                    className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                  >
                    Read the full case study <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
