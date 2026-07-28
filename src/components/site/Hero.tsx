import { ArrowRight, BadgeCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/hero-portrait.jpg";

const heroFacts = [
  { value: "5+", label: "Years Experience" },
  { value: "120+", label: "Projects Completed" },
  { value: "60+", label: "Clients Served" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-gold/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 size-[28rem] rounded-full bg-gold-deep/10 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-gold">
            <Sparkles className="size-3.5" />
            Shopify CRO &amp; AI Video Studio
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            I Turn Visitors Into <span className="text-gold-gradient">Customers.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Shopify Conversion Optimization Specialist &amp; AI Video Creator helping brands
            increase sales, improve customer experience, and scale profitably.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <a href="#contact">
                Book a Free Audit <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <a href="#portfolio">View My Work</a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border/60 bg-surface/50 px-3 py-4 text-center"
              >
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold text-gold sm:text-3xl">
                    {fact.value}
                  </span>
                  <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-6 rounded-[2.5rem] bg-gold-gradient opacity-20 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-surface shadow-[var(--shadow-elevated)]">
            <img
              src={portrait}
              alt="Ola Bright, Shopify conversion optimization specialist and AI video creator"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent"
            />
          </div>

          <div className="animate-float-slow absolute -bottom-6 -left-2 rounded-2xl glass-panel px-4 py-3 sm:-left-8">
            <div className="flex items-center gap-3">
              <BadgeCheck className="size-8 shrink-0 text-gold" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">Verified Shopify Partner</p>
                <p className="text-xs text-muted-foreground">Certified store expert</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 right-0 rounded-2xl glass-panel px-4 py-3 sm:-right-6">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">5.0 average client rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
