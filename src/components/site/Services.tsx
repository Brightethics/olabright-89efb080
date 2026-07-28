import { Check } from "lucide-react";
import { SERVICE_GROUPS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="services" className="relative border-t border-border/60 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 size-[30rem] -translate-x-1/2 rounded-full bg-gold/5 blur-[150px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Expertise"
          title="Everything your store needs to"
          highlight="convert"
          description="Sixteen focused services across Shopify performance, conversion optimization, growth marketing and AI video production."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {SERVICE_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <article className="card-lift h-full rounded-3xl border border-border/70 bg-surface/60 p-7 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold sm:text-2xl">{group.title}</h3>
                  <span className="font-display text-sm text-gold/60">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{group.blurb}</p>
                <div aria-hidden className="my-6 h-px hairline-gold" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
