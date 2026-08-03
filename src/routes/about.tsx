import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { CmsImage } from "@/components/site/Media";
import { WhyMe } from "@/components/site/WhyMe";
import { WhatsappCta } from "@/components/site/WhatsappCta";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_ABOUT,
  pickContent,
  siteContentQuery,
  type AboutContent,
} from "@/lib/cms";

const TITLE = "About Ola Bright — Website Conversion & Growth Specialist";
const DESCRIPTION =
  "Why I specialise in website optimization, how I audit and improve websites, my philosophy and my process — written first-hand by Ola Bright.";

export const Route = createFileRoute("/about")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found.</div>,
});

const sections = [
  { key: "story", label: "Personal story" },
  { key: "journey", label: "Professional journey" },
  { key: "why_hire", label: "Why clients hire me" },
  { key: "expertise", label: "Experience & expertise" },
] as const;

function AboutPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const about = pickContent<AboutContent>(data, "about", DEFAULT_ABOUT);

  return (
    <SiteLayout>
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="About" title="Meet" highlight="Ola Bright" />

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-gold/20 bg-surface">
                <CmsImage path={about.image_url} alt="Ola Bright" ratio="aspect-4/5" />
              </div>
            </Reveal>

            <Reveal delay={100} className="grid content-start gap-9">
              {sections.map((section) => {
                const body = about[section.key];
                if (!body) return null;
                return (
                  <div key={section.key} className="border-l border-gold/25 pl-5">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold/90">
                      {section.label}
                    </h2>
                    <p className="mt-3 whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                );
              })}

              {sections.every((s) => !about[s.key]) ? (
                <p className="rounded-2xl border border-dashed border-gold/25 bg-surface/40 p-8 text-sm text-muted-foreground">
                  Your about content will appear here once added in the dashboard.
                </p>
              ) : null}

              <Button asChild variant="gold" size="lg" className="justify-self-start">
                <Link to="/contact">
                  Work with me <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyMe />
      <WhatsappCta />
    </SiteLayout>
  );
}
