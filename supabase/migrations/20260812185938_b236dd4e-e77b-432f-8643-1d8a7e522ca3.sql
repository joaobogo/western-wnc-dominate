select cron.schedule(
  'site-health-daily-digest',
  '0 12 * * *',
  $$
  select net.http_post(
    url:='https://qflrlebkswerlbqbuslx.supabase.co/functions/v1/site-health-check',
    headers:=jsonb_build_object(
      'Content-Type','application/json',
      'x-admin-secret',(select value from public.internal_config where key='site_health_token')
    ),
    body:='{"digest": true}'::jsonb
  );
  $$
);