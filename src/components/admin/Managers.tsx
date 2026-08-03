import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/cms";
import { MediaField, MediaListField } from "@/components/admin/MediaField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { BUDGET_RANGES, PLATFORMS, PROJECT_TYPES } from "@/lib/site-data";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"shopify_projects">;
type Testimonial = Tables<"testimonials">;

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-5 rounded-2xl border border-border/70 bg-card p-6">{children}</div>
  );
}

const selectClass =
  "h-9 w-full rounded-md border border-border/70 bg-background px-3 text-sm";

function useEntity<T extends { id: string }>(table: "shopify_projects" | "testimonials") {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as T[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", table] });
    qc.invalidateQueries({ queryKey: [table] });
    qc.invalidateQueries({ queryKey: [table.replace(/s$/, "")] });
  };

  const save = useMutation({
    mutationFn: async (row: Record<string, unknown>) => {
      const { error } = await supabase.from(table).upsert(row as never);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      invalidate();
    },
    onError: (error: Error) => toast.error("Save failed", { description: error.message }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: (error: Error) => toast.error("Delete failed", { description: error.message }),
  });

  return { list, save, remove };
}

function Toggles({
  row,
  set,
  showPublished = true,
}: {
  row: Record<string, unknown>;
  set: (patch: Record<string, unknown>) => void;
  showPublished?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <label className="flex items-center gap-2 text-sm">
        <Switch checked={Boolean(row.featured)} onCheckedChange={(v) => set({ featured: v })} />
        Featured
      </label>
      {showPublished ? (
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={Boolean(row.published)} onCheckedChange={(v) => set({ published: v })} />
          Published
        </label>
      ) : null}
      <div className="flex items-center gap-2 text-sm">
        <Label className="whitespace-nowrap">Sort order</Label>
        <Input
          type="number"
          value={Number(row.sort_order ?? 0)}
          onChange={(e) => set({ sort_order: Number(e.target.value) })}
          className="w-24"
        />
      </div>
    </div>
  );
}

const emptyProject = (): Partial<Project> => ({
  name: "",
  slug: "",
  platform: "Shopify",
  industry: "",
  short_description: "",
  challenge: "",
  audit_findings: "",
  solution: "",
  results: "",
  business_impact: "",
  mobile_image: null,
  desktop_image: null,
  screen_recording: null,
  gallery_images: [],
  featured: false,
  published: true,
  sort_order: 0,
});

export function PortfolioManager() {
  const { list, save, remove } = useEntity<Project>("shopify_projects");
  const [draft, setDraft] = useState<Partial<Project> | null>(null);
  const set = (patch: Partial<Project>) => setDraft((d) => ({ ...(d ?? {}), ...patch }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Portfolio projects</h2>
        <Button variant="gold" size="sm" onClick={() => setDraft(emptyProject())}>
          Add project
        </Button>
      </div>

      {draft ? (
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Project name">
              <Input
                value={draft.name ?? ""}
                onChange={(e) =>
                  set({ name: e.target.value, slug: draft.id ? draft.slug : slugify(e.target.value) })
                }
              />
            </Field>
            <Field label="Platform">
              <select
                value={draft.platform ?? "Shopify"}
                onChange={(e) => set({ platform: e.target.value })}
                className={selectClass}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Industry (e.g. Fashion, Skincare)">
            <Input value={draft.industry ?? ""} onChange={(e) => set({ industry: e.target.value })} />
          </Field>

          <Field label="Short description (shown on cards)">
            <Textarea
              rows={3}
              value={draft.short_description ?? ""}
              onChange={(e) => set({ short_description: e.target.value })}
            />
          </Field>

          <Field label="The problem">
            <Textarea
              rows={4}
              value={draft.challenge ?? ""}
              onChange={(e) => set({ challenge: e.target.value })}
            />
          </Field>
          <Field label="Audit findings">
            <Textarea
              rows={4}
              value={draft.audit_findings ?? ""}
              onChange={(e) => set({ audit_findings: e.target.value })}
            />
          </Field>
          <Field label="What I did (solution)">
            <Textarea
              rows={4}
              value={draft.solution ?? ""}
              onChange={(e) => set({ solution: e.target.value })}
            />
          </Field>
          <Field label="The result">
            <Textarea
              rows={3}
              value={draft.results ?? ""}
              onChange={(e) => set({ results: e.target.value })}
            />
          </Field>
          <Field label="Business impact">
            <Textarea
              rows={3}
              value={draft.business_impact ?? ""}
              onChange={(e) => set({ business_impact: e.target.value })}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <MediaField
              label="Mobile display"
              value={draft.mobile_image ?? null}
              onChange={(p) => set({ mobile_image: p })}
            />
            <MediaField
              label="Desktop view"
              value={draft.desktop_image ?? null}
              onChange={(p) => set({ desktop_image: p })}
            />
          </div>
          <MediaField
            label="Live screen recording"
            accept="video/*"
            value={draft.screen_recording ?? null}
            onChange={(p) => set({ screen_recording: p })}
          />
          <MediaListField
            label="Additional screenshots"
            values={draft.gallery_images ?? []}
            onChange={(paths) => set({ gallery_images: paths })}
          />

          <Toggles row={draft as Record<string, unknown>} set={set as never} />

          <div className="flex gap-3">
            <Button
              variant="gold"
              onClick={async () => {
                if (!draft.name || !draft.slug) {
                  toast.error("Name is required");
                  return;
                }
                await save.mutateAsync(draft as Record<string, unknown>);
                setDraft(null);
              }}
            >
              Save project
            </Button>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : null}

      <ul className="grid gap-3">
        {(list.data ?? []).map((project) => (
          <li
            key={project.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-4"
          >
            <div>
              <p className="font-medium">{project.name}</p>
              <p className="text-xs text-muted-foreground">
                /{project.slug} · {project.platform}
                {project.featured ? " · featured" : ""}
                {project.published ? "" : " · draft"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="goldOutline" size="sm" onClick={() => setDraft(project)}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(`Delete ${project.name}?`)) remove.mutate(project.id);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const emptyTestimonial = (): Partial<Testimonial> => ({
  name: "",
  role: "",
  company: "",
  title: "",
  country: "",
  service_purchased: PROJECT_TYPES[0],
  budget_range: BUDGET_RANGES[1],
  quote: "",
  rating: 5,
  review_date: new Date().toISOString().slice(0, 10),
  photo_url: null,
  approved: true,
  featured: false,
  sort_order: 0,
});

export function TestimonialManager() {
  const { list, save, remove } = useEntity<Testimonial>("testimonials");
  const [draft, setDraft] = useState<Partial<Testimonial> | null>(null);
  const set = (patch: Partial<Testimonial>) => setDraft((d) => ({ ...(d ?? {}), ...patch }));

  const pending = (list.data ?? []).filter((t) => !t.approved);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reviews</h2>
          {pending.length ? (
            <p className="text-xs text-gold">{pending.length} waiting for approval</p>
          ) : null}
        </div>
        <Button variant="gold" size="sm" onClick={() => setDraft(emptyTestimonial())}>
          Add review
        </Button>
      </div>

      {draft ? (
        <Card>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Client name">
              <Input value={draft.name ?? ""} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Role">
              <Input value={draft.role ?? ""} onChange={(e) => set({ role: e.target.value })} />
            </Field>
            <Field label="Company">
              <Input value={draft.company ?? ""} onChange={(e) => set({ company: e.target.value })} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Country">
              <Input value={draft.country ?? ""} onChange={(e) => set({ country: e.target.value })} />
            </Field>
            <Field label="Service purchased">
              <select
                value={draft.service_purchased ?? ""}
                onChange={(e) => set({ service_purchased: e.target.value })}
                className={selectClass}
              >
                {PROJECT_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Budget range">
              <select
                value={draft.budget_range ?? ""}
                onChange={(e) => set({ budget_range: e.target.value })}
                className={selectClass}
              >
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Review title">
            <Input value={draft.title ?? ""} onChange={(e) => set({ title: e.target.value })} />
          </Field>

          <Field label="Review">
            <Textarea rows={4} value={draft.quote ?? ""} onChange={(e) => set({ quote: e.target.value })} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Rating (1-5)">
              <Input
                type="number"
                min={1}
                max={5}
                value={draft.rating ?? 5}
                onChange={(e) => set({ rating: Number(e.target.value) })}
              />
            </Field>
            <Field label="Review date">
              <Input
                type="date"
                value={draft.review_date ?? ""}
                onChange={(e) => set({ review_date: e.target.value })}
              />
            </Field>
          </div>

          <MediaField
            label="Client photo"
            value={draft.photo_url ?? null}
            onChange={(p) => set({ photo_url: p })}
          />

          <label className="flex items-center gap-2 text-sm">
            <Switch
              checked={Boolean(draft.approved)}
              onCheckedChange={(v) => set({ approved: v })}
            />
            Approved (visible on the website)
          </label>

          <Toggles row={draft as Record<string, unknown>} set={set as never} showPublished={false} />

          <div className="flex gap-3">
            <Button
              variant="gold"
              onClick={async () => {
                if (!draft.name || !draft.quote) {
                  toast.error("Name and review are required");
                  return;
                }
                await save.mutateAsync(draft as Record<string, unknown>);
                setDraft(null);
              }}
            >
              Save review
            </Button>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : null}

      <ul className="grid gap-3">
        {(list.data ?? []).map((item) => (
          <li key={item.id} className="rounded-2xl border border-border/70 bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">
                  {item.name}
                  {item.company ? ` · ${item.company}` : ""}{" "}
                  <span className="text-gold">{"★".repeat(item.rating)}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {[item.country, item.service_purchased, item.budget_range]
                    .filter(Boolean)
                    .join(" · ")}
                  {item.approved ? "" : " · awaiting approval"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs">
                  <Switch
                    checked={item.approved}
                    onCheckedChange={(v) =>
                      save.mutate({ ...item, approved: v } as Record<string, unknown>)
                    }
                  />
                  Approved
                </label>
                <Button variant="goldOutline" size="sm" onClick={() => setDraft(item)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Delete review from ${item.name}?`)) remove.mutate(item.id);
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.quote}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
