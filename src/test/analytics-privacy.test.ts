import { describe, expect, it } from "vitest";
import { safeSearch } from "@/lib/gtm";

describe("analytics query sanitising", () => {
  it("keeps campaign and click-ID parameters only", () => {
    expect(safeSearch("?utm_source=google&utm_campaign=roofing&gclid=abc&fbclid=x")).toBe(
      "?utm_source=google&utm_campaign=roofing&gclid=abc&fbclid=x",
    );
  });

  it("drops anything that could carry personal information", () => {
    const out = safeSearch("?email=jane%40example.com&phone=8285550100&name=Jane&address=40+Depot&utm_medium=cpc");
    expect(out).toBe("?utm_medium=cpc");
    expect(out).not.toMatch(/jane|8285550100|depot/i);
  });

  it("returns an empty string when nothing qualifies", () => {
    expect(safeSearch("")).toBe("");
    expect(safeSearch("?email=a@b.co")).toBe("");
  });
});
