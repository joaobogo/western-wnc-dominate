/**
 * Construction plan §6 (22 Nov 2026): each construction blog post links to
 * its matching service page in its first paragraph, with a keyword anchor.
 * Rendered by BlogPost as the article's opening line; article text is not
 * edited. (The old /blog/home-addition-renovation-franklin-nc post already
 * 301s to /service-areas/franklin-nc/construction.)
 */
export const BLOG_SERVICE_LINKS: Record<string, { anchor: string; href: string }> = {
  "master-suite-addition": { anchor: "home additions in Franklin, NC", href: "/construction/additions" },
  "home-addition-permits": { anchor: "home additions in Franklin, NC", href: "/construction/additions" },
  "covered-deck-ideas": { anchor: "deck builders in Western NC", href: "/construction/decks" },
  "deck-ledger-flashing": { anchor: "deck builders in Western NC", href: "/construction/decks" },
  "hidden-deck-fasteners-vs-screws": { anchor: "deck builders in Western NC", href: "/construction/decks" },
  "under-deck-drainage": { anchor: "deck builders in Western NC", href: "/construction/decks" },
  "deck-vs-porch-planning-wnc": { anchor: "screened porches in Western NC", href: "/construction/screened-porches" },
  "screened-porch-vs-sunroom": { anchor: "screened porches in Western NC", href: "/construction/screened-porches" },
  "phased-renovation-planning-wnc": { anchor: "home renovations in Franklin, NC", href: "/construction/renovations" },
};
