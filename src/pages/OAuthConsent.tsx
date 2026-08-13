import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useInternalPageHead } from "@/components/SEOHead";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  useInternalPageHead("Authorize application access", "Internal authorization screen for granting an application access to Highlander tools.", "/.lovable/oauth/consent");

  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) { setError("Missing authorization_id"); return; }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      setAccount(sess.session.user.email ?? null);
      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) { setError(error.message); return; }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) { window.location.href = immediate; return; }
      setDetails(data);
    })();
    return () => { active = false; };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) { setBusy(false); setError(error.message); return; }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); setError("No redirect returned by the authorization server."); return; }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "this application";

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-5 border border-border rounded-md p-6">
        {error ? (
          <>
            <h1 className="text-lg font-heading font-bold">Authorization unavailable</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        ) : !details ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <>
            <h1 className="text-lg font-heading font-bold">
              Connect {clientName} to Highlander Building Services
            </h1>
            {account && (
              <p className="text-xs text-muted-foreground">Signed in as {account}</p>
            )}
            <p className="text-sm">
              {clientName} will be able to call this app&rsquo;s enabled tools while you are signed in.
            </p>
            {details?.client?.redirect_uri && (
              <p className="text-xs text-muted-foreground break-all">
                Redirect: {details.client.redirect_uri}
              </p>
            )}
            {typeof details?.scope === "string" && details.scope && (
              <ul className="text-xs text-muted-foreground list-disc pl-4">
                {details.scope.split(/\s+/).filter(Boolean).map((s: string) => (
                  <li key={s}>
                    {s === "email" ? "Share your email address"
                      : s === "profile" || s === "openid" ? "Share your basic profile"
                      : `Additional permission requested: ${s}`}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-muted-foreground">
              This does not bypass this app&rsquo;s permissions or backend policies.
            </p>
            <div className="flex gap-3">
              <button disabled={busy} onClick={() => decide(true)}
                className="flex-1 bg-primary text-primary-foreground rounded py-2 text-sm font-semibold disabled:opacity-40">
                Approve
              </button>
              <button disabled={busy} onClick={() => decide(false)}
                className="flex-1 border border-input rounded py-2 text-sm font-semibold disabled:opacity-40">
                Cancel connection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}