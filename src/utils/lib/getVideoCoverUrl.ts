
import { Publication } from '@/utils/lens/generatedLenster';
import sanitizeIpfsUrl from '../sanitizeIpfsUrl';

const getVideoCoverUrl = (publication: Publication): string => {
  const url = publication.metadata.cover?.original?.url;
  return sanitizeIpfsUrl(url);
};

export default getVideoCoverUrl;
