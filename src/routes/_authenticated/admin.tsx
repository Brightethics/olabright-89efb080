import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DEFAULT_ABOUT,
  DEFAULT_CTA,
  DEFAULT_HERO,
  DEFAULT_STATS,
  pickContent,
  siteContentQuery,
  type AboutContent,
  type CtaContent,
  type HeroContent,
  type StatsContent,
} from "@/lib/cms";
import {
  Field,
  PortfolioManager,
  TestimonialManager,
} from "@/components/admin/Managers";
import { MediaField } from "@/components/admin/MediaField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard — Ola Bright Digital" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Content dashboard." },
      { property: "og:title", content: "Dashboard" },
      { property: "og:description", content: "Content dashboard." },
    ],
  }),
  component: AdminPage,
});

const TABS = ["Homepage", "Portfolio", "Reviews", "Enquiries"] as const;

function ContentEditor() {
  const qc = useQueryClient();
  const { data } = useQuery(siteContentQuery);
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO);
  const [stats, setStats] = useState<StatsContent>(DEFAULT_STATS);
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT);
  const [cta, setCta] = useState<CtaContent>(DEFAULT_CTA);

  useEffect(() => {
    if (!data) return;
    setHero(pickContent(data, "hero", DEFAULT_HERO));
    setStats(pickContent(data, "stats", DEFAULT_STATS));
    setAbout(pickContent(data, "about", DEFAULT_ABOUT));
    setCta(pickContent(data, "cta", DEFAULT_CTA));
  }, [data]);

  const saveKey = async (key: string, value: unknown) => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value: value as never }, { onConflict: "key" });
    if (error) {
      toast.error("Save failed", { description: error.message });
      return;
    }
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["site_content"] });
  };

  return (
    <div className="grid gap-8">
      <section className="grid gap-5 rounded-2xl border border-border/70 bg-surface/60 p-6">
        <h2 className="text-xl font-semibold">Hero</h2>
        <Field label="Headline">
          <Input value={hero.headline} onChange={(e) => setHero({ ...hero, headline: e.target.value })} />
        </Field>
        <Field label="Subheadline">
          <Textarea
            rows={3}
            value={hero.subheadline}
            onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
          />
        </Field>
        <Field label="Trust badges (comma separated)">
          <Input
            value={hero.badges.join(", ")}
            onChange={(e) =>
              setHero({ ...hero, badges: e.target.value.split(",").map((b) => b.trim()) })
            }
          />
        </Field>
        <MediaField
          label="Hero image"
          value={hero.image_url}
          onChange={(p) => setHero({ ...hero, image_url: p })}
        />
        <Button variant="gold" className="justify-self-start" onClick={() => saveKey("hero", hero)}>
          Save hero
        </Button>
      </section>

      <section className="grid gap-5 rounded-2xl border border-border/70 bg-surface/60 p-6">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Projects completed">
            <Input
              value={stats.projects_completed}
              onChange={(e) => setStats({ ...stats, projects_completed: e.target.value })}
            />
          </Field>
          <Field label="Clients served">
            <Input
              value={stats.clients_served}
              onChange={(e) => setStats({ ...stats, clients_served: e.target.value })}
            />
          </Field>
          <Field label="Years of experience">
            <Input
              value={stats.years_experience}
              onChange={(e) => setStats({ ...stats, years_experience: e.target.value })}
            />
          </Field>
          <Field label="Revenue generated">
            <Input
              value={stats.revenue_generated}
              onChange={(e) => setStats({ ...stats, revenue_generated: e.target.value })}
            />
          </Field>
        </div>
        <Button variant="gold" className="justify-self-start" onClick={() => saveKey("stats", stats)}>
          Save statistics
        </Button>
      </section>

      <section className="grid gap-5 rounded-2xl border border-border/70 bg-surface/60 p-6">
        <h2 className="text-xl font-semibold">About page</h2>
        <Field label="Title">
          <Input value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
        </Field>
        <MediaField
          label="About image"
          value={about.image_url}
          onChange={(p) => setAbout({ ...about, image_url: p })}
        />
        <Field label="Personal story">
          <Textarea rows={4} value={about.story} onChange={(e) => setAbout({ ...about, story: e.target.value })} />
        </Field>
        <Field label="Professional journey">
          <Textarea rows={4} value={about.journey} onChange={(e) => setAbout({ ...about, journey: e.target.value })} />
        </Field>
        <Field label="Why clients hire me">
          <Textarea rows={4} value={about.why_hire} onChange={(e) => setAbout({ ...about, why_hire: e.target.value })} />
        </Field>
        <Field label="Experience & expertise">
          <Textarea rows={4} value={about.expertise} onChange={(e) => setAbout({ ...about, expertise: e.target.value })} />
        </Field>
        <Button variant="gold" className="justify-self-start" onClick={() => saveKey("about", about)}>
          Save about
        </Button>
      </section>

      <section className="grid gap-5 rounded-2xl border border-border/70 bg-surface/60 p-6">
        <h2 className="text-xl font-semibold">Final CTA</h2>
        <Field label="Title">
          <Input value={cta.title} onChange={(e) => setCta({ ...cta, title: e.target.value })} />
        </Field>
        <Field label="Subtitle">
          <Textarea rows={3} value={cta.subtitle} onChange={(e) => setCta({ ...cta, subtitle: e.target.value })} />
        </Field>
        <Button variant="gold" className="justify-self-start" onClick={() => saveKey("cta", cta)}>
          Save CTA
        </Button>
      </section>
    </div>
  );
}

function Enquiries() {
  const { data } = useQuery({
    queryKey: ["admin", "contact_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (!data?.length) {
    return <p className="text-sm text-muted-foreground">No enquiries yet.</p>;
  }

  return (
    <ul className="grid gap-3">
      {data.map((row) => (
        <li key={row.id} className="rounded-2xl border border-border/70 bg-surface/50 p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <p className="font-medium">
              {row.name} · <span className="text-gold">{row.email}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(row.created_at).toLocaleString()}
            </p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {[row.company, row.website, row.project_type, row.budget].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{row.message}</p>
        </li>
      ))}
    </ul>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Homepage");

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-dvh">
      <header className="border-b border-border/60 bg-surface/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="font-display text-lg font-semibold">
              Content <span className="text-gold-gradient">dashboard</span>
            </p>
            <p className="text-xs text-muted-foreground">Ola Bright Digital</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="goldOutline" size="sm">
              <Link to="/">View site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="flex flex-wrap gap-2">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              aria-pressed={tab === item}
              className={cn(
                "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                tab === item
                  ? "border-transparent bg-gold-gradient text-primary-foreground"
                  : "border-border/70 text-muted-foreground hover:text-gold",
              )}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-10">
          {tab === "Homepage" ? <ContentEditor /> : null}
          {tab === "Portfolio" ? <PortfolioManager /> : null}
          {tab === "Reviews" ? <TestimonialManager /> : null}
          {tab === "Enquiries" ? <Enquiries /> : null}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
