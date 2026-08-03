import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { CONTACT, SERVICE_DETAILS } from "@/lib/site-data";

const TITLE = "Services — Website Conversion, Audits & Growth | Ola Bright";
const DESCRIPTION =
  "Conversion rate optimization, website audits, UX and landing page optimization, product page optimization, technical SEO, performance, Klaviyo email, redesign and design.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Built around one outcome —"
            highlight="revenue"
            description={DESCRIPTION}
          />

          <div className="mt-16 grid gap-8">
            {SERVICE_DETAILS.map((service, i) => (
              <Reveal key={service.slug} delay={i * 50}>
                <article
                  id={service.slug}
                  className="grid gap-8 rounded-3xl border border-border/70 bg-surface/60 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]"
                >
                  <div>
                    <p className="font-display text-sm text-gold/60">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{service.title}</h2>
                    <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-gold/90">
                      Benefits
                    </h3>
                    <ul className="mt-3 grid gap-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-3 text-sm text-muted-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-gold/20 bg-background/50 p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold/90">
                      Process
                    </h3>
                    <ol className="mt-4 grid gap-4">
                      {service.process.map((step, index) => (
                        <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full border border-gold/30 text-[0.7rem] text-gold">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <Button asChild variant="gold" size="sm" className="mt-6 w-full">
                      <Link to="/contact">
                        Start this service <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-gold/20 bg-surface/60 p-8 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Not sure where to start?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Send me your store link and I'll tell you which service would move the needle first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <Link to="/contact">Contact me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
