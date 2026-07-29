import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CmsImage, CmsVideo } from "@/components/site/Media";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";
import { shopifyProjectQuery } from "@/lib/cms";

export const Route = createFileRoute("/shopify-portfolio/$slug")({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(shopifyProjectQuery(params.slug));
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.project.name} — Shopify Case Study`;
    const description =
      loaderData.project.short_description ?? "Shopify conversion optimization case study.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
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
      <div className="grid min-h-[60dvh] place-items-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <Button asChild variant="goldOutline" className="mt-6">
            <Link to="/shopify-portfolio">Back to portfolio</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  ),
});

function Block({ label, body }: { label: string; body: string | null }) {
  if (!body) return null;
  return (
    <div className="border-l border-gold/25 pl-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold/90">{label}</h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function Gallery({ title, paths }: { title: string; paths: string[] | null }) {
  if (!paths?.length) return null;
  return (
    <section className="mt-14">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2">
        {paths.map((path) => (
          <li key={path} className="overflow-hidden rounded-2xl border border-border/70">
            <CmsImage path={path} alt={title} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(shopifyProjectQuery(slug));
  if (!data) return null;

  return (
    <SiteLayout>
      <article className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            to="/shopify-portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
          >
            <ArrowLeft className="size-4" /> All Shopify work
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {data.industry || "eCommerce"}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold sm:text-5xl">{data.name}</h1>
          {data.short_description ? (
            <p className="mt-5 max-w-2xl text-pretty text-muted-foreground">
              {data.short_description}
            </p>
          ) : null}

          <div className="mt-10 overflow-hidden rounded-3xl border border-border/70">
            <CmsImage
              path={data.desktop_image ?? data.hero_image}
              alt={`${data.name} desktop view`}
              ratio="aspect-16/9"
            />
          </div>

          {data.mobile_image ? (
            <section className="mt-14">
              <h2 className="text-lg font-semibold">Mobile display</h2>
              <div className="mt-5 max-w-xs overflow-hidden rounded-3xl border border-border/70">
                <CmsImage
                  path={data.mobile_image}
                  alt={`${data.name} mobile display`}
                  ratio="aspect-9/16"
                />
              </div>
            </section>
          ) : null}

          {data.screen_recording ? (
            <section className="mt-14">
              <h2 className="text-lg font-semibold">Live screen recording</h2>
              <div className="mt-5 overflow-hidden rounded-3xl border border-border/70">
                <CmsVideo path={data.screen_recording} title={`${data.name} screen recording`} />
              </div>
            </section>
          ) : null}

          <div className="mt-12 grid gap-7">
            <Block label="Challenge" body={data.challenge} />
            <Block label="Solution" body={data.solution} />
            <Block label="Results" body={data.results} />
          </div>

          <Gallery
            title="Before & After"
            paths={[data.before_image, data.after_image].filter((p): p is string => Boolean(p))}
          />
          <Gallery title="Gallery" paths={data.gallery_images} />


          <div className="mt-16 rounded-3xl border border-gold/20 bg-surface/60 p-8 text-center">
            <h2 className="text-2xl font-semibold">Want results like these?</h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <Link to="/contact">Contact me</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
