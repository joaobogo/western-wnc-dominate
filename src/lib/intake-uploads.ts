import { supabase } from "@/integrations/supabase/client";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB per file
const MAX_FILES = 8;

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
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `submissions/${sessionFolder}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage
      .from("lead-uploads")
      .upload(path, file, { upsert: false, cacheControl: "3600", contentType: file.type });
    if (error) {
      out.errors.push({ name: file.name, reason: error.message });
      continue;
    }
    out.ok.push({ path, name: file.name, size: file.size, type: file.type });
  }
  return out;
}

export function newSessionFolder(): string {
  return (crypto as any).randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}