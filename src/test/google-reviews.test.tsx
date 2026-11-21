import { render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import ReviewCard from "@/components/reviews/ReviewCard";
import {
  HAND_COPIED_REVIEWS,
  importedReviews,
  inferServiceTags,
  rotateReviews,
  type Review,
} from "@/data/reviews";

// Nov 20: John asked for reviews across the site to rotate and stay up to
// date. Google reviews are imported daily (google-reviews-sync), read at build
// time, merged with the hand-copied list and rotated per page per day.
// Mocked data only: no Google or database calls.

const row = (over: Record<string, unknown> = {}) => ({
  review_id: "AbC123xyz",
  profile: "franklin" as const,
  author_name: "Sam Sample",
  rating: 5,
  comment: "The crew fixed the leak around our chimney flashing and cleaned up after.",
  created_at_google: "2026-11-02T15:00:00Z",
  ...over,
});

describe("imported Google reviews", () => {
  it("keeps the text word for word, links the right listing, and marks tags as guessed", () => {
    const [r] = importedReviews([row(), row({ review_id: "s1", profile: "sylva", comment: "New metal roof on our cabin, very happy with it all." })]);
    expect(r.text).toBe(row().comment);
    expect(r.name).toBe("Sam Sample");
    expect(r.date).toBe("2026-11-02");
    expect(r.dateLabel).toBe("November 2026");
    expect(r.source).toBe("Google");
    expect(r.sourceUrl).toContain("1442261483869937048");
    expect(r.serviceInferred).toBe(true);
    expect(r.service).toContain("roof-repair");
    const sylva = importedReviews([row({ review_id: "s1", profile: "sylva", comment: "New metal roof on our cabin, very happy with it all." })])[0];
    expect(sylva.sourceUrl).toContain("1690022713833215904");
  });

  it("leaves off low ratings, empty or tiny text, future dates and claim-risk wording", () => {
    const out = importedReviews([
      row({ review_id: "a", rating: 3 }),
      row({ review_id: "b", comment: null }),
      row({ review_id: "c", comment: "Great!" }),
      row({ review_id: "d", created_at_google: "2999-01-01T00:00:00Z" }),
      row({ review_id: "e", comment: "They gave us a lifetime warranty on the whole roof job." }),
      row({ review_id: "f", comment: `Came out for a ${["free", "inspection"].join(" ")} and found the problem.` }),
    ]);
    expect(out).toEqual([]);
  });

  it("does not repeat a review that was already copied by hand, or the same text twice", () => {
    const hand = HAND_COPIED_REVIEWS.find((r) => r.source === "Google")!;
    const out = importedReviews([row({ review_id: "dup", comment: hand.text }), row(), row({ review_id: "again" })]);
    expect(out).toHaveLength(1);
    expect(out[0].text).toBe(row().comment);
  });

  it("guesses page topics from the review's words", () => {
    expect(inferServiceTags("New gutters and guards")).toContain("gutters");
    expect(inferServiceTags("Hail storm damage, they handled the insurance claim")).toContain("storm-damage");
    expect(inferServiceTags("Beautiful standing seam roof")).toContain("metal-roofing");
    expect(inferServiceTags("Very professional and on time")).toEqual(["general"]);
  });
});

describe("daily rotation", () => {
  const list: Review[] = Array.from({ length: 10 }, (_, i) => ({
    ...HAND_COPIED_REVIEWS[0],
    id: `r${i}`,
    date: `2026-0${(i % 9) + 1}-1${i % 9}`,
  }));
  const ids = (l: Review[]) => l.map((r) => r.id).join(",");

  it("is the same all day for a page, so the prerendered page and the browser agree", () => {
    expect(ids(rotateReviews(list, "service:gutters", "2026-11-20"))).toBe(ids(rotateReviews(list, "service:gutters", "2026-11-20")));
  });

  it("changes from day to day and from page to page, always with every review", () => {
    const days = ["2026-11-20", "2026-11-21", "2026-11-22", "2026-11-23"].map((d) => ids(rotateReviews(list, "service:gutters", d)));
    expect(new Set(days).size).toBeGreaterThan(1);
    expect(ids(rotateReviews(list, "town:sylva", "2026-11-20"))).not.toBe(days[0]);
    expect(rotateReviews(list, "x", "2026-11-20").map((r) => r.id).sort()).toEqual(list.map((r) => r.id).sort());
  });

  it("always leads with one of the three newest reviews", () => {
    const newest = [...list].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((r) => r.id);
    for (const d of ["2026-11-20", "2026-11-21", "2026-11-22", "2026-12-01", "2027-01-05"]) {
      expect(newest).toContain(rotateReviews(list, "all", d)[0].id);
    }
  });
});

describe("review cards", () => {
  it("never show a job label that was only guessed", () => {
    const imported = importedReviews([row({ comment: "New gutters on the whole house, excellent crew and cleanup." })])[0];
    render(<ReviewCard review={imported} />);
    expect(screen.queryByText("Gutters")).toBeNull();
    expect(screen.getByText(/New gutters on the whole house/)).toBeTruthy();
  });

  it("still show the checked label on hand-copied reviews", () => {
    const hand = HAND_COPIED_REVIEWS.find((r) => r.service.includes("roof-replacement"))!;
    render(<ReviewCard review={hand} />);
    expect(screen.getAllByText("Roof replacement").length).toBeGreaterThan(0);
  });
});

// ── google-reviews-sync edge function (mocked Google + database) ───────────
// Pave-style untyped JSON in the mocks.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = any;
const ENV: Record<string, string> = {
  SUPABASE_URL: "https://db.test",
  SUPABASE_SERVICE_ROLE_KEY: "service",
  SEO_ADMIN_SECRET: "admin-secret",
  GOOGLE_GBP_CLIENT_ID: "cid",
  GOOGLE_GBP_CLIENT_SECRET: "csecret",
  GOOGLE_GBP_REFRESH_TOKEN: "refresh",
};
beforeAll(() => {
  (globalThis as Loose).Deno = { env: { get: (k: string) => ENV[k] } };
});
afterEach(() => vi.unstubAllGlobals());
const sync = async () => (await import("../../supabase/functions/google-reviews-sync/index.ts")) as Loose;

function fakeGoogle({ existing = [] as string[] } = {}) {
  const calls: Array<{ url: string; method: string; body?: Loose }> = [];
  vi.stubGlobal("fetch", vi.fn(async (input: string, init: Loose = {}) => {
    const url = String(input);
    const method = init.method ?? "GET";
    const body = typeof init.body === "string" && init.body.startsWith("[") ? JSON.parse(init.body) : init.body;
    calls.push({ url, method, body });
    const ok = (j: unknown) => new Response(JSON.stringify(j), { status: 200 });
    if (url.startsWith("https://oauth2.googleapis.com/token")) return ok({ access_token: "tok" });
    if (url.includes("mybusinessaccountmanagement")) return ok({ accounts: [{ name: "accounts/1" }] });
    if (url.includes("mybusinessbusinessinformation")) {
      return ok({ locations: [
        { name: "locations/10", metadata: { mapsUri: "https://maps.google.com/maps?cid=1442261483869937048" } },
        { name: "locations/20", storefrontAddress: { locality: "Sylva" } },
        { name: "locations/30", storefrontAddress: { locality: "Asheville" } },
      ] });
    }
    if (url.includes("/v4/accounts/1/locations/10/reviews")) {
      if (!url.includes("pageToken")) {
        return ok({ averageRating: 4.8, totalReviewCount: 180, nextPageToken: "p2", reviews: [
          { reviewId: "f1", reviewer: { displayName: "Ann Example" }, starRating: "FIVE", comment: "Great roof.", createTime: "2026-11-19T10:00:00Z", updateTime: "2026-11-19T10:00:00Z" },
        ] });
      }
      return ok({ averageRating: 4.8, totalReviewCount: 180, reviews: [
        { reviewId: "f2", reviewer: { isAnonymous: true }, starRating: "FOUR", createTime: "2026-11-10T10:00:00Z", reviewReply: { comment: "Thanks!" } },
      ] });
    }
    if (url.includes("/v4/accounts/1/locations/20/reviews")) {
      return ok({ averageRating: 5, totalReviewCount: 31, reviews: [
        { reviewId: "s1", reviewer: { displayName: "Bo Example" }, starRating: "FIVE", comment: "Lovely showroom.", createTime: "2026-11-18T10:00:00Z" },
      ] });
    }
    if (url.startsWith("https://db.test/rest/v1/internal_config")) return ok([]);
    if (url.startsWith("https://db.test/rest/v1/google_reviews?select=")) {
      return ok(existing.map((id) => ({ review_id: id, updated_at_google: null, removed_at: null })));
    }
    if (url.startsWith("https://db.test/rest/v1/")) return new Response("", { status: 201 });
    if (url.startsWith("https://hooks.test")) return new Response("", { status: 200 });
    return new Response("not found", { status: 404 });
  }));
  return calls;
}
const post = (body: unknown = {}, secret = "admin-secret") =>
  new Request("https://fn.test", { method: "POST", headers: { "x-admin-secret": secret }, body: JSON.stringify(body) });

describe("google-reviews-sync", () => {
  it("refuses callers without the secret", async () => {
    const { handle } = await sync();
    fakeGoogle();
    expect((await handle(post({}, "wrong"))).status).toBe(401);
  });

  it("finds both listings, reads every page and saves reviews, the rating and the count", async () => {
    const { handle } = await sync();
    const calls = fakeGoogle({ existing: ["gone-from-google"] });
    const res = await (await handle(post())).json();
    expect(res.ok).toBe(true);
    expect(res.changed).toBe(true);
    const saves = calls.filter((c) => c.method === "POST" && c.url.includes("/rest/v1/google_reviews?on_conflict"));
    const franklin = saves.find((c) => c.body[0].profile === "franklin")!.body;
    expect(franklin.map((r: Loose) => r.review_id)).toEqual(["f1", "f2"]);
    expect(franklin[0]).toMatchObject({ author_name: "Ann Example", rating: 5, comment: "Great roof.", has_owner_reply: false });
    expect(franklin[1]).toMatchObject({ author_name: "A Google user", rating: 4, comment: null, has_owner_reply: true });
    const summary = calls.filter((c) => c.url.includes("google_review_summary?on_conflict")).map((c) => c.body[0]);
    expect(summary).toEqual(expect.arrayContaining([
      expect.objectContaining({ profile: "franklin", average_rating: 4.8, total_review_count: 180 }),
      expect.objectContaining({ profile: "sylva", average_rating: 5, total_review_count: 31 }),
    ]));
    // A review no longer on Google is marked removed, never deleted.
    const removed = calls.find((c) => c.method === "PATCH");
    expect(removed?.url).toContain("gone-from-google");
    expect(calls.some((c) => c.method === "DELETE")).toBe(false);
    // The Asheville listing is not Highlander's and is never read.
    expect(calls.some((c) => c.url.includes("locations/30/reviews"))).toBe(false);
  });

  it("dry run fetches and reports but writes nothing", async () => {
    const { handle } = await sync();
    const calls = fakeGoogle();
    const res = await (await handle(post({ dry_run: true }))).json();
    expect(res.dry_run).toBe(true);
    expect(res.results).toHaveLength(2);
    expect(calls.filter((c) => c.method !== "GET" && c.url.startsWith("https://db.test"))).toHaveLength(0);
  });

  it("matches listings by Maps CID first, then by town", async () => {
    const { matchProfile } = await sync();
    expect(matchProfile({ metadata: { mapsUri: "https://maps.google.com/?cid=1690022713833215904" }, storefrontAddress: { locality: "Franklin" } })).toBe("sylva");
    expect(matchProfile({ storefrontAddress: { locality: "Franklin" } })).toBe("franklin");
    expect(matchProfile({ storefrontAddress: { locality: "Highlands" } })).toBeNull();
  });
});

describe("public 5-star Google reviews supplied by Highlander (20 Nov 2026)", () => {
  const publicOnes = () => import("@/data/reviews").then((m) => m.REVIEWS.filter((r) => r.id.startsWith("google-public-")));

  it("are on the site word for word, from the Franklin listing, labelled as Google", async () => {
    const list = await publicOnes();
    expect(list.length).toBeGreaterThan(100);
    const capita = list.find((r) => r.name === "Joseph Capita")!;
    expect(capita.text).toBe("Our roof suffered wind damage.\nHighlander repaired the roof on time and within the budget estimate.\nWe cannot recommend Highlander highly enough.");
    for (const r of list) {
      expect(r.rating).toBe(5);
      expect(r.source).toBe("Google");
      expect(r.sourceUrl).toContain("1442261483869937048");
      expect(r.serviceInferred).toBe(true);
    }
  });

  it("leave out the flagged reviews, the ones the PDF could not copy exactly, and the warranty-style one", async () => {
    const names = (await publicOnes()).map((r) => r.name);
    for (const n of ["Christian Brogger", "Suzanne Dickinson", "Sal Tartamella", "Doris Weaver", "Faith Groce", "Wild Iris", "Sheron Mayhorn", "J C"]) {
      expect(names).not.toContain(n);
    }
  });

  it("never repeat a review already on the site, and never show Google's relative dates as exact", async () => {
    const { REVIEWS, reviewDateLabel } = await import("@/data/reviews");
    const key = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 80);
    expect(new Set(REVIEWS.map((r) => key(r.text))).size).toBe(REVIEWS.length);
    for (const r of await publicOnes()) expect(reviewDateLabel(r)).toBe("");
  });

  it("only name a town where the reviewer did", async () => {
    const towns = (await publicOnes()).filter((r) => r.town).map((r) => `${r.name}: ${r.town}`);
    expect(towns.sort()).toEqual(["Beth Schumacher: Franklin", "Palmira Snape: Fines Creek", "Tom Scott: Lake Toxaway"]);
  });
});

describe("no review dates anywhere on the site (John, Nov 21 2026)", () => {
  it("every review, hand-copied or imported, has an empty display date", async () => {
    const { REVIEWS, reviewDateLabel } = await import("@/data/reviews");
    for (const r of REVIEWS) expect(reviewDateLabel(r)).toBe("");
  });

  it("a review card shows the name but no month or year", () => {
    const hand = HAND_COPIED_REVIEWS.find((r) => r.id === "jerry-brooks-2023")!;
    const { container } = render(<ReviewCard review={hand} />);
    expect(container.textContent).toContain("Jerry Brooks");
    expect(container.textContent).not.toMatch(/\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\b/);
    expect(container.textContent).not.toMatch(/\bago\b/);
  });

  it("the review structured data carries no publish date", async () => {
    const { reviewNodes } = await import("@/components/SEOHead");
    for (const node of reviewNodes()) expect(node).not.toHaveProperty("datePublished");
  });
});
