import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';

const getMedia = (publication: any): string => {
    return (
      sanitizeIpfsUrl(
        publication?.metadata?.media[0]?.original?.url
      )
    )
  };
  
  export default getMedia;