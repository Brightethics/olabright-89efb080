import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { CmsImage, CmsVideo } from "@/components/site/Media";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";
import { portfolioProjectQuery } from "@/lib/cms";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(portfolioProjectQuery(params.slug));
    if (!project) throw notFound();
    return { name: project.name, description: project.short_description };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Case Study | Ola Bright`;
    const description =
      loaderData.description || `How I improved the ${loaderData.name} website and what changed.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/portfolio/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/portfolio/${params.slug}` }],
    };
  },
  component: ProjectDetail,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="grid min-h-[60vh] place-items-center px-6 pt-32 text-center">
        <div>
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <Button asChild variant="goldOutline" className="mt-6">
            <Link to="/portfolio">Back to portfolio</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  ),
});

function Block({ title, body }: { title: string; body: string }) {
  if (!body) return null;
  return (
    <Reveal>
      <div className="rounded-3xl border border-border/70 bg-card p-7 sm:p-9">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{title}</h2>
        <p className="mt-4 whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </Reveal>
  );
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project } = useSuspenseQuery(portfolioProjectQuery(slug));
  if (!project) return null;

  return (
    <SiteLayout>
      <article className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-4" /> All projects
          </Link>

          <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
            {[project.platform, project.industry].filter(Boolean).join(" · ")}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold sm:text-5xl">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {project.short_description}
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
              <CmsImage
                path={project.desktop_image ?? project.hero_image}
                alt={`${project.name} desktop view`}
                ratio="aspect-16/10"
              />
              <p className="px-5 py-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Desktop view
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
              <CmsImage
                path={project.mobile_image}
                alt={`${project.name} mobile view`}
                ratio="aspect-9/16"
              />
              <p className="px-5 py-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Mobile view
              </p>
            </div>
          </div>

          {project.screen_recording ? (
            <Reveal className="mt-6">
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
                <CmsVideo path={project.screen_recording} title={`${project.name} walkthrough`} />
                <p className="px-5 py-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Live screen recording
                </p>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-12 grid gap-6">
            <Block title="The problem" body={project.challenge} />
            <Block title="Audit findings" body={project.audit_findings} />
            <Block title="What I did" body={project.solution} />
            <Block title="The result" body={project.results} />
            <Block title="Business impact" body={project.business_impact} />
          </div>

          {project.gallery_images?.length ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {project.gallery_images.map((image, i) => (
                <Reveal key={image} delay={i * 60}>
                  <CmsImage
                    path={image}
                    alt={`${project.name} screenshot ${i + 1}`}
                    className="rounded-2xl border border-border/70"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}

          <div className="mt-16 rounded-3xl border border-gold/20 bg-surface/70 p-8 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Want results like this?</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Send me your website link and I'll tell you what's costing you sales.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp me
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <Link to="/contact">
                  Contact me <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
