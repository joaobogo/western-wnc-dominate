# Front desk: logins and tracker setup

The call sheet at https://highlandernc.com/front-desk now has personal logins,
a "My day" tracker for each person, outcome buttons, callback reminders, a
missed-call log, an admin Team page and a 5 PM Teams recap.

## 1. In Lovable (once)

Paste this into Lovable's chat:

> Pull the latest from GitHub `main`. Then:
> 1. Apply the migrations `supabase/migrations/20261030120000_front_desk_role.sql`
>    and `supabase/migrations/20261030120100_front_desk_tracking.sql`, in that order.
> 2. Deploy the edge functions `front-desk-team` and `front-desk-daily-summary`.
>
> Don't change any code, and don't touch `jobtread-sync`.

Approve the SQL when Lovable shows it. Here is what it does:
- adds a `front_desk` role;
- adds a `team_members` list (name and daily goal per login);
- adds call outcome and callback columns to the call sheet's leads;
- adds a `missed_calls` table, which is never sent to JobTread;
- adds a team-total function;
- schedules the 5 PM summary.

## 2. Create each login (Lovable Cloud → Users)

For Frank, Susan and anyone else who answers the phone:
1. Open **Cloud → Users → Add user**.
2. Enter their email and a password. Tick "Auto confirm" if it's offered.

You do this part because only Lovable can create logins.

## 3. Add them to the team (on the site)

1. Sign in at https://highlandernc.com/front-desk with your admin login.
2. Open **Team**, then scroll down to **Team logins**.
3. Enter each person's login email, the name to show ("Frank") and their daily goal (default 8).
4. Click **Add to team**.

That's it. They can now sign in at https://highlandernc.com/front-desk with their email and password.

To remove someone, click **Remove access**. Their past calls stay in the reports.

## What each person sees

- **My day card** at the top of the call sheet, showing:
  - a goal ring (calls logged today against their goal);
  - today's calls, missed calls and booked appointments;
  - their streak of workdays on goal;
  - the whole team's total for today.

  They never see each other's numbers.
- **Taken by** fills itself in from their login.
- After saving a call, they see a short "Nice — that's 5 today" message and **How did the call end?**: Booked appointment, Call back later (asks when), Not a fit, or Spam / vendor.
- **Call back today:** reminders for the callbacks they set, with a Done button. Overdue ones are outlined in red.
- **Log a missed call:** one tap with a number and an optional note. It counts toward the day, and a "Missed calls to return" list follows them for two days.

## What you (admin) see: Front desk → Team

- Totals and a by-person table for today, this week or this month: calls, missed calls, booked, callbacks, not a fit or spam, A/B leads, and days on goal.
- **Last 30 days:** one row per person, one square per day. Green means they hit their goal.
- **Busiest hours:** when the phone rings, from 7 AM to 7 PM.
- **How callers found us:** from "How did you hear about us?" on the call sheet.
- **Calls:** a list filterable by person, each linking to the lead in the Queue.
- **Team logins:** add people, change goals, remove access.

## 5 PM Teams recap

Every weekday at 5 PM Eastern, the Highlander Teams channel gets a short post:
- calls, missed calls, appointments and A/B leads for the day;
- one line per person;
- the best-scored lead of the day.

It posts once a day and adjusts for daylight saving on its own.

## Before setup is finished

The call sheet keeps saving calls even if the database step in section 1 hasn't been done yet. Until then, the tracker card shows "Your daily tracker will appear here once setup is finished." Staff need step 2 and step 3 before they can sign in, while admin logins work straight away.
