import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

async function uploadFile(file: File) {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export function MediaField({
  label,
  value,
  onChange,
  accept = "image/*",
}: {
  label: string;
  value: string | null;
  onChange: (path: string | null) => void;
  accept?: string;
}) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = mediaUrl(value);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadFile(file));
      toast.success("Uploaded");
    } catch (error) {
      toast.error("Upload failed", { description: (error as Error).message });
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {preview ? (
          accept.startsWith("video") ? (
            <video src={preview} className="size-16 rounded-lg object-cover" muted />
          ) : (
            <img src={preview} alt="" className="size-16 rounded-lg object-cover" />
          )
        ) : (
          <span className="grid size-16 place-items-center rounded-lg border border-dashed border-gold/25 text-gold/50">
            <Upload className="size-5" />
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="goldOutline"
          size="sm"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? <Loader2 className="animate-spin" /> : <Upload />} Upload
        </Button>
        {value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
            <X /> Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function MediaListField({
  label,
  values,
  onChange,
  accept = "image/*",
}: {
  label: string;
  values: string[];
  onChange: (paths: string[]) => void;
  accept?: string;
}) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map(uploadFile));
      onChange([...values, ...uploaded]);
      toast.success(`${uploaded.length} file(s) uploaded`);
    } catch (error) {
      toast.error("Upload failed", { description: (error as Error).message });
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-3">
        {values.map((path) => (
          <span key={path} className="relative">
            <img src={mediaUrl(path) ?? ""} alt="" className="size-16 rounded-lg object-cover" />
            <button
              type="button"
              aria-label="Remove media"
              onClick={() => onChange(values.filter((v) => v !== path))}
              className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border border-border bg-background text-muted-foreground"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="goldOutline"
          size="sm"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? <Loader2 className="animate-spin" /> : <Upload />} Add
        </Button>
      </div>
    </div>
  );
}
