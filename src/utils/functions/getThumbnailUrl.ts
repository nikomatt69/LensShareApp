import type { Publication } from '@/utils/lens'

import { STATIC_ASSETS_URL } from '@/constants'
import {sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'

const getThumbnailUrl = (video: Publication): string => {
  const url =
    video.metadata?.cover?.original.url ||
    video.metadata?.image ||
    `${STATIC_ASSETS_URL}/images/fallbackThumbnail.png`

  return sanitizeIpfsUrl(url)
}

export default getThumbnailUrl
