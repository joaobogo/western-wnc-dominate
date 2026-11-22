import type { Faq } from "./types";

/** Breadcrumb root for every construction template page. */
export const constructionCrumb = { name: "Construction", url: "/construction" };

/** FAQ answers that are the same wherever they appear (plan FAQ topics). */
export const permitFaq = (what: string): Faq => ({
  question: "Do I need a permit in Macon or Jackson County?",
  answer: `Most ${what} need a county building permit. We confirm what your project needs during planning and coordinate the permits and inspections for the work we're hired to do.`,
});

export const financingFaq: Faq = {
  question: "Is financing available?",
  answer: "Financing may be available, subject to credit approval. Ask when you call, or see the financing page for how it works.",
};

export const areasFaq: Faq = {
  question: "What areas do you serve?",
  answer: "We work from our Franklin office and Sylva showroom across Western North Carolina, including Franklin, Highlands, Cashiers, Sylva and the towns around them.",
};

export const awayFaq = (what: string): Faq => ({
  question: "Can you work while I'm out of town?",
  answer: `Yes. Tell us how to reach the property and how you want to hear about progress on your ${what}, and we can send photo updates while the work is underway.`,
});
