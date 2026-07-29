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
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [busy, setBusy] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
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

  const handleForgot = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error("Reset failed", { description: error.message });
      return;
    }
    toast.success("Reset email sent", {
      description: "Check your inbox for the password reset link.",
    });
  };

  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <form
        onSubmit={mode === "signin" ? handleSignIn : handleForgot}
        className="w-full max-w-sm rounded-3xl border border-border/70 bg-surface/60 p-8"
      >
        <h1 className="font-display text-2xl font-semibold">
          {mode === "signin" ? (
            <>
              Admin <span className="text-gold-gradient">sign in</span>
            </>
          ) : (
            <>
              Reset <span className="text-gold-gradient">password</span>
            </>
          )}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Private area for managing site content."
            : "Enter your email and we'll send you a reset link."}
        </p>

        <div className="mt-7 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          {mode === "signin" ? (
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
          ) : null}
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={busy}
          className="mt-7 w-full"
        >
          {busy
            ? mode === "signin"
              ? "Signing in…"
              : "Sending link…"
            : mode === "signin"
              ? "Sign in"
              : "Send reset link"}
        </Button>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "forgot" : "signin")}
            className="text-sm text-muted-foreground hover:text-gold"
          >
            {mode === "signin" ? "Forgot password?" : "Back to sign in"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
