import { useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "./Reveal";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !quote.trim()) {
      setStatus("error");
      setMessage("Please add your name and your review.");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("testimonials").insert({
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      quote: quote.trim(),
      rating,
      approved: false,
      featured: false,
    });
    if (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }
    setStatus("done");
    setMessage("Thank you! Your review was submitted and will appear once approved.");
    setName("");
    setRole("");
    setCompany("");
    setQuote("");
    setRating(5);
  };

  return (
    <Reveal className="mt-14">
      <form
        onSubmit={submit}
        className="grid gap-5 rounded-3xl border border-gold/20 bg-surface/60 p-7 sm:p-10"
      >
        <div>
          <h3 className="font-display text-2xl font-semibold">
            Worked with me? <span className="text-gold-gradient">Leave a review</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your feedback appears on this page once approved.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="review-name">Your name</Label>
            <Input id="review-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="review-role">Role (optional)</Label>
            <Input id="review-role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="review-company">Company (optional)</Label>
            <Input id="review-company" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="review-quote">Your review</Label>
          <Textarea
            id="review-quote"
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          />
        </div>

        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Rating</legend>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                aria-pressed={rating === value}
                onClick={() => setRating(value)}
                className="text-gold transition-transform hover:scale-110"
              >
                <Star className={value <= rating ? "size-6 fill-current" : "size-6 opacity-30"} />
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="gold" disabled={status === "sending"}>
            {status === "sending" ? "Submitting…" : "Submit review"}
          </Button>
          {message ? (
            <p
              role="status"
              className={status === "error" ? "text-sm text-destructive" : "text-sm text-gold"}
            >
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </Reveal>
  );
}
