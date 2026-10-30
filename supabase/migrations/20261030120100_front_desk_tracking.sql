-- Front-desk tracker: personal logins, call outcomes, callbacks, missed calls
-- and the 5 PM Teams summary. Staff see their own calls and the team total;
-- admins see everyone.

-- ── Who can use the call sheet ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_front_desk(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'front_desk') OR public.has_role(_user_id, 'admin')
$$;

-- ── Team members: the name and daily goal behind each login ───────────
CREATE TABLE IF NOT EXISTS public.team_members (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL CHECK (char_length(trim(display_name)) BETWEEN 1 AND 40),
  daily_goal integer NOT NULL DEFAULT 8 CHECK (daily_goal BETWEEN 1 AND 100),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members read their own row"
ON public.team_members FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Adding, renaming and deactivating people goes through the admin-only
-- front-desk-team edge function (service role), so no client write policies.

-- ── Call outcomes and callbacks on the existing call sheet rows ───────
ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS taken_by_user uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS outcome text CHECK (outcome IN ('booked', 'callback', 'not_fit', 'spam')),
  ADD COLUMN IF NOT EXISTS outcome_at timestamptz,
  ADD COLUMN IF NOT EXISTS callback_at timestamptz,
  ADD COLUMN IF NOT EXISTS callback_done boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS intake_leads_taken_by_user_idx
  ON public.intake_leads (taken_by_user, created_at DESC);

-- Staff save and update their own calls; the admin policies already cover everyone else.
CREATE POLICY "Front desk can create their own intake leads"
ON public.intake_leads FOR INSERT TO authenticated
WITH CHECK (public.is_front_desk(auth.uid()) AND taken_by_user = auth.uid());

CREATE POLICY "Front desk can read their own intake leads"
ON public.intake_leads FOR SELECT TO authenticated
USING (public.is_front_desk(auth.uid()) AND taken_by_user = auth.uid());

CREATE POLICY "Front desk can update their own intake leads"
ON public.intake_leads FOR UPDATE TO authenticated
USING (public.is_front_desk(auth.uid()) AND taken_by_user = auth.uid())
WITH CHECK (public.is_front_desk(auth.uid()) AND taken_by_user = auth.uid());

-- ── Missed calls: one-tap log, never sent to JobTread ─────────────────
CREATE TABLE IF NOT EXISTS public.missed_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  note text CHECK (note IS NULL OR char_length(note) <= 500),
  called_back boolean NOT NULL DEFAULT false,
  called_back_at timestamptz
);

CREATE INDEX IF NOT EXISTS missed_calls_user_created_idx ON public.missed_calls (user_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.missed_calls TO authenticated;
GRANT ALL ON public.missed_calls TO service_role;
ALTER TABLE public.missed_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Front desk can log their own missed calls"
ON public.missed_calls FOR INSERT TO authenticated
WITH CHECK (public.is_front_desk(auth.uid()) AND user_id = auth.uid());

CREATE POLICY "Front desk reads own missed calls, admins read all"
ON public.missed_calls FOR SELECT TO authenticated
USING ((public.is_front_desk(auth.uid()) AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Front desk updates own missed calls, admins update all"
ON public.missed_calls FOR UPDATE TO authenticated
USING ((public.is_front_desk(auth.uid()) AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'))
WITH CHECK ((public.is_front_desk(auth.uid()) AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));

-- ── Team total for today (Eastern), without exposing anyone's calls ───
CREATE OR REPLACE FUNCTION public.front_desk_team_today()
RETURNS TABLE (calls integer, missed integer, booked integer)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  day_start timestamptz := date_trunc('day', now() AT TIME ZONE 'America/New_York') AT TIME ZONE 'America/New_York';
BEGIN
  IF NOT public.is_front_desk(auth.uid()) THEN
    RETURN QUERY SELECT 0, 0, 0;
    RETURN;
  END IF;
  RETURN QUERY
  SELECT
    (SELECT count(*)::int FROM public.intake_leads WHERE created_at >= day_start),
    (SELECT count(*)::int FROM public.missed_calls WHERE created_at >= day_start),
    (SELECT count(*)::int FROM public.intake_leads WHERE created_at >= day_start AND outcome = 'booked');
END $$;

REVOKE ALL ON FUNCTION public.front_desk_team_today() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.front_desk_team_today() TO authenticated;

-- ── 5 PM Teams summary ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.front_desk_summaries (
  day date PRIMARY KEY,
  posted_at timestamptz NOT NULL DEFAULT now(),
  totals jsonb NOT NULL DEFAULT '{}'::jsonb
);
GRANT ALL ON public.front_desk_summaries TO service_role;
ALTER TABLE public.front_desk_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read front desk summaries"
ON public.front_desk_summaries FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.internal_config (key, value)
VALUES ('front_desk_summary_token', encode(gen_random_bytes(24), 'hex'))
ON CONFLICT (key) DO NOTHING;

-- 17:05 Eastern is 21:05 UTC in summer and 22:05 UTC in winter. Both runs are
-- scheduled; the function posts only when it is 5 PM in Franklin, once per day.
select cron.schedule(
  'front-desk-daily-summary',
  '5 21,22 * * 1-5',
  $$
  select net.http_post(
    url:='https://qflrlebkswerlbqbuslx.supabase.co/functions/v1/front-desk-daily-summary',
    headers:=jsonb_build_object(
      'Content-Type','application/json',
      'x-admin-secret',(select value from public.internal_config where key='front_desk_summary_token')
    ),
    body:='{}'::jsonb
  );
  $$
);
