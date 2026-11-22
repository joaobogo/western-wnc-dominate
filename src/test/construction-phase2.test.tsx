import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConstructionDivision from "@/pages/ConstructionDivision";
import { hubContent } from "@/content/construction/hub";
import { CostSection, HOW_IT_WORKS, FIRST_VISIT_FREE } from "@/components/construction-page";
import { CONSTRUCTION_REVIEW_IDS, CONSTRUCTION_WORK_RE, constructionReviews } from "@/lib/construction-reviews";
import { REVIEWS } from "@/data/reviews";

// John's Construction & Design plan (21 Nov 2026), Phase 2: hub rebuild on the template.

const renderHub = () =>
  render(
    <MemoryRouter initialEntries={["/construction"]}>
      <ConstructionDivision />
    </MemoryRouter>,
  );

describe("construction template", () => {
  it("cost section hides itself until Luke-approved ranges exist", () => {
    const { container: none } = render(<MemoryRouter><CostSection heading="Cost" ranges={[]} factors={["Size"]} /></MemoryRouter>);
    expect(none.innerHTML).toBe("");
    const { container: todo } = render(
      <MemoryRouter><CostSection heading="Cost" ranges={[{ label: "Addition", range: "TODO(Luke-approved)" }]} factors={["Size"]} /></MemoryRouter>,
    );
    expect(todo.innerHTML).toBe("");
    render(<MemoryRouter><CostSection heading="Cost" ranges={[{ label: "Deck", range: "$X–$Y" }]} factors={["Size"]} /></MemoryRouter>);
    expect(screen.getByText("Financing may be available, subject to credit approval.", { exact: false })).toBeInTheDocument();
  });

  it("how it works is exactly four steps and makes no free-visit claim until confirmed", () => {
    expect(HOW_IT_WORKS.map((s) => s.title)).toEqual(["Call", FIRST_VISIT_FREE ? "Free site visit" : "Site visit", "Written scope", "Build"]);
    if (!FIRST_VISIT_FREE) expect(JSON.stringify(HOW_IT_WORKS)).not.toMatch(/free/i);
  });

  it("construction reviews are real, mention building work and are never padded with roofing reviews", () => {
    const list = constructionReviews();
    expect(list.length).toBeLessThanOrEqual(CONSTRUCTION_REVIEW_IDS.length);
    for (const r of list) {
      expect(REVIEWS).toContain(r);
      expect(r.text).toMatch(CONSTRUCTION_WORK_RE);
    }
  });
});

describe("/construction hub", () => {
  const page = readFileSync("src/pages/ConstructionDivision.tsx", "utf8");

  it("keeps the plan's section order", () => {
    const order = ["<ConstructionHero", "<AnswerBlock", "<WorkGallerySection", "<ServiceCards", "<IconCards", "<ProjectSpotlight", "<HowItWorks", "<ConstructionReviews", "<FaqAccordion", "<FinalCtaBand", "<RelatedLinks"];
    const at = order.map((tag) => page.indexOf(tag));
    expect(at.every((i) => i > 0), order.filter((_, k) => at[k] < 0).join(", ")).toBe(true);
    expect([...at].sort((a, b) => a - b)).toEqual(at);
  });

  it("has dropped the old crowding blocks", () => {
    for (const gone of ["DisciplinesBridge", "ConstructionTrust", "ConstructionProcess", "TimelineExpectations", "BudgetRangeContext", "ProjectTypeSelector", "TieredOffer", "ConstructionMidCTA", "ConstructionClosingCTA", "DesignProgramPromo", "BuilderPromoBlock", "ProofKit"]) {
      expect(page, gone).not.toContain(gone);
    }
  });

  it("title, meta, FAQ count and links follow the plan", () => {
    expect(hubContent.title).toBe("General Contractor in Franklin, NC | Highlander");
    expect(hubContent.title.length).toBeLessThanOrEqual(60);
    expect(hubContent.description.length).toBeLessThanOrEqual(155);
    expect(hubContent.faqs.length).toBeGreaterThanOrEqual(4);
    expect(hubContent.faqs.length).toBeLessThanOrEqual(6);
    const routes = readFileSync("src/App.tsx", "utf8");
    for (const card of hubContent.serviceCards!.cards) {
      expect(routes, card.href).toContain(`path="${card.href}"`);
      expect(card.title, "keyword anchor").not.toMatch(/learn more|explore/i);
      if (card.image.example) expect(card.image.alt).toMatch(/not a Highlander project/);
    }
  });

  it("renders one H1, two call buttons in the body, the 3-field form and the visible FAQ", () => {
    renderHub();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const main = document.querySelector("main")!;
    const bodyCalls = [...main.querySelectorAll('a[href^="tel:"]')].filter((a) => !a.closest("form") && /^Call \(/.test((a.textContent ?? "").trim()));
    expect(bodyCalls.map((a) => a.getAttribute("data-gtm-location"))).toEqual(["construction_hero", "final_cta"]);
    expect(main.querySelector('form[data-gtm-form-name="fast_lead_form"]')).not.toBeNull();
    for (const faq of hubContent.faqs) expect(main.textContent).toContain(faq.answer);
    expect(main.textContent).not.toMatch(/TODO/);
  });
});
