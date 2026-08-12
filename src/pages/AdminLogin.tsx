import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { fieldAttrs } from "@/lib/field-ergonomics";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const rawNext = params.get("next") ?? "";
  const next = /^\/(?!\/)/.test(rawNext) ? rawNext : "/admin/leads";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    navigate(next, { replace: true });
  };

  return (
    <>
    <SEOHead title="Admin Sign In | Highlander" description="Highlander admin sign-in." path="/admin/login" noindex />
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border border-border rounded-md p-6">
        <div>
          <h1 className="text-lg font-heading font-bold">Internal sign in</h1>
          <p className="text-xs text-muted-foreground">Highlander team only. Leads dashboard access.</p>
        </div>
        <input aria-label="Email" {...fieldAttrs.email} autoComplete="username" required placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-input rounded px-3 py-2 text-sm bg-background" />
        <input aria-label="Password" {...fieldAttrs.password} required placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-input rounded px-3 py-2 text-sm bg-background" />
        {err && <p className="text-xs text-destructive">{err}</p>}
        <button disabled={loading} className="w-full bg-primary text-primary-foreground rounded py-2 text-sm font-semibold disabled:opacity-40">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
    </>
  );
}