export interface DisplayNameFields {
  penName?: string | null | undefined;
  displayName?: string | null | undefined;
}

export function resolveDisplayName(
  fields: DisplayNameFields,
  fallback = "Anonymous",
): string {
  return fields.penName?.trim() || fields.displayName?.trim() || fallback;
}
