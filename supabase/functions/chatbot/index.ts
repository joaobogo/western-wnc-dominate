import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { handleChatbotRequest } from "./handler.ts";

serve((req) =>
  handleChatbotRequest(req, {
    getEnv: (key) => Deno.env.get(key),
    createAdminClient: (url, key) =>
      createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      }),
  }),
);
