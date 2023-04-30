import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import { Publication } from '@/types/lens'

const getVideoCoverUrl = (publication: Publication): string => {
    const url =
        publication.metadata.cover?.original?.url 
    return sanitizeIpfsUrl(url)
}

export default getVideoCoverUrl