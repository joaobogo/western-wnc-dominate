import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Download, FileText, LogOut, RefreshCw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

 type BlogDraft = Database["public"]["Tables"]["blog_drafts"]["Row"];
 type ReviewStatus = BlogDraft["review_status"];

const statuses: Array<{ value: ReviewStatus | "all"; label: string }> = [
  { value: "pending_review", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

function statusLabel(status: string) {
  return status === "pending_review" ? "Pending review" : status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminBlogReview() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [drafts, setDrafts] = useState<BlogDraft[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReviewStatus | "all">("pending_review");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(() => drafts.find((draft) => draft.id === selectedId) ?? null, [drafts, selectedId]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (!data.session) {
        navigate("/admin/login?next=/admin/blog-review", { replace: true });
        return;
      }
      const { data: allowed } = await supabase.rpc("has_role", {
        _user_id: data.session.user.id,
        _role: "admin",
      });
      if (!active) return;
      setIsAdmin(Boolean(allowed));
      setCheckingAuth(false);
    })();
    return () => { active = false; };
  }, [navigate]);

  const loadDrafts = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    setError(null);
    let query = supabase.from("blog_drafts").select("*").order("imported_at", { ascending: false });
    if (filter !== "all") query = query.eq("review_status", filter);
    const { data, error: loadError } = await query;
    if (loadError) setError(loadError.message);
    else {
      const rows = data ?? [];
      setDrafts(rows);
      setSelectedId((current) => rows.some((row) => row.id === current) ? current : rows[0]?.id ?? null);
    }
    setLoading(false);
  }, [filter, isAdmin]);

  useEffect(() => { void loadDrafts(); }, [loadDrafts]);
  useEffect(() => { setNotes(selected?.reviewer_notes ?? ""); }, [selected]);

  const importLatest = async () => {
    setImporting(true);
    setError(null);
    setMessage(null);
    const { data, error: invokeError } = await supabase.functions.invoke("babylovegrowth-import", { body: {} });
    if (invokeError) setError(invokeError.message);
    else if (data?.error) setError(data.error);
    else {
      setMessage(`Imported ${data?.imported ?? 0} article${data?.imported === 1 ? "" : "s"}${data?.failed ? `; ${data.failed} failed` : ""}.`);
      await loadDrafts();
    }
    setImporting(false);
  };

  const review = async (reviewStatus: "approved" | "rejected") => {
    if (!selected) return;
    setSaving(true);
    setError(null);
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) {
      navigate("/admin/login?next=/admin/blog-review", { replace: true });
      return;
    }
    const { error: saveError } = await supabase.from("blog_drafts").update({
      review_status: reviewStatus,
      reviewer_notes: notes.trim() || null,
      reviewed_by: userId,
      reviewed_at: new Date().toISOString(),
    }).eq("id", selected.id);
    if (saveError) setError(saveError.message);
    else {
      setMessage(`Article ${reviewStatus}. It has not been published.`);
      await loadDrafts();
    }
    setSaving(false);
  };

  if (checkingAuth) return <main className="min-h-dvh bg-background p-8"><p>Checking access…</p></main>;
  if (!isAdmin) return <main className="min-h-dvh bg-background p-8"><h1 className="font-heading text-2xl">Access denied</h1></main>;

  return (
    <>
      <SEOHead title="Blog Review | Highlander Admin" description="Private BabyLoveGrowth article review queue." path="/admin/blog-review" noindex />
      <main id="main-content" className="min-h-dvh bg-background">
        <header className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-foreground/70">Highlander internal</p>
              <h1 className="font-heading text-2xl font-bold">Blog review</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onDark size="sm" loading={importing} loadingText="Importing" onClick={importLatest}>
                <Download aria-hidden="true" /> Import latest
              </Button>
              <Button variant="ghost" onDark size="icon" aria-label="Sign out" onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }}>
                <LogOut aria-hidden="true" />
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-6">
          <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="Filter drafts">
            {statuses.map((status) => (
              <Button key={status.value} size="sm" variant={filter === status.value ? "primary" : "secondary"} onClick={() => setFilter(status.value)}>
                {status.label}
              </Button>
            ))}
            <Button className="ml-auto" size="icon" variant="ghost" aria-label="Refresh drafts" onClick={() => void loadDrafts()}>
              <RefreshCw aria-hidden="true" />
            </Button>
          </div>

          {message && <p role="status" className="mb-4 border border-border bg-muted px-4 py-3 text-sm">{message}</p>}
          {error && <p role="alert" className="mb-4 border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

          <div className="grid min-h-[65vh] gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <section aria-label="Imported articles" className="border-r-0 border-border lg:border-r lg:pr-6">
              {loading ? <p className="text-sm text-muted-foreground">Loading drafts…</p> : drafts.length === 0 ? (
                <div className="py-12 text-center">
                  <FileText className="mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
                  <p className="font-semibold">No articles in this view</p>
                  <p className="mt-1 text-sm text-muted-foreground">Import the latest articles or choose another status.</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {drafts.map((draft) => (
                    <li key={draft.id}>
                      <button type="button" onClick={() => setSelectedId(draft.id)} className={`w-full border p-4 text-left transition-colors ${selectedId === draft.id ? "border-primary bg-muted" : "border-border hover:bg-muted/60"}`}>
                        <Badge variant={draft.review_status === "rejected" ? "destructive" : draft.review_status === "approved" ? "default" : "outline"}>{statusLabel(draft.review_status)}</Badge>
                        <h2 className="mt-2 font-heading text-base font-bold leading-snug">{draft.title}</h2>
                        <p className="mt-2 text-xs text-muted-foreground">Imported {new Date(draft.imported_at).toLocaleDateString()}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <article className="min-w-0">
              {!selected ? <p className="text-sm text-muted-foreground">Select an article to review.</p> : (
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{statusLabel(selected.review_status)}</Badge>
                      {selected.seed_keyword && <span className="text-xs text-muted-foreground">Keyword: {selected.seed_keyword}</span>}
                    </div>
                    <h2 className="font-heading text-3xl font-bold leading-tight">{selected.title}</h2>
                    {selected.meta_description && <p className="mt-3 text-sm text-muted-foreground">{selected.meta_description}</p>}
                  </div>

                  <section aria-labelledby="article-content-heading">
                    <h3 id="article-content-heading" className="mb-3 font-heading text-lg font-bold">Article content</h3>
                    <div className="max-h-[55vh] overflow-y-auto border border-border bg-card p-5 text-sm leading-7 whitespace-pre-wrap">
                      {selected.content_markdown || selected.excerpt || "No article body was provided."}
                    </div>
                  </section>

                  <div>
                    <label htmlFor="review-notes" className="mb-2 block text-sm font-semibold">Review notes</label>
                    <Textarea id="review-notes" rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add internal notes about SEO, voice, facts, or revisions." />
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-border pt-5">
                    <Button loading={saving} loadingText="Saving" onClick={() => void review("approved")}>
                      <Check aria-hidden="true" /> Approve for publishing workflow
                    </Button>
                    <Button variant="destructive" disabled={saving} onClick={() => void review("rejected")}>
                      <X aria-hidden="true" /> Reject
                    </Button>
                    <p className="w-full text-xs text-muted-foreground">Approval records your decision only. It does not publish the article.</p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
