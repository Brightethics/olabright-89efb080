import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Contact } from "@/components/site/Contact";

const TITLE = "Contact — Ola Bright Digital";
const DESCRIPTION =
  "Message Ola Bright on WhatsApp, email or Fiverr, or send a project brief for Shopify conversion optimization and AI video work.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="pt-16">
        <Contact />
      </div>
    </SiteLayout>
  );
}
