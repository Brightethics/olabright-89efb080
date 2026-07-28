import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CmsImage, CmsVideo } from "@/components/site/Media";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";
import { videoProjectQuery } from "@/lib/cms";

export const Route = createFileRoute("/video-portfolio/$slug")({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(videoProjectQuery(params.slug));
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.project.name} — AI Video Project`;
    const description = loaderData.project.description || "AI video project by Ola Bright Digital.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "video.other" },
      ],
    };
  },
  component: VideoDetail,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="grid min-h-[60dvh] place-items-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Video not found</h1>
          <Button asChild variant="goldOutline" className="mt-6">
            <Link to="/video-portfolio">Back to video portfolio</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  ),
});

function VideoDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(videoProjectQuery(slug));
  if (!data) return null;

  return (
    <SiteLayout>
      <article className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            to="/video-portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
          >
            <ArrowLeft className="size-4" /> All video work
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {data.category}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold sm:text-5xl">{data.name}</h1>

          <div className="mt-10 overflow-hidden rounded-3xl border border-border/70">
            <CmsVideo path={data.video_url} poster={data.thumbnail_url} title={data.name} />
          </div>

          {data.description ? (
            <p className="mt-10 whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          ) : null}

          {data.results ? (
            <div className="mt-8 border-l border-gold/25 pl-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold/90">
                Results
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {data.results}
              </p>
            </div>
          ) : null}

          {data.additional_media?.length ? (
            <section className="mt-14">
              <h2 className="text-lg font-semibold">Additional media</h2>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {data.additional_media.map((path) => (
                  <li key={path} className="overflow-hidden rounded-2xl border border-border/70">
                    {/\.(mp4|webm|mov)$/i.test(path) ? (
                      <CmsVideo path={path} title={data.name} />
                    ) : (
                      <CmsImage path={path} alt={data.name} ratio="aspect-video" />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-16 rounded-3xl border border-gold/20 bg-surface/60 p-8 text-center">
            <h2 className="text-2xl font-semibold">Need video creative like this?</h2>
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
