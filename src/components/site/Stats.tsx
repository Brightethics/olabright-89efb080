import { STATS } from "@/lib/site-data";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function Stats() {
  return (
    <section
      aria-label="Results and statistics"
      className="relative border-y border-gold/15 py-16 sm:py-20"
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            Results &amp; Statistics
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Numbers that speak before I do
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="rounded-2xl border border-gold/15 bg-background/40 px-4 py-8 text-center">
                <dd className="font-display text-3xl font-semibold text-gold-gradient sm:text-5xl">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </dd>
                <dt className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm sm:tracking-[0.12em]">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
