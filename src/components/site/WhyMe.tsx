import { BarChart3, Sparkles, Store, Target } from "lucide-react";
import { WHY_ME } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = [Target, Store, Sparkles, BarChart3];

export function WhyMe() {
  return (
    <section aria-label="Why work with Ola Bright" className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Work With Me"
          title="A partner who's judged on"
          highlight="revenue"
        />


        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ME.map((card, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={card.title} delay={i * 90}>
                <article className="card-lift group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-surface/60 p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
                  />
                  <span className="grid size-12 place-items-center rounded-2xl bg-gold-gradient text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
