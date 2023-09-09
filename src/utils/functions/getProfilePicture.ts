import type { Profile } from 'src/utils/lens';
import { getRandomProfilePicture } from './getRandomProfilePicture';

import imageKit from '@/lib/imageKit';
import sanitizeIpfsUrl from '../sanitizeIpfsUrl';

const getProfilePicture = (
  profile: Profile,
  _type: 'avatar_sm' | 'avatar' | 'avatar_lg' | 'thumbnail' = 'avatar_sm'
): string => {
  const url =
    profile?.picture && profile.picture.__typename === 'MediaSet'
      ? imageKit(sanitizeIpfsUrl(profile?.picture?.original?.url))
      : profile?.picture?.__typename === 'NftImage'
      ? imageKit(sanitizeIpfsUrl(profile?.picture?.uri))
      : getRandomProfilePicture(profile?.handle);
  const sanitized = imageKit(sanitizeIpfsUrl(url));
  return url;
};

export default getProfilePicture;
