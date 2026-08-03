import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero, Authority } from "@/components/site/Hero";
import { FeaturedProjects } from "@/components/site/FeaturedWork";
import { CaseStudyPreview } from "@/components/site/CaseStudyPreview";
import { WhatsappCta } from "@/components/site/WhatsappCta";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyMe } from "@/components/site/WhyMe";
import { Process } from "@/components/site/Process";
import { FAQ } from "@/components/site/FAQ";
import { Button } from "@/components/ui/button";
import { CONTACT, FAQS } from "@/lib/site-data";
import {
  DEFAULT_CTA,
  pickContent,
  siteContentQuery,
  portfolioProjectsQuery,
  testimonialsQuery,
  type CtaContent,
} from "@/lib/cms";

const TITLE = "Ola Bright — Website Conversion & Growth Specialist";
const DESCRIPTION =
  "I help brands turn website visitors into customers through conversion optimization, audits, redesigns and technical SEO on Shopify, Wix, WooCommerce and WordPress.";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(siteContentQuery),
      context.queryClient.ensureQueryData(portfolioProjectsQuery()),
      context.queryClient.ensureQueryData(testimonialsQuery),
    ]);
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ola Bright",
          jobTitle: "Website Conversion & Growth Specialist",
          description: DESCRIPTION,
          email: CONTACT.email,
          telephone: "+2347042220359",
          knowsAbout: [
            "Conversion Rate Optimization",
            "Shopify",
            "WooCommerce",
            "Wix",
            "WordPress",
            "Technical SEO",
            "Klaviyo Email Marketing",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
  errorComponent: ({ error }) => (
    <div className="grid min-h-dvh place-items-center p-6 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Page not found.</div>,
});

function FinalCta() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const cta = pickContent<CtaContent>(data, "cta", DEFAULT_CTA);

  return (
    <section className="relative border-t border-border/60 py-20 sm:py-28">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-balance text-3xl font-semibold sm:text-5xl">
          {cta.title.replace(" Brand", " ")}
          <span className="text-gold-gradient">Brand</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">{cta.subtitle}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp me
            </a>
          </Button>
          <Button asChild variant="goldOutline" size="lg">
            <Link to="/contact">
              Contact me <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Authority />
      <FeaturedProjects />
      <WhatsappCta
        title="See a project like yours?"
        body="Send me your website link and I'll tell you what I'd fix first."
        label="Get my take on WhatsApp"
      />
      <CaseStudyPreview />
      <Services />
      <WhatsappCta
        title="Not sure which service you need?"
        body="Tell me your goal in one message and I'll point you to the fastest path — even if it isn't a paid project."
        label="Ask me on WhatsApp"
      />
      <WhyMe />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCta />
    </SiteLayout>
  );
}
