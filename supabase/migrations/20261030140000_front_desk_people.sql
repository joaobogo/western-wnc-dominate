-- One shared front-desk login for the office. Who took each call comes from
-- "Who's on the phone?" on the call sheet (Frank, Susan or Other), not from
-- the login, so the tracker counts people, not accounts.

CREATE TABLE IF NOT EXISTS public.front_desk_people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 40),
  daily_goal integer NOT NULL DEFAULT 8 CHECK (daily_goal BETWEEN 1 AND 100),
  active boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS front_desk_people_name_idx ON public.front_desk_people (lower(name));

GRANT SELECT, INSERT, UPDATE ON public.front_desk_people TO authenticated;
GRANT ALL ON public.front_desk_people TO service_role;
ALTER TABLE public.front_desk_people ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Front desk reads the people list"
ON public.front_desk_people FOR SELECT TO authenticated
USING (public.is_front_desk(auth.uid()));

CREATE POLICY "Admins add people"
ON public.front_desk_people FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins edit people"
ON public.front_desk_people FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.front_desk_people (name, daily_goal, sort)
VALUES ('Frank', 8, 1), ('Susan', 8, 2)
ON CONFLICT DO NOTHING;

-- The person behind each call and missed call. "Other" has no row: its
-- typed name is kept in taken_by / person_name.
ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS taken_by_person uuid REFERENCES public.front_desk_people(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS intake_leads_taken_by_person_idx ON public.intake_leads (taken_by_person, created_at DESC);

ALTER TABLE public.missed_calls
  ADD COLUMN IF NOT EXISTS person_id uuid REFERENCES public.front_desk_people(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS person_name text CHECK (person_name IS NULL OR char_length(person_name) <= 40);
