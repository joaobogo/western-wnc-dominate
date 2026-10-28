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
