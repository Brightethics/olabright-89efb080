import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { testimonialsQuery, mediaUrl } from "@/lib/cms";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ReviewForm } from "./ReviewForm";

export function Testimonials() {
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
  const [index, setIndex] = useState(0);

  const active = testimonials.length
    ? testimonials[Math.min(index, testimonials.length - 1)]
    : null;
  const photo = mediaUrl(active?.photo_url);


  return (
    <section id="testimonials" className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients"
          highlight="say"
          description="Founders and growth leads on what changed after we worked together."
        />

        <Reveal className="mt-12">
          <figure className="relative rounded-3xl border border-border/70 bg-surface/60 p-7 sm:p-10">
            <Quote className="size-9 text-gold/40" />
            <blockquote className="mt-5 text-pretty text-lg leading-relaxed sm:text-xl">
              {active.quote}
            </blockquote>

            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                {photo ? (
                  <img
                    src={photo}
                    alt={active.name}
                    loading="lazy"
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-12 place-items-center rounded-full border border-gold/25 bg-accent/60 font-display text-lg text-gold">
                    {active.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-semibold">{active.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {[active.role, active.company].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gold" aria-label={`${active.rating} out of 5`}>
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
            </figcaption>

            {testimonials.length > 1 ? (
              <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
                <div className="flex gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show testimonial ${i + 1}`}
                      aria-current={i === index}
                      className={
                        i === index
                          ? "h-1.5 w-8 rounded-full bg-gold-gradient"
                          : "h-1.5 w-3 rounded-full bg-border"
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                    }
                    className="grid size-11 place-items-center rounded-full border border-border/70 text-gold transition-colors hover:border-gold/50"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                    className="grid size-11 place-items-center rounded-full border border-border/70 text-gold transition-colors hover:border-gold/50"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            ) : null}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
