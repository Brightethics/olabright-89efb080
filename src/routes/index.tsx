import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Stats } from "@/components/site/Stats";
import { Portfolio } from "@/components/site/Portfolio";
import { CaseStudies } from "@/components/site/CaseStudies";
import { WhyMe } from "@/components/site/WhyMe";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { FAQS } from "@/lib/site-data";

const TITLE = "Ola Bright Digital — Shopify CRO & AI Video Creator";
const DESCRIPTION =
  "Shopify Conversion Optimization Specialist & AI Video Creator helping ecommerce brands increase sales, improve customer experience, and scale profitably.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Ola Bright Digital",
          description: DESCRIPTION,
          email: "mrbrightugc@gmail.com",
          telephone: "+2347042220359",
          areaServed: "Worldwide",
          knowsAbout: [
            "Shopify Conversion Optimization",
            "Shopify Store Design",
            "AI UGC Videos",
            "Klaviyo Email Marketing",
            "TikTok Advertising",
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
});

function Index() {
  return (
    <div className="min-h-dvh">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-gradient focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <CaseStudies />
        <WhyMe />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster />
    </div>
  );
}
