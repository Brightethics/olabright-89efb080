import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CmsImage } from "./Media";
import {
  DEFAULT_HERO,
  DEFAULT_STATS,
  pickContent,
  siteContentQuery,
  type HeroContent,
  type StatsContent,
} from "@/lib/cms";
import { CONTACT } from "@/lib/site-data";

export function Hero() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const hero = pickContent<HeroContent>(data, "hero", DEFAULT_HERO);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
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
            {hero.headline.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} className={i === 1 ? "text-gold-gradient" : undefined}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link to="/portfolio">
                View Portfolio <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Message on WhatsApp
              </a>
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2">
            {(hero.badges ?? DEFAULT_HERO.badges).map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-gold/25 bg-surface/50 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-gold"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-6 rounded-[2.5rem] bg-gold-gradient opacity-20 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-surface shadow-[var(--shadow-elevated)]">
            <CmsImage
              path={hero.image_url}
              alt="Ola Bright — Shopify conversion optimization specialist and AI video creator"
              ratio="aspect-4/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Authority() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const stats = pickContent<StatsContent>(data, "stats", DEFAULT_STATS);

  const items = [
    { label: "Projects Completed", value: stats.projects_completed },
    { label: "Clients Served", value: stats.clients_served },
    { label: "Years of Experience", value: stats.years_experience },
    { label: "Revenue Influenced", value: stats.revenue_influenced },
  ];

  return (
    <section
      aria-label="Results and statistics"
      className="relative border-y border-gold/15 py-14 sm:py-20"
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-3xl font-semibold text-gold-gradient sm:text-5xl">
              {item.value}
            </p>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
