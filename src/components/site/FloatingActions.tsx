import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "grid size-12 place-items-center rounded-full glass-panel text-gold transition-all duration-300 hover:-translate-y-1 hover:text-gold-soft",
          show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ola Bright on WhatsApp"
        className="animate-pulse-glow grid size-14 place-items-center rounded-full bg-gold-gradient text-primary-foreground transition-transform duration-300 hover:scale-105"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
