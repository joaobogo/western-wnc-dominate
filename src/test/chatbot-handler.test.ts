import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  handleChatbotRequest,
  enforceRateLimit,
  getClientIp,
  buildContextNote,
  jsonResponse,
  SAFE_ERRORS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  corsHeaders,
  type AdminClient,
} from "@chatbot-handler";

/** Minimal designer_metrics stub: `count` drives the rate-limit decision. */
function makeAdmin(opts: { count?: number; error?: unknown; throwOnSelect?: boolean; throwOnInsert?: boolean } = {}) {
  const inserts: any[] = [];
  const gte = vi.fn(async () => {
    if (opts.throwOnSelect) throw new Error("db down");
    return { count: opts.count ?? 0, error: opts.error ?? null };
  });
  const admin = {
    from: vi.fn(() => ({
      select: () => ({ eq: () => ({ eq: () => ({ gte }) }) }),
      insert: async (row: any) => {
        if (opts.throwOnInsert) throw new Error("insert failed");
        inserts.push(row);
        return { error: null };
      },
    })),
  } as unknown as AdminClient;
  return { admin, inserts, gte };
}

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://example.test/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const env: Record<string, string> = {
  LOVABLE_API_KEY: "test-key",
  SUPABASE_URL: "https://db.test",
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
};

function makeDeps(over: Partial<Parameters<typeof handleChatbotRequest>[1]> = {}, adminOpts = {}) {
  const { admin, inserts } = makeAdmin(adminOpts);
  const deps = {
    getEnv: (k: string) => env[k],
    createAdminClient: () => admin,
    fetchImpl: vi.fn(async () => new Response("data: hi\n\n", { status: 200 })) as any,
    ...over,
  };
  return { deps, admin, inserts };
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("client IP extraction", () => {
  it("takes the first hop of x-forwarded-for", () => {
    const req = makeRequest({}, { "x-forwarded-for": "203.0.113.9, 10.0.0.1" });
    expect(getClientIp(req)).toBe("203.0.113.9");
  });

  it("falls back to 'unknown' when the header is missing or blank", () => {
    expect(getClientIp(makeRequest({}))).toBe("unknown");
    expect(getClientIp(makeRequest({}, { "x-forwarded-for": "  ,  " }))).toBe("unknown");
  });
});

describe("rate limiting", () => {
  it("allows a visitor below the hourly cap and records the message", async () => {
    const { admin, inserts } = makeAdmin({ count: RATE_LIMIT_MAX - 1 });
    const res = await enforceRateLimit(admin, "203.0.113.9");
    expect(res.allowed).toBe(true);
    expect(inserts).toHaveLength(1);
    expect(inserts[0]).toMatchObject({ event_type: "chatbot_message", metadata: { ip: "203.0.113.9" } });
  });

  it("blocks once the IP reaches the cap and does not record another message", async () => {
    const { admin, inserts } = makeAdmin({ count: RATE_LIMIT_MAX });
    const res = await enforceRateLimit(admin, "203.0.113.9");
    expect(res.allowed).toBe(false);
    expect(inserts).toHaveLength(0);
  });

  it("blocks when the IP is already over the cap", async () => {
    const { admin } = makeAdmin({ count: RATE_LIMIT_MAX + 250 });
    expect((await enforceRateLimit(admin, "1.1.1.1")).allowed).toBe(false);
  });

  it("counts only the rolling one-hour window", async () => {
    const { admin, gte } = makeAdmin({ count: 0 });
    const now = () => Date.parse("2026-08-12T12:00:00.000Z");
    await enforceRateLimit(admin, "1.1.1.1", now);
    expect(gte).toHaveBeenCalledWith(
      "created_at",
      new Date(now() - RATE_LIMIT_WINDOW_MS).toISOString(),
    );
    expect(RATE_LIMIT_WINDOW_MS).toBe(60 * 60 * 1000);
  });

  it("fails open when the metrics table errors so the assistant stays online", async () => {
    const { admin } = makeAdmin({ count: null as any, error: { message: "boom" } });
    expect((await enforceRateLimit(admin, "1.1.1.1")).allowed).toBe(true);
  });

  it("fails open when the metrics query throws", async () => {
    const { admin } = makeAdmin({ throwOnSelect: true });
    expect((await enforceRateLimit(admin, "1.1.1.1")).allowed).toBe(true);
  });

  it("still serves the visitor when recording the message fails", async () => {
    const { admin } = makeAdmin({ count: 1, throwOnInsert: true });
    expect((await enforceRateLimit(admin, "1.1.1.1")).allowed).toBe(true);
  });

  it("returns 429 with a phone fallback and never calls the AI gateway", async () => {
    const { deps } = makeDeps({}, { count: RATE_LIMIT_MAX });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: SAFE_ERRORS.rateLimited });
    expect(deps.fetchImpl).not.toHaveBeenCalled();
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("skips rate limiting when service credentials are absent", async () => {
    const { deps } = makeDeps({ getEnv: (k: string) => (k === "LOVABLE_API_KEY" ? "test-key" : undefined) });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    expect(res.status).toBe(200);
  });
});

describe("error handling", () => {
  it("maps an upstream 429 to a retry message, not the provider body", async () => {
    const { deps } = makeDeps({
      fetchImpl: vi.fn(async () => new Response("quota exceeded for project abc", { status: 429 })) as any,
    });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    const body = await res.json();
    expect(res.status).toBe(429);
    expect(body.error).toBe(SAFE_ERRORS.upstreamBusy);
    expect(JSON.stringify(body)).not.toContain("quota exceeded");
  });

  it("maps an upstream 402 to the unavailable message", async () => {
    const { deps } = makeDeps({ fetchImpl: vi.fn(async () => new Response("payment required", { status: 402 })) as any });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    expect(res.status).toBe(402);
    expect((await res.json()).error).toBe(SAFE_ERRORS.unavailable);
  });

  it("never leaks upstream 500 detail (stack traces, keys, model names)", async () => {
    const leak = "Error: invalid api key sk-live-abc123 at /srv/model/gemini.ts:42";
    const { deps } = makeDeps({ fetchImpl: vi.fn(async () => new Response(leak, { status: 500 })) as any });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    const raw = await res.text();
    expect(res.status).toBe(500);
    expect(raw).toBe(JSON.stringify({ error: SAFE_ERRORS.generic }));
    for (const secret of ["sk-live-abc123", "/srv/model", "gemini"]) {
      expect(raw).not.toContain(secret);
    }
  });

  it("returns a safe 500 when the gateway fetch throws", async () => {
    const { deps } = makeDeps({
      fetchImpl: vi.fn(async () => {
        throw new Error("ECONNREFUSED 10.0.0.5:443");
      }) as any,
    });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    const raw = await res.text();
    expect(res.status).toBe(500);
    expect(raw).not.toContain("ECONNREFUSED");
    expect(JSON.parse(raw).error).toBe(SAFE_ERRORS.unavailable);
  });

  it("returns a safe 500 when the API key is missing, without naming the secret", async () => {
    const { deps } = makeDeps({ getEnv: () => undefined });
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    const raw = await res.text();
    expect(res.status).toBe(500);
    expect(raw).not.toContain("LOVABLE_API_KEY");
  });

  it("rejects malformed JSON and empty message arrays with a safe 400/500", async () => {
    const { deps } = makeDeps();
    const bad = new Request("https://example.test/chatbot", { method: "POST", body: "not json" });
    expect((await handleChatbotRequest(bad, deps)).status).toBe(500);

    const empty = await handleChatbotRequest(makeRequest({ messages: [] }), deps);
    expect(empty.status).toBe(400);
    expect((await empty.json()).error).toBe(SAFE_ERRORS.generic);
  });

  it("every visitor-facing error offers the correct phone number", async () => {
    for (const msg of Object.values(SAFE_ERRORS)) {
      expect(msg).toContain("(828) 524-7773");
      expect(msg).not.toMatch(/828-397-9211/);
    }
  });

  it("answers CORS preflight without touching the gateway", async () => {
    const { deps } = makeDeps();
    const res = await handleChatbotRequest(new Request("https://example.test/chatbot", { method: "OPTIONS" }), deps);
    expect(res.status).toBe(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(corsHeaders["Access-Control-Allow-Origin"]);
    expect(deps.fetchImpl).not.toHaveBeenCalled();
  });
});

describe("successful requests", () => {
  it("streams the gateway response back with CORS + SSE headers", async () => {
    const { deps } = makeDeps();
    const res = await handleChatbotRequest(makeRequest({ messages: [{ role: "user", content: "hi" }] }), deps);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("sends the system prompt plus page context ahead of the visitor messages", async () => {
    const { deps } = makeDeps();
    await handleChatbotRequest(
      makeRequest({ messages: [{ role: "user", content: "deck ideas" }], context: { page: "/construction/outdoor-living" } }),
      deps,
    );
    const [, init] = (deps.fetchImpl as any).mock.calls[0];
    const sent = JSON.parse(init.body);
    expect(sent.stream).toBe(true);
    expect(sent.messages[0].role).toBe("system");
    expect(sent.messages[0].content).toContain("Outdoor Living");
    expect(sent.messages.at(-1)).toEqual({ role: "user", content: "deck ideas" });
    expect(init.headers.Authorization).toBe("Bearer test-key");
  });
});

describe("context note routing", () => {
  it("matches the most specific construction page first", () => {
    expect(buildContextNote("/construction/additions")).toContain("Home Additions");
    expect(buildContextNote("/construction/renovations")).toContain("Renovations page");
    expect(buildContextNote("/construction")).toContain("Construction division");
  });

  it("routes roofing, town, and homepage visitors", () => {
    expect(buildContextNote("/roofing/repair")).toContain("roofing expertise");
    expect(buildContextNote("/service-areas/highlands-nc")).toContain("local knowledge");
    expect(buildContextNote("/")).toContain("homepage");
  });

  it("returns nothing when no page is supplied", () => {
    expect(buildContextNote(undefined)).toBe("");
    expect(buildContextNote(null)).toBe("");
  });
});

describe("brand voice in bot-authored copy", () => {
  it("keeps banned terms out of the safe error strings", async () => {
    const all = Object.values(SAFE_ERRORS).join(" ").toLowerCase();
    for (const banned of ["24/7", "gaf", "architect", "free estimate", "book now", "top-rated", "dream home"]) {
      expect(all).not.toContain(banned);
    }
  });

  it("jsonResponse always attaches CORS headers", async () => {
    const res = jsonResponse({ ok: true }, 201);
    expect(res.status).toBe(201);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.headers.get("Content-Type")).toBe("application/json");
  });
});
