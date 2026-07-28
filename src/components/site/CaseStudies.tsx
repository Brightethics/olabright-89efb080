import { CASE_STUDIES } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const blocks = [
  { key: "problem", label: "Problem" },
  { key: "strategy", label: "Strategy" },
  { key: "outcome", label: "Outcome" },
] as const;

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="The work,"
          highlight="in detail"
          description="Two engagements broken down from diagnosis to measurable outcome."
        />

        <div className="mt-14 grid gap-8">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.id} delay={i * 100}>
              <article className="overflow-hidden rounded-3xl border border-border/70 bg-surface/60">
                <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.35fr_0.65fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                      {study.tag}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{study.client}</h3>

                    <div className="mt-7 grid gap-6">
                      {blocks.map((block) => (
                        <div key={block.key} className="border-l border-gold/25 pl-5">
                          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold/90">
                            {block.label}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {study[block.key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <dl className="grid content-start gap-4 rounded-2xl border border-gold/20 bg-background/50 p-6">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <dd className="font-display text-3xl font-semibold text-gold-gradient sm:text-4xl">
                          {metric.value}
                        </dd>
                        <dt className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          {metric.label}
                        </dt>
                      </div>
                    ))}
                    <Button asChild variant="gold" size="sm" className="mt-2">
                      <a href="#contact">Get results like these</a>
                    </Button>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
