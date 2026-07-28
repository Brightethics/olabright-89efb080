import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CATEGORIES, PROJECTS, type PortfolioCategory } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>("All");
  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="portfolio" className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected"
          highlight="work"
          description="Audits, redesigns and video systems built for measurable commercial outcomes."
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={80}>
          {PORTFOLIO_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "min-h-11 rounded-full border px-5 text-sm font-medium transition-all duration-300",
                filter === category
                  ? "border-transparent bg-gold-gradient text-primary-foreground shadow-[var(--shadow-gold)]"
                  : "border-border/70 bg-surface/50 text-muted-foreground hover:border-gold/40 hover:text-gold",
              )}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal as="li" key={project.id} delay={i * 70} className="h-full">
              <article className="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface/60">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-16/11 w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-gold/30 bg-background/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-lg font-semibold">{project.title}</h3>

                  <dl className="grid gap-3 text-sm">
                    <div>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold/80">
                        Challenge
                      </dt>
                      <dd className="mt-1 text-muted-foreground">{project.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold/80">
                        Solution
                      </dt>
                      <dd className="mt-1 text-muted-foreground">{project.solution}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold/80">
                        Results
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{project.results}</dd>
                    </div>
                  </dl>

                  <Button asChild variant="goldOutline" size="sm" className="mt-auto self-start">
                    <a href="#case-studies">
                      View Case Study <ArrowUpRight />
                    </a>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
