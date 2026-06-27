export const LISTING_IMAGE_PLACEHOLDER = "/images/placeholder.jpg";

/** Supports base64 data URLs, static paths (/uploads/..., /images/...), and empty fallback. */
export function getListingImageSrc(image?: string | null): string {
  const trimmed = image?.trim();

  if (trimmed?.startsWith("data:image")) {
    return trimmed;
  }

  return trimmed || LISTING_IMAGE_PLACEHOLDER;
}

export function isDataUrl(src: string): boolean {
  return src.startsWith("data:image");
}
