-- Create or replace the trigger function for MemberProfile synchronization
CREATE OR REPLACE FUNCTION public.handle_new_member_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  derived_display_name TEXT;
  derived_profile_title TEXT;
  derived_avatar_url TEXT;
BEGIN
  -- Derive display name with priority:
  -- 1. raw_user_meta_data ->> 'name'
  -- 2. raw_user_meta_data ->> 'full_name'
  -- 3. local part of email before '@'
  -- 4. 'Patron'
  derived_display_name := COALESCE(
    NULLIF(new.raw_user_meta_data ->> 'name', ''),
    NULLIF(new.raw_user_meta_data ->> 'full_name', ''),
    split_part(new.email, '@', 1),
    'Patron'
  );

  -- Use profileTitle from metadata if provided, otherwise default
  derived_profile_title := COALESCE(
    NULLIF(new.raw_user_meta_data ->> 'profileTitle', ''),
    'Reader & Patron'
  );

  -- Use avatar_url from metadata if provided
  derived_avatar_url := NULLIF(new.raw_user_meta_data ->> 'avatar_url', '');

  INSERT INTO public."MemberProfile" (
    id,
    "displayName",
    "profileTitle",
    "avatarUrl",
    "createdAt",
    "updatedAt"
  )
  VALUES (
    new.id::text,
    derived_display_name,
    derived_profile_title,
    derived_avatar_url,
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- Drop existing trigger if it exists, then create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_member_profile();

-- One-time backfill for existing auth.users without MemberProfile
INSERT INTO public."MemberProfile" (
  id,
  "displayName",
  "profileTitle",
  "avatarUrl",
  "createdAt",
  "updatedAt"
)
SELECT
  u.id::text,
  COALESCE(
    NULLIF(u.raw_user_meta_data ->> 'name', ''),
    NULLIF(u.raw_user_meta_data ->> 'full_name', ''),
    split_part(u.email, '@', 1),
    'Patron'
  ),
  COALESCE(
    NULLIF(u.raw_user_meta_data ->> 'profileTitle', ''),
    'Reader & Patron'
  ),
  NULLIF(u.raw_user_meta_data ->> 'avatar_url', ''),
  now(),
  now()
FROM auth.users u
LEFT JOIN public."MemberProfile" p
  ON p.id = u.id::text
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;