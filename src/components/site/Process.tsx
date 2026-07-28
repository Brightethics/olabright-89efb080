import { PROCESS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section
      aria-label="My process"
      className="relative border-t border-border/60 py-20 sm:py-28"
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Process"
          title="Four steps from audit to"
          highlight="compounding growth"
        />

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden
            className="absolute left-6 top-2 hidden h-px w-full hairline-gold lg:block"
          />
          {PROCESS.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 110} className="relative">
              <div className="flex items-center gap-4 lg:block">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-background font-display text-base font-semibold text-gold">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold lg:mt-6">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
