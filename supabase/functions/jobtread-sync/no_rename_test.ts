import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

// Env must be set BEFORE the module is imported (consts are read at import).
Deno.env.set("JOBTREAD_API_KEY", "test-grant-key");
Deno.env.set("JOBTREAD_ORG_ID", "org_test");
Deno.env.set("SUPABASE_URL", "http://localhost:54321");
Deno.env.set("SUPABASE_SERVICE_ROLE_KEY", "test-service-role");

const { sendToPaveApi } = await import("./index.ts");

type Call = { kind: string; query: any };

/** Fake JobTread Pave API with a tiny in-memory org. */
function installFakePave() {
  const calls: Call[] = [];
  const accounts = new Map<string, string>(); // name -> id
  const locations: any[] = [];
  const jobs: any[] = [];
  let seq = 0;

  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? "{}"));
    const query = body.query ?? {};
    const kind = query.createAccount
      ? "createAccount"
      : query.createContact
      ? "createContact"
      : query.createLocation
      ? "createLocation"
      : query.createJob
      ? "createJob"
      : query.organization
      ? "lookupAccount"
      : "unknown";
    calls.push({ kind, query });

    let result: any = {};
    if (kind === "lookupAccount") {
      const name = query.organization.accounts.$.where.and[0]["="][1].value;
      const id = accounts.get(name);
      result = { organization: { accounts: { nodes: id ? [{ id, name }] : [] } } };
    } else if (kind === "createAccount") {
      const name = query.createAccount.$.name;
      const id = `acct_${++seq}`;
      accounts.set(name, id);
      result = { createAccount: { createdAccount: { id, name } } };
    } else if (kind === "createContact") {
      result = { createContact: { createdContact: { id: `contact_${++seq}` } } };
    } else if (kind === "createLocation") {
      const id = `loc_${++seq}`;
      locations.push({ id, accountId: query.createLocation.$.accountId, name: query.createLocation.$.name });
      result = { createLocation: { createdLocation: { id, name: query.createLocation.$.name } } };
    } else if (kind === "createJob") {
      const id = `job_${++seq}`;
      jobs.push({ id, locationId: query.createJob.$.locationId, name: query.createJob.$.name });
      result = { createJob: { createdJob: { id, name: query.createJob.$.name } } };
    }
    return new Response(JSON.stringify(result), { status: 200 });
  }) as typeof fetch;

  return {
    calls,
    accounts,
    locations,
    jobs,
    restore: () => {
      globalThis.fetch = realFetch;
    },
  };
}

const lead = (address: string) => ({
  account_name: "John Smith",
  lead_name: "John Smith",
  job_name: `Roof Repair Lead - Franklin - John`,
  location_display_name: address,
  contact: { name: "John Smith", email: "john@example.com", phone: "+18285551234" },
  location: { town: "Franklin", address },
  project: { service_category: "roof_repair" },
  note: "Source Page: /roofing",
});

Deno.test("same customer + two addresses → 1 Account, 2 Locations, 2 Jobs", async () => {
  const fake = installFakePave();
  try {
    const a = await sendToPaveApi(lead("53 Mountain Rd, Franklin, NC 28734"));
    const b = await sendToPaveApi(lead("101 Ridge Way, Franklin, NC 28734"));
    assert(a.ok, a.error);
    assert(b.ok, b.error);

    assertEquals(fake.calls.filter((c) => c.kind === "createAccount").length, 1);
    assertEquals(fake.accounts.size, 1);
    assertEquals(fake.locations.length, 2);
    assertEquals(fake.jobs.length, 2);
    // Both locations hang off the same existing Customer.
    assertEquals(new Set(fake.locations.map((l) => l.accountId)).size, 1);
    // Each Job sits under its own Location.
    assertEquals(new Set(fake.jobs.map((j) => j.locationId)).size, 2);
  } finally {
    fake.restore();
  }
});

Deno.test("never issues a rename / update mutation on any entity", async () => {
  const fake = installFakePave();
  try {
    await sendToPaveApi(lead("53 Mountain Rd, Franklin, NC 28734"));
    await sendToPaveApi(lead("101 Ridge Way, Franklin, NC 28734"));
    for (const call of fake.calls) {
      for (const key of Object.keys(call.query)) {
        assert(
          !/^(update|rename|merge|delete)/i.test(key),
          `forbidden mutation issued: ${key}`,
        );
      }
    }
    assertEquals(fake.calls.filter((c) => c.kind === "unknown").length, 0);
  } finally {
    fake.restore();
  }
});

Deno.test("contact is created only once for a reused customer", async () => {
  const fake = installFakePave();
  try {
    await sendToPaveApi(lead("53 Mountain Rd, Franklin, NC 28734"));
    await sendToPaveApi(lead("101 Ridge Way, Franklin, NC 28734"));
    assertEquals(fake.calls.filter((c) => c.kind === "createContact").length, 1);
  } finally {
    fake.restore();
  }
});

Deno.test("source code contains no updateAccount mutation", async () => {
  const src = await Deno.readTextFile(new URL("./index.ts", import.meta.url));
  const mutations = src.match(/\b(updateAccount|renameAccount|mergeAccount|updateLocation)\s*:/g);
  assertEquals(mutations, null);
});
