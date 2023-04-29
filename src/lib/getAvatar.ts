import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import getStampFyiURL from './getStampFyiURL';

const getAvatar = (profile: any): string => {
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

    return (
      sanitizeIpfsUrl(
        profile?.picture?.original?.url ??
        profile?.picture?.uri ??
        getStampFyiURL(profile?.ownedBy ?? ZERO_ADDRESS)
      )
    )
  };
  
  export default getAvatar;