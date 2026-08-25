import { BUSINESS } from "./config";

/** Wall-clock parts of `date` in the business time zone. */
export function zoneParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const p: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) p[part.type] = part.value;
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    p.weekday,
  );
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour) % 24,
    minute: Number(p.minute),
    weekday: weekdayIndex,
  };
}

/** Build a UTC Date from a business-zone wall-clock time. */
export function fromZone(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  // Offset between the zone's wall clock and UTC at that instant.
  const asZone = zoneParts(new Date(guess));
  const zoneAsUtc = Date.UTC(
    asZone.year,
    asZone.month - 1,
    asZone.day,
    asZone.hour,
    asZone.minute,
  );
  return new Date(guess + (guess - zoneAsUtc));
}

function isWorkday(weekday: number) {
  return (BUSINESS.workdays as readonly number[]).includes(weekday);
}

export function isBusinessHours(date: Date): boolean {
  const { weekday, hour } = zoneParts(date);
  return isWorkday(weekday) && hour >= BUSINESS.openHour && hour < BUSINESS.closeHour;
}

/** Move a calendar date forward `n` business days (skipping weekends). */
function addBusinessDays(
  y: number,
  m: number,
  d: number,
  n: number,
): { year: number; month: number; day: number } {
  const cursor = new Date(Date.UTC(y, m - 1, d));
  let left = n;
  while (left > 0) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (isWorkday(cursor.getUTCDay())) left -= 1;
  }
  return {
    year: cursor.getUTCFullYear(),
    month: cursor.getUTCMonth() + 1,
    day: cursor.getUTCDate(),
  };
}

/**
 * Next moment the office opens after `date`. If `date` is on a workday before
 * opening, that is today at 8:00; otherwise the next workday at 8:00.
 */
function nextOpening(date: Date) {
  const p = zoneParts(date);
  if (isWorkday(p.weekday) && p.hour < BUSINESS.openHour) {
    return { year: p.year, month: p.month, day: p.day };
  }
  return addBusinessDays(p.year, p.month, p.day, 1);
}

/**
 * Call-by deadline per the bucket rules.
 * Inside business hours: A = +15 min, B = 5:00 PM today,
 *   C = same time next business day, D = same time in two business days.
 * Outside business hours: A = next opening + 15 min, B = next opening day noon,
 *   C = one business day after the next opening, D = two business days after.
 */
export function callByFor(grade: "A" | "B" | "C" | "D", received = new Date()): Date {
  const p = zoneParts(received);

  if (isBusinessHours(received)) {
    switch (grade) {
      case "A":
        return new Date(received.getTime() + 15 * 60 * 1000);
      case "B":
        return fromZone(p.year, p.month, p.day, BUSINESS.closeHour, 0);
      case "C": {
        const n = addBusinessDays(p.year, p.month, p.day, 1);
        return fromZone(n.year, n.month, n.day, p.hour, p.minute);
      }
      default: {
        const n = addBusinessDays(p.year, p.month, p.day, 2);
        return fromZone(n.year, n.month, n.day, p.hour, p.minute);
      }
    }
  }

  const open = nextOpening(received);
  switch (grade) {
    case "A":
      return fromZone(open.year, open.month, open.day, BUSINESS.openHour, 15);
    case "B":
      return fromZone(open.year, open.month, open.day, 12, 0);
    case "C": {
      const n = addBusinessDays(open.year, open.month, open.day, 1);
      return fromZone(n.year, n.month, n.day, BUSINESS.openHour, 0);
    }
    default: {
      const n = addBusinessDays(open.year, open.month, open.day, 2);
      return fromZone(n.year, n.month, n.day, BUSINESS.openHour, 0);
    }
  }
}

/** "Wed, Aug 26, 8:15 AM" */
export function formatCallBy(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS.timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
    .format(date)
    .replace(/\u202f/g, " ");
}
