-- Front-desk logins (Frank, Susan and anyone else who answers the phone).
-- A new enum value cannot be used in the transaction that adds it, so the
-- tables and policies that rely on it live in the next migration.
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'front_desk';
