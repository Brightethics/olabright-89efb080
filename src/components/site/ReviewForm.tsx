import { useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BUDGET_RANGES, PROJECT_TYPES } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGET_RANGES[1]);
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState<File | null>(null);
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

    let photoPath: string | null = null;
    if (photo) {
      const ext = photo.name.split(".").pop() ?? "jpg";
      const path = `reviews/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, photo);
      if (!uploadError) photoPath = path;
    }

    const { error } = await supabase.from("testimonials").insert({
      name: name.trim(),
      country: country.trim(),
      service_purchased: service,
      budget_range: budget,
      title: title.trim(),
      quote: quote.trim(),
      rating,
      photo_url: photoPath,
      approved: false,
      featured: false,
    });
    if (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }
    setStatus("done");
    setMessage("Thank you! Your review was submitted and will appear once I approve it.");
    setName("");
    setCountry("");
    setTitle("");
    setQuote("");
    setRating(5);
    setPhoto(null);
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
            Every review is checked and approved before it appears on this page.
          </p>
        </div>

        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Your rating</legend>
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
                <Star className={value <= rating ? "size-7 fill-current" : "size-7 opacity-30"} />
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="review-name">Your name</Label>
            <Input
              id="review-name"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="review-country">Country</Label>
            <Input
              id="review-country"
              value={country}
              maxLength={60}
              placeholder="e.g. Canada"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="review-service">Service purchased</Label>
            <select
              id="review-service"
              className={selectClass}
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {PROJECT_TYPES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="review-budget">Budget range</Label>
            <select
              id="review-budget"
              className={selectClass}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              {BUDGET_RANGES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="review-title">Review title</Label>
          <Input
            id="review-title"
            value={title}
            maxLength={120}
            placeholder="Sum it up in one line"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="review-quote">Your review</Label>
          <Textarea
            id="review-quote"
            rows={5}
            value={quote}
            maxLength={1500}
            placeholder="What did we work on, and what changed for your business?"
            onChange={(e) => setQuote(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="review-photo">Profile photo (optional)</Label>
          <Input
            id="review-photo"
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          />
        </div>

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
