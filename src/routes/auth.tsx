import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")).trim(),
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
    const email = String(data.get("email")).trim();
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
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-4 py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[var(--gradient-surface)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          Back to website
        </Link>

        <form
          onSubmit={mode === "signin" ? handleSignIn : handleForgot}
          className="rounded-3xl border border-border/70 bg-surface-elevated/90 p-8 shadow-[var(--shadow-gold)] backdrop-blur-xl sm:p-10"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gold-gradient text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold tracking-wide">Ola Bright Digital</p>
              <p className="text-xs text-muted-foreground">Private content dashboard</p>
            </div>
          </div>

          <h1 className="mt-8 font-display text-3xl font-semibold leading-tight">
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
              ? "Sign in to manage portfolio projects, reviews and homepage content."
              : "Enter your email and I'll send you a secure reset link."}
          </p>

          <div className="mt-8 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 pl-10"
                />
              </div>
            </div>

            {mode === "signin" ? (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-12 pl-10 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-gold"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={busy}
            className="mt-8 h-12 w-full"
          >
            {busy
              ? mode === "signin"
                ? "Signing in…"
                : "Sending link…"
              : mode === "signin"
                ? "Sign in"
                : "Send reset link"}
          </Button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "forgot" : "signin")}
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              {mode === "signin" ? "Forgot password?" : "Back to sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Protected area — access is restricted to the site owner.
        </p>
      </div>
      <Toaster />
    </main>
  );
}
