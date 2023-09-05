import { FALLBACK_COVER_URL } from "@/constants"
import { Publication } from "../lens/generatedLenster"
import sanitizeDStorageUrl from "./sanitizeDStorageUrl"
import { sanitizeIpfsUrl } from "../sanitizeIpfsUrl"

export const getThumbnailUrl = (
  video: Publication,
  withFallback?: boolean
): string => {
  let url = video?.metadata?.cover?.original.url || video?.metadata?.image

  if (withFallback) {
    url = url || FALLBACK_COVER_URL
  }

  return sanitizeIpfsUrl(url)
}
