import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "./config";

/** Big, plain sign-in: email, password, one button. */
export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) setError("That email and password didn't match. Check them and try again.");
  }

  return (
    <main className="min-h-[80dvh] flex items-center justify-center px-4 py-10">
      <form onSubmit={submit} className="hl-card w-full max-w-[420px] p-6 sm:p-8" noValidate>
        <p className="hl-label">{COMPANY.name}</p>
        <h1 className="hl-slab text-2xl mt-1">Front desk sign-in</h1>
        <p className="text-[15px] mt-2 opacity-80">Sign in with your front desk email and password.</p>

        <label className="block mt-6">
          <span className="block text-[14px] font-semibold mb-1">Email</span>
          <input
            className="hl-input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mt-4">
          <span className="block text-[14px] font-semibold mb-1">Password</span>
          <input
            className="hl-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 text-[14px] font-semibold" style={{ color: "var(--hl-red)" }}>
            {error}
          </p>
        )}

        <button type="submit" className="hl-btn-primary w-full mt-6" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-[13px] mt-4 opacity-70">Forgot your password? Ask your office manager.</p>
      </form>
    </main>
  );
}

export function NoAccess({ email }: { email: string | undefined }) {
  return (
    <main className="min-h-[70dvh] flex items-center justify-center px-4">
      <div className="hl-card w-full max-w-[460px] p-6 text-center">
        <h1 className="hl-slab text-xl">Almost there</h1>
        <p className="text-[15px] mt-2">
          You're signed in as <b>{email}</b>, but this login doesn't have front desk access yet. Ask your office manager.
        </p>
        <button className="hl-btn-quiet mt-5" onClick={() => void supabase.auth.signOut()}>
          Sign out
        </button>
      </div>
    </main>
  );
}
