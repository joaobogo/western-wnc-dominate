// send-to-jobtread — stub.
//
// Called once after every receptionist call-sheet insert with the lead row's
// payload. For now it only logs and returns 200 so the intake flow never blocks
// on the CRM.
//
// ─────────────────────────────────────────────────────────────────────────────
// TODO (developer): call the JobTread API here.
//   - The grant key is stored as the secret JOBTREAD_GRANT_KEY.
//     const grantKey = Deno.env.get("JOBTREAD_GRANT_KEY");
//   - Map `payload` onto a JobTread Contact + Location + Job and POST it.
//   - On failure, return a non-2xx so the caller can log the sync error.
// Do not add any other JobTread behaviour until that mapping is agreed.
// ─────────────────────────────────────────────────────────────────────────────

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const record = (body ?? {}) as Record<string, unknown>;
  console.log("send-to-jobtread received lead", {
    lead_id: record.lead_id ?? null,
    grade: record.grade ?? null,
    keys: Object.keys(record),
  });

  return new Response(
    JSON.stringify({ ok: true, forwarded: false, reason: "JobTread call not implemented yet" }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
