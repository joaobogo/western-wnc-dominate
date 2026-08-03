import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  MAX_SYNC_ATTEMPTS,
  nextRetryAt,
  isDuplicateSubmission,
  IDEMPOTENCY_WINDOW_MS,
} from "./index.ts";

const T0 = new Date("2026-08-03T00:00:00.000Z");

Deno.test("backoff grows and the 5 attempts fit inside 24 hours", () => {
  const delays = [1, 2, 3, 4].map((a) => {
    const at = nextRetryAt(a, T0)!;
    return new Date(at).getTime() - T0.getTime();
  });
  for (let i = 1; i < delays.length; i++) assert(delays[i] > delays[i - 1], "delays must grow");
  const total = [1, 2, 3, 4, 5]
    .map((a) => nextRetryAt(a, T0))
    .filter(Boolean)
    .reduce((sum, at) => sum + (new Date(at!).getTime() - T0.getTime()), 0);
  assert(total <= 24 * 60 * 60_000, `total window ${total}ms exceeds 24h`);
});

Deno.test("the 5th attempt exhausts the schedule", () => {
  assertEquals(MAX_SYNC_ATTEMPTS, 5);
  assert(nextRetryAt(4, T0) !== null);
  assertEquals(nextRetryAt(5, T0), null);
  assertEquals(nextRetryAt(9, T0), null);
});

Deno.test("repeat submission with the same key inside 10 minutes is a duplicate", () => {
  const row = {
    idempotency_key: "abc",
    created_at: T0.toISOString(),
    jobtread_last_attempt_at: T0.toISOString(),
  };
  assertEquals(isDuplicateSubmission(row, "abc", new Date(T0.getTime() + 60_000)), true);
  assertEquals(
    isDuplicateSubmission(row, "abc", new Date(T0.getTime() + IDEMPOTENCY_WINDOW_MS + 1)),
    false,
  );
});

Deno.test("a different key, a missing key, or a first attempt is never a duplicate", () => {
  const row = { idempotency_key: "abc", jobtread_last_attempt_at: T0.toISOString() };
  assertEquals(isDuplicateSubmission(row, "xyz", T0), false);
  assertEquals(isDuplicateSubmission(row, null, T0), false);
  assertEquals(isDuplicateSubmission({ idempotency_key: null }, "abc", T0), false);
  // First-ever attempt: stored key, but nothing has been sent yet.
  assertEquals(
    isDuplicateSubmission({ idempotency_key: "abc", created_at: T0.toISOString() }, "abc", T0),
    false,
  );
});
