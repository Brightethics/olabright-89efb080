import { Gauge, HeartHandshake, TrendingUp, Video } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const outcomes = [
  {
    icon: Gauge,
    title: "Faster Shopify performance",
    body: "Lean themes, trimmed apps and optimized assets so pages load before shoppers lose patience.",
  },
  {
    icon: TrendingUp,
    title: "Higher conversion rates",
    body: "Structured testing on product pages, collections and checkout to lift revenue per visitor.",
  },
  {
    icon: HeartHandshake,
    title: "Reduced drop-off, better UX",
    body: "Clear journeys, honest trust signals and friction removed at every decision point.",
  },
  {
    icon: Video,
    title: "Engaging AI video content",
    body: "UGC-style ads, commercials and demos that keep attention and drive qualified clicks.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="Meet"
          highlight="Ola Bright"
          description="I help ecommerce brands turn existing traffic into revenue. Instead of chasing trends, I diagnose what's actually stopping people from buying — then fix it with design, engineering and creative that's measured against business outcomes."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="card-lift h-full rounded-2xl border border-border/70 bg-surface/60 p-6">
                <span className="grid size-11 place-items-center rounded-xl border border-gold/25 bg-accent/60 text-gold">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
