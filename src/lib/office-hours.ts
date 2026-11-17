import { useEffect, useState } from "react";
import { FRANKLIN, type BusinessLocation } from "@/data/business";

const TIME_ZONE = "America/New_York";

/** True when `now` falls inside the location's published hours, in Eastern Time. */
export function isOfficeOpen(now: Date = new Date(), location: BusinessLocation = FRANKLIN): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = get("weekday");
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  return location.hours.some(
    (block) => block.days.includes(day) && minutes >= toMinutes(block.opens) && minutes < toMinutes(block.closes),
  );
}

/**
 * Office-open state for the visitor's current time. Starts false so the
 * prerendered page and the first client render agree; the real value lands
 * after mount and refreshes every minute.
 */
export function useOfficeOpen(): boolean {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setOpen(isOfficeOpen());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return open;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** "08:00" → "8 AM", "17:30" → "5:30 PM". */
export function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

export interface OfficeStatus {
  open: boolean;
  /** e.g. "Office open now · until 5 PM" or "Office opens Monday at 8 AM". */
  label: string;
}

/**
 * Live office status for the landing-page chip, in Eastern Time, from the
 * published hours in business.ts. Never promises anything outside them.
 */
export function officeStatus(now: Date = new Date(), location: BusinessLocation = FRANKLIN): OfficeStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const today = WEEKDAYS.indexOf(get("weekday"));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const block = location.hours.find(
    (b) => b.days.includes(WEEKDAYS[today]) && minutes >= toMinutes(b.opens) && minutes < toMinutes(b.closes),
  );
  if (block) return { open: true, label: `Office open now · until ${formatHour(block.closes)}` };

  for (let offset = 0; offset < 8; offset++) {
    const day = WEEKDAYS[(today + offset) % 7];
    const next = location.hours
      .filter((b) => b.days.includes(day) && (offset > 0 || toMinutes(b.opens) > minutes))
      .sort((a, b) => toMinutes(a.opens) - toMinutes(b.opens))[0];
    if (next) {
      const when = offset === 0 ? "today" : offset === 1 ? "tomorrow" : day;
      return { open: false, label: `Office opens ${when} at ${formatHour(next.opens)}` };
    }
  }
  return { open: false, label: "" };
}

/** Client-only office status: null on the prerendered page and first render. */
export function useOfficeStatus(): OfficeStatus | null {
  const [status, setStatus] = useState<OfficeStatus | null>(null);
  useEffect(() => {
    const update = () => setStatus(officeStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return status;
}
