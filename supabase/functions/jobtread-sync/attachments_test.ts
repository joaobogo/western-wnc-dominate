import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  buildPayload,
  resolveAttachments,
  truncateNotePreservingFiles,
  type AttachmentInfo,
} from "./index.ts";

const okSigner = async (path: string) => ({ url: `https://storage.test/signed/${path}?token=abc` });
const failSigner = async (_path: string) => ({ url: null, error: "Object not found" });

const row = (o: Record<string, unknown> = {}) => ({
  name: "John Smith",
  property_town: "Franklin",
  service_category: "roof_repair",
  files_uploaded: ["submissions/f1/1-roof.jpg", "submissions/f1/2-plans.pdf"],
  photos_uploaded: ["submissions/f1/1-roof.jpg"],
  metadata: {},
  ...o,
}) as any;

Deno.test("storage paths become signed URLs, deduped across photo/file columns", async () => {
  const info = await resolveAttachments(row(), okSigner);
  assertEquals(info.files.length, 2);
  assertEquals(info.files[0].name, "1-roof.jpg");
  assert(info.files[0].url.startsWith("https://storage.test/signed/"));
  assertEquals(info.failures.length, 0);
});

Deno.test("signing failures are reported, never thrown", async () => {
  const info = await resolveAttachments(row(), failSigner);
  assertEquals(info.files.length, 0);
  assertEquals(info.failures.length, 2);
  assertEquals(info.failures[0].reason, "Object not found");
});

Deno.test("client-side upload failures reach the note", async () => {
  const info = await resolveAttachments(
    row({
      files_uploaded: ["submissions/f1/1-roof.jpg"],
      photos_uploaded: [],
      metadata: { attachment_errors: [{ name: "drone-video.mov", reason: "Larger than 8MB" }] },
    }),
    okSigner,
  );
  assertEquals(info.files.length, 1);
  assertEquals(info.failures, [{ name: "drone-video.mov", reason: "Larger than 8MB" }]);

  const payload = buildPayload(
    row({ metadata: { attachment_errors: [{ name: "drone-video.mov", reason: "Larger than 8MB" }] } }),
    "lead",
    info,
  );
  assert(payload.note.includes("Uploaded Files: 1"));
  assert(payload.note.includes("1-roof.jpg — https://storage.test/signed/"));
  assert(payload.note.includes("Files That Failed To Upload: 1"));
  assert(payload.note.includes("drone-video.mov — Larger than 8MB"));
  assert(payload.note.includes("ask the customer to resend"));
});

Deno.test("payload still builds (lead syncs) when every attachment fails", async () => {
  const info = await resolveAttachments(row(), failSigner);
  const payload = buildPayload(row(), "lead", info);
  assertEquals(payload.uploads.attachments.length, 0);
  assertEquals(payload.uploads.failed_uploads.length, 2);
  assert(payload.account_name === "John Smith");
  assert(payload.note.includes("Uploaded Files: None"));
  assert(payload.note.includes("Files That Failed To Upload: 2"));
});

Deno.test("signed URLs land in uploaded_file_urls for the Job payload", async () => {
  const info = await resolveAttachments(row(), okSigner);
  const payload = buildPayload(row(), "lead", info);
  assertEquals(payload.project.uploaded_file_urls.length, 2);
  assertEquals(payload.uploads.uploaded_file_urls, payload.project.uploaded_file_urls);
});

Deno.test("note truncation always preserves the FILES block", async () => {
  const info: AttachmentInfo = {
    files: [{ name: "roof.jpg", url: "https://storage.test/signed/roof.jpg?token=xyz" }],
    failures: [{ name: "plans.pdf", reason: "Upload failed" }],
  };
  const payload = buildPayload(
    row({ project_description: "x".repeat(4000) }),
    "lead",
    info,
  );
  const short = truncateNotePreservingFiles(payload.note, 1000);
  assert(short.length <= 1000, `length ${short.length}`);
  assert(short.includes("https://storage.test/signed/roof.jpg?token=xyz"));
  assert(short.includes("plans.pdf — Upload failed"));
  assert(short.includes("[truncated]"));
});

Deno.test("short notes are returned untouched", () => {
  const note = "Files\nUploaded Files: None";
  assertEquals(truncateNotePreservingFiles(note, 1000), note);
});
