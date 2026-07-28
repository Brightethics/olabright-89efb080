import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in — Ola Bright Digital" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Private admin sign in for Ola Bright Digital." },
      { property: "og:title", content: "Admin sign in" },
      { property: "og:description", content: "Private admin area." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    setBusy(false);
    if (error) {
      toast.error("Sign in failed", { description: error.message });
      return;
    }
    navigate({ to: "/admin", replace: true });
  };

  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border/70 bg-surface/60 p-8"
      >
        <h1 className="font-display text-2xl font-semibold">
          Admin <span className="text-gold-gradient">sign in</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Private area for managing site content.
        </p>

        <div className="mt-7 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <Button type="submit" variant="gold" size="lg" disabled={busy} className="mt-7 w-full">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
