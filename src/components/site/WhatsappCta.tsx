import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function WhatsappCta({
  title = "Want to know what's costing you sales?",
  body = "Send me your website link on WhatsApp. I'll reply with the three biggest opportunities I can see — free, no obligation.",
  label = "Message me on WhatsApp",
}: {
  title?: string;
  body?: string;
  label?: string;
}) {
  return (
    <section className="border-t border-border/60 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-gold/20 bg-surface/60 p-8 text-center sm:p-10 lg:flex-row lg:text-left">
            <div className="flex-1">
              <h2 className="text-balance text-2xl font-semibold sm:text-3xl">{title}</h2>
              <p className="mt-3 text-pretty text-muted-foreground">{body}</p>
            </div>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> {label}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
