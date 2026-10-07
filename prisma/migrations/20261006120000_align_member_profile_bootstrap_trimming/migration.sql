-- Update the handle_new_member_profile trigger function to use BTRIM for whitespace normalization
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
  -- Derive display name with priority and whitespace trimming:
  -- 1. trimmed raw_user_meta_data ->> 'name'
  -- 2. trimmed raw_user_meta_data ->> 'full_name'
  -- 3. trimmed local part of email before '@'
  -- 4. 'Patron'
  derived_display_name := COALESCE(
    NULLIF(BTRIM(new.raw_user_meta_data ->> 'name'), ''),
    NULLIF(BTRIM(new.raw_user_meta_data ->> 'full_name'), ''),
    NULLIF(BTRIM(split_part(new.email, '@', 1)), ''),
    'Patron'
  );

  -- Use profileTitle from metadata if provided, otherwise default
  derived_profile_title := COALESCE(
    NULLIF(BTRIM(new.raw_user_meta_data ->> 'profileTitle'), ''),
    'Reader & Patron'
  );

  -- Use avatar_url from metadata if provided, otherwise NULL
  derived_avatar_url := NULLIF(BTRIM(new.raw_user_meta_data ->> 'avatar_url'), '');

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
