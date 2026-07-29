import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/cms";
import { MediaField } from "@/components/admin/MediaField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Shopify = Tables<"shopify_projects">;
type Video = Tables<"video_projects">;
type Testimonial = Tables<"testimonials">;

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-5 rounded-2xl border border-border/70 bg-surface/60 p-6">{children}</div>
  );
}

function useEntity<T extends { id: string }>(table: "shopify_projects" | "video_projects" | "testimonials") {
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

const emptyShopify = (): Partial<Shopify> => ({
  name: "",
  slug: "",
  short_description: "",
  mobile_image: null,
  desktop_image: null,
  screen_recording: null,
  featured: false,
  published: true,
  sort_order: 0,
});

export function ShopifyManager() {
  const { list, save, remove } = useEntity<Shopify>("shopify_projects");
  const [draft, setDraft] = useState<Partial<Shopify> | null>(null);
  const set = (patch: Partial<Shopify>) => setDraft((d) => ({ ...(d ?? {}), ...patch }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Shopify projects</h2>
        <Button variant="gold" size="sm" onClick={() => setDraft(emptyShopify())}>
          Add project
        </Button>
      </div>

      {draft ? (
        <Card>
          <Field label="Project name">
            <Input
              value={draft.name ?? ""}
              onChange={(e) =>
                set({ name: e.target.value, slug: draft.id ? draft.slug : slugify(e.target.value) })
              }
            />
          </Field>

          <Field label="Description">
            <Textarea
              rows={4}
              value={draft.short_description ?? ""}
              onChange={(e) => set({ short_description: e.target.value })}
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

          <Toggles row={draft as Record<string, unknown>} set={set as never} />


          <div className="flex gap-3">
            <Button
              variant="gold"
              onClick={async () => {
                if (!draft.name || !draft.slug) {
                  toast.error("Name and slug are required");
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
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface/50 p-4"
          >
            <div>
              <p className="font-medium">{project.name}</p>
              <p className="text-xs text-muted-foreground">
                /{project.slug} · {project.industry || "—"}
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

const emptyVideo = (): Partial<Video> => ({
  name: "",
  slug: "",
  category: "AI UGC Videos",
  description: "",
  results: "",
  thumbnail_url: null,
  video_url: null,
  additional_media: [],
  featured: false,
  published: true,
  sort_order: 0,
});

export function VideoManager({ categories }: { categories: readonly string[] }) {
  const { list, save, remove } = useEntity<Video>("video_projects");
  const [draft, setDraft] = useState<Partial<Video> | null>(null);
  const set = (patch: Partial<Video>) => setDraft((d) => ({ ...(d ?? {}), ...patch }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI video projects</h2>
        <Button variant="gold" size="sm" onClick={() => setDraft(emptyVideo())}>
          Add video
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
            <Field label="Category">
              <select
                value={draft.category ?? ""}
                onChange={(e) => set({ category: e.target.value })}
                className="h-9 w-full rounded-md border border-border/70 bg-background/60 px-3 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <MediaField
            label="Video file (upload)"
            accept="video/*"
            value={draft.video_url ?? null}
            onChange={(p) => set({ video_url: p })}
          />


          <Toggles row={draft as Record<string, unknown>} set={set as never} />

          <div className="flex gap-3">
            <Button
              variant="gold"
              onClick={async () => {
                if (!draft.name || !draft.slug) {
                  toast.error("Name and slug are required");
                  return;
                }
                await save.mutateAsync(draft as Record<string, unknown>);
                setDraft(null);
              }}
            >
              Save video
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
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface/50 p-4"
          >
            <div>
              <p className="font-medium">{project.name}</p>
              <p className="text-xs text-muted-foreground">
                /{project.slug} · {project.category}
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
  quote: "",
  rating: 5,
  photo_url: null,
  featured: false,
  sort_order: 0,
});

export function TestimonialManager() {
  const { list, save, remove } = useEntity<Testimonial>("testimonials");
  const [draft, setDraft] = useState<Partial<Testimonial> | null>(null);
  const set = (patch: Partial<Testimonial>) => setDraft((d) => ({ ...(d ?? {}), ...patch }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <Button variant="gold" size="sm" onClick={() => setDraft(emptyTestimonial())}>
          Add testimonial
        </Button>
      </div>

      {draft ? (
        <Card>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Name">
              <Input value={draft.name ?? ""} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Role">
              <Input value={draft.role ?? ""} onChange={(e) => set({ role: e.target.value })} />
            </Field>
            <Field label="Company">
              <Input
                value={draft.company ?? ""}
                onChange={(e) => set({ company: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Quote">
            <Textarea
              rows={4}
              value={draft.quote ?? ""}
              onChange={(e) => set({ quote: e.target.value })}
            />
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
            <MediaField
              label="Photo"
              value={draft.photo_url ?? null}
              onChange={(p) => set({ photo_url: p })}
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <Switch
              checked={Boolean(draft.approved)}
              onCheckedChange={(v) => set({ approved: v })}
            />
            Approved (visible on the site)
          </label>

          <Toggles row={draft as Record<string, unknown>} set={set as never} showPublished={false} />

          <div className="flex gap-3">
            <Button
              variant="gold"
              onClick={async () => {
                if (!draft.name || !draft.quote) {
                  toast.error("Name and quote are required");
                  return;
                }
                await save.mutateAsync(draft as Record<string, unknown>);
                setDraft(null);
              }}
            >
              Save testimonial
            </Button>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : null}

      <ul className="grid gap-3">
        {(list.data ?? []).map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface/50 p-4"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {[item.role, item.company].filter(Boolean).join(", ")} · {item.rating}★
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="goldOutline" size="sm" onClick={() => setDraft(item)}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(`Delete testimonial from ${item.name}?`)) remove.mutate(item.id);
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
