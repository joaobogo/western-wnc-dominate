create schema if not exists extensions;
drop extension if exists pg_net cascade;
drop extension if exists pg_cron cascade;
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;