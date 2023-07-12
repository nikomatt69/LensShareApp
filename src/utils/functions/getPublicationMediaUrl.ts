import type { Publication } from '@/utils/lens/generatedLenster';

import { STATIC_ASSETS_URL } from '@/constants';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';

export const getPublicationMediaUrl = (video: Publication) => {
  const url = video?.metadata?.media[0]?.original.url;
  if (!url) {
    return `${STATIC_ASSETS_URL}/images/fallbackThumbnail.png`;
  }
  return sanitizeIpfsUrl(url);
};

export const getPublicationMediaRawUrl = (video: Publication) => {
  const url = video?.metadata?.media[0]?.original.url;
  return url.replace('https://arweave.net/', 'ar://');
};

export const getIsIPFSUrl = (url: string) => {
  return url?.includes('ipfs');
};
