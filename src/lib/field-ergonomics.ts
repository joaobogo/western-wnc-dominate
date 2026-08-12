/**
 * Mobile input ergonomics presets.
 *
 * Every text field sitewide should spread one of these so iOS/Android show the
 * right keyboard, the right "go/next/done" action key, and browser autofill
 * can populate contact details. Font size (>=16px) and 44px tap targets are
 * enforced globally in index.css.
 */

type FieldAttrs = {
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "search" | "url" | "none";
  autoComplete?: string;
  enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  autoCorrect?: "on" | "off";
  spellCheck?: boolean;
  pattern?: string;
};

const noAutoText = { autoCapitalize: "none", autoCorrect: "off", spellCheck: false } as const;

export const fieldAttrs = {
  /** Person or household name */
  name: {
    type: "text",
    inputMode: "text",
    autoComplete: "name",
    autoCapitalize: "words",
    enterKeyHint: "next",
  },
  /** US phone number */
  phone: {
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    enterKeyHint: "next",
    ...noAutoText,
  },
  /** Phone as the last field in a form */
  phoneLast: {
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    enterKeyHint: "done",
    ...noAutoText,
  },
  email: {
    type: "email",
    inputMode: "email",
    autoComplete: "email",
    enterKeyHint: "next",
    ...noAutoText,
  },
  emailLast: {
    type: "email",
    inputMode: "email",
    autoComplete: "email",
    enterKeyHint: "done",
    ...noAutoText,
  },
  /** Town / city only */
  town: {
    type: "text",
    inputMode: "text",
    autoComplete: "address-level2",
    autoCapitalize: "words",
    enterKeyHint: "next",
  },
  /** Full street address (may include town) */
  address: {
    type: "text",
    inputMode: "text",
    autoComplete: "street-address",
    autoCapitalize: "words",
    enterKeyHint: "next",
  },
  postalCode: {
    type: "text",
    inputMode: "numeric",
    autoComplete: "postal-code",
    pattern: "[0-9]{5}(-[0-9]{4})?",
    enterKeyHint: "next",
    ...noAutoText,
  },
  /** Free-form message / details textarea */
  notes: {
    inputMode: "text",
    autoCapitalize: "sentences",
    enterKeyHint: "enter",
  },
  search: {
    type: "search",
    inputMode: "search",
    enterKeyHint: "search",
    ...noAutoText,
  },
  password: {
    type: "password",
    autoComplete: "current-password",
    enterKeyHint: "go",
    ...noAutoText,
  },
  /** Short numeric input (square footage, counts) */
  number: {
    type: "text",
    inputMode: "numeric",
    pattern: "[0-9]*",
    enterKeyHint: "next",
    ...noAutoText,
  },
  /** Chat / single-field send */
  chat: {
    type: "text",
    inputMode: "text",
    enterKeyHint: "send",
    autoCapitalize: "sentences",
  },
} satisfies Record<string, FieldAttrs>;
