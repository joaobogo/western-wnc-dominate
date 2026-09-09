import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";

/**
 * The stuck-visitor escalation.
 *
 * A first error is a normal stumble — the visitor gets a quiet "prefer to skip
 * the form?" link. From the second error onward they are visibly struggling, so
 * the phone is promoted to a real button. Nobody should wear themselves out on
 * a form and leave without knowing they could just call.
 */
beforeEach(() => {
  // jsdom implements neither; the component calls both when it appears.
  Element.prototype.scrollIntoView = vi.fn();
});

describe("FormErrorSummary", () => {
  it("renders nothing when there is no error", () => {
    const { container } = render(<FormErrorSummary message={null} issues={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("first error: names the problem and offers the phone quietly, no call button", () => {
    render(<FormErrorSummary message="We need a little more." issues={["Enter your phone."]} />);

    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText("Enter your phone.")).toBeTruthy();
    expect(screen.queryByText(/Stuck\?/)).toBeNull();
    // The quiet fallback link is present, but not the promoted "Call ..." button.
    expect(screen.queryByText(new RegExp(`Call ${PHONE_DISPLAY.replace(/[().\s-]/g, "\\$&")}`))).toBeNull();
  });

  it("second error: escalates to the call button with the Franklin number", () => {
    const { rerender } = render(
      <FormErrorSummary message="We need a little more." issues={["Enter your phone."]} />,
    );
    expect(screen.queryByText(/Stuck\?/)).toBeNull();

    // A second, different failure — the visitor is now struggling.
    rerender(<FormErrorSummary message="We need a little more." issues={["Enter your town."]} />);

    expect(screen.getByText(/Stuck\?/)).toBeTruthy();
    const call = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href") === PHONE_TEL);
    expect(call, "a tel: link must be present once the visitor is stuck").toBeTruthy();
    expect(call!.textContent).toContain(PHONE_DISPLAY);
  });

  it("takes focus when it appears so it is never missed below the fold", () => {
    render(<FormErrorSummary message="We couldn't send this." />);
    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(alert);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("always exposes a way to reach a human, even on the first error", () => {
    render(<FormErrorSummary message="We couldn't send this." />);
    const tel = screen.getAllByRole("link").find((a) => a.getAttribute("href") === PHONE_TEL);
    expect(tel).toBeTruthy();
  });
});
