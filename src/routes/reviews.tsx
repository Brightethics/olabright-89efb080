import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { ReviewForm } from "@/components/site/ReviewForm";
import { formatReviewDate, mediaUrl, testimonialsQuery } from "@/lib/cms";

const TITLE = "Client Reviews — Ola Bright";
const DESCRIPTION =
  "Verified client reviews for website audits, conversion optimization, redesigns and technical SEO work, with country, service and budget for each project.";

export const Route = createFileRoute("/reviews")({
  loader: ({ context }) => context.queryClient.ensureQueryData(testimonialsQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found.</div>,
});

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-gold" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={i <= rating ? "size-4 fill-current" : "size-4 opacity-25"} />
      ))}
    </span>
  );
}

function ReviewsPage() {
  const { data: all } = useSuspenseQuery(testimonialsQuery);
  const reviews = all.filter((r) => r.approved);

  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    total: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <SiteLayout>
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Reviews"
            title="What clients"
            highlight="say"
            description={DESCRIPTION}
          />

          {count ? (
            <Reveal className="mt-12">
              <div className="grid gap-8 rounded-3xl border border-border/70 bg-card p-7 sm:grid-cols-[auto_1fr] sm:p-9">
                <div className="text-center sm:text-left">
                  <p className="font-display text-5xl font-semibold">{average.toFixed(1)}</p>
                  <div className="mt-2 flex justify-center sm:justify-start">
                    <Stars rating={Math.round(average)} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{count} reviews</p>
                </div>
                <ul className="grid gap-2 self-center">
                  {distribution.map(({ star, total }) => (
                    <li key={star} className="flex items-center gap-3 text-sm">
                      <span className="w-12 text-muted-foreground">{star} star</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-gold-gradient"
                          style={{ width: `${count ? (total / count) * 100 : 0}%` }}
                        />
                      </span>
                      <span className="w-8 text-right text-muted-foreground">{total}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          <ul className="mt-10 grid gap-5">
            {reviews.map((review, i) => {
              const photo = mediaUrl(review.photo_url);
              return (
                <Reveal as="li" key={review.id} delay={i * 40}>
                  <article className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
                    <header className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {photo ? (
                          <img
                            src={photo}
                            alt={review.name}
                            loading="lazy"
                            className="size-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="grid size-12 place-items-center rounded-full border border-gold/25 bg-accent font-display text-lg text-gold">
                            {review.name.charAt(0)}
                          </span>
                        )}
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {[review.role, review.company, review.country]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Stars rating={review.rating} />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatReviewDate(review.review_date)}
                        </p>
                      </div>
                    </header>

                    <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                      {review.quote}
                    </p>

                    {review.service_purchased || review.budget_range ? (
                      <footer className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                        {review.service_purchased ? (
                          <span className="rounded-full border border-border/70 px-3 py-1">
                            {review.service_purchased}
                          </span>
                        ) : null}
                        {review.budget_range ? (
                          <span className="rounded-full border border-border/70 px-3 py-1">
                            {review.budget_range}
                          </span>
                        ) : null}
                      </footer>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </ul>

          <ReviewForm />
        </div>
      </section>
    </SiteLayout>
  );
}
