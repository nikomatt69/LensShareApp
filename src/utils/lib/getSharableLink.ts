import type { Publication } from '@/utils/lens/generatedLenster';

import {
  LENSTER_URL,
  APP_NAME,
  LENSSHARE_TWITTER_HANDLE,
  LENSTOK_URL
} from '@/constants';
import getLensHandle from './getLensHandle';

const getViewUrl = (video: Publication) => {
  return `${LENSTOK_URL}/post/${video.id}`;
};

type Link = 'lenster' | 'twitter' | 'reddit' | 'linkedin';

export const getSharableLink = (link: Link, video: Publication) => {
  if (link === 'lenster') {
    return `${LENSTER_URL}/?url=${getViewUrl(video)}&text=${
      video.metadata?.name as string
    } by @${getLensHandle(
      video.profile?.handle
    )}&hashtags=Lensshare&preview=true`;
  } else if (link === 'twitter') {
    return encodeURI(
      `https://twitter.com/intent/tweet?url=${getViewUrl(video)}&text=${
        video.metadata?.name as string
      } by @${getLensHandle(
        video.profile?.handle
      )}&via=${LENSSHARE_TWITTER_HANDLE}&related=Lensshare&hashtags=Lensshare`
    );
  } else if (link === 'reddit') {
    return `https://www.reddit.com/submit?url=${getViewUrl(video)}&title=${
      video.metadata?.name as string
    } by @${getLensHandle(video.profile?.handle)}`;
  } else if (link === 'linkedin') {
    return `https://www.linkedin.com/shareArticle/?url=${getViewUrl(
      video
    )} by @${getLensHandle(video.profile?.handle)}&title=${
      video.metadata?.name as string
    }&summary=${video.metadata?.description as string}&source=${APP_NAME}`;
  }
  return '';
};
