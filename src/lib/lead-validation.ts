import { z } from "zod";
import { towns } from "@/data/towns";

/**
 * Shared validation for every lead intake form.
 *
 * Rules (see `validateContact`):
 *  - Phone is normalized to E.164 (+1XXXXXXXXXX) before it reaches the CRM.
 *  - Email must be RFC-shaped and <= 255 chars.
 *  - Town is matched against src/data/towns.ts, with a free-text fallback.
 *  - ZIP, when present, must be 5 digits.
 *  - A submission is blocked only when phone AND email are both unusable —
 *    a valid phone alone or a valid email alone is enough to reach us.
 */

/* ─────────────────────────── Phone ─────────────────────────── */

export type PhoneResult =
  | { ok: true; e164: string; national: string }
  | { ok: false; e164: null; error: string };

const PHONE_HELP = "Enter a 10-digit US phone number, like (828) 524-7773.";

/** Normalizes loose user input into E.164 (+1XXXXXXXXXX) for US/CA numbers. */
export function normalizePhoneE164(raw?: string | null): PhoneResult {
  const input = (raw ?? "").trim();
  if (!input) return { ok: false, e164: null, error: "Phone number is required." };
  if (/[a-z]/i.test(input.replace(/^\s*(ext|x)\.?\s*\d+\s*$/i, ""))) {
    return { ok: false, e164: null, error: PHONE_HELP };
  }

  let digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);

  if (digits.length !== 10) return { ok: false, e164: null, error: PHONE_HELP };

  // NANP structure: area code and exchange cannot start with 0 or 1.
  if (/^[01]/.test(digits) || /^[01]/.test(digits.slice(3))) {
    return { ok: false, e164: null, error: "That doesn't look like a valid US number." };
  }
  // Obvious placeholder input (5555555555, 1234567890).
  if (/^(\d)\1{9}$/.test(digits) || digits === "1234567890") {
    return { ok: false, e164: null, error: "Please enter a real phone number we can reach you at." };
  }

  return {
    ok: true,
    e164: `+1${digits}`,
    national: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
  };
}

/** Progressive display formatting while the user types. Never blocks input. */
export function formatPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const phoneSchema = z
  .string()
  .trim()
  .transform((v, ctx) => {
    const r = normalizePhoneE164(v);
    if (r.ok === false) {
      ctx.addIssue({ code: "custom", message: r.error });
      return z.NEVER;
    }
    return r.e164;
  });

/* ─────────────────────────── Email ─────────────────────────── */

/**
 * Domains and local parts that are never a real customer: throwaway inboxes,
 * reserved documentation domains, and obvious placeholder typing.
 */
const FAKE_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "test.test",
  "email.com",
  "domain.com",
  "asdf.com",
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
  "maildrop.cc",
  "throwawaymail.com",
]);

const FAKE_EMAIL_LOCALS = new Set([
  "test",
  "tests",
  "testing",
  "asdf",
  "asdfasdf",
  "qwerty",
  "fake",
  "noreply",
  "no-reply",
  "none",
  "nobody",
  "aaa",
  "abc",
  "xxx",
]);

const FAKE_EMAIL_MESSAGE = "Enter a real email address we can reply to.";

/** True when an RFC-shaped address is obviously not a reachable inbox. */
export function isObviouslyFakeEmail(raw?: string | null): boolean {
  const value = (raw ?? "").trim().toLowerCase();
  const at = value.lastIndexOf("@");
  if (at < 1) return false;
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  if (FAKE_EMAIL_DOMAINS.has(domain)) return true;
  if (domain.endsWith(".test") || domain.endsWith(".invalid") || domain.endsWith(".example")) return true;
  if (domain === "localhost" || !domain.includes(".")) return true;
  if (FAKE_EMAIL_LOCALS.has(local)) return true;
  // "aaaaaa@", "1111111@" — a single repeated character.
  if (local.length >= 3 && /^(.)\1+$/.test(local)) return true;
  return false;
}

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email address is required.")
  .max(255, "Email must be 255 characters or fewer.")
  .email("Enter a valid email address, like name@example.com.")
  .transform((v) => v.toLowerCase())
  .refine((v) => !isObviouslyFakeEmail(v), FAKE_EMAIL_MESSAGE);

/* ─────────────────────────── Town ─────────────────────────── */

export type TownResult = {
  ok: boolean;
  /** Canonical town name when recognized, otherwise the trimmed input. */
  value: string | null;
  /** True when the town matched an entry in src/data/towns.ts. */
  isServiceArea: boolean;
  slug: string | null;
  error?: string;
};

const townIndex = (() => {
  const map = new Map<string, { name: string; slug: string }>();
  for (const t of towns) {
    const entry = { name: t.name, slug: t.slug };
    map.set(t.name.toLowerCase(), entry);
    map.set(t.slug.toLowerCase(), entry);
    // "Highlands, NC" / "Highlands NC"
    map.set(`${t.name.toLowerCase()}, ${t.state.toLowerCase()}`, entry);
    map.set(`${t.name.toLowerCase()} ${t.state.toLowerCase()}`, entry);
  }
  return map;
})();

/**
 * Matches a town against our service-area list. Unknown towns are allowed
 * through as free text (we still serve one-off addresses) but are flagged so
 * the CRM can see they fell outside the mapped markets.
 */
export function matchTown(raw?: string | null): TownResult {
  const input = (raw ?? "").trim().replace(/\s+/g, " ");
  if (!input) {
    return { ok: false, value: null, isServiceArea: false, slug: null, error: "Town is required." };
  }
  if (input.length < 2) {
    return { ok: false, value: input, isServiceArea: false, slug: null, error: "Enter your town or city." };
  }
  const hit = townIndex.get(input.toLowerCase().replace(/\.$/, ""));
  if (hit) return { ok: true, value: hit.name, isServiceArea: true, slug: hit.slug };
  return { ok: true, value: input, isServiceArea: false, slug: null };
}

export const townSchema = z
  .string()
  .trim()
  .min(2, "Enter your town or city.")
  .max(80, "Town must be 80 characters or fewer.")
  .transform((v) => matchTown(v).value ?? v);

/* ─────────────────────────── ZIP ─────────────────────────── */

export const zipSchema = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "Enter a 5-digit ZIP code.");

/** Optional ZIP: empty string is allowed, anything else must be 5 digits. */
export const optionalZipSchema = z
  .union([z.literal(""), zipSchema])
  .transform((v) => (v === "" ? null : v));

/* ───────────────────── Combined contact check ───────────────────── */

export type ContactInput = {
  name?: string;
  email?: string;
  phone?: string;
  town?: string;
  zip?: string;
  address?: string;
  /** Field is rendered by the form and must be filled in. */
  require?: Partial<Record<"name" | "email" | "phone" | "town" | "zip" | "address", boolean>>;
};

export type ContactErrors = Partial<
  Record<"name" | "email" | "phone" | "town" | "zip" | "address" | "form", string>
>;

export type ContactValidation = {
  /** Inline, per-field messages. Render these under the inputs. */
  errors: ContactErrors;
  /** True when the form may be submitted. */
  valid: boolean;
  /** Normalized values safe to send to the CRM. */
  values: {
    name: string | null;
    email: string | null;
    phone: string | null;
    phoneDisplay: string | null;
    town: string | null;
    townSlug: string | null;
    isServiceArea: boolean;
    zip: string | null;
    address: string | null;
  };
};

const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(100, "Name must be 100 characters or fewer.");

/**
 * Validates the contact block shared by every intake form.
 *
 * Reachability rule: we need at least one working way to contact someone.
 * If phone and email are both missing or malformed, submission is blocked with
 * a message on both fields. If one of them is valid, the other's error is
 * still surfaced inline (so typos get fixed) but does not block submission —
 * unless the form explicitly marks that field as required.
 */
export function validateContact(input: ContactInput): ContactValidation {
  const req = input.require ?? {};
  const errors: ContactErrors = {};

  // Name
  const nameParsed = nameSchema.safeParse(input.name ?? "");
  const name = (input.name ?? "").trim() || null;
  if (req.name !== false && !nameParsed.success) {
    errors.name = nameParsed.error.issues[0].message;
  }

  // Email
  const emailRaw = (input.email ?? "").trim();
  const emailParsed = emailRaw ? emailSchema.safeParse(emailRaw) : null;
  const emailValid = Boolean(emailParsed?.success);
  const email = emailParsed?.success ? emailParsed.data : null;
  if (emailRaw && !emailValid) {
    errors.email = emailParsed!.error.issues[0].message;
  } else if (!emailRaw && req.email) {
    errors.email = "Email address is required.";
  }

  // Phone
  const phoneRaw = (input.phone ?? "").trim();
  const phoneParsed = phoneRaw ? normalizePhoneE164(phoneRaw) : null;
  const phoneValid = Boolean(phoneParsed?.ok);
  const phone = phoneParsed?.ok ? phoneParsed.e164 : null;
  const phoneDisplay = phoneParsed?.ok ? phoneParsed.national : null;
  if (phoneRaw && !phoneValid) {
    errors.phone = (phoneParsed as Extract<PhoneResult, { ok: false }>).error;
  } else if (!phoneRaw && req.phone) {
    errors.phone = "Phone number is required.";
  }

  // Reachability: block only when BOTH are unusable.
  if (!phoneValid && !emailValid) {
    errors.phone = errors.phone ?? "Add a phone number or an email so we can reach you.";
    errors.email = errors.email ?? "Add an email or a phone number so we can reach you.";
  }

  // Town
  let town: string | null = null;
  let townSlug: string | null = null;
  let isServiceArea = false;
  const townRaw = (input.town ?? "").trim();
  if (townRaw || req.town) {
    const t = matchTown(townRaw);
    town = t.value;
    townSlug = t.slug;
    isServiceArea = t.isServiceArea;
    if (!t.ok) errors.town = t.error;
  }

  // ZIP
  let zip: string | null = null;
  const zipRaw = (input.zip ?? "").trim();
  if (zipRaw) {
    const z = zipSchema.safeParse(zipRaw);
    if (z.success) zip = z.data;
    else errors.zip = z.error.issues[0].message;
  } else if (req.zip) {
    errors.zip = "ZIP code is required.";
  }

  // Address
  const address = (input.address ?? "").trim() || null;
  if (!address && req.address) errors.address = "Property address is required.";

  // A non-blocking email/phone typo shouldn't stop a reachable submission.
  const blockingKeys = (Object.keys(errors) as (keyof ContactErrors)[]).filter((k) => {
    if (k === "email") return req.email || (!phoneValid && !emailValid) || Boolean(emailRaw && !emailValid);
    if (k === "phone") return req.phone || (!phoneValid && !emailValid) || Boolean(phoneRaw && !phoneValid);
    return true;
  });

  return {
    errors,
    valid: blockingKeys.length === 0,
    values: { name, email, phone, phoneDisplay, town, townSlug, isServiceArea, zip, address },
  };
}
