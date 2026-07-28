import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Send, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { BUDGET_RANGES, CONTACT, PROJECT_TYPES } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const methods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: CONTACT.whatsapp,
    note: "Fastest reply — usually within an hour",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "Best for detailed briefs and documents",
  },
  {
    icon: ShoppingBag,
    label: "Fiverr",
    value: "fiverr.com/mrolabright",
    href: CONTACT.fiverr,
    note: "Prefer buyer protection? Order there",
  },
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  website: z.string().trim().max(200).optional(),
  project_type: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

const fieldClass =
  "border-border/70 bg-background/60 focus-visible:border-gold/50 focus-visible:ring-gold/30";

export function Contact({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company") || undefined,
      website: data.get("website") || undefined,
      project_type: data.get("projectType") || undefined,
      budget: data.get("budget") || undefined,
      message: data.get("message"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert(parsed.data);
    setSubmitting(false);

    if (error) {
      toast.error("Could not send your enquiry", { description: "Please try WhatsApp instead." });
      return;
    }

    toast.success("Enquiry received", {
      description: "Thanks — I'll get back to you shortly. Want a faster reply? Message me on WhatsApp.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="relative border-t border-border/60 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[160px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={title ?? "Let's Grow Your"}
          highlight={title ? undefined : "Brand"}
          description={
            subtitle ??
            "Tell me about your store and I'll come back with the three biggest conversion opportunities I can see — free, no obligation."
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="grid content-start gap-4">
            {methods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card-lift flex items-start gap-4 rounded-2xl border border-border/70 bg-surface/60 p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-accent/60 text-gold">
                  <method.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-gold">
                    {method.label}
                  </span>
                  <span className="mt-1 block truncate font-medium">{method.value}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{method.note}</span>
                </span>
              </a>
            ))}

            <div className="rounded-2xl border border-gold/20 bg-background/50 p-5">
              <p className="text-sm text-muted-foreground">
                Currently accepting{" "}
                <span className="font-semibold text-gold">3 new projects</span> this month.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border/70 bg-surface/60 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required autoComplete="name" className={fieldClass} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="yourstore.com"
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    defaultValue=""
                    className="h-9 w-full rounded-md border border-border/70 bg-background/60 px-3 text-sm text-foreground focus-visible:border-gold/50 focus-visible:outline-none"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget</Label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    defaultValue=""
                    className="h-9 w-full rounded-md border border-border/70 bg-background/60 px-3 text-sm text-foreground focus-visible:border-gold/50 focus-visible:outline-none"
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What's happening with your store right now?"
                    className={fieldClass}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={submitting}
                className="mt-7 w-full"
              >
                {submitting ? "Sending…" : "Send Enquiry"} <Send />
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Prefer instant? <a className="text-gold" href={CONTACT.whatsapp}>Message me on WhatsApp</a>.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
