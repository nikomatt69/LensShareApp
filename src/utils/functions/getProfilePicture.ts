import type { Profile } from 'src/utils/lens'
import { getRandomProfilePicture } from './getRandomProfilePicture'
import sanitizeIpfsUrl from 'src/utils/functions/sanitizeIpfsUrl2'
import imageCdn from '@/lib/imageCdn'

const getProfilePicture = (
  profile: Profile,
  type: 'avatar_sm' | 'avatar' | 'avatar_lg' | 'thumbnail' = 'avatar_sm'
): string => {
  const url =
    profile.picture && profile.picture.__typename === 'MediaSet'
      ? imageCdn(sanitizeIpfsUrl(profile?.picture?.original?.url))
      : profile.picture?.__typename === 'NftImage'
      ? imageCdn(sanitizeIpfsUrl(profile?.picture?.uri))
      : getRandomProfilePicture(profile?.handle)
  const sanitized = imageCdn(sanitizeIpfsUrl(url))
  return url
}

export default getProfilePicture