import type { Publication } from '@/utils/lens'

import { STATIC_ASSETS_URL } from '@/constants'
import {sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import imageCdn from '@/lib/imageCdn'

const getThumbnailUrl = (video: Publication): string => {
  const url =
    video.metadata?.cover?.original.url ||
    video.metadata?.image ||
    imageCdn(`${STATIC_ASSETS_URL}/images/favicon-16x16.png`)

  return sanitizeIpfsUrl(url)
}

export default getThumbnailUrl
