import { supabase } from "@/integrations/supabase/client";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB per file
const MAX_FILES = 8;
const UPLOAD_ATTEMPTS = 3;

/** Images, PDFs, and common document types the crew can actually open. */
export const ACCEPTED_UPLOAD_TYPES =
  "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.heic,.heif";

const ACCEPTED_EXTENSIONS = /\.(jpe?g|png|webp|gif|heic|heif|pdf|docx?|xlsx?|csv|txt)$/i;

export function isAcceptedUpload(file: { name: string; type?: string }): boolean {
  const type = (file.type ?? "").toLowerCase();
  if (type.startsWith("image/") || type === "application/pdf") return true;
  if (/(msword|wordprocessingml|ms-excel|spreadsheetml|csv|plain)/.test(type)) return true;
  return ACCEPTED_EXTENSIONS.test(file.name);
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type UploadedFileRef = {
  path: string;
  name: string;
  size: number;
  type: string;
};

export type UploadResult = {
  ok: UploadedFileRef[];
  errors: { name: string; reason: string }[];
};

/**
 * Uploads files to the private `lead-uploads` bucket.
 * Files are namespaced by sessionFolder (a uuid generated client-side) so staff
 * can group attachments per lead. Returns the storage paths to persist on the
 * consultation_requests metadata.
 */
export async function uploadIntakeFiles(
  sessionFolder: string,
  files: File[],
): Promise<UploadResult> {
  const out: UploadResult = { ok: [], errors: [] };
  const list = files.slice(0, MAX_FILES);

  for (const file of list) {
    if (file.size > MAX_BYTES) {
      out.errors.push({ name: file.name, reason: "Larger than 8MB" });
      continue;
    }
    if (!isAcceptedUpload(file)) {
      out.errors.push({ name: file.name, reason: "Unsupported file type" });
      continue;
    }
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    // Retry a failed upload so an attachment is never silently lost to a
    // flaky connection. Each attempt gets its own path to avoid collisions.
    let lastReason = "Upload failed";
    let uploaded = false;
    for (let attempt = 1; attempt <= UPLOAD_ATTEMPTS && !uploaded; attempt++) {
      const path = `submissions/${sessionFolder}/${Date.now()}-${attempt}-${safe}`;
      try {
        const { error } = await supabase.storage
          .from("lead-uploads")
          .upload(path, file, { upsert: false, cacheControl: "3600", contentType: file.type });
        if (error) {
          lastReason = error.message;
        } else {
          out.ok.push({ path, name: file.name, size: file.size, type: file.type });
          uploaded = true;
          break;
        }
      } catch (e) {
        // Network/CORS failure — never block the lead itself.
        lastReason = (e as Error)?.message ?? "Upload failed";
      }
      if (attempt < UPLOAD_ATTEMPTS) await wait(400 * attempt);
    }
    if (!uploaded) out.errors.push({ name: file.name, reason: lastReason });
  }
  return out;
}

export function newSessionFolder(): string {
  return (crypto as any).randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}