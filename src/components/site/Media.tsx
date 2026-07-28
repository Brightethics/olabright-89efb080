import type { ReactNode } from "react";
import { ImageIcon, Play } from "lucide-react";
import { mediaUrl } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function CmsImage({
  path,
  alt,
  className,
  ratio = "aspect-16/11",
  fallback,
}: {
  path?: string | null;
  alt: string;
  className?: string;
  ratio?: string;
  fallback?: ReactNode;
}) {
  const url = mediaUrl(path);

  if (!url) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image not uploaded yet`}
        className={cn(
          "grid w-full place-items-center border border-dashed border-gold/25 bg-surface/60 text-gold/50",
          ratio,
          className,
        )}
      >
        {fallback ?? <ImageIcon className="size-8" />}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn("w-full object-cover", ratio, className)}
    />
  );
}

export function CmsVideo({
  path,
  poster,
  title,
  className,
}: {
  path?: string | null;
  poster?: string | null;
  title: string;
  className?: string;
}) {
  const url = mediaUrl(path);
  const posterUrl = mediaUrl(poster) ?? undefined;

  if (!url) {
    return (
      <div
        className={cn(
          "grid aspect-video w-full place-items-center border border-dashed border-gold/25 bg-surface/60 text-gold/50",
          className,
        )}
      >
        <Play className="size-9" />
      </div>
    );
  }

  const isEmbed = /youtube\.com|youtu\.be|vimeo\.com/.test(url);
  if (isEmbed) {
    const embedSrc = url
      .replace("youtu.be/", "www.youtube.com/embed/")
      .replace("watch?v=", "embed/")
      .replace("vimeo.com/", "player.vimeo.com/video/");
    return (
      <iframe
        src={embedSrc}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        className={cn("aspect-video w-full", className)}
      />
    );
  }

  return (
    <video
      src={url}
      poster={posterUrl}
      controls
      playsInline
      preload="none"
      title={title}
      className={cn("aspect-video w-full bg-black object-cover", className)}
    />
  );
}
