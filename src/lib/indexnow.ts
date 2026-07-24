/**
 * IndexNow client helper.
 *
 * Ping Bing/Yandex via the `indexnow-submit` edge function when public
 * content is added, meaningfully updated, redirected, or deleted. The
 * edge function enforces the safety rules:
 *   - only https://highlandernc.com/* URLs are accepted
 *   - tracking params (utm_*, gclid, fbclid, li_fat_id, msclkid, …) are stripped
 *   - duplicates are removed
 *   - the shared IndexNow key is hosted at /<key>.txt and never rotated per call
 *
 * Do NOT call this on every navigation or in a loop over unchanged pages —
 * that would spam IndexNow. Call it deliberately from admin tooling or a
 * publish pipeline, and only for URLs that actually changed.
 */
import { supabase } from "@/integrations/supabase/client";

export interface IndexNowResult {
  ok: boolean;
  indexnow_status: number;
  submitted: number;
  urls: string[];
  upstream_body?: string;
  error?: string;
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const { data, error } = await supabase.functions.invoke("indexnow-submit", {
    body: { urls },
  });
  if (error) {
    return {
      ok: false,
      indexnow_status: 0,
      submitted: 0,
      urls: [],
      error: error.message,
    };
  }
  return data as IndexNowResult;
}