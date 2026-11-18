import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/intake/session", () => ({ useReadySession: () => ({ user: { id: "u1", email: "desk@example.com" }, member: { display_name: "Desk" } }) }));
vi.mock("@/intake/useMyDay", () => ({ useMyDay: () => ({ calls: [], goal: 0, loading: false, refresh: vi.fn(), add: vi.fn(), logs: [] }) }));
vi.mock("@/intake/MyDayCard", () => ({ MyDayCard: () => null, OutcomePicker: () => null }));
vi.mock("@/intake/onThePhone", () => ({
  PersonPicker: () => null,
  usePeople: () => ({ people: [], error: null }),
  useOnThePhone: () => ({ person: { id: "p1", name: "Susan" }, personId: "p1", pick: vi.fn(), clear: vi.fn() }),
}));
vi.mock("@/intake/ExistingCustomer", () => ({ ExistingCustomerCard: () => null }));
vi.mock("@/intake/save", () => ({ saveLead: vi.fn() }));

import IntakeSheet from "@/intake/IntakeSheet";

describe("front desk sheet", () => {
  it("asks for other work once a main job is picked, and allows several", () => {
    render(<MemoryRouter><IntakeSheet /></MemoryRouter>);
    expect(screen.queryByTestId("other-job-types")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Roof repair or leak" }));
    const group = within(screen.getByTestId("other-job-types"));
    expect(group.queryByRole("button", { name: "Roof repair or leak" })).toBeNull();
    for (const name of ["Handyman services", "Design or planning help"]) {
      fireEvent.click(group.getByRole("button", { name }));
      expect(group.getByRole("button", { name }).getAttribute("aria-pressed")).toBe("true");
    }
    fireEvent.click(group.getByRole("button", { name: "Handyman services" }));
    expect(group.getByRole("button", { name: "Handyman services" }).getAttribute("aria-pressed")).toBe("false");
  });
});
