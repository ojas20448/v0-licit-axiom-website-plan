// Shared name-parsing helpers for attorney display. Both the homepage's
// featured leadership cards and the full team directory need the same
// "strip honorific -> derive initials" logic; keeping it in one place means
// they can't drift out of sync with each other.

const HONORIFIC = /^(Mr\.|Mr|Ms\.|Ms|Mrs\.|Mrs|Dr\.|Dr)\s+/i

/**
 * Strips a leading honorific (Mr./Ms./Dr./etc.) from an attorney's display
 * name. Post-nominal credentials — "LL.M. (UCL, London)", ", IFS (Retd.)",
 * ", C.A." — are left in place; callers that need the bare name for
 * initials should use `getCoreName` instead.
 */
export function getNormalizedName(name: string): string {
  return name.replace(HONORIFIC, "").trim()
}

/**
 * Strips the honorific AND any post-nominal credentials, returning just the
 * person's given + family name(s). Credentials are appended after the name
 * either as ", LL.M." style suffixes or "(...)" parentheticals — both are
 * cut at their first occurrence, whichever comes first.
 *
 * "Mr. Rahul Dubey, LL.M. (UCL, London)" -> "Rahul Dubey"
 * "Ms. Namrata Khandelwal, C.A."         -> "Namrata Khandelwal"
 * "Mr. Ashok Kumar Singh"                -> "Ashok Kumar Singh"
 */
export function getCoreName(name: string): string {
  const withoutHonorific = getNormalizedName(name)
  const suffixStart = withoutHonorific.search(/[,(]/)
  const core = suffixStart === -1 ? withoutHonorific : withoutHonorific.slice(0, suffixStart)
  return core.trim()
}

/**
 * Derives a two-letter monogram (first name initial + last name initial)
 * from an attorney's display name, ignoring honorifics and credentials.
 * Falls back to the first two characters for single-word names.
 */
export function getAttorneyInitials(name: string): string {
  const core = getCoreName(name)
  const parts = core.split(" ").filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return core.slice(0, 2).toUpperCase()
}
