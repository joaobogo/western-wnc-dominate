import { towns } from "./src/data/towns";
import { getTownFAQs } from "./src/data/town-faqs-generated";
import { townProof } from "./src/data/town-proof";
import { getFaqServiceLink, getTownCountyLink } from "./src/lib/town-faq-links";
for (const t of towns) {
  const faqs = getTownFAQs(t.slug, (townProof as any)[t.slug]?.faqs);
  console.log("==", t.slug, "county:", getTownCountyLink(t)?.href);
  for (const f of faqs) console.log("   ", getFaqServiceLink(f.question, f.answer).href.padEnd(30), f.question.slice(0,70));
}
