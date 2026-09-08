/**
 * Direct Meta Pixel / TikTok Pixel event helpers.
 *
 * Both pixels are loaded straight from index.html (not through GTM), so GTM
 * triggers never reach them. Conversion-grade moments call these helpers in
 * addition to the dataLayer push. Never pass PII — only the business's own
 * phone number, a page path or a category.
 */

type Params = Record<string, string | number | boolean | null | undefined>;

const recent = new Map<string, number>();

/** The same event + key within 1.5 s is a duplicate listener, not a second action. */
function isDuplicate(key: string): boolean {
  const now = Date.now();
  const last = recent.get(key) ?? 0;
  recent.set(key, now);
  return now - last < 1500;
}

function clean(params: Params): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v != null) out[k] = v;
  return out;
}

export function pixelTrack(
  metaEvent: string,
  tiktokEvent: string | null,
  params: Params = {},
  dedupeKey?: string,
) {
  if (typeof window === "undefined") return;
  if (dedupeKey && isDuplicate(`${metaEvent}:${dedupeKey}`)) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  const data = clean(params);
  try {
    w.fbq?.("track", metaEvent, data);
  } catch {
    /* pixel blocked or opted out */
  }
  try {
    if (tiktokEvent) w.ttq?.track?.(tiktokEvent, data);
  } catch {
    /* pixel blocked or opted out */
  }
}

/** A tap on a tel: link — Meta "Contact", TikTok "Contact". */
export function pixelPhoneClick(opts: {
  phone_number: string;
  click_location: string;
  page_path: string;
}) {
  pixelTrack(
    "Contact",
    "Contact",
    {
      content_name: "phone_click",
      content_category: opts.click_location,
      page_path: opts.page_path,
    },
    `${opts.phone_number}:${opts.page_path}`,
  );
}
