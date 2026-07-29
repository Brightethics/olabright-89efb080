import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset password — Ola Bright Digital" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Reset your admin password." },
      { property: "og:title", content: "Reset password" },
      { property: "og:description", content: "Reset your admin password." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [isRecovery, setIsRecovery] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery") || hash.includes("access_token")) {
      setIsRecovery(true);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    const confirm = String(data.get("confirm"));

    if (password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters.",
      });
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error("Update failed", { description: error.message });
      return;
    }
    toast.success("Password updated", {
      description: "You can now sign in with your new password.",
    });
    navigate({ to: "/auth", replace: true });
  };

  if (!isRecovery) {
    return (
      <div className="grid min-h-dvh place-items-center px-4">
        <div className="w-full max-w-sm rounded-3xl border border-border/70 bg-surface/60 p-8 text-center">
          <h1 className="font-display text-2xl font-semibold">
            Invalid reset link
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This page only works from a password reset email. Return to sign in and
            request a new link.
          </p>
          <Button
            asChild
            variant="goldOutline"
            className="mt-6"
          >
            <a href="/auth">Back to sign in</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border/70 bg-surface/60 p-8"
      >
        <h1 className="font-display text-2xl font-semibold">
          Set new <span className="text-gold-gradient">password</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a new password for your admin account.
        </p>

        <div className="mt-7 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              minLength={6}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={busy}
          className="mt-7 w-full"
        >
          {busy ? "Updating…" : "Update password"}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
