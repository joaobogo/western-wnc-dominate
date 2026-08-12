/**
 * Canonical person/company name parser.
 *
 * Every form that collects a single free-text "name" field runs through
 * `parsePersonName` so the CRM always receives the same split, regardless of
 * how the visitor typed it.
 *
 * Guarantees:
 *  - Apostrophes, hyphens and accents are preserved verbatim (O'Neil-Smith,
 *    Ana Sofía Núñez-Peña).
 *  - Generational / professional suffixes (Jr., III, PhD) are pulled out of
 *    the last name into `suffix`.
 *  - Surname particles stay attached to the last name (van der Berg, de la Cruz).
 *  - Business names are detected and returned as `is_company: true` with
 *    `company_name` populated and **no** first/last name.
 */

export type ParsedName = {
  /** Cleaned-up version of what the user typed. */
  full_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  /** "Jr.", "III", "PhD" — never part of last_name. */
  suffix: string | null;
  is_company: boolean;
  company_name: string | null;
};

const EMPTY: ParsedName = {
  full_name: null,
  first_name: null,
  middle_name: null,
  last_name: null,
  suffix: null,
  is_company: false,
  company_name: null,
};

/** Legal entity / organization markers. Matched case-insensitively on whole tokens. */
const COMPANY_TOKENS = new Set([
  "llc", "l.l.c", "l.l.c.", "inc", "inc.", "incorporated", "corp", "corp.",
  "corporation", "co", "co.", "company", "ltd", "ltd.", "limited", "llp",
  "l.l.p.", "lp", "plc", "pllc", "pc",
  "hoa", "poa", "association", "assn", "condominium", "condominiums", "condos",
  "trust", "estate", "foundation", "church", "ministries", "school", "academy",
  "university", "college", "hospital", "clinic", "lodge", "inn", "resort",
  "hotel", "motel", "apartments", "villas", "properties", "property",
  "realty", "management", "holdings", "enterprises", "ventures", "partners",
  "group", "associates", "industries", "services", "solutions", "systems",
  "construction", "builders", "contracting", "development", "developers",
  "restaurant", "cafe", "brewery", "market", "store", "shop", "bank",
]);

/** Suffixes stripped off the end of a personal name. */
const SUFFIXES = new Set([
  "jr", "jr.", "sr", "sr.", "ii", "iii", "iv", "v", "vi",
  "md", "m.d.", "phd", "ph.d.", "dds", "d.d.s.", "dvm", "esq", "esq.",
  "cpa", "rn", "jd", "do", "ret", "ret.", "usa", "usn",
]);

/** Honorifics dropped from the front of a personal name. */
const PREFIXES = new Set([
  "mr", "mr.", "mrs", "mrs.", "ms", "ms.", "miss", "dr", "dr.", "prof",
  "prof.", "rev", "rev.", "fr", "fr.", "sr.", "pastor", "sir", "capt",
  "capt.", "sgt", "sgt.", "lt", "lt.", "col", "col.", "gen", "gen.",
]);

/**
 * Surname particles. When one appears mid-name, it and everything after it
 * belong to the last name ("Ludwig van der Berg" -> last "van der Berg").
 */
const PARTICLES = new Set([
  "van", "von", "der", "den", "de", "del", "della", "di", "da", "das", "dos",
  "du", "la", "le", "les", "lo", "st", "st.", "ter", "ten", "af", "av",
  "bin", "ibn", "al", "el", "abu", "mac", "mc", "ben", "los", "dello", "delle",
  "vander", "vanden", "op", "ter",
]);

/** Normalizes whitespace and trims stray separators without touching letters. */
function tidy(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value
    .replace(/\s+/g, " ")
    .replace(/^[\s,;:]+|[\s,;:]+$/g, "")
    .trim();
  return trimmed.length ? trimmed : null;
}

/** Lowercased token with trailing punctuation kept (so "Inc." matches "inc."). */
function key(token: string): string {
  return token.toLowerCase();
}

/** Strips a token down to letters for prefix/suffix/particle comparisons. */
function bare(token: string): string {
  return token.toLowerCase().replace(/[.,]/g, "");
}

/**
 * True when the string looks like an organization rather than a person.
 * Detects legal-entity tokens, "&"/"+" conjunctions, and "Foo Roofing, Inc."
 */
export function looksLikeCompany(name: string): boolean {
  const tokens = name.split(/[\s,]+/).filter(Boolean);
  if (!tokens.length) return false;
  for (const token of tokens) {
    if (COMPANY_TOKENS.has(key(token)) || COMPANY_TOKENS.has(bare(token))) return true;
  }
  // "Smith & Sons", "Jones + Partners" — ampersand implies a business.
  if (/(^|\s)[&+](\s|$)/.test(name)) return true;
  return false;
}

/**
 * Parses a single free-text name field into canonical CRM parts.
 * Accepts both "First Last" and "Last, First" orderings.
 */
export function parsePersonName(input?: string | null): ParsedName {
  const cleaned = tidy(input);
  if (!cleaned) return { ...EMPTY };

  if (looksLikeCompany(cleaned)) {
    return {
      ...EMPTY,
      full_name: cleaned,
      is_company: true,
      company_name: cleaned,
    };
  }

  // "Public, Jane Q" -> "Jane Q Public". Ignore a trailing suffix-only segment
  // ("Public, Jr.") which is handled by the suffix pass below.
  let working = cleaned;
  const commaIndex = cleaned.indexOf(",");
  if (commaIndex > 0) {
    const head = tidy(cleaned.slice(0, commaIndex));
    const tail = tidy(cleaned.slice(commaIndex + 1));
    if (head && tail && !SUFFIXES.has(bare(tail))) working = `${tail} ${head}`;
    else if (head && tail) working = `${head} ${tail}`;
  }

  let tokens = working.split(" ").filter(Boolean);

  // Drop leading honorifics, but never empty the name out.
  while (tokens.length > 1 && PREFIXES.has(bare(tokens[0]))) tokens = tokens.slice(1);

  // Pull trailing suffixes off the end ("Jane Public Jr." / "... III").
  const suffixParts: string[] = [];
  while (tokens.length > 1 && SUFFIXES.has(bare(tokens[tokens.length - 1]))) {
    suffixParts.unshift(tokens[tokens.length - 1]);
    tokens = tokens.slice(0, -1);
  }
  const suffix = suffixParts.length ? suffixParts.join(" ") : null;

  if (tokens.length === 0) return { ...EMPTY, full_name: cleaned };

  // Single token: first name only, no last name.
  if (tokens.length === 1) {
    return {
      ...EMPTY,
      full_name: cleaned,
      first_name: tokens[0],
      suffix,
    };
  }

  const first = tokens[0];

  // A surname particle after the first name starts the last name.
  let lastStart = tokens.length - 1;
  for (let i = 1; i < tokens.length - 1; i++) {
    if (PARTICLES.has(bare(tokens[i]))) {
      lastStart = i;
      break;
    }
  }

  const middleTokens = tokens.slice(1, lastStart);
  const last = tokens.slice(lastStart).join(" ");

  return {
    full_name: cleaned,
    first_name: first,
    middle_name: middleTokens.length ? middleTokens.join(" ") : null,
    last_name: last || null,
    suffix,
    is_company: false,
    company_name: null,
  };
}
