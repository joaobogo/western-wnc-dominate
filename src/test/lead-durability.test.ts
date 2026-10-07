import { describe, it, expect, beforeEach, vi } from "vitest";

const insert = vi.fn();
const invoke = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({ insert }),
    functions: { invoke },
  },
}));

const validLead = {
  source: "contact_form",
  name: "Jane Doe",
  email: "jane@highlandtest.com",
  phone: "8285551234",
  property_town: "Highlands",
};

async function submit(payload: Record<string, unknown>) {
  const { submitLead } = await import("@/lib/leads");
  return submitLead(payload as never);
}

describe("durable-first lead capture", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    insert.mockReset();
    invoke.mockReset();
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
  });

  it("stores the lead before it ever touches the CRM", async () => {
    const order: string[] = [];
    insert.mockImplementation(async () => { order.push("insert"); return { error: null }; });
    invoke.mockImplementation(async () => { order.push("invoke"); return { data: {}, error: null }; });

    const res = await submit(validLead);
    expect(res.error).toBeNull();
    expect(res.id).toBeTruthy();
    expect(order[0]).toBe("insert");
    // The CRM sync is fire-and-forget behind a lazy import, so wait for it.
    await vi.waitFor(() => expect(order).toContain("invoke"));
  });

  it("still reports success to the visitor when the CRM sync fails", async () => {
    insert.mockResolvedValue({ error: null });
    invoke.mockRejectedValue(new Error("crm down"));
    const res = await submit(validLead);
    expect(res.error).toBeNull();
    expect(res.id).toBeTruthy();
  });

  it("queues the row as pending so the retry worker picks it up", async () => {
    insert.mockResolvedValue({ error: null });
    await submit(validLead);
    const row = insert.mock.calls[0][0][0];
    expect(row.jobtread_sync_status).toBe("pending");
    expect(row.jobtread_synced).toBe(false);
    expect(row.jobtread_retry_count).toBe(0);
    expect(row.idempotency_key).toBeTruthy();
  });

  it("surfaces a real storage failure so the visitor can retry", async () => {
    insert.mockResolvedValue({ error: { code: "500", message: "boom" } });
    const res = await submit(validLead);
    expect(res.id).toBeNull();
    expect(res.error).toBeTruthy();
  });
});

describe("idempotent submission", () => {
  beforeEach(() => {
    window.localStorage.clear();
    insert.mockReset();
    invoke.mockReset();
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
  });

  it("does not insert twice when the same form is submitted again", async () => {
    insert.mockResolvedValue({ error: null });
    const first = await submit(validLead);
    const second = await submit(validLead);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(second.duplicate).toBe(true);
    expect(second.id).toBe(first.id);
  });

  it("treats a database duplicate-key rejection as a success, not a lost lead", async () => {
    insert.mockResolvedValue({ error: { code: "23505", message: "duplicate key value violates unique constraint \"leads_idempotency_key_uidx\"", details: "Key (idempotency_key)=(abc) already exists." } });
    const res = await submit(validLead);
    expect(res.error).toBeNull();
    expect(res.duplicate).toBe(true);
  });

  it("sends the same idempotency key to the CRM sync", async () => {
    insert.mockResolvedValue({ error: null });
    await submit(validLead);
    const row = insert.mock.calls[0][0][0];
    await vi.waitFor(() => expect(invoke.mock.calls.some((c) => c[0] === "jobtread-sync")).toBe(true));
    const syncCall = invoke.mock.calls.find((c) => c[0] === "jobtread-sync");
    expect(syncCall?.[1].body.idempotency_key).toBe(row.idempotency_key);
  });
});

describe("requireStoredLead (no false success)", () => {
  it("throws when the database rejected the lead", async () => {
    const { requireStoredLead } = await import("@/lib/leads");
    expect(() => requireStoredLead({ id: null, error: new Error("rls") })).toThrow("rls");
    expect(() => requireStoredLead({ id: null, error: { code: "42501" } })).toThrow("lead_not_stored");
    expect(() => requireStoredLead({ id: null, error: null })).toThrow("lead_not_stored");
    expect(() => requireStoredLead(null)).toThrow("lead_not_stored");
  });

  it("passes a stored lead and an already-stored duplicate", async () => {
    const { requireStoredLead } = await import("@/lib/leads");
    expect(requireStoredLead({ id: "abc", error: null }).id).toBe("abc");
    expect(requireStoredLead({ id: null, error: null, duplicate: true }).duplicate).toBe(true);
  });
});

describe("isIdempotencyViolation", () => {
  it("accepts only a unique violation on the idempotency key", async () => {
    const { isIdempotencyViolation } = await import("@/lib/leads");
    expect(isIdempotencyViolation({ code: "23505", message: "violates unique constraint \"leads_idempotency_key_uidx\"" })).toBe(true);
    expect(isIdempotencyViolation({ code: "23505", details: "Key (idempotency_key)=(x) already exists." })).toBe(true);
    // Some other unique constraint is a real failure, not a stored duplicate.
    expect(isIdempotencyViolation({ code: "23505", message: "duplicate key value violates unique constraint \"leads_pkey\"" })).toBe(false);
    expect(isIdempotencyViolation({ code: "42501", message: "idempotency" })).toBe(false);
    expect(isIdempotencyViolation(null)).toBe(false);
  });
});
