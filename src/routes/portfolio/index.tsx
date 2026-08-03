import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { EmptyState, ProjectCard } from "@/components/site/FeaturedWork";
import { WhatsappCta } from "@/components/site/WhatsappCta";
import { portfolioProjectsQuery } from "@/lib/cms";
import { cn } from "@/lib/utils";

const TITLE = "Portfolio — Website Conversion Projects | Ola Bright";
const DESCRIPTION =
  "Website audits, redesigns and conversion optimization projects across Shopify, Wix, WooCommerce and WordPress, with the problem, the fix and the result.";

export const Route = createFileRoute("/portfolio/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioProjectsQuery()),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found.</div>,
});

function PortfolioPage() {
  const { data: projects } = useSuspenseQuery(portfolioProjectsQuery());
  const [filter, setFilter] = useState("All");

  const platforms = ["All", ...Array.from(new Set(projects.map((p) => p.platform).filter(Boolean)))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.platform === filter);

  return (
    <SiteLayout>
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Websites built to"
            highlight="convert"
            description={DESCRIPTION}
          />

          {platforms.length > 2 ? (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setFilter(platform)}
                  aria-pressed={filter === platform}
                  className={cn(
                    "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                    filter === platform
                      ? "border-transparent bg-gold-gradient text-primary-foreground"
                      : "border-border/70 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {platform}
                </button>
              ))}
            </div>
          ) : null}

          {visible.length ? (
            <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, i) => (
                <Reveal as="li" key={project.id} delay={i * 60} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState label="No projects published yet." />
          )}
        </div>
      </section>
      <WhatsappCta />
    </SiteLayout>
  );
}
