ALTER TABLE public.seo_404_log
  ADD CONSTRAINT seo_404_log_path_length CHECK (char_length(path) BETWEEN 1 AND 2048),
  ADD CONSTRAINT seo_404_log_referrer_length CHECK (referrer IS NULL OR char_length(referrer) <= 2048),
  ADD CONSTRAINT seo_404_log_ua_length CHECK (user_agent IS NULL OR char_length(user_agent) <= 1024);