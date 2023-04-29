import { APP_NAME, FALLBACK_COVER_URL, STATIC_ASSETS_URL } from 'src/constants'
import type { LenstokAttachment, LenstokPublication } from '../custom-types2'
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import { Publication } from '@/types/lens'

const getVideoCoverUrl = (publication: Publication): string => {
    const url =
        publication.metadata.cover?.original?.url 
    return sanitizeIpfsUrl(url)
}

export default getVideoCoverUrl