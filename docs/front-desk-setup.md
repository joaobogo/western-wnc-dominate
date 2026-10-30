# Front desk: shared login and tracker setup

The call sheet at https://highlandernc.com/front-desk is closed to the public. It only shows a sign-in screen until the shared login below exists.

How it works:
1. The office shares **one login** (one email and one password).
2. After signing in, each morning the page asks **"Who's on the phone?"**: Frank, Susan or **Other** (Other types their name).
3. Every call and missed call from then on counts for that person, until someone taps **"Not Frank? Switch"** or the next morning.

## 1. Lovable prompt (paste once, after filling in the email and password)

> Pull the latest from GitHub `main`. Don't change any code, and don't touch `jobtread-sync`. Then:
> 1. Apply these migrations, in this order:
>    - `supabase/migrations/20261030120000_front_desk_role.sql`
>    - `supabase/migrations/20261030120100_front_desk_tracking.sql`
>    - `supabase/migrations/20261030140000_front_desk_people.sql`
> 2. Deploy the edge functions `front-desk-team` and `front-desk-daily-summary`.
> 3. Create one Supabase Auth user for the shared front-desk login:
>    - email: `EMAIL_HERE`
>    - password: `PASSWORD_HERE`
>    - mark the email as confirmed.
> 4. Give that user the front-desk role and its display name with this SQL:
>    ```sql
>    insert into public.user_roles (user_id, role)
>    select id, 'front_desk' from auth.users where email = 'EMAIL_HERE'
>    on conflict do nothing;
>    insert into public.team_members (user_id, display_name, daily_goal)
>    select id, 'Front desk', 8 from auth.users where email = 'EMAIL_HERE'
>    on conflict (user_id) do update set display_name = excluded.display_name, active = true;
>    ```
> 5. Confirm with a read-only query that `public.front_desk_people` lists Frank and Susan, and that the user above has the `front_desk` role. Tell me the results.

**Safer option for the password:** instead of steps 3 and 4, create the user yourself in **Lovable Cloud → Users → Add user**. Then add its email under **Team → Logins** on the site, with the name "Front desk". The password then never sits in Lovable's chat history.

## 2. Share it with the office

Give Frank and Susan https://highlandernc.com/front-desk plus the email and password. Then:
- They sign in once on each computer; the browser remembers them.
- Each morning they tap their name.
- If someone else answers, they tap **Other** and type their name.

## 3. Your Team page (sign in with your own admin login)

At https://highlandernc.com/front-desk/team:
- **Totals and by person** for today, this week or this month: calls, missed calls, booked, callbacks, average lead score, days on goal. "Other" callers are grouped by the name they typed.
- **Last 30 days per person:** green on the days they hit their goal.
- **Busiest hours**, **how callers found us**, and a **calls list** you can filter by person. Each call shows its score.
- **Who answers the phone:** add or remove names (e.g. add Kristy) and set each person's daily goal.
- **Logins:** who can sign in. Turn the shared login off here if the password ever leaks, then make a new one.

## Good to know

- On a shared login, privacy between people isn't really possible: anyone signed in could switch names. The card only shows the picked person's numbers plus the team total. Callbacks and missed calls to return are shown to whoever is on the phone, so nobody's follow-up gets lost on a day off.
- The 5 PM Teams recap (weekdays) lists each person on the phone list, plus any "Other" names, with calls, missed calls, booked, average score and the day's best lead.
- Until step 1 is done, the page keeps showing only the sign-in screen to everyone except admins.
