import { Mail, MessageCircle, ShoppingBag } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gold-gradient font-display text-lg font-bold text-primary-foreground">
                O
              </span>
              <span className="font-display text-lg font-semibold">Ola Bright Digital</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Website Conversion &amp; Growth Specialist. I help businesses build, redesign and
              optimize websites that generate more leads, more sales and better customer
              experiences.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-11 place-items-center rounded-full border border-border/70 text-gold transition-colors hover:border-gold/50 hover:bg-accent"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Email Ola Bright"
                className="grid size-11 place-items-center rounded-full border border-border/70 text-gold transition-colors hover:border-gold/50 hover:bg-accent"
              >
                <Mail className="size-5" />
              </a>
              <a
                href={CONTACT.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fiverr profile"
                className="grid size-11 place-items-center rounded-full border border-border/70 text-gold transition-colors hover:border-gold/50 hover:bg-accent"
              >
                <ShoppingBag className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Get in touch
            </h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li>
                <a href={CONTACT.whatsapp} className="transition-colors hover:text-gold">
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-gold">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.fiverr} className="transition-colors hover:text-gold">
                  fiverr.com/mrolabright
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="my-10 h-px hairline-gold" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ola Bright Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
