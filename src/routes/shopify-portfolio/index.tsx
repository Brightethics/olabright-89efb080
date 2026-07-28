import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { CmsImage } from "@/components/site/Media";
import { EmptyState } from "@/components/site/FeaturedWork";
import { shopifyProjectsQuery } from "@/lib/cms";

const TITLE = "Shopify Portfolio — Ola Bright Digital";
const DESCRIPTION =
  "Shopify store designs, redesigns, audits and conversion optimization projects with documented challenges, solutions and results.";

export const Route = createFileRoute("/shopify-portfolio/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(shopifyProjectsQuery()),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/shopify-portfolio" }],
  }),
  component: ShopifyPortfolio,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found.</div>,
});

function ShopifyPortfolio() {
  const { data: projects } = useSuspenseQuery(shopifyProjectsQuery());

  return (
    <SiteLayout>
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Shopify Portfolio"
            title="Stores built to"
            highlight="convert"
            description={DESCRIPTION}
          />

          {projects.length ? (
            <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal as="li" key={project.id} delay={i * 60} className="h-full">
                  <Link
                    to="/shopify-portfolio/$slug"
                    params={{ slug: project.slug }}
                    className="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface/60"
                  >
                    <CmsImage path={project.hero_image} alt={`${project.name} preview`} />
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
                        {project.industry || "eCommerce"}
                      </p>
                      <h2 className="text-lg font-semibold">{project.name}</h2>
                      <p className="text-sm text-muted-foreground">{project.short_description}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-gold">
                        View case study <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState label="No Shopify projects published yet." />
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
