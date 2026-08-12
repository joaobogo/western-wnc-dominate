CREATE OR REPLACE FUNCTION public.validate_lead_contact()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  digits text;
  local_part text;
  domain_part text;
BEGIN
  NEW.email := NULLIF(lower(btrim(COALESCE(NEW.email, ''))), '');
  NEW.phone := NULLIF(btrim(COALESCE(NEW.phone, '')), '');

  IF NEW.phone IS NOT NULL THEN
    digits := regexp_replace(NEW.phone, '\D', '', 'g');
    IF length(digits) = 11 AND left(digits, 1) = '1' THEN
      digits := right(digits, 10);
    END IF;
    IF length(digits) <> 10
       OR left(digits, 1) IN ('0', '1')
       OR substr(digits, 4, 1) IN ('0', '1')
       OR digits ~ '^(\d)\1{9}$' THEN
      RAISE EXCEPTION 'Invalid US phone number' USING ERRCODE = 'check_violation';
    END IF;
    NEW.phone := '+1' || digits;
  END IF;

  IF NEW.email IS NOT NULL THEN
    IF NEW.email !~ '^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$' OR length(NEW.email) > 255 THEN
      RAISE EXCEPTION 'Invalid email address' USING ERRCODE = 'check_violation';
    END IF;
    local_part := split_part(NEW.email, '@', 1);
    domain_part := split_part(NEW.email, '@', 2);
    IF domain_part IN (
        'example.com','example.org','example.net','test.com','test.test','email.com',
        'domain.com','asdf.com','mailinator.com','yopmail.com','guerrillamail.com',
        'sharklasers.com','10minutemail.com','tempmail.com','temp-mail.org','trashmail.com',
        'getnada.com','dispostable.com','fakeinbox.com','maildrop.cc','throwawaymail.com')
       OR domain_part LIKE '%.test' OR domain_part LIKE '%.invalid' OR domain_part LIKE '%.example'
       OR local_part IN ('test','tests','testing','asdf','asdfasdf','qwerty','fake','noreply','no-reply','none','nobody','aaa','abc','xxx')
       OR (length(local_part) >= 3 AND local_part ~ '^(.)\1+$') THEN
      RAISE EXCEPTION 'Fake or disposable email address' USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  IF NEW.phone IS NULL AND NEW.email IS NULL THEN
    RAISE EXCEPTION 'A lead needs a phone number or an email address' USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS leads_validate_contact ON public.leads;
CREATE TRIGGER leads_validate_contact
BEFORE INSERT OR UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.validate_lead_contact();

REVOKE EXECUTE ON FUNCTION public.validate_lead_contact() FROM anon, authenticated;