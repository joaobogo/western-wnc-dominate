import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { db } from "./save";

export type TeamMember = {
  user_id: string;
  display_name: string;
  daily_goal: number;
  active: boolean;
};

export type FrontDeskSession =
  | { state: "checking" }
  | { state: "signed_out" }
  | { state: "no_access"; user: User }
  | { state: "ready"; user: User; isAdmin: boolean; member: TeamMember };

const Ctx = createContext<FrontDeskSession>({ state: "checking" });

export const useFrontDesk = () => useContext(Ctx);

/** The ready session, for components that only render after sign-in. */
export function useReadySession() {
  const session = useFrontDesk();
  if (session.state !== "ready") throw new Error("Front-desk session is not ready");
  return session;
}

const fallbackName = (user: User) => {
  const local = (user.email ?? "").split("@")[0] ?? "";
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : "Team member";
};

/**
 * Who is using the call sheet. Everyone signs in with their own login (created
 * by the owner in Lovable Cloud → Users); the front_desk or admin role decides
 * access, and team_members holds the name and daily goal.
 */
export function FrontDeskSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<FrontDeskSession>({ state: "checking" });

  useEffect(() => {
    let alive = true;
    const evaluate = async (user: User | null) => {
      if (!alive) return;
      if (!user) {
        setSession({ state: "signed_out" });
        return;
      }
      const [{ data: isAdmin }, { data: isFrontDesk }, { data: member }] = await Promise.all([
        supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
        // "front_desk" is added to app_role by the 20261030 migration; the generated types lag behind.
        supabase.rpc("has_role", { _user_id: user.id, _role: "front_desk" as never }),
        db.from("team_members").select("user_id, display_name, daily_goal, active").eq("user_id", user.id).maybeSingle(),
      ]);
      if (!alive) return;
      if (!isAdmin && !(isFrontDesk && member?.active !== false)) {
        setSession({ state: "no_access", user });
        return;
      }
      setSession({
        state: "ready",
        user,
        isAdmin: Boolean(isAdmin),
        member: (member as TeamMember | null) ?? { user_id: user.id, display_name: fallbackName(user), daily_goal: 8, active: true },
      });
    };

    supabase.auth.getSession().then(({ data }) => evaluate(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      void evaluate(s?.user ?? null);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return <Ctx.Provider value={session}>{children}</Ctx.Provider>;
}
