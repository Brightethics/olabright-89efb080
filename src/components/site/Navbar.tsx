import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-panel border-x-0 border-t-0 py-2" : "border-transparent py-4",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-8"
      >
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-gradient font-display text-lg font-bold text-primary-foreground">
            O
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-semibold">Ola Bright</span>
            <span className="block text-[0.65rem] uppercase tracking-[0.24em] text-gold">
              Digital
            </span>
          </span>
        </Link>

        <ul className="hidden items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp Me
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-xl border border-border/70 text-gold lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-4 mt-3 rounded-2xl glass-panel p-3 lg:hidden">
          <ul className="grid">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.href) ? "text-gold" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
