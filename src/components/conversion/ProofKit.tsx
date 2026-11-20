import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Quote, Star } from "lucide-react";
import { SERVICE_LABELS, reviewDateLabel, type Review } from "@/data/reviews";
import { REVIEW_COUNT, REVIEW_RATING } from "@/data/business";
import { REVIEW_TAGS, pickArticles, pickReviews, type ProofTopic } from "@/lib/proof-kit";
import { smallSrc } from "@/lib/gallery-srcset";

import metalHighlands from "@/assets/gallery/metal-005.webp";
import metalHighlandsSet from "@/assets/gallery/metal-005.webp?w=480;800&format=webp&as=srcset";
import shingleWaynesville from "@/assets/gallery/asphalt-hero.webp";
import shingleWaynesvilleSet from "@/assets/gallery/asphalt-hero.webp?w=480;800&format=webp&as=srcset";
import bravaGlenville from "@/assets/gallery/brava-glenville-aerial.webp";
import bravaGlenvilleSet from "@/assets/gallery/brava-glenville-aerial.webp?w=480;800&format=webp&as=srcset";
import charcoalMountains from "@/assets/work/roof-charcoal-garage-mountains.webp";
import charcoalMountainsSet from "@/assets/work/roof-charcoal-garage-mountains.webp?w=480;800&format=webp&as=srcset";
import copperCabin from "@/assets/work/roof-copper-dormer-cabin-front.webp";
import copperCabinSet from "@/assets/work/roof-copper-dormer-cabin-front.webp?w=480;800&format=webp&as=srcset";
import greenLogHome from "@/assets/gallery/metal-006.webp";
import greenLogHomeSet from "@/assets/gallery/metal-006.webp?w=480;800&format=webp&as=srcset";
import additionExterior from "@/assets/work/addition-franklin-exterior-windows.webp";
import additionExteriorSet from "@/assets/work/addition-franklin-exterior-windows.webp?w=480;800&format=webp&as=srcset";
import additionInterior from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import additionInteriorSet from "@/assets/gallery/addition-franklin-vaulted-room.webp?w=480;800&format=webp&as=srcset";
import porchCashiers from "@/assets/work/patio-cashiers-screened-porch.webp";
import porchCashiersSet from "@/assets/work/patio-cashiers-screened-porch.webp?w=480;800&format=webp&as=srcset";
import patioCashiers from "@/assets/work/patio-cashiers-wide.webp";
import patioCashiersSet from "@/assets/work/patio-cashiers-wide.webp?w=480;800&format=webp&as=srcset";
import deckSylva from "@/assets/gallery/deck-sylva-doors-wide.webp";
import deckSylvaSet from "@/assets/gallery/deck-sylva-doors-wide.webp?w=480;800&format=webp&as=srcset";
import additionCullowhee from "@/assets/work/addition-cullowhee-roofline.webp";
import additionCullowheeSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800&format=webp&as=srcset";

/**
 * Proof kit (Nov 2026, John: "every page should have pictures, reviews and
 * blogs; don't waste the chance of converting"). Three blocks a page can drop
 * in wherever it is missing one:
 *   - WorkPhotos: real Highlander job photos (never generated imagery);
 *   - ReviewStrip: published reviews, service-matched first, then company-wide,
 *     newest first, each labelled with the work it was for;
 *   - RelatedArticles: three blog posts on the page's topic.
 * On paid landing pages pass `newTab` so links open in a new tab and are
 * tracked as lp_explore, keeping the ad visitor on the page.
 */
type Photo = { src: string; srcSet: string; alt: string; caption: string; place: string };

const ROOF_PHOTOS: Photo[] = [
  { src: metalHighlands, srcSet: metalHighlandsSet, alt: "Dark bronze standing seam metal roof installed by Highlander on a mountain home in Highlands, North Carolina", caption: "Standing seam metal roof", place: "Highlands, NC" },
  { src: shingleWaynesville, srcSet: shingleWaynesvilleSet, alt: "Weathered Wood dimensional shingle roof installed by Highlander on a mountain home in Waynesville, North Carolina", caption: "Dimensional shingle replacement", place: "Waynesville, NC" },
  { src: bravaGlenville, srcSet: bravaGlenvilleSet, alt: "Brava synthetic cedar shake roof installed by Highlander on a lakeside home near Lake Glenville, North Carolina", caption: "Brava synthetic shake re-roof", place: "Lake Glenville, NC" },
  { src: charcoalMountains, srcSet: charcoalMountainsSet, alt: "Charcoal dimensional shingle roof with dormers overlooking the Western North Carolina mountains", caption: "Charcoal dimensional shingles", place: "Western NC" },
  { src: copperCabin, srcSet: copperCabinSet, alt: "Mountain cabin with charcoal shingles and a copper-tone metal porch roof", caption: "Shingles with a metal porch roof", place: "Western NC" },
  { src: greenLogHome, srcSet: greenLogHomeSet, alt: "Green standing seam metal roof on a log mountain home", caption: "Green standing seam on a log home", place: "Western NC" },
];

const BUILD_PHOTOS: Photo[] = [
  { src: additionExterior, srcSet: additionExteriorSet, alt: "Cedar shake gable with tall windows on a living room addition built by Highlander in Franklin, North Carolina", caption: "Living room addition", place: "Franklin, NC" },
  { src: additionInterior, srcSet: additionInteriorSet, alt: "Living room addition by Highlander in Franklin, North Carolina, with a stained vaulted wood ceiling and mountain-view windows", caption: "Vaulted ceiling and window wall", place: "Franklin, NC" },
  { src: porchCashiers, srcSet: porchCashiersSet, alt: "Screened porch with a stained wood ceiling and stone fireplace built by Highlander in Cashiers, North Carolina", caption: "Screened porch with fireplace", place: "Cashiers, NC" },
  { src: patioCashiers, srcSet: patioCashiersSet, alt: "Open trellis converted into a covered patio with a metal roof by Highlander in Cashiers, North Carolina", caption: "Covered patio conversion", place: "Cashiers, NC" },
  { src: deckSylva, srcSet: deckSylvaSet, alt: "Rebuilt elevated deck with new boards and railing by Highlander in Sylva, North Carolina", caption: "Deck and railing rebuild", place: "Sylva, NC" },
  { src: additionCullowhee, srcSet: additionCullowheeSet, alt: "Cedar shake addition by Highlander in Cullowhee, North Carolina, with its shingle roof tied into the original roofline", caption: "Addition tied into the roofline", place: "Cullowhee, NC" },
];

const ROOF_TOPICS: ProofTopic[] = ["roofing", "replacement", "repair", "metal", "gutters", "storm", "skylights", "commercial"];
const isRoofTopic = (topic: ProofTopic) => ROOF_TOPICS.includes(topic);

const reviewWork = (review: Review) => {
  // Imported reviews only have guessed tags: never state which job they were for.
  if (review.serviceInferred) return "";
  const names = review.service.map((tag) => SERVICE_LABELS[tag] ?? tag);
  return names.map((n, i) => (i === 0 ? n : n.toLowerCase())).join(" & ");
};

const Stars = ({ count = 5 }: { count?: number }) => (
  <span className="inline-flex" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => i).map((i) => (
      <Star key={i} className="h-4 w-4 fill-[hsl(var(--highland-gold))] text-[hsl(var(--highland-gold))]" />
    ))}
  </span>
);

type LinkProps = { href: string; newTab?: boolean; location: string; className?: string; children: React.ReactNode };
/** Site link. On paid landing pages: new tab + lp_explore tracking. */
const KitLink = ({ href, newTab, location, className, children }: LinkProps) =>
  newTab ? (
    <a href={href} target="_blank" rel="noopener" data-gtm-cta="lp_explore" data-gtm-location={location} className={className}>
      {children}
    </a>
  ) : (
    <Link to={href} data-gtm-location={location} className={className}>
      {children}
    </Link>
  );

const linkClass = "inline-flex min-h-12 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline";

export function WorkPhotos({ topic, newTab, heading }: { topic: ProofTopic; newTab?: boolean; heading?: string }) {
  const photos = topic === "all" ? [...ROOF_PHOTOS.slice(0, 3), ...BUILD_PHOTOS.slice(0, 3)] : isRoofTopic(topic) ? ROOF_PHOTOS : BUILD_PHOTOS;
  return (
    <section aria-labelledby={`work-photos-${topic}`} className="section-padding bg-background">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-2 block">Real Highlander work</p>
            <h2 id={`work-photos-${topic}`} className="section-heading">
              {heading ?? (isRoofTopic(topic) ? "Roofs we've put on across Western NC" : "Projects we've built across Western NC")}
            </h2>
          </div>
          <KitLink href="/recent-projects" newTab={newTab} location="proof_photos" className={linkClass}>
            See recent projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </KitLink>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {photos.map((photo) => (
            <li key={photo.src} className="group relative overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={smallSrc(photo.src)}
                srcSet={photo.srcSet}
                sizes="(min-width:768px) 380px, 50vw"
                alt={photo.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="border-t-4 border-[hsl(var(--highland-gold))] p-3 md:p-4">
                <p className="font-heading text-base font-bold leading-snug md:text-lg">{photo.caption}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground md:text-sm">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {photo.place}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ReviewStrip({ topic, newTab, heading }: { topic: ProofTopic; newTab?: boolean; heading?: string }) {
  const reviews = pickReviews(topic);
  const matched = Boolean(REVIEW_TAGS[topic]);
  return (
    <section aria-labelledby={`reviews-${topic}`} className="section-padding bg-secondary/40">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="eyebrow mb-2 block">{matched ? "Customer reviews" : "Company-wide reviews"}</p>
        <h2 id={`reviews-${topic}`} className="section-heading">
          {heading ?? "What customers say about working with Highlander"}
        </h2>
        <p className="mt-3 inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Stars />
          {REVIEW_RATING}/5 from {REVIEW_COUNT} Google reviews.
          {reviews.every((r) => !r.serviceInferred) ? " Each review below shows the work it was for." : ""}
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => {
            const date = reviewDateLabel(review);
            return (
              <blockquote key={review.id} className="relative flex h-full flex-col rounded-sm border border-border bg-card p-6 shadow-sm">
                <Quote aria-hidden="true" className="absolute right-5 top-5 h-8 w-8 text-[hsl(var(--highland-gold))]/50" />
                <Stars count={review.rating} />
                <p className="mt-3 line-clamp-6 text-[1.02rem] leading-relaxed text-foreground">“{review.text}”</p>
                <footer className="mt-auto pt-4 text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{review.name}</span>
                  {date ? ` · ${date}` : ""} · {review.source} review{reviewWork(review) ? ` · ${reviewWork(review)}` : ""}
                </footer>
              </blockquote>
            );
          })}
        </div>
        <KitLink href="/reviews" newTab={newTab} location="proof_reviews" className={`${linkClass} mt-6`}>
          Read all reviews
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </KitLink>
      </div>
    </section>
  );
}

export function RelatedArticles({ topic, newTab, heading }: { topic: ProofTopic; newTab?: boolean; heading?: string }) {
  const posts = pickArticles(topic);
  return (
    <section aria-labelledby={`articles-${topic}`} className="section-padding bg-background">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-2 block">From the Highlander blog</p>
            <h2 id={`articles-${topic}`} className="section-heading">
              {heading ?? "Worth reading before you decide"}
            </h2>
          </div>
          <KitLink href="/blog" newTab={newTab} location="proof_articles" className={linkClass}>
            All articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </KitLink>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <KitLink
                href={`/blog/${post.slug}`}
                newTab={newTab}
                location="proof_articles"
                className="group flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[hsl(var(--gold-ink))]">{post.category}</span>
                <span className="mt-2 font-heading text-xl font-bold leading-snug text-foreground group-hover:underline">{post.title}</span>
                <span className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{post.excerpt}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Read the article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </KitLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Drop-in: pick the blocks the page is missing. */
export default function ProofKit({
  topic,
  photos = false,
  reviews = false,
  articles = false,
  newTab,
}: {
  topic: ProofTopic;
  photos?: boolean;
  reviews?: boolean;
  articles?: boolean;
  newTab?: boolean;
}) {
  return (
    <>
      {photos && <WorkPhotos topic={topic} newTab={newTab} />}
      {reviews && <ReviewStrip topic={topic} newTab={newTab} />}
      {articles && <RelatedArticles topic={topic} newTab={newTab} />}
    </>
  );
}
