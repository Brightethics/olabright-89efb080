import { createFileRoute } from "@tanstack/react-router";

/**
 * Streams media from the private "media" storage bucket.
 * Uses the publishable key (public SELECT policy on the bucket), so it works on
 * any host — Lovable, Vercel or a custom domain — without a service-role key.
 */
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const supabaseUrl =
          process.env["SUPABASE_URL"] ??
          process.env["VITE_SUPABASE_URL"] ??
          import.meta.env.VITE_SUPABASE_URL;
        const apiKey =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ??
          process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !apiKey) {
          return new Response("Media backend not configured", { status: 500 });
        }

        const objectUrl = `${supabaseUrl}/storage/v1/object/media/${path
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`;

        const upstream = await fetch(objectUrl, { headers: { apikey: apiKey } });
        if (!upstream.ok || !upstream.body) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "content-type": upstream.headers.get("content-type") ?? "application/octet-stream",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
