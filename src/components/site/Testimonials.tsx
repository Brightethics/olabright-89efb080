import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What founders say after"
          highlight="the numbers move"
        />

        <div className="mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="flex h-full flex-col rounded-3xl border border-border/70 bg-surface/60 p-7">
                    <Quote className="size-8 text-gold/40" />
                    <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div
                      className="mt-6 flex items-center gap-1 text-gold"
                      aria-label={`${t.rating} out of 5 stars`}
                    >
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <figcaption className="mt-5 flex min-w-0 items-center gap-3 border-t border-border/60 pt-5">
                      <span
                        aria-hidden
                        className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/25 bg-accent/60 font-display text-base font-semibold text-gold"
                      >
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{t.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="goldOutline"
              size="icon"
              aria-label="Previous testimonial"
              className="min-h-11 min-w-11"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft />
            </Button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={selected === i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    selected === i ? "w-7 bg-gold-gradient" : "w-2.5 bg-border",
                  )}
                />
              ))}
            </div>
            <Button
              variant="goldOutline"
              size="icon"
              aria-label="Next testimonial"
              className="min-h-11 min-w-11"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
