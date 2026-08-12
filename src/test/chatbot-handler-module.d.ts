// The chatbot edge function runs on Deno; tests import its pure, dependency-injected
// handler through the "@chatbot-handler" vitest alias so Deno globals never enter the
// browser TypeScript program.
declare module "@chatbot-handler" {
  export type AdminClient = any;
  export const RATE_LIMIT_WINDOW_MS: number;
  export const RATE_LIMIT_MAX: number;
  export const corsHeaders: Record<string, string>;
  export const PHONE: string;
  export const SAFE_ERRORS: Record<string, string>;
  export const SYSTEM_PROMPT: string;
  export function jsonResponse(body: unknown, status: number): Response;
  export function getClientIp(req: Request): string;
  export function buildContextNote(page?: string | null): string;
  export function enforceRateLimit(
    admin: AdminClient,
    clientIp: string,
    now?: () => number,
  ): Promise<{ allowed: boolean; count: number }>;
  export function handleChatbotRequest(req: Request, deps: any): Promise<Response>;
}
